package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.RolUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolUsuarioRepository extends JpaRepository<RolUsuario, Long> {
    // Aquí se pueden agregar métodos personalizados si es necesario
}