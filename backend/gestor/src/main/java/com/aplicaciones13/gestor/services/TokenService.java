package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.Token;
import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.procesos.CreatePasswordRequest;
import com.aplicaciones13.gestor.payload.procesos.OperationsResponse;
import com.aplicaciones13.gestor.repository.TokenRepository;
import com.aplicaciones13.gestor.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Clase para el servicio de la entidad Token.
 * 
 */
@Service
@Transactional
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;
    
    @Autowired
    private UserRepository userRepository;

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
     * Crea una clave temporal para el user.
     * 
     * @param crearClaveRequesta
     * @return
     */
    @InvokeUser
    public OperationsResponse crearPassword(CreatePasswordRequest crearClaveRequesta) {
        validateUniqueEmail(crearClaveRequesta.getEmail());

        User user =  userRepository.findByUuid(crearClaveRequesta.getUuid().toString())
        .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));

        validateUniqueToken(user.getIdUser());

        Token token = new Token();
        token.setIdUser(user.getIdUser());
        token.setType(crearClaveRequesta.getType().getValue());
        token.setSocialNick(user.getNick());
        token.setEmail(crearClaveRequesta.getEmail());

        // TODO : Implementar la generación de la clave con el type de token y con llave secreta en el validador
        token.setToken("12341234s"/*crearClaveRequesta.getToken()*/);

        // TODO: Implementar la generación de la llave randomica
        token.setValidator("En un lugar de la Mancha, de cuyo name no quiero acordarme"/*crearClaveRequesta.getValidator()*/);
        token.setStatus("C");
        token.setUserApp(crearClaveRequesta.getUserApp());
        tokenRepository.saveAndFlush(token);

        //TODO enviar correo con la clave temporal: token.getToken()

        // TODO: Implementar la respuesta de la operación
        OperationsResponse operationsResponse = new OperationsResponse();
        operationsResponse.setCode(HttpStatus.OK.value());
        operationsResponse.setMessage("Clave temporal creada");
        operationsResponse.setStatus(HttpStatus.OK.getReasonPhrase());
        operationsResponse.setData(null);

        return operationsResponse;
    }   
}