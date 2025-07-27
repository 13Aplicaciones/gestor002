package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.orchestrator.model.Combo;
import com.aplicaciones13.orchestrator.payload.response.ComboResponse;


@Mapper
public interface ComboMapper {
    ComboMapper INSTANCE = Mappers.getMapper(ComboMapper.class);

    ComboResponse toResponse(Combo combo);
}
