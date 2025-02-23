package com.aplicaciones13.orquestador.services;

import com.aplicaciones13.orquestador.mapping.ParameterMapper;
import com.aplicaciones13.orquestador.model.Parameter;
import com.aplicaciones13.orquestador.payload.response.ParameterResponse;
import com.aplicaciones13.orquestador.repository.ParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParameterService {

    @Autowired
    private ParameterRepository parameterRepository;

    /**
     * Busca los parámetros de un módulo en particular a partir del índice del módulo.
     *
     * @param moduleIndex el índice del módulo
     * @return una lista de parámetros asociados al módulo
     */
    @Cacheable(value = "parameters", key = "#moduleIndex")
    public List<ParameterResponse> findParametersByModuleIndex(String moduleIndex) {
        List<Parameter> resp =  parameterRepository.findByModule_Index(moduleIndex);
   
        return resp.stream()
               .map(ParameterMapper.INSTANCE::toResponse)
               .collect(Collectors.toList());
        }
}