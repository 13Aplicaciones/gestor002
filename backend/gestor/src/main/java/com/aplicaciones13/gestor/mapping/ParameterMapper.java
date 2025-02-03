package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Parameter;
import com.aplicaciones13.gestor.payload.request.ParameterRequest;
import com.aplicaciones13.gestor.payload.response.ParameterResponse;

@Mapper
public interface ParameterMapper {
    ParameterMapper INSTANCE = Mappers.getMapper(ParameterMapper.class);

    @Mapping(target = "idParameter", ignore = true)
    @Mapping(target = "idModule", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "user", ignore = true)
    Parameter toEntity(ParameterRequest request);

    ParameterResponse toResponse(Parameter parameter);
}