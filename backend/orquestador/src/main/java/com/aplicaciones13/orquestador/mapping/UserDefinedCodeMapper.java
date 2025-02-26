package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.UserDefinedCode;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeResponse;

@Mapper
public interface UserDefinedCodeMapper {
    UserDefinedCodeMapper INSTANCE = Mappers.getMapper(UserDefinedCodeMapper.class);

    UserDefinedCodeResponse toResponse(UserDefinedCode userDefinedCode);
}