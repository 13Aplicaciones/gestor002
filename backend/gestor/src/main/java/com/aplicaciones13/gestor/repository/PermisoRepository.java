package com.aplicaciones13.gestor_ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor_ws.model.Permiso;

@Repository
public interface PermisoRepository extends JpaRepository<Permiso, Long> {
    // Aquí se pueden agregar métodos personalizados si es necesario
}