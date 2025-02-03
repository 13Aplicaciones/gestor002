package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.Module;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    /**
     * Metodo para buscar un module por su indice, name y status sea diferente de
     * X y este paginado
     * 
     * @param uuid
     * @return
     */
    @Query("SELECT m FROM Module m WHERE (:indice IS NULL OR upper(m.indice) LIKE %:indice%) AND (:name IS NULL OR upper(m.name) LIKE %:name%) AND (:estado IS NULL OR upper(m.estado) LIKE %:estado%)")
    Page<Module> paginado(String indice, String name, String status, Pageable pageable);


    /**
     * Método para buscar un module de lista de modules diferente de X y orderados por indice y por name
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.module WHERE status != 'X' ORDER BY indice, name", nativeQuery = true)
    List<Module> findAll();

    /**
     * Método para buscar un module por su UUID y status sea diferente de X
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.module WHERE uuid = ?1 and status != 'X'", nativeQuery = true)
    Optional<Module> findByUuid(String uuid);

    /**
     * Método para buscar un module por su indice y status sea diferente de X
     * 
     * @param indice
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.module WHERE indice = ?1 and status != 'X'", nativeQuery = true)
    Optional<Module> findByIndex(String indice);
}