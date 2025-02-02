package com.aplicaciones13.gestor_ws.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor_ws.model.Modulo;
import com.aplicaciones13.gestor_ws.payload.request.ModuloRequest;
import com.aplicaciones13.gestor_ws.payload.response.ModuloListaResponse;
import com.aplicaciones13.gestor_ws.payload.response.ModuloResponse;

@Mapper
public interface ModuloMapper {
    ModuloMapper INSTANCE = Mappers.getMapper(ModuloMapper.class);

    @Mapping(target = "idModulo", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    Modulo toEntity(ModuloRequest request);

    ModuloResponse toResponse(Modulo modulo);

    ModuloListaResponse toListaResponse(Modulo modulo);
}