package com.aplicaciones13.gestor_ws.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor_ws.mapping.RolMapper;
import com.aplicaciones13.gestor_ws.model.Rol;
import com.aplicaciones13.gestor_ws.payload.request.RolRequest;
import com.aplicaciones13.gestor_ws.payload.response.RolResponse;
import com.aplicaciones13.gestor_ws.repository.RolRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public RolResponse findByNombre(String nombre) {
        return rolRepository.findByNombre(nombre)
                .map(RolMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));
    }

    public RolResponse create(RolRequest rolRequest) {
        Rol rol = RolMapper.INSTANCE.toEntity(rolRequest);
        validateUniqueNombre(rol.getNombre());
        rol = rolRepository.saveAndFlush(rol);
        return RolMapper.INSTANCE.toResponse(rol);
    }

    @EjecutarUsuario
    public RolResponse update(String nombre, RolRequest rolRequest) {
        validateUniqueNombre(rolRequest.getNombre());

        Rol rol = rolRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));

        rol.setNombre(rolRequest.getNombre());
        rol.setTipo(rolRequest.getTipo());
        rol.setEstado(rolRequest.getEstado());
        rol.setUsuarioPrograma(rolRequest.getUsuarioPrograma());

        rol = rolRepository.saveAndFlush(rol);
        return RolMapper.INSTANCE.toResponse(rol);
    }

    public void delete(String nombre) {
        Rol rol = rolRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol no encontrado", HttpStatus.NOT_FOUND));

        rolRepository.delete(rol);
    }

    private void validateUniqueNombre(String nombre) {
        if (rolRepository.findByNombre(nombre).isPresent()) {
            throw new DataIntegrityViolationException("El nombre ya existe");
        }
    }
}
