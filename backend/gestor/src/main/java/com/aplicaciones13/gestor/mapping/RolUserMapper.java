package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.RolUser;
import com.aplicaciones13.gestor.payload.request.RolUserRequest;
import com.aplicaciones13.gestor.payload.response.RolUserResponse;

@Mapper
public interface RolUserMapper {
    RolUserMapper INSTANCE = Mappers.getMapper(RolUserMapper.class);

    @Mapping(target = "idRolUser", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "user", ignore = true)
    RolUser toEntity(RolUserRequest request);

    RolUserResponse toResponse(RolUser roluser);
}