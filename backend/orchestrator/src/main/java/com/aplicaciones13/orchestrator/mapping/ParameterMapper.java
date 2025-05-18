package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orchestrator.model.Parameter;
import com.aplicaciones13.orchestrator.payload.response.ParameterResponse;

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