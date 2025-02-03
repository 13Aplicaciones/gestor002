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
     * Metodo para buscar un module por su index, name y status sea diferente de
     * X y este paginado
     * 
     * @param uuid
     * @return
     */
    @Query("SELECT m FROM Module m WHERE (:index IS NULL OR upper(m.index) LIKE %:index%) AND (:name IS NULL OR upper(m.name) LIKE %:name%) AND (:status IS NULL OR upper(m.status) LIKE %:status%)")
    Page<Module> paginado(String index, String name, String status, Pageable pageable);


    /**
     * Método para buscar un module de lista de modules diferente de X y orderados por index y por name
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT m.* FROM GS_002_01.module m WHERE status != 'X' ORDER BY m.index, m.name", nativeQuery = true)
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
     * Método para buscar un module por su index y status sea diferente de X
     * 
     * @param index
     * @return
     */
    @Query(value = "SELECT m.* FROM GS_002_01.module m WHERE m.index = ?1 and m.status != 'X'", nativeQuery = true)
    Optional<Module> findByIndex(String index);
}