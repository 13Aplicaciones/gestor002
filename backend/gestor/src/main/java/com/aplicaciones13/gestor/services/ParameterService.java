package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.ParameterMapper;
import com.aplicaciones13.gestor.model.Parameter;
import com.aplicaciones13.gestor.payload.request.ParameterRequest;
import com.aplicaciones13.gestor.payload.response.ParameterResponse;
import com.aplicaciones13.gestor.repository.ParameterRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class ParameterService {

    @Autowired
    private ParameterRepository parameterRepository;

    public ParameterResponse findByIndex(String index) {
        return parameterRepository.findByIndex(index)
                .map(ParameterMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Parameter no encontrado", HttpStatus.NOT_FOUND));
    }

    @InvokeUser
    public ParameterResponse create(ParameterRequest parameterRequest) {
        Parameter parameter = ParameterMapper.INSTANCE.toEntity(parameterRequest);
        validateUniqueIndex(parameter.getIndex());
        parameter = parameterRepository.saveAndFlush(parameter);
        return ParameterMapper.INSTANCE.toResponse(parameter);
    }

    @InvokeUser
    public ParameterResponse update(String index, ParameterRequest parameterRequest) {
        validateUniqueIndex(parameterRequest.getIndex());

        Parameter parameter = parameterRepository.findByIndex(index)
                .orElseThrow(() -> new ResourceHttpStatusException("Parameter no encontrado", HttpStatus.NOT_FOUND));

        parameter.setIndex(parameterRequest.getIndex());
        parameter.setEncrypted(parameterRequest.getEncrypted());
        parameter.setName(parameterRequest.getName());
        parameter.setDescription(parameterRequest.getDescription());
        parameter.setValueText01(parameterRequest.getValueText01());
        parameter.setValueText02(parameterRequest.getValueText02());
        parameter.setValueNumber01(parameterRequest.getValueNumber01());
        parameter.setValueNumber02(parameterRequest.getValueNumber02());
        parameter.setDefaultText01(parameterRequest.getDefaultText01());
        parameter.setDefaultText02(parameterRequest.getDefaultText02());
        parameter.setDefaultNumber01(parameterRequest.getDefaultNumber01());
        parameter.setDefaultNumber02(parameterRequest.getDefaultNumber02());
        parameter.setUserApp(parameterRequest.getUserApp());
        parameter = parameterRepository.saveAndFlush(parameter);
        return ParameterMapper.INSTANCE.toResponse(parameter);
    }

    public void delete(String index) {
        Parameter parameter = parameterRepository.findByIndex(index)
                .orElseThrow(() -> new ResourceHttpStatusException("Parameter no encontrado", HttpStatus.NOT_FOUND));

        parameterRepository.delete(parameter);
    }

    private void validateUniqueIndex(String index) {
        if (parameterRepository.findByIndex(index).isPresent()) {
            throw new DataIntegrityViolationException("El index ya existe");
        }
    }
}