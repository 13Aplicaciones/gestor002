package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.payload.request.ErrorRequest;
import com.aplicaciones13.gestor.payload.response.ErrorResponse;
import com.aplicaciones13.gestor.model.Error;

/**
 * Mapeador de errores.
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface ErrorMapper {
    ErrorMapper INSTANCE = Mappers.getMapper(ErrorMapper.class);

    @Mapping(target = "idError", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid",  ignore = true)
    @Mapping(target = "user", ignore = true)
    Error toEntity(ErrorRequest errorRequest);

    ErrorResponse toResponse(Error error);
}