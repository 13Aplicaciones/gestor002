package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.User;
import com.aplicaciones13.orquestador.payload.response.UserResponse;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponse toResponse(User user);
}
