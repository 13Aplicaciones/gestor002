package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.payload.request.TokenEmailRequest;
import com.aplicaciones13.gestor.payload.response.TokenResponse ;
import com.aplicaciones13.gestor.model.Token;

/**
 * Mapeador de errores.
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface TokenMapper {

    TokenMapper INSTANCE = Mappers.getMapper(TokenMapper.class);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "idToken", ignore = true)
    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "socialNick", ignore = true)
    @Mapping(target = "credential", ignore = true)
    @Mapping(target = "type", ignore = true)
    @Mapping(target = "validator", ignore = true)
    Token toEntity(TokenEmailRequest tokenEmailRequest);

    TokenResponse toResponse(Token token);
}