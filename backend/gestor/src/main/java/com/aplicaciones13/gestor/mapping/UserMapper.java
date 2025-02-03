package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.request.UserRequest;
import com.aplicaciones13.gestor.payload.response.UserResponse;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "incomeDate", ignore = true)
    @Mapping(target = "incomeCounter", ignore = true)
    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "user", ignore = true)
    User toEntity(UserRequest request);

    UserResponse toResponse(User user);
}