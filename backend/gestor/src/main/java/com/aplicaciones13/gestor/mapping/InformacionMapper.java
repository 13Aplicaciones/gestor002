package com.aplicaciones13.gestor_ws.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor_ws.model.Informacion;
import com.aplicaciones13.gestor_ws.payload.request.InformacionRequest;
import com.aplicaciones13.gestor_ws.payload.response.InformacionResponse;

@Mapper
public interface InformacionMapper {
    InformacionMapper INSTANCE = Mappers.getMapper(InformacionMapper.class);

    @Mapping(target = "idInformacion", ignore = true)
    @Mapping(target = "usuarioFecha", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Informacion toEntity(InformacionRequest request);
    
    InformacionResponse toResponse(Informacion informacion);
}