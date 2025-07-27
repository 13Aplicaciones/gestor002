package com.aplicaciones13.orchestrator.repository;

import com.aplicaciones13.orchestrator.model.Module;

import java.util.Optional;

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

    /**
     * Metodo para encontrar module desde el indexModule
     * 
     * @param indexModule el identificador del module
     * @return un Optional que contiene el Module si se encuentra, o vacío si no
     */
    public Optional<Module> findByIndexModule(String indexModule);

}