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
     * Metodo para buscar un module por su indexModule, name y status sea diferente de
     * X y este paginado
     * 
     * @param uuid
     * @return
     */
    @Query(value = 
                "SELECT * FROM GS_002_01.module m WHERE (?1 IS NULL OR UPPER(m.index_module) LIKE CONCAT('%', UPPER(?1), '%')) AND (?2 IS NULL OR UPPER(m.name) LIKE CONCAT('%', UPPER(?2), '%')) AND (?3 IS NULL OR UPPER(m.status) LIKE CONCAT('%', UPPER(?3), '%')) ",
        countQuery = "SELECT count(*) FROM GS_002_01.module m WHERE (?1 IS NULL OR UPPER(m.index_module) LIKE CONCAT('%', UPPER(?1), '%')) AND (?2 IS NULL OR UPPER(m.name) LIKE CONCAT('%', UPPER(?2), '%')) AND (?3 IS NULL OR UPPER(m.status) LIKE CONCAT('%', UPPER(?3), '%'))",
        nativeQuery = true
    )
    Page<Module> paginado(String indexModule, String name, String status, Pageable pageable);


    /**
     * Método para buscar un module de lista de modules diferente de X y orderados por indexModule y por name
     * 
     * @param uuid
     * @return
     */
    @SuppressWarnings("null")
    @Query(value = "SELECT m.* FROM GS_002_01.module m WHERE status != 'X' ORDER BY m.index_module m.name", nativeQuery = true)
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
     * Método para buscar un module por su indexModule y status sea diferente de X
     * 
     * @param indexModule
     * @return
     */
    @Query(value = "SELECT m.* FROM GS_002_01.module m WHERE m.index_module = ?1 and m.status != 'X'", nativeQuery = true)
    Optional<Module> findByIndexModule(String indexModule);
}