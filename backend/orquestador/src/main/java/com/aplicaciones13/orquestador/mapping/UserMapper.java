package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.User;
import com.aplicaciones13.orquestador.payload.response.UserResponse;

/**
 * Mapper para la entidad User
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "modules", ignore = true)
    UserResponse toResponse(User user);
}
