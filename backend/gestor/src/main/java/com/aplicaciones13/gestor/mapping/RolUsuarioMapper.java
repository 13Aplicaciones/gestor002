package com.aplicaciones13.gestor_ws.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor_ws.model.RolUsuario;
import com.aplicaciones13.gestor_ws.payload.request.RolUsuarioRequest;
import com.aplicaciones13.gestor_ws.payload.response.RolUsuarioResponse;

@Mapper
public interface RolUsuarioMapper {
    RolUsuarioMapper INSTANCE = Mappers.getMapper(RolUsuarioMapper.class);

    @Mapping(target = "idRolUsuario", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    RolUsuario toEntity(RolUsuarioRequest request);

    RolUsuarioResponse toResponse(RolUsuario rolUsuario);
}