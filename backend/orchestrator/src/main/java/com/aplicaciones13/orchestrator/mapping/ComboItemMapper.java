package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orchestrator.model.ComboItem;
import com.aplicaciones13.orchestrator.payload.response.ComboItemResponse;

@Mapper
public interface ComboItemMapper {
    ComboItemMapper INSTANCE = Mappers.getMapper(ComboItemMapper.class);

    ComboItemResponse toResponse(ComboItem comboItem);
}
