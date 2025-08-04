package com.aplicaciones13.gestor.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Combo;
import com.aplicaciones13.gestor.payload.request.ComboRequest;
import com.aplicaciones13.gestor.payload.response.ComboResponse;

/**
 * Mapper para la entidad Combo.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Mapper
public interface ComboMapper {
    ComboMapper INSTANCE = Mappers.getMapper(ComboMapper.class);

    @Mapping(target = "idCombo", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "idModule", ignore = true)
    Combo toEntity(ComboRequest request);
    
    ComboResponse toResponse(Combo combo);
}