package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.Combo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de la entidad Combo.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface ComboRepository extends JpaRepository<Combo, Long> {
    
    /**
     * Método para buscar un combo por su nombre (like) y que sea pageable.
     * 
     * @param name
     * @param pageable
     * @return
     */
    @Query(value = 
                "SELECT * FROM GS_002_01.combo c WHERE (?1 IS NULL OR upper(c.name) LIKE CONCAT('%', upper(?1), '%'))",
            countQuery = "SELECT COUNT(*) FROM GS_002_01.combo c WHERE (?1 IS NULL OR upper(c.name) LIKE CONCAT('%', upper(?1), '%'))",
            nativeQuery = true)    
    Page<Combo> findByNameContaining(String name, Pageable pageable);

    /**
     * Método para buscar un combo por UUID.
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM combo WHERE uuid = ?1", nativeQuery = true)
    Optional<Combo> findByUuid(String uuid);
}