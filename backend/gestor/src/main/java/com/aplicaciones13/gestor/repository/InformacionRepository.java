package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.Informacion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de la entidad Informacion.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface InformacionRepository extends JpaRepository<Informacion, Long> {
    
    /**
     * Método para buscar una nombre(like) y que sea pageable.
     * 
     * @param nombre
     * @param pageable
     * @return
     */
    @Query("SELECT i FROM Informacion i WHERE (:nombre IS NULL OR upper(i.nombre) LIKE %:nombre%)")
    Page<Informacion> findByNombreContaining(String nombre, Pageable pageable);

    /**
     * Método para buscar una entidad de Error por UUID.
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.informacion WHERE uuid = CAST(?1 AS uuid)", nativeQuery = true)
    Optional<Informacion> findByUuid(String uuid);
}