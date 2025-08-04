package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.ComboItem;
import com.aplicaciones13.gestor.payload.request.ComboItemRequest;
import com.aplicaciones13.gestor.payload.response.ComboItemResponse;

/**
 * Mapper para la entidad ComboItem.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Mapper
public interface ComboItemMapper {
    ComboItemMapper INSTANCE = Mappers.getMapper(ComboItemMapper.class);

    @Mapping(target = "idComboItem", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "idCombo", ignore = true)
    ComboItem toEntity(ComboItemRequest request);

    ComboItemResponse toResponse(ComboItem comboItem);
}