package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Information;
import com.aplicaciones13.gestor.payload.request.InformationRequest;
import com.aplicaciones13.gestor.payload.response.InformationResponse;

/**
 * Mapper para la entidad Information.
 * 
 * @author omargo33
 * @since 2025-01-10
 */
@Mapper
public interface InformationMapper {
    InformationMapper INSTANCE = Mappers.getMapper(InformationMapper.class);

    @Mapping(target = "idInformation", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "user", ignore = true)
    Information toEntity(InformationRequest request);
    
    InformationResponse toResponse(Information information);
}