package com.aplicaciones13.gestor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.Permissions;

/**
 * Repositorio de Permissions
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-07-29
 */
@Repository
public interface PermissionsRepository extends JpaRepository<Permissions, Long> {


    Optional<Permissions> findByUuid(String uuid);

    Optional<Permissions> findByIdPermissions(Long idPermissions);

    List<Permissions> findByIdMenu(Long idMenu);

    List<Permissions> findByRealmAndClientIdAndRole(String realm, String clientId, String role);

}