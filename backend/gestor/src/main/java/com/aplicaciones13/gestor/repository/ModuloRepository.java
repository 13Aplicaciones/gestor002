package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.Modulo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuloRepository extends JpaRepository<Modulo, Long> {

    /**
     * Metodo para buscar un modulo por su indice, nombre y estado sea diferente de
     * X y este paginado
     * 
     * @param uuid
     * @return
     */
    @Query("SELECT m FROM Modulo m WHERE (:indice IS NULL OR upper(m.indice) LIKE %:indice%) AND (:nombre IS NULL OR upper(m.nombre) LIKE %:nombre%) AND (:estado IS NULL OR upper(m.estado) LIKE %:estado%)")
    Page<Modulo> paginado(String indice, String nombre, String estado, Pageable pageable);


    /**
     * Método para buscar un modulo de lista de modulos diferente de X y ordenados por indice y por nombre
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.modulo WHERE estado != 'X' ORDER BY indice, nombre", nativeQuery = true)
    List<Modulo> findAll();

    /**
     * Método para buscar un modulo por su UUID y estado sea diferente de X
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.modulo WHERE uuid = CAST(?1 AS uuid) and estado != 'X'", nativeQuery = true)
    Optional<Modulo> findByUuid(String uuid);

    /**
     * Método para buscar un modulo por su indice y estado sea diferente de X
     * 
     * @param indice
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.modulo WHERE indice = ?1 and estado != 'X'", nativeQuery = true)
    Optional<Modulo> findByIndice(String indice);
}