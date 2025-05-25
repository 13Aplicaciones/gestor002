package com.aplicaciones13.gestor.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.aplicaciones13.gestor.payload.procesos.LockRequest;
import com.aplicaciones13.gestor.payload.procesos.ResetPasswordRequest;
import com.aplicaciones13.gestor.payload.request.TokenEmailRequest;
import com.aplicaciones13.gestor.payload.response.TokenResponse;
import com.aplicaciones13.gestor.repository.TokenRepository;
import com.aplicaciones13.gestor.repository.TokenServerRepository;
import com.aplicaciones13.gestor.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Clase para el servicio de la entidad Token.
 * 
 * @autor omargo33
 * @since 2025-05-04
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

    User user = new User();

    /**
     * Busca los tokens por el uuid del usuario.
     * 
     * @param uuidUser
     * @return
     */
    public List<TokenResponse> findByUuidUser(String uuidUser) {
        return findTokensByUuidUser(uuidUser).stream().map(TokenMapper.INSTANCE::toResponse).toList();
    }

    /**
     * Elimina todos los tokens de correo para el usuario.
     * 
     * @param uuidUser
     */
    public void deleteByUuidUser(String uuidUser) {
        Token token = findTokensByUuidUser(uuidUser).get(0);
        tokenRepository.deleteByIdUser(token.getIdUser(), "E");
    }

    /**
     * Obtiene todos los registros de la entidad user de manera paginada.
     * 
     * @param uuidUser
     * @param pageable
     * @return
     */

    public Page<Token> findAll(String uuidUser, Pageable pageable) {
        user= getUser(uuidUser);

        return tokenRepository.paginated(user.getIdUser(), pageable);
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
        user = getUser(request.getUuidUser());
        
        validateUniqueEmail(request.getEmail());
        tokenRepository.deleteByIdUser(user.getIdUser(), "E");

        Token token = proccesToken(null, request.getEmail(), request.getUserApp(), null);

        return TokenMapper.INSTANCE.toResponse(token);
    }

    /**
     * Resetea la contraseña del user enviando un correo con una nueva clave.
     * 
     * @param resetPasswordRequest
     */
    @InvokeUser
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        Token token = findTokensByUuidUser(resetPasswordRequest.getUuidUser()).get(0);

        proccesToken(null, resetPasswordRequest.getEmail(), resetPasswordRequest.getUserApp(), token);
    }

    /**
     * Crea una clave temporal para el user.
     * 
     * @param crearClaveRequesta
     * @return
     */
    @InvokeUser
    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        Token token = findTokensByUuidUser(changePasswordRequest.getUuidUser()).get(0);

        validateToken(token, changePasswordRequest);
        proccesToken(changePasswordRequest.getNewToken(), changePasswordRequest.getEmail(),
                changePasswordRequest.getUserApp(), token);
    }

    /**
     * Busca los tokens por el uuid del usuario.
     * 
     * @param uuidUser
     * @return
     */
    private List<Token> findTokensByUuidUser(String uuidUser) {
        user = getUser(uuidUser);
        List<Token> tokens = tokenRepository.findByIdUserAndType(user.getIdUser(), "E");

        if (tokens.isEmpty()) {
            throw new ResourceHttpStatusException("No se encontraron tokens para el user", HttpStatus.NOT_FOUND);
        }

        return tokens;
    }

    /**
     * Valida que el token sea único en el historial de tokens.
     * 
     * @param idUser
     */
    private void validateUniqueToken(Long idToken, String token) {
        List<TokenServer> tokenServers = tokenServerRepository.findByIdToken(idToken)
                .orElseThrow(() -> new DataIntegrityViolationException("El token serve no existe"));

        int limit = Math.min(10, tokenServers.size());
        for (int i = 0; i < limit; i++) {
            TokenServer tokenServer = tokenServers.get(i);
            if (tokenServer.getToken().equals(token)) {
                throw new DataIntegrityViolationException("El token ya ha sido utilizado");
            }
        }
    }

    /**
     * Valida que el correo sea único.
     * 
     * @param email
     */
    private void validateUniqueEmail(String email) {
        if (tokenRepository.findByEmail(email).isPresent()) {
            throw new DataIntegrityViolationException("El Correo ya existe");
        }
    }

    /**
     * Valida el token para el cambio de contraseña.
     * 
     * @param token
     * @param changePasswordRequest
     */
    private void validateToken(Token token, ChangePasswordRequest changePasswordRequest) {
        if (!token.getCredential().equals(changePasswordRequest.getToken())) {
            throw new DataIntegrityViolationException("Clave incorrecta");
        }

        if (!changePasswordRequest.getNewToken().equals(changePasswordRequest.getConfirmToken())) {
            throw new DataIntegrityViolationException("La clave nueva no coincide con la confirmación");
        }

        if (!changePasswordRequest.getEmail().equals(token.getEmail())) {
            throw new DataIntegrityViolationException("El correo ingresado no coincide con el correo del usuario");
        }

        validateUniqueToken(token.getIdToken(), changePasswordRequest.getConfirmToken());
    }

    /**
     * Metodo para procesar el token (Credencial)
     * 
     * @param password
     * @param email
     * @param userApp
     * @param tokenInfo
     */
    private Token proccesToken(String password, String email, String userApp, Token tokenInfo) {

        boolean sendPassword = false;
        String userName = jwtService.getUsername();

        if (password == null || password.isEmpty()) {
            password = KeyGenerator.getPassword(KeyGenerator.KEY_ALFANUMERICS, 6);
            sendPassword = true;
        }

        if (tokenInfo == null) {
            tokenInfo = new Token();
            tokenInfo.setIdUser(user.getIdUser());
            tokenInfo.setType("E");
            tokenInfo.setSocialNick(user.getNick());
            tokenInfo.setEmail(email);
            tokenInfo.setCredential(password);
            tokenInfo.setValidator(Hash.crearHash(user.getNick(), email, password));
            tokenInfo.setStatus("C");
            tokenInfo.setUser(userName);
            tokenInfo.setUserApp(userApp);
        }

        Token token = tokenInfo;
        token.setCredential(password);
        token.setStatus("A");
        token.setUser(userName);
        token.setValidator(Hash.crearHash(userName, tokenInfo.getEmail(), password));
        tokenRepository.saveAndFlush(token);

        TokenServer tokenServer = new TokenServer();
        tokenServer.setIdToken(token.getIdToken());
        tokenServer.setType(token.getType());
        tokenServer.setToken(password);
        tokenServerRepository.saveAndFlush(tokenServer);

        user.setStatus("A");
        user.setIncomeCounter(0L);
        user.setUser(token.getUser());
        user.setUserApp(userApp);
        userRepository.save(user);

        if (sendPassword) {
            log.warn("Se ha enviado un correo a {} con la nueva clave temporal: {}", tokenInfo.getEmail(), password);
        } else {
            log.warn("Se ha cambiado la clave de {}", tokenInfo.getEmail());
        }

        log.warn("Sincronizar el usuario {} con el servidor de autenticación", user.getNick());
        return token;
    }

    /**
     * Bloquea el usuario en la base de datos.
     * 
     * @param lockRequest
     */
    public void lockUser(LockRequest lockRequest) {
        user = getUser(lockRequest.getUuidUser());
        user.setStatus("I");
        userRepository.save(user);

        log.info("Enviar correo de bloqueo al usuario " + lockRequest.getEmail());
        log.info("Sincronizar el usuario " + user.getNick() + " con el servidor de autenticación");
    }

    /**
     * Desbloquea el usuario en la base de datos.
     * 
     * @param l
     */
    public void unlockUser(LockRequest lockRequest) {
        user = getUser(lockRequest.getUuidUser());
        user.setStatus("A");
        user.setIncomeCounter(0L);
        userRepository.save(user);

        log.info("Enviar correo de desbloqueo al usuario " + lockRequest.getEmail());
        log.info("Sincronizar el usuario " + user.getNick() + " con el servidor de autenticación");
    }

    /**
     * Obtiene el usuario por su UUID.
     * 
     * @param uuidUser
     * @return
     */
    private User getUser(String uuidUser) {
        return userRepository.findByUuid(uuidUser)
                .orElseThrow(() -> new ResourceHttpStatusException("Usuario No encontrado", HttpStatus.NOT_FOUND));
    }
}