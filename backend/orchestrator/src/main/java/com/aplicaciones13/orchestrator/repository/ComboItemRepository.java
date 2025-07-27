package com.aplicaciones13.orchestrator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.orchestrator.model.ComboItem;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio de ComboItem
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-07-26
 */
@Repository
public interface ComboItemRepository extends JpaRepository<ComboItem, Long> {

    
    /**
     * Metodo para encontrar ComboItem desde el idCombo
     * 
     * @param idCombo
     * @return
     */
    List<Optional<ComboItem>>  findByIdCombo( Long idCombo);
}
