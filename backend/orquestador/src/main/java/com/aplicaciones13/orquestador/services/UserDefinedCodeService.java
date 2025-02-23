package com.aplicaciones13.orquestador.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orquestador.mapping.UserDefinedCodeMapper;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeGroupResponse;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeResponse;
import com.aplicaciones13.orquestador.repository.UserDefinedCodeRepository;

/**
 * Servicio para la entidad UserDefinedCode.
 * 
 * @author omargo33
 * @since 2025-02-23
 * 
 */
@Service
public class UserDefinedCodeService {

    private static final String MODULE_INDEX_EXCLUDE = "001";

    @Autowired
    private UserDefinedCodeRepository userDefinedCodeRepository;

    /**
     * Busca los códigos definidos por el usuario de un módulo en particular a partir
     * 
     * @param moduleIndex
     * @param group
     * @return
     */
    @Cacheable(value = "userDefinedCode", key = "#moduleIndex")
    public List<UserDefinedCodeGroupResponse> find(String moduleIndex) {
        String group = MODULE_INDEX_EXCLUDE;
        List<UserDefinedCodeGroupResponse> respGroup = new ArrayList<>();

        List<UserDefinedCodeResponse> respList = userDefinedCodeRepository
                .findByModule_IndexAndGroupNotOrderByGroupAscOrderAsc(moduleIndex, MODULE_INDEX_EXCLUDE)
                .stream()
                .map(UserDefinedCodeMapper.INSTANCE::toResponse)
                .collect(Collectors.toList());
        
        for (UserDefinedCodeResponse userDefinedCodeResponse : respList) {
            if (!group.equals(userDefinedCodeResponse.getGroup())) {
                group = userDefinedCodeResponse.getGroup();
                respGroup.add(new UserDefinedCodeGroupResponse(group, new ArrayList<>()));
            }
            respGroup.get(respGroup.size() - 1).getCodes().add(userDefinedCodeResponse);
        }

        return respGroup;
    }
}