package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Rol;
import com.aplicaciones13.gestor.payload.request.RolRequest;
import com.aplicaciones13.gestor.payload.response.RolResponse;

@Mapper
public interface RolMapper {
    RolMapper INSTANCE = Mappers.getMapper(RolMapper.class);

    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "idRol", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "user", ignore = true)
    Rol toEntity(RolRequest request);

    RolResponse toResponse(Rol rol);
}
