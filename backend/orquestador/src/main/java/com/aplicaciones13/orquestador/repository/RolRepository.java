package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
}