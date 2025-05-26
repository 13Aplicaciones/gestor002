package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;

import com.aplicaciones13.gestor.model.UserDefinedCode;
import com.aplicaciones13.gestor.payload.request.UserDefinedCodeRequest;
import com.aplicaciones13.gestor.payload.response.UserDefinedCodeResponse;

import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * Mapear de UserDefinedCodeRequest a UserDefinedCode y viceversa.
 * 
 * @autor omargo33
 * @since 2025-05-25
 */
@Mapper
public interface UserDefinedCodeMapper {

    UserDefinedCodeMapper INSTANCE = Mappers.getMapper(UserDefinedCodeMapper.class);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "idModule", ignore = true)
    @Mapping(target = "idUserDefinedCode", ignore = true)
    UserDefinedCode toEntity(UserDefinedCodeRequest userDefinedCodeRequest);

    
    UserDefinedCodeResponse toResponse(UserDefinedCode userDefinedCode);
}
