package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.ConfigPermission;
import com.aplicaciones13.orquestador.payload.response.ModuleResponse;

import java.util.UUID;

/**
 * Mapper para la entidad Module
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface ModuleMapper {
    
    ModuleMapper INSTANCE = Mappers.getMapper(ModuleMapper.class);

    @Mapping(target = "uuid", source = "moduleUuid")
    @Mapping(target = "name", source = "moduleName")
    @Mapping(target = "indexModule", source = "moduleIndex")
    @Mapping(target = "context", source = "moduleContext")
    @Mapping(target = "status", source = "moduleStatus")
    ModuleResponse toResponse(ConfigPermission configPermission);
}
