package com.aplicaciones13.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.Permission;


@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    // Aquí se pueden agregar métodos personalizados si es necesario
}