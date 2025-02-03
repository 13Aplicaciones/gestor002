package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Usuario;
import com.aplicaciones13.gestor.payload.request.UsuarioRequest;
import com.aplicaciones13.gestor.payload.response.UsuarioResponse;

@Mapper
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    @Mapping(target = "contadorFecha", ignore = true)
    @Mapping(target = "contadorIngreso", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Usuario toEntity(UsuarioRequest request);

    UsuarioResponse toResponse(Usuario usuario);
}