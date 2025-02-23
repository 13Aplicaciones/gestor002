package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
}