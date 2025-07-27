package com.aplicaciones13.orchestrator.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orchestrator.mapping.ParameterMapper;
import com.aplicaciones13.orchestrator.model.Parameter;
import com.aplicaciones13.orchestrator.payload.response.ParameterResponse;
import com.aplicaciones13.orchestrator.repository.ParameterRepository;

@Service
public class ParameterService {

    private final ParameterRepository parameterRepository;

    /**
     * Constructor del servicio de parámetros.
     * 
     * @param parameterRepository Repositorio de parámetros
     * 
     */
    public ParameterService(ParameterRepository parameterRepository) {
        this.parameterRepository = parameterRepository;
    }

    /**
     * Busca los parámetros de un módulo en particular a partir del índice del
     * módulo.
     *
     * @param moduleIndex el índice del módulo
     * @return una lista de parámetros asociados al módulo
     */
    @Cacheable(value = "parameters", key = "#moduleIndex")
    public List<ParameterResponse> findParametersByModule_IndexModule(String moduleIndex) {
        List<Parameter> resp = parameterRepository.findByModule_IndexModule(moduleIndex);

        return resp.stream()
                .map(ParameterMapper.INSTANCE::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Busca un parámetro a partir de su índice y el índice del módulo al que pertenece.
     * 
     * @param index
     * @param moduleIndex
     * @return
     */
    @Cacheable(value = "parameters", key = "{#indexParameter, #indexModule}")
    public ParameterResponse findParameterByIndexParameterAndModule_IndexModule(String indexParameter, String indexModule) {
        Parameter resp = parameterRepository.findByIndexParameterAndModule_IndexModule(indexParameter, indexModule);
        return ParameterMapper.INSTANCE.toResponse(resp);
    }
}