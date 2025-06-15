package com.aplicaciones13.base.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.base.payload.common.LovResponse;
import com.aplicaciones13.base.model.Lov;

/**
 * Mapper para la entidad ComboItem.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Mapper
public interface LovMapper {
    LovMapper INSTANCE = Mappers.getMapper(LovMapper.class);
   
    LovResponse toResponse(Lov lov);
}