package com.aplicaciones13.orchestrator.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.orchestrator.model.Combo;

/**
 * Repositorio de Combo
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-07-26
 */
@Repository
public interface ComboRepository extends JpaRepository<Combo, Long> {

    /**
     * Metodo para encontrar combo desde el idModule
     * 
     * @param idModule el identificador del module
     * @return
     */
     List<Optional<Combo>> findByIdModule(Long idModule);

}
