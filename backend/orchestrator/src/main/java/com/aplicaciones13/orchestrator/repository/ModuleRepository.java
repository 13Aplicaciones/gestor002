package com.aplicaciones13.orchestrator.repository;

import com.aplicaciones13.orchestrator.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de Module
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-02-26
 */
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
}