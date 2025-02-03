package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Module;
import com.aplicaciones13.gestor.payload.request.ModuleRequest;
import com.aplicaciones13.gestor.payload.response.ModuleListaResponse;
import com.aplicaciones13.gestor.payload.response.ModuleResponse;

@Mapper
public interface ModuleMapper {
    ModuleMapper INSTANCE = Mappers.getMapper(ModuleMapper.class);

    @Mapping(target = "idModule", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    Module toEntity(ModuleRequest request);

    ModuleResponse toResponse(Module module);

    ModuleListaResponse toListaResponse(Module module);
}