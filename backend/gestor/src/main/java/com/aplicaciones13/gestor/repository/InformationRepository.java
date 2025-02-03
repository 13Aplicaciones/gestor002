package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.Information;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de la entidad Information.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface InformationRepository extends JpaRepository<Information, Long> {
    
    /**
     * Método para buscar una name(like) y que sea pageable.
     * 
     * @param name
     * @param pageable
     * @return
     */
    @Query("SELECT i FROM Information i WHERE (:name IS NULL OR upper(i.name) LIKE %:name%)")
    Page<Information> findByNameContaining(String name, Pageable pageable);

    /**
     * Método para buscar una entidad de Error por UUID.
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.information WHERE uuid = ?1", nativeQuery = true)
    Optional<Information> findByUuid(String uuid);
}