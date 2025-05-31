package com.aplicaciones13.gestor.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.gestor.mapping.UserMapper;
import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.request.UserPatchStatusRequest;
import com.aplicaciones13.gestor.payload.request.UserRequest;
import com.aplicaciones13.gestor.payload.response.UserResponse;
import com.aplicaciones13.gestor.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

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

    @Autowired
    private JwtService jwtService;

    /**
     * Valida que el nick sea único en la base de datos con excepción del uuid
     * 
     * @param nick
     * @param uuid
     */
    public void validateUniqueNickUuid(String nick, String uuid) {
        Optional<User> existingError = userRepository.findByNick(nick);
        if (existingError.isPresent() && !existingError.get().getUuid().toString().equals(uuid)) {
            throw new DataIntegrityViolationException("El Nick ya existe");
        }
    }

    /**
     * Valida que el nick sea único en la base de datos
     * 
     * @param nick
     */
    public void validateUniqueNick(String nick) {
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
     * @param pageable
     * @return
     */     
    public Page<User> findAll(String nick, String name, String lastName, String status, Pageable pageable) {
        return userRepository.paginated(nick, name, lastName,status, pageable);
    }
    
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
        validateUniqueNick(user.getNick());
        
        user.setValidator(userRequest.getNick().hashCode()+ "-" + String.valueOf(userRequest.getNick().hashCode()).hashCode());
        user.setUser(jwtService.getUsername());    
        
        user = userRepository.saveAndFlush(user);
        return UserMapper.INSTANCE.toResponse(user);
    }


/**
     * Actualiza un registro de la entidad user.
     * 
     * @param uuid
     * @param userPatchStatusRequest
     * @return
     */
    @InvokeUser
    public UserResponse updateStatus(String uuid, UserPatchStatusRequest userPatchStatusRequest) {

        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("user no encontrado", HttpStatus.NOT_FOUND));

        user.setUserApp(userPatchStatusRequest.getUserApp());
        user.setStatus(userPatchStatusRequest.getStatus());
        user.setUser(jwtService.getUsername());    

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

        user.setName(userRequest.getName());
        user.setLastName(userRequest.getLastName());
        user.setUserApp(userRequest.getUserApp());
        user.setStatus(userRequest.getStatus());
        user.setUser(jwtService.getUsername());    

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