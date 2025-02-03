package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.RolUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolUserRepository extends JpaRepository<RolUser, Long> {
    // Aquí se pueden agregar métodos personalizados si es necesario
}