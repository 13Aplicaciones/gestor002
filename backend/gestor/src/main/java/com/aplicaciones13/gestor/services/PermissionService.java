package com.aplicaciones13.gestor.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.Permission;
import com.aplicaciones13.gestor.payload.request.PermissionRequest;
import com.aplicaciones13.gestor.payload.response.PermissionResponse;
import com.aplicaciones13.gestor.repository.PermissionRepository;

@Service
@Transactional
public class PermissionService {

    private final PermissionRepository permissionRepository;

    /**
     * Constructor del servicio PermissionService.
     *
     * @param permissionRepository Repositorio de permisos
     */
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<PermissionResponse> findAll() {
        return permissionRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public PermissionResponse findById(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permission no encontrado", HttpStatus.NOT_FOUND));
        return toResponse(permission);
    }

    public PermissionResponse create(PermissionRequest request) {
        Permission permission = toEntity(request);
        permission = permissionRepository.save(permission);
        return toResponse(permission);
    }

    @InvokeUser
    public PermissionResponse update(Long id, PermissionRequest request) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permission no encontrado", HttpStatus.NOT_FOUND));

                
        
        permission.setIdMenu(request.getIdMenu());
        permission.setIdRol(request.getIdRol());
        permission.setCreate(request.getCreate());
        permission.setUpdate(request.getUpdate());
        permission.setDelete(request.getDelete());
        permission.setAudit(request.getAudit());
        permission.setUserApp(request.getUserApp());
        permission = permissionRepository.save(permission);
        return toResponse(permission);
    }

    public void delete(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Permission no encontrado", HttpStatus.NOT_FOUND));
        permissionRepository.delete(permission);
    }

    @InvokeUser
    private Permission toEntity(PermissionRequest request) {
        Permission permission = new Permission();
        permission.setIdMenu(request.getIdMenu());
        permission.setIdRol(request.getIdRol());
        permission.setCreate(request.getCreate());
        permission.setUpdate(request.getUpdate());
        permission.setDelete(request.getDelete());
        permission.setAudit(request.getAudit());
        permission.setUserApp(request.getUserApp());
        return permission;
    }

    private PermissionResponse toResponse(Permission permission) {
        PermissionResponse response = new PermissionResponse();
        response.setIdPermission(permission.getIdPermission());
        response.setIdMenu(permission.getIdMenu());
        response.setIdRol(permission.getIdRol());
        response.setCreate(permission.getCreate());
        response.setUpdate(permission.getUpdate());
        response.setDelete(permission.getDelete());
        response.setAudit(permission.getAudit());
        response.setUser(permission.getUser());
        response.setUserApp(permission.getUserApp());
        return response;
    }
}