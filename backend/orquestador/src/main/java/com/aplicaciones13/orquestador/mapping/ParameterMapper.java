package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.Parameter;
import com.aplicaciones13.orquestador.payload.response.ParameterResponse;

@Mapper
public interface ParameterMapper {
    ParameterMapper INSTANCE = Mappers.getMapper(ParameterMapper.class);

    ParameterResponse toResponse(Parameter parameter);
}