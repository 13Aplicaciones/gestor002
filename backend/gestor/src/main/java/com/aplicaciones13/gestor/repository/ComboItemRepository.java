package com.aplicaciones13.gestor.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.ComboItem;

/**
 * Repositorio de la entidad ComboItem.
 * 
 * @autor omargo33
 * @since 2025-06-01
 */
@Repository
public interface ComboItemRepository extends JpaRepository<ComboItem, Long> {
    
    /**
     * Método para buscar por nombre (like) y que sea pageable.
     * 
     * @param name nombre a buscar
     * @param pageable configuración de paginación
     * @return página de ítems de combo
     */
    @Query(value = 
                "SELECT * FROM GS_002_01.combo_item ci WHERE (?1 IS NULL OR upper(ci.name) LIKE CONCAT('%', upper(?1), '%'))",
            countQuery = "SELECT COUNT(*) FROM GS_002_01.combo_item ci WHERE (?1 IS NULL OR upper(ci.name) LIKE CONCAT('%', upper(?1), '%'))",
            nativeQuery = true)    
    Page<ComboItem> findByNameContaining(String name, Pageable pageable);

    /**
     * Método para buscar una entidad de ComboItem por UUID.
     * 
     * @param uuid identificador único
     * @return optional con el ítem de combo encontrado
     */
    @Query(value = "SELECT * FROM GS_002_01.combo_item WHERE uuid = ?1", nativeQuery = true)
    Optional<ComboItem> findByUuid(String uuid);

}