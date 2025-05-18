package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orchestrator.model.UserDefinedCode;
import com.aplicaciones13.orchestrator.payload.response.UserDefinedCodeResponse;

/**
 * Mapper para la entidad UserDefinedCode
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface UserDefinedCodeMapper {
    UserDefinedCodeMapper INSTANCE = Mappers.getMapper(UserDefinedCodeMapper.class);

    UserDefinedCodeResponse toResponse(UserDefinedCode userDefinedCode);
}