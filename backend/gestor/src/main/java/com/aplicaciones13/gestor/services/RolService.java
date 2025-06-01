package com.aplicaciones13.gestor.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.RolMapper;
import com.aplicaciones13.gestor.model.Rol;
import com.aplicaciones13.gestor.payload.request.RolRequest;
import com.aplicaciones13.gestor.payload.response.RolResponse;
import com.aplicaciones13.gestor.repository.RolRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class RolService {

    private final RolRepository rolRepository;

    /**
     * Constructor del servicio RolService.
     *
     * @param rolRepository Repositorio de roles
     */
    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public RolResponse findByName(String name) {
        return rolRepository.findByName(name)
                .map(RolMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));
    }

    public RolResponse create(RolRequest rolRequest) {
        Rol rol = RolMapper.INSTANCE.toEntity(rolRequest);
        validateUniqueName(rol.getName());
        rol = rolRepository.saveAndFlush(rol);
        return RolMapper.INSTANCE.toResponse(rol);
    }

    @InvokeUser
    public RolResponse update(String name, RolRequest rolRequest) {
        validateUniqueName(rolRequest.getName());

        Rol rol = rolRepository.findByName(name)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));

        rol.setName(rolRequest.getName());
        rol.setType(rolRequest.getType());
        rol.setStatus(rolRequest.getStatus());
        rol.setUserApp(rolRequest.getUserApp());

        rol = rolRepository.saveAndFlush(rol);
        return RolMapper.INSTANCE.toResponse(rol);
    }

    public void delete(String name) {
        Rol rol = rolRepository.findByName(name)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));

        rolRepository.delete(rol);
    }

    private void validateUniqueName(String name) {
        if (rolRepository.findByName(name).isPresent()) {
            throw new DataIntegrityViolationException("El name ya existe");
        }
    }
}
