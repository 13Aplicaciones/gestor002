package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Menu;
import com.aplicaciones13.gestor.payload.request.MenuRequest;
import com.aplicaciones13.gestor.payload.response.MenuResponse;

/**
 * Mapper para la entidad Menu.
 * 
 * @author omargo33
 * @since 2025-07-30
 */
@Mapper
public interface MenuMapper {
    MenuMapper INSTANCE = Mappers.getMapper(MenuMapper.class);

    @Mapping(target = "idMenu", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "idModule", ignore = true)
    Menu toEntity(MenuRequest request);

    @Mapping(target = "uuidModule", source = "module.uuid")
    MenuResponse toResponse(Menu menu);
}
