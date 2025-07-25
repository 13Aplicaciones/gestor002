package com.aplicaciones13.orchestrator.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.aplicaciones13.orchestrator.model.VStatic;
import com.aplicaciones13.orchestrator.payload.response.StaticResponse;


/**
 * Mapper para la entidad Static
 * 
 * @autor omargo33
 * @since 2025-03-03
 */
@Mapper
public interface StaticMapper {
    StaticMapper INSTANCE = Mappers.getMapper(StaticMapper.class);
    
    StaticResponse toResponse(VStatic staticTemp);
}
