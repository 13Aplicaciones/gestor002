package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.RolUsuario;
import com.aplicaciones13.gestor.payload.request.RolUsuarioRequest;
import com.aplicaciones13.gestor.payload.response.RolUsuarioResponse;

@Mapper
public interface RolUsuarioMapper {
    RolUsuarioMapper INSTANCE = Mappers.getMapper(RolUsuarioMapper.class);

    @Mapping(target = "idRolUsuario", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    RolUsuario toEntity(RolUsuarioRequest request);

    RolUsuarioResponse toResponse(RolUsuario rolUsuario);
}