package com.aplicaciones13.orchestrator.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orchestrator.mapping.MenuMapper;
import com.aplicaciones13.orchestrator.mapping.ModuleMapper;
import com.aplicaciones13.orchestrator.mapping.UserMapper;
import com.aplicaciones13.orchestrator.model.ConfigPermission;
import com.aplicaciones13.orchestrator.model.User;
import com.aplicaciones13.orchestrator.payload.response.MenuResponse;
import com.aplicaciones13.orchestrator.payload.response.ModuleResponse;
import com.aplicaciones13.orchestrator.payload.response.UserResponse;
import com.aplicaciones13.orchestrator.repository.ConfigPermissionRepository;
import com.aplicaciones13.orchestrator.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfigPermissionRepository configPermissionRepository;

    @Transactional
    @Cacheable(value = "structureConfig", key = "#nick")
    public UserResponse findByNick(String nick) {
        User user = userRepository.findByNick(nick);
        UserResponse userResponse = UserMapper.INSTANCE.toResponse(user);
        List<ConfigPermission> permissions = configPermissionRepository.findAllPermissionsByNick(user.getIdUser());
        String module = "module";
        ModuleResponse moduleResponse = new ModuleResponse();
        
        moduleResponse.setMenus(new ArrayList<>());
        permissions = acumularPermisos(permissions);
        userResponse.setModules(new ArrayList<>());
        
        for (ConfigPermission permission : permissions) {
            MenuResponse menuResponse = MenuMapper.INSTANCE.toResponse(permission);
            if (!module.equals(permission.getModuleName())) {
                moduleResponse = ModuleMapper.INSTANCE.toResponse(permission);
                moduleResponse.setMenus(new ArrayList<>());
                userResponse.getModules().add(moduleResponse);
                module = permission.getModuleName();
            }
            moduleResponse.getMenus().add(menuResponse);
        }
        return userResponse;
    }

    /**
     * Acumula los permisos de un mismo menu
     * 
     * @param permissions
     * @return
     */
    private List<ConfigPermission> acumularPermisos(List<ConfigPermission> permissions) {
        int index = -1;
        long idMenu = 0;
        List<ConfigPermission> acumulado = new ArrayList<>();

        for (ConfigPermission permission : permissions) {
            if (idMenu != permission.getIdMenu()) {
                acumulado.add(permission);
                idMenu = permission.getIdMenu();
                index++;
            } else {
                if (permission.getCreate().equals("S")) {
                    acumulado.get(index).setCreate(permission.getCreate());
                }
                if (permission.getUpdate().equals("S")) {
                    acumulado.get(index).setUpdate(permission.getUpdate());
                }
                if (permission.getDelete().equals("S")) {
                    acumulado.get(index).setDelete(permission.getDelete());
                }
                if (permission.getAudit().equals("S")) {
                    acumulado.get(index).setAudit(permission.getAudit());
                }
            }
        }

        return acumulado;
    }
}
