package com.aplicaciones13.gestor.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.RolUserMapper;
import com.aplicaciones13.gestor.model.RolUser;
import com.aplicaciones13.gestor.payload.request.RolUserRequest;
import com.aplicaciones13.gestor.payload.response.RolUserResponse;
import com.aplicaciones13.gestor.repository.RolUserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class RolUserService {

    private RolUserRepository roluserRepository;

    /**
     * Constructor del servicio RolUserService.
     *
     * @param roluserRepository Repositorio de RolUser
     */
    public RolUserService(RolUserRepository roluserRepository) {
        this.roluserRepository = roluserRepository;
    }

    public RolUserResponse findById(Long id) {
        RolUser roluser = roluserRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de user no encontrado", HttpStatus.NOT_FOUND));
        return RolUserMapper.INSTANCE.toResponse(roluser);
    }

    public List<RolUserResponse> findAll() {
        return roluserRepository.findAll().stream()
                .map(RolUserMapper.INSTANCE::toResponse)
                .collect(Collectors.toList());
    }

    @InvokeUser
    public RolUserResponse create(RolUserRequest request) {
        RolUser roluser = RolUserMapper.INSTANCE.toEntity(request);
        roluser = roluserRepository.save(roluser);
        return RolUserMapper.INSTANCE.toResponse(roluser);
    }

    @InvokeUser
    public RolUserResponse update(Long id, RolUserRequest request) {
        RolUser roluser = roluserRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de user no encontrado", HttpStatus.NOT_FOUND));

        roluser.setIdRol(request.getIdRol());
        roluser.setIdUser(request.getIdUser());
        roluser.setUserApp(request.getUserApp());

        roluser = roluserRepository.save(roluser);
        return RolUserMapper.INSTANCE.toResponse(roluser);
    }

    public void delete(Long id) {
        RolUser roluser = roluserRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de user no encontrado", HttpStatus.NOT_FOUND));
        roluserRepository.delete(roluser);
    }
}