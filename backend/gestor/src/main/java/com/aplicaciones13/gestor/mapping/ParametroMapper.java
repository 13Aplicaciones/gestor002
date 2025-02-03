package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Parametro;
import com.aplicaciones13.gestor.payload.request.ParametroRequest;
import com.aplicaciones13.gestor.payload.response.ParametroResponse;

@Mapper
public interface ParametroMapper {
    ParametroMapper INSTANCE = Mappers.getMapper(ParametroMapper.class);

    @Mapping(target = "idParametro", ignore = true)
    @Mapping(target = "idModulo", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Parametro toEntity(ParametroRequest request);

    ParametroResponse toResponse(Parametro parametro);
}