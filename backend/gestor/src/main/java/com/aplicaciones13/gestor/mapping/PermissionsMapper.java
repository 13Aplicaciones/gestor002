package com.aplicaciones13.gestor.mapping;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicaciones13.gestor.model.Permissions;
import com.aplicaciones13.gestor.payload.request.PermissionsRequest;
import com.aplicaciones13.gestor.payload.response.PermissionsResponse;


/**
 * Mapper para la entidad Permission.
 * 
 * @author omargo33
 * @since 2025-07-29
 */
@Mapper
public interface PermissionsMapper {

    PermissionsMapper INSTANCE = Mappers.getMapper(PermissionsMapper.class);
    
    @Mapping(target = "idPermissions", ignore = true)
    @Mapping(target = "idMenu", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "userDate", ignore = true)
    @Mapping(target = "user", ignore = true)
    Permissions toEntity(PermissionsRequest request);

    PermissionsResponse toResponse(Permissions entity);
}
