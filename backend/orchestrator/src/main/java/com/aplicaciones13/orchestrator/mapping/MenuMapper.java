package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orchestrator.model.VConfigPermission;
import com.aplicaciones13.orchestrator.payload.response.MenuResponse;

/**
 * Mapper para la entidad Menu
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Mapper
public interface MenuMapper {
    MenuMapper INSTANCE = Mappers.getMapper(MenuMapper.class);

    @Mapping(target = "indexMenu", source = "menuIndex")
    @Mapping(target = "name", source = "menuName")
    @Mapping(target = "type", source = "menuType")
    @Mapping(target = "taskFlow", source = "menuTaskFlow")
    @Mapping(target = "status", source = "menuStatus")
    @Mapping(target = "order", source = "menuOrden")
    @Mapping(target = "create", source = "create")
    @Mapping(target = "update", source = "update")
    @Mapping(target = "delete", source = "delete")
    @Mapping(target = "audit", source = "audit")
    MenuResponse toResponse(VConfigPermission configPermission);
}
