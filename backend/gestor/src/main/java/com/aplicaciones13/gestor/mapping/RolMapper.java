package com.aplicaciones13.gestor_ws.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor_ws.model.Rol;
import com.aplicaciones13.gestor_ws.payload.request.RolRequest;
import com.aplicaciones13.gestor_ws.payload.response.RolResponse;

@Mapper
public interface RolMapper {
    RolMapper INSTANCE = Mappers.getMapper(RolMapper.class);

    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "idRol", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Rol toEntity(RolRequest request);

    RolResponse toResponse(Rol rol);
}
