package com.aplicaciones13.gestor_ws.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor_ws.mapping.RolUsuarioMapper;
import com.aplicaciones13.gestor_ws.model.RolUsuario;
import com.aplicaciones13.gestor_ws.payload.request.RolUsuarioRequest;
import com.aplicaciones13.gestor_ws.payload.response.RolUsuarioResponse;
import com.aplicaciones13.gestor_ws.repository.RolUsuarioRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class RolUsuarioService {

    @Autowired
    private RolUsuarioRepository rolUsuarioRepository;

    public RolUsuarioResponse findById(Long id) {
        RolUsuario rolUsuario = rolUsuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de usuario no encontrado", HttpStatus.NOT_FOUND));
        return RolUsuarioMapper.INSTANCE.toResponse(rolUsuario);
    }

    public List<RolUsuarioResponse> findAll() {
        return rolUsuarioRepository.findAll().stream()
                .map(RolUsuarioMapper.INSTANCE::toResponse)
                .collect(Collectors.toList());
    }

    @EjecutarUsuario
    public RolUsuarioResponse create(RolUsuarioRequest request) {
        RolUsuario rolUsuario = RolUsuarioMapper.INSTANCE.toEntity(request);
        rolUsuario = rolUsuarioRepository.save(rolUsuario);
        return RolUsuarioMapper.INSTANCE.toResponse(rolUsuario);
    }

    @EjecutarUsuario
    public RolUsuarioResponse update(Long id, RolUsuarioRequest request) {
        RolUsuario rolUsuario = rolUsuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de usuario no encontrado", HttpStatus.NOT_FOUND));

        rolUsuario.setIdRol(request.getIdRol());
        rolUsuario.setIdUsuario(request.getIdUsuario());
        rolUsuario.setUsuarioPrograma(request.getUsuarioPrograma());

        rolUsuario = rolUsuarioRepository.save(rolUsuario);
        return RolUsuarioMapper.INSTANCE.toResponse(rolUsuario);
    }

    public void delete(Long id) {
        RolUsuario rolUsuario = rolUsuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Rol de usuario no encontrado", HttpStatus.NOT_FOUND));
        rolUsuarioRepository.delete(rolUsuario);
    }
}