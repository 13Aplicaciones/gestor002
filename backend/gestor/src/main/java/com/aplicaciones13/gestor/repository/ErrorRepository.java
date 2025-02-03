package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.Error;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de la entidad Error.
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Repository
public interface ErrorRepository extends JpaRepository<Error, Long> {

    /**
     * Metodo para buscar una por index(like) y/o mensaje(like) y que sea pageable.
     * 
     * @param index
     * @param mensaje
     * @param pageable
     * @return
     */
    @Query("SELECT e FROM Error e WHERE (:index IS NULL OR upper(e.index) LIKE %:index%) AND (:message IS NULL OR upper(e.message) LIKE %:message%)")
    Page<Error> findByIndexContaining(String index, String message, Pageable pageable);

    /**
     * Método para buscar una entidad de Error por index.
     * 
     * @param index
     * @return
     */
    Optional<Error> findByIndex(String index);

    /**
     * Método para buscar una entidad de Error por UUID.
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.error WHERE uuid = ?1", nativeQuery = true)
    Optional<Error> findByUuid(String uuid);

    /**
     * Método para buscar una entidad de Error por id.
     * 
     * @param id
     * @return
     */
    Optional<Error> findByIdError(long id);
}