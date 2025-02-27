package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.Parameter;
import com.aplicaciones13.orquestador.payload.response.ParameterResponse;

/**
 * Mapper para la entidad Parameter
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface ParameterMapper {
    ParameterMapper INSTANCE = Mappers.getMapper(ParameterMapper.class);

    @Mapping(target = "encryt", ignore = true)
    ParameterResponse toResponse(Parameter parameter);
}