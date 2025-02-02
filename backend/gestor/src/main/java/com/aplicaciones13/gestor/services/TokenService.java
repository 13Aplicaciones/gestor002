package com.aplicaciones13.gestor_ws.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor_ws.model.Token;
import com.aplicaciones13.gestor_ws.model.Usuario;
import com.aplicaciones13.gestor_ws.payload.procesos.CrearClaveRequest;
import com.aplicaciones13.gestor_ws.payload.procesos.OperacionesResponse;
import com.aplicaciones13.gestor_ws.repository.TokenRepository;
import com.aplicaciones13.gestor_ws.repository.UsuarioRepository;

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
    private UsuarioRepository usuarioRepository;

    /**
     * Valida que el token sea único.
     * 
     * @param idUsuario
     */
    public void validateUniqueToken(Long idUsuario) {
        if (tokenRepository.findByIdUsuario(idUsuario).size() > 0) {
            throw new DataIntegrityViolationException("Ya se encuetra registrada una Clave de Usuario");
        }
    }

    /**
     * Valida que el correo sea único.
     * 
     * @param correo
     */
    public void validateUniqueCorreo(String correo) {
        if (tokenRepository.findByCorreo(correo).isPresent()) {
            throw new DataIntegrityViolationException("El Correo ya existe");
        }
    }

    /**
     * Crea una clave temporal para el usuario.
     * 
     * @param crearClaveRequesta
     * @return
     */
    @EjecutarUsuario
    public OperacionesResponse crearClave(CrearClaveRequest crearClaveRequesta) {
        validateUniqueCorreo(crearClaveRequesta.getCorreo());

        Usuario usuario =  usuarioRepository.findByUuid(crearClaveRequesta.getUuid().toString())
        .orElseThrow(() -> new ResourceHttpStatusException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        validateUniqueToken(usuario.getIdUsuario());

        Token token = new Token();
        token.setIdUsuario(usuario.getIdUsuario());
        token.setTipo(crearClaveRequesta.getTipo().getValue());
        token.setSocialNick(usuario.getNick());
        token.setCorreo(crearClaveRequesta.getCorreo());

        // TODO : Implementar la generación de la clave con el tipo de token y con llave secreta en el validador
        token.setToken("12341234s"/*crearClaveRequesta.getToken()*/);

        // TODO: Implementar la generación de la llave randomica
        token.setValidador("En un lugar de la Mancha, de cuyo nombre no quiero acordarme"/*crearClaveRequesta.getValidador()*/);
        token.setEstado("C");
        token.setUsuarioPrograma(crearClaveRequesta.getUsuarioPrograma());
        tokenRepository.saveAndFlush(token);

        //TODO enviar correo con la clave temporal: token.getToken()

        // TODO: Implementar la respuesta de la operación
        OperacionesResponse operacionesResponse = new OperacionesResponse();
        operacionesResponse.setCode(HttpStatus.OK.value());
        operacionesResponse.setMessage("Clave temporal creada");
        operacionesResponse.setStatus(HttpStatus.OK.getReasonPhrase());
        operacionesResponse.setData(null);

        return operacionesResponse;
    }   
}