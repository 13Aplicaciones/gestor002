package com.aplicaciones13.gestor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor.model.Permiso;
import com.aplicaciones13.gestor.payload.request.PermisoRequest;
import com.aplicaciones13.gestor.payload.response.PermisoResponse;
import com.aplicaciones13.gestor.repository.PermisoRepository;

import java.util.List;

@Service
@Transactional
public class PermisoService {

    @Autowired
    private PermisoRepository permisoRepository;

    public List<PermisoResponse> findAll() {
        return permisoRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public PermisoResponse findById(Long id) {
        Permiso permiso = permisoRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permiso no encontrado", HttpStatus.NOT_FOUND));
        return toResponse(permiso);
    }

    public PermisoResponse create(PermisoRequest request) {
        Permiso permiso = toEntity(request);
        permiso = permisoRepository.save(permiso);
        return toResponse(permiso);
    }

    @EjecutarUsuario
    public PermisoResponse update(Long id, PermisoRequest request) {
        Permiso permiso = permisoRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permiso no encontrado", HttpStatus.NOT_FOUND));

                
        
        permiso.setIdMenu(request.getIdMenu());
        permiso.setIdRol(request.getIdRol());
        permiso.setCrear(request.getCrear());
        permiso.setActualizar(request.getActualizar());
        permiso.setBorrar(request.getBorrar());
        permiso.setVerAuditoria(request.getVerAuditoria());
        permiso.setUsuarioPrograma(request.getUsuarioPrograma());
        permiso = permisoRepository.save(permiso);
        return toResponse(permiso);
    }

    public void delete(Long id) {
        Permiso permiso = permisoRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permiso no encontrado", HttpStatus.NOT_FOUND));
        permisoRepository.delete(permiso);
    }

    @EjecutarUsuario
    private Permiso toEntity(PermisoRequest request) {
        Permiso permiso = new Permiso();
        permiso.setIdMenu(request.getIdMenu());
        permiso.setIdRol(request.getIdRol());
        permiso.setCrear(request.getCrear());
        permiso.setActualizar(request.getActualizar());
        permiso.setBorrar(request.getBorrar());
        permiso.setVerAuditoria(request.getVerAuditoria());
        permiso.setUsuarioPrograma(request.getUsuarioPrograma());
        return permiso;
    }

    private PermisoResponse toResponse(Permiso permiso) {
        PermisoResponse response = new PermisoResponse();
        response.setIdPermiso(permiso.getIdPermiso());
        response.setIdMenu(permiso.getIdMenu());
        response.setIdRol(permiso.getIdRol());
        response.setCrear(permiso.getCrear());
        response.setActualizar(permiso.getActualizar());
        response.setBorrar(permiso.getBorrar());
        response.setVerAuditoria(permiso.getVerAuditoria());
        response.setUsuario(permiso.getUsuario());
        response.setUsuarioPrograma(permiso.getUsuarioPrograma());
        return response;
    }
}