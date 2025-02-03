package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor.mapping.UsuarioMapper;
import com.aplicaciones13.gestor.model.Usuario;
import com.aplicaciones13.gestor.payload.request.UsuarioRequest;
import com.aplicaciones13.gestor.payload.response.UsuarioResponse;
import com.aplicaciones13.gestor.repository.UsuarioRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Clase para el servicio de la entidad Usuario.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Slf4j
@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Valida que el nick sea único en la base de datos con excepción del uuid
     * 
     * @param nick
     * @param uuid
     */
    public void validateUniqueNickUuid(String nick, String uuid) {
        Optional<Usuario> existingError = usuarioRepository.findByNick(nick);
        if (existingError.isPresent() && !existingError.get().getUuid().equals(uuid)) {
            throw new DataIntegrityViolationException("El Nick ya existe");
        }
    }

    /**
     * Valida que el nick sea único en la base de datos
     * 
     * @param nick
     */
    public void validateUniqueIndice(String nick) {
        if (usuarioRepository.findByNick(nick).isPresent()) {
            throw new DataIntegrityViolationException("El nick ya existe");
        }
    }

    /**
     * Obtiene todos los registros de la entidad Usuario de manera paginada.
     * 
     * @param nick
     * @param nombre
     * @param apellido
     * @param estado
     * @param fechaInicio
     * @param fechaFin
     * @param pageable
     * @return
     */
    public Page<Usuario> findAll(String nick, String nombre, String apellido, String estado,
            Date fechaInicio, Date fechaFin, Pageable pageable) {
        return usuarioRepository.paginado(nick, nombre, apellido,estado,fechaInicio, fechaFin, pageable);
    }

    /**
     * Obtiene un registro de la entidad Usuario por su uuid.
     * 
     * @param uuid
     * @return
     */
    public UsuarioResponse findByUuid(String uuid) {
        return usuarioRepository.findByUuid(uuid)
                .map(UsuarioMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Usuario no encontrado", HttpStatus.NOT_FOUND));
    }

    /**
     * Crea un registro de la entidad Usuario.
     * 
     * @param usuarioRequest
     * @return
     */
    @EjecutarUsuario
    public UsuarioResponse create(UsuarioRequest usuarioRequest) {
        Usuario usuario = UsuarioMapper.INSTANCE.toEntity(usuarioRequest);
        validateUniqueIndice(usuario.getNick());
        usuario = usuarioRepository.saveAndFlush(usuario);
        return UsuarioMapper.INSTANCE.toResponse(usuario);
    }

    /**
     * Actualiza un registro de la entidad Usuario.
     * 
     * @param uuid
     * @param usuarioRequest
     * @return
     */
    @EjecutarUsuario
    public UsuarioResponse update(String uuid, UsuarioRequest usuarioRequest) {
        validateUniqueNickUuid(usuarioRequest.getNick(), uuid);

        Usuario usuario = usuarioRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        usuario.setNick(usuarioRequest.getNick());
        usuario.setNombre(usuarioRequest.getNombre());
        usuario.setApellido(usuarioRequest.getApellido());
        usuario.setValidador(usuarioRequest.getValidador());
        usuario.setUsuarioPrograma(usuarioRequest.getUsuarioPrograma());
        usuario.setEstado(usuarioRequest.getEstado());

        usuario = usuarioRepository.saveAndFlush(usuario);
        return UsuarioMapper.INSTANCE.toResponse(usuario);
    }

    /**
     * Elimina un registro de la entidad Usuario de manera logica.
     * 
     * @param uuid
     */
    @EjecutarUsuario
    public void delete(String uuid) {
        Usuario usuario = usuarioRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        usuario.setEstado("X");
        usuario = usuarioRepository.save(usuario);
    }
}