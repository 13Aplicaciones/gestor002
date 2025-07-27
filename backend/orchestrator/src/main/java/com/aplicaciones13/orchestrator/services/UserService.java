package com.aplicaciones13.orchestrator.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orchestrator.mapping.ComboMapper;
import com.aplicaciones13.orchestrator.mapping.MenuMapper;
import com.aplicaciones13.orchestrator.mapping.ModuleMapper;
import com.aplicaciones13.orchestrator.mapping.UserMapper;
import com.aplicaciones13.orchestrator.model.User;
import com.aplicaciones13.orchestrator.model.VConfigPermission;
import com.aplicaciones13.orchestrator.payload.response.ComboResponse;
import com.aplicaciones13.orchestrator.payload.response.MenuResponse;
import com.aplicaciones13.orchestrator.payload.response.ModuleResponse;
import com.aplicaciones13.orchestrator.payload.response.UserResponse;
import com.aplicaciones13.orchestrator.repository.ComboRepository;
import com.aplicaciones13.orchestrator.repository.ConfigPermissionRepository;
import com.aplicaciones13.orchestrator.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class UserService {

    private final UserRepository userRepository;

    private final ConfigPermissionRepository configPermissionRepository;

    private final ComboRepository comboRepository;

    /**
     * Constructor del servicio UserService.
     * 
     * @param userRepository             Repositorio de usuarios
     * @param configPermissionRepository Repositorio de permisos de configuración
     */
    public UserService(UserRepository userRepository, ConfigPermissionRepository configPermissionRepository,
            ComboRepository comboRepository) {
        this.userRepository = userRepository;
        this.configPermissionRepository = configPermissionRepository;
        this.comboRepository = comboRepository;
    }

    /**
     * Método que permite buscar un usuario por su nick y obtener su estructura de
     * permisos.
     * 
     * @param nick el nick del usuario
     * @return UserResponse con la estructura de permisos del usuario
     */
    @Transactional
    @Cacheable(value = "structureConfig", key = "#nick")
    public UserResponse findByNick(String nick) {
        String module = "module";
        ModuleResponse moduleResponse = new ModuleResponse();

        User user = userRepository.findByNick(nick);
        UserResponse userResponse = UserMapper.INSTANCE.toResponse(user);
        List<VConfigPermission> permissions = configPermissionRepository.findAllPermissionsByNick(user.getIdUser());

        moduleResponse.setMenus(new ArrayList<>());
        userResponse.setModules(new ArrayList<>());
        moduleResponse.setCombos(new ArrayList<>());

        permissions = accumulatePermissions(permissions);
        for (VConfigPermission permission : permissions) {
            MenuResponse menuResponse = MenuMapper.INSTANCE.toResponse(permission);
            if (!module.equals(permission.getModuleName())) {
                moduleResponse = ModuleMapper.INSTANCE.toResponse(permission);
                moduleResponse.setMenus(new ArrayList<>());
                userResponse.getModules().add(moduleResponse);
                module = permission.getModuleName();

            }
            moduleResponse.getMenus().add(menuResponse); 
        }

        userResponse.getModules().forEach(moduleResp -> {
            moduleResp.setCombos(new ArrayList<>());
            comboRepository.findByIdModule(moduleResp.getIdModule())
                    .forEach(optionalCombo -> optionalCombo.ifPresent(combo -> {
                        ComboResponse comboResponse = ComboMapper.INSTANCE.toResponse(combo);
                        moduleResp.getCombos().add(comboResponse);
                    }));
        });
        return userResponse;
    }

    /**
     * Acumula los permisos de un mismo menu
     * 
     * @param permissions
     * @return
     */
    private List<VConfigPermission>  accumulatePermissions(List<VConfigPermission> permissions) {
        int index = -1;
        long idMenu = 0;
        List<VConfigPermission> accumulated = new ArrayList<>();

        for (VConfigPermission permission : permissions) {
            if (idMenu != permission.getIdMenu()) {
                accumulated.add(permission);
                idMenu = permission.getIdMenu();
                index++;
            } else {
                if (permission.getCreate().equals("S")) {
                    accumulated.get(index).setCreate(permission.getCreate());
                }
                if (permission.getUpdate().equals("S")) {
                    accumulated.get(index).setUpdate(permission.getUpdate());
                }
                if (permission.getDelete().equals("S")) {
                    accumulated.get(index).setDelete(permission.getDelete());
                }
                if (permission.getAudit().equals("S")) {
                    accumulated.get(index).setAudit(permission.getAudit());
                }
            }
        }

        return accumulated;
    }
}
