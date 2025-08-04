package com.aplicaciones13.gestor.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.gestor.mapping.PermissionsMapper;
import com.aplicaciones13.gestor.model.Permissions;
import com.aplicaciones13.gestor.payload.request.PermissionsRequest;
import com.aplicaciones13.gestor.payload.response.PermissionsResponse;
import com.aplicaciones13.gestor.repository.MenuRepository;
import com.aplicaciones13.gestor.repository.PermissionsRepository;

@Service
@Transactional
public class PermissionsService {

    private final PermissionsRepository permissionsRepository;

    private final MenuRepository menuRepository;

    public PermissionsService(PermissionsRepository permissionsRepository, MenuRepository menuRepository) {
        this.permissionsRepository = permissionsRepository;
        this.menuRepository = menuRepository;
    }


    public PermissionsResponse findByUuid(String uuid) {
        Permissions permissions = permissionsRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));
        return  PermissionsMapper.INSTANCE.toResponse(permissions);
    }

    /* 
    public List<PermissionsResponse> findByIdMenu(Long idMenu) {
        return permissionsRepository.findByIdMenu(idMenu).stream()
                .map(this::toResponse)
                .toList();
    }*/

    /* 
    public List<PermissionsResponse> findByRealmClientRole(String realm, String clientId, String role) {
        return permissionsRepository.findByRealmAndClientIdAndRole(realm, clientId, role).stream()
                .map(this::toResponse)
                .toList();
    }
    */
    /* 
    @InvokeUser
    public PermissionsResponse create(PermissionsRequest request) {
        Permissions permissions = toEntity(request);
        permissions = permissionsRepository.save(permissions);
        return PermissionsMapper.INSTANCE.toResponse(permissions);
    }*/

    @InvokeUser
    public PermissionsResponse update(String uuid, PermissionsRequest request) {        
        Permissions permissions = permissionsRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));
        permissions.setIdMenu(request.getIdMenu());
        permissions.setRealm(request.getRealm());
        permissions.setClientId(request.getClientId());
        permissions.setRole(request.getRole());
        permissions.setName(request.getName());
        permissions.setValue(request.getValue());
        permissions.setUserApp(request.getUserApp());
        
        permissions = permissionsRepository.save(permissions);
        return PermissionsMapper.INSTANCE.toResponse(permissions);
    }

    /**
     * Metodo para eliminar un permiso por su UUID.
     * 
     * @param uuid
     */
    public void delete(String uuid) {
        Permissions permissions = permissionsRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));
        permissionsRepository.delete(permissions);
    }


    /*public Page<PermissionsResponse> findByUuidOrRealmOrClientIdOrRole(
            String uuid, String realm, String clientId, String role, Pageable pageable) {
        
        Menu menu = menuRepository.findByUuid(uuid)
                .orElse(new Menu());
            
        
        
        return permissionsRepository.findByUuidOrRealmOrClientIdOrRole(uuid, realm, clientId, role, pageable)
                .map(PermissionsMapper.INSTANCE::toResponse);
    }*/
}