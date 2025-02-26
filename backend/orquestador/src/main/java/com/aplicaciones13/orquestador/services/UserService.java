package com.aplicaciones13.orquestador.services;

import java.io.ObjectInputFilter.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orquestador.mapping.UserMapper;
import com.aplicaciones13.orquestador.model.User;
import com.aplicaciones13.orquestador.payload.response.UserResponse;
import com.aplicaciones13.orquestador.repository.ConfigPermissionRepository;
import com.aplicaciones13.orquestador.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfigPermissionRepository configPermissionRepository;

    @Transactional
    public UserResponse findByNick(String nick) {
        UserResponse userResponse = new UserResponse();
        User user = userRepository.findByNick("7715369");
        userResponse = UserMapper.INSTANCE.toResponse(user);

        configPermissionRepository.findAllPermissionsByNick(nick).forEach(configPermission -> {
            log.info("configPermission: {}", configPermission);
        });

        return userResponse;
    }
}
