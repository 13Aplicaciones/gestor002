package com.aplicaciones13.gestor.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.base.security.Hash;
import com.aplicaciones13.base.security.KeyGenerator;
import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.gestor.mapping.TokenMapper;
import com.aplicaciones13.gestor.model.Token;
import com.aplicaciones13.gestor.model.TokenServer;
import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.procesos.ChangePasswordRequest;
import com.aplicaciones13.gestor.payload.request.TokenEmailRequest;
import com.aplicaciones13.gestor.payload.response.TokenResponse;
import com.aplicaciones13.gestor.repository.TokenRepository;
import com.aplicaciones13.gestor.repository.TokenServerRepository;
import com.aplicaciones13.gestor.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Clase para el servicio de la entidad Token.
 * 
 */
@Slf4j
@Service
@Transactional
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private TokenServerRepository tokenServerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public List<TokenResponse> findByUuidUser(String uuidUser) {
        User user = userRepository.findByUuid(uuidUser)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));

        List<Token> tokens = tokenRepository.findByIdUser(user.getIdUser());
        return tokens.stream().map(TokenMapper.INSTANCE::toResponse).toList();
    }

    /**
     * Valida que el token sea único.
     * 
     * @param idUser
     */
    public void validateUniqueToken(Long idUser) {
        if (tokenRepository.findByIdUser(idUser).size() > 0) {
            throw new DataIntegrityViolationException("Ya se encuetra registrada una Clave de user");
        }
    }

    /**
     * Valida que el correo sea único.
     * 
     * @param email
     */
    public void validateUniqueEmail(String email) {
        if (tokenRepository.findByEmail(email).isPresent()) {
            throw new DataIntegrityViolationException("El Correo ya existe");
        }
    }

    /**
     * Elimina todos los tokens de correo para el usuario.
     * 
     * @param uuidUser
     */
    public void deleteByUuidUser(String uuidUser) {
        User user = userRepository.findByUuid(uuidUser)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));
        //TODO: solo borra los email = E
        tokenRepository.deleteByIdUser(user.getIdUser(), "E");
    }

    /**
     * Crea un token de correo para el user.
     * 
     * Busca si el usuario existe, si no existe lanza una excepción.
     * Valida el que el correo no exista en la base de datos.
     * Elimina todos los tokens de correo existentes para el usuario.
     * 
     * Genera una clave aleatoria de 6 caracteres alfanuméricos.
     * Crea un nuevo token con el correo y la clave generada.
     * 
     * @param request
     * @return
     */
    public TokenResponse createEmail(TokenEmailRequest request) {        
        User user = userRepository.findByUuid(request.getUuidUser())
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));
        validateUniqueEmail(request.getEmail());        
        tokenRepository.deleteByIdUser(user.getIdUser(), "E");
       
        String password = KeyGenerator.getPassword(KeyGenerator.KEY_ALFANUMERICS, 6);
        Token token = new Token();
        token.setIdUser(user.getIdUser());
        token.setType("E");
        token.setSocialNick(user.getNick());
        token.setEmail(request.getEmail());
        token.setToken(password);
        token.setValidator(Hash.crearHash(user.getNick(), request.getEmail(), password));
        token.setStatus("C");
        token.setUser(jwtService.getUsername());
        token.setUserApp(request.getUserApp());

        Token savedToken = tokenRepository.save(token);
        user.setStatus("A");
        user.setUser(jwtService.getUsername());
        user.setUserApp(request.getUserApp());
        userRepository.save(user);
        //TODO: Enviar correo con la clave temporal: token.getToken()
        log.info("Se ha enviado un correo a " + request.getEmail() + " con la clave temporal: " + password);

        return TokenMapper.INSTANCE.toResponse(savedToken);
    }

    /**
     * Crea una clave temporal para el user.
     * 
     * @param crearClaveRequesta
     * @return
     */
    @InvokeUser
    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        
        User user = userRepository.findByUuid(changePasswordRequest.getUuidUser())
                .orElseThrow(() -> new ResourceHttpStatusException("User no encontrado", HttpStatus.NOT_FOUND));

        List<Token> tokens = tokenRepository.findByIdUser(user.getIdUser());

        if (tokens.isEmpty()) {
            throw new ResourceHttpStatusException("No se encontraron tokens para el user", HttpStatus.NOT_FOUND);
        }

        Token token = tokens.get(0);
        validateToken(token, changePasswordRequest);
        token.setToken(changePasswordRequest.getNewToken());
        token.setStatus("A");
        token.setUser(jwtService.getUsername());
        token.setValidator(Hash.crearHash(user.getNick(), changePasswordRequest.getEmail(), changePasswordRequest.getNewToken()));
        tokenRepository.saveAndFlush(token);

        TokenServer tokenServer = new TokenServer();
        tokenServer.setIdToken(token.getIdToken());
        tokenServer.setType(token.getType());
        tokenServer.setToken(changePasswordRequest.getToken());        
        tokenServerRepository.saveAndFlush(tokenServer);

        //TODO: Enviar correo con la nueva clave temporal: token.getToken()
        log.info("Se ha enviado un correo a " + changePasswordRequest.getEmail() + " con la nueva clave temporal: " + changePasswordRequest.getNewToken());
    }


    /**
     * Valida el token para el cambio de contraseña.
     * 
     * @param token
     * @param changePasswordRequest
     */
    private void validateToken(Token token, ChangePasswordRequest changePasswordRequest) {
        if(!token.getToken().equals(changePasswordRequest.getToken())) {
            throw new DataIntegrityViolationException("Clave incorrecta");
        }

        if (!changePasswordRequest.getNewToken().equals(changePasswordRequest.getConfirmToken())) {
            throw new DataIntegrityViolationException("La clave nueva no coincide con la confirmación");
        }

        if (!changePasswordRequest.getEmail().equals(token.getEmail())) {
            throw new DataIntegrityViolationException("El correo no ingresado no coincide con el correo del usuario");
        }

        //TODO validar que el token no exista ya en token server
    }
}