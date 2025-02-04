package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.UserMapper;
import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.request.UserRequest;
import com.aplicaciones13.gestor.payload.response.UserResponse;
import com.aplicaciones13.gestor.repository.UserRepository;

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
 * Clase para el servicio de la entidad user.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Slf4j
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Valida que el nick sea único en la base de datos con excepción del uuid
     * 
     * @param nick
     * @param uuid
     */
    public void validateUniqueNickUuid(String nick, String uuid) {
        Optional<User> existingError = userRepository.findByNick(nick);
        if (existingError.isPresent() && !existingError.get().getUuid().equals(uuid)) {
            throw new DataIntegrityViolationException("El Nick ya existe");
        }
    }

    /**
     * Valida que el nick sea único en la base de datos
     * 
     * @param nick
     */
    public void validateUniqueIndex(String nick) {
        if (userRepository.findByNick(nick).isPresent()) {
            throw new DataIntegrityViolationException("El nick ya existe");
        }
    }

    /**
     * Obtiene todos los registros de la entidad user de manera paginada.
     * 
     * @param nick
     * @param name
     * @param apellido
     * @param status
     * @param fechaInicio
     * @param fechaFin
     * @param pageable
     * @return
     */
    /* 
    public Page<User> findAll(String nick, String name, String lastName, String status,
            Date startDate, Date endDate, Pageable pageable) {
        return userRepository.paginado(nick, name, lastName,status,startDate, endDate, pageable);
    }
        */

    /**
     * Obtiene un registro de la entidad user por su uuid.
     * 
     * @param uuid
     * @return
     */
    public UserResponse findByUuid(String uuid) {
        return userRepository.findByUuid(uuid)
                .map(UserMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));
    }

    /**
     * Crea un registro de la entidad user.
     * 
     * @param userRequest
     * @return
     */
    @InvokeUser
    public UserResponse create(UserRequest userRequest) {
        User user = UserMapper.INSTANCE.toEntity(userRequest);
        validateUniqueIndex(user.getNick());
        user = userRepository.saveAndFlush(user);
        return UserMapper.INSTANCE.toResponse(user);
    }

    /**
     * Actualiza un registro de la entidad user.
     * 
     * @param uuid
     * @param userRequest
     * @return
     */
    @InvokeUser
    public UserResponse update(String uuid, UserRequest userRequest) {
        validateUniqueNickUuid(userRequest.getNick(), uuid);

        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));

        user.setNick(userRequest.getNick());
        user.setName(userRequest.getName());
        user.setLastName(userRequest.getLastName());
        user.setValidator(userRequest.getValidator());
        user.setUserApp(userRequest.getUserApp());
        user.setStatus(userRequest.getStatus());

        user = userRepository.saveAndFlush(user);
        return UserMapper.INSTANCE.toResponse(user);
    }

    /**
     * Elimina un registro de la entidad user de manera logica.
     * 
     * @param uuid
     */
    @InvokeUser
    public void delete(String uuid) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));

        user.setStatus("X");
        user = userRepository.save(user);
    }
}