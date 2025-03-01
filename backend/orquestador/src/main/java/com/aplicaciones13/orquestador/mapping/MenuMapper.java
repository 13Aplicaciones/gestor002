package com.aplicaciones13.orquestador.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orquestador.model.ConfigPermission;
import com.aplicaciones13.orquestador.payload.response.MenuResponse;

/**
 * Mapper para la entidad Menu
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface MenuMapper {
    MenuMapper INSTANCE = Mappers.getMapper(MenuMapper.class);
    
    @Mapping(target = "index", source = "menuIndex")
    @Mapping(target = "name", source = "menuName")
    @Mapping(target = "type", source = "menuType")
    @Mapping(target = "taskFlow", source = "menuTaskFlow")
    @Mapping(target = "status", source = "menuStatus")
    @Mapping(target = "order", source = "menuOrden") 
    @Mapping(target = "icon", source = "menuIcon")    
    @Mapping(target = "create", source = "create")
    @Mapping(target = "update", source = "update")
    @Mapping(target = "delete", source = "delete")
    @Mapping(target = "audit", source = "audit")
    MenuResponse toResponse(ConfigPermission configPermission);
}
