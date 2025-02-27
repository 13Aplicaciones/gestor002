package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.ConfigPermission;
import com.aplicaciones13.orquestador.payload.response.ModuleResponse;

import java.util.UUID;

@Mapper
public interface ModuleMapper {
    
    default UUID map(String value) {
        return UUID.fromString(value);
    }
    
    ModuleMapper INSTANCE = Mappers.getMapper(ModuleMapper.class);

    @Mapping(target = "uuid", source = "moduleUuid")
    @Mapping(target = "name", source = "moduleName")
    @Mapping(target = "index", source = "moduleIndex")
    @Mapping(target = "context", source = "moduleContext")
    @Mapping(target = "status", source = "moduleStatus")
    ModuleResponse toResponse(ConfigPermission configPermission);
}
