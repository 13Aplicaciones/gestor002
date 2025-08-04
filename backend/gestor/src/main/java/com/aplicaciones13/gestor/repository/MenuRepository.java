package com.aplicaciones13.gestor.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.Menu;
import java.util.List;


/**
 * Repositorio para gestionar los menús de la aplicación.
 * Proporciona métodos para buscar menús por UUID, índice único (indexMenu) y por idModule.
 * 
 * @author omargo33
 * @since 2025-08-02
 */
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    /**
     * Metodo para buscar un menú por su UUID que su estado sea distinto de "X" (borrado).
     * 
     * @param uuid UUID del menú
     * @return
     */
    @Query("SELECT m FROM Menu m WHERE m.uuid = :uuid AND m.status <> 'X'")
    Optional<Menu> findByUuid(String uuid);

    /**
     * Metodo para buscar un menú por su índice único (indexMenu) que su estado sea distinto de "X" (borrado).
     * 
     * @param indexMenu index único del menú
     * @return
     */
    @Query("SELECT m FROM Menu m WHERE m.indexMenu = :indexMenu AND m.status <> 'X'")
    Optional<Menu> findByIndexMenu(String indexMenu);

    /**
     * Metodo para buscar un menú por su idModule que su estado sea distinto de "X" (borrado).
     * 
     * @param idModule ID del módulo al que pertenece el menú
     * @param indexMenu índice único del menú (opcional)
     * @param name nombre del menú (opcional)
     * @param pageable objeto Pageable para la paginación de resultados
     * @return paginación de menús
     */
    @Query(value = """
            SELECT m.* FROM menu m WHERE 
            m.id_module = :idModule AND 
            m.status <> 'X' AND
            (:indexMenu IS NULL OR UPPER(m.index_menu) LIKE CONCAT('%', UPPER(:indexMenu), '%')) AND
            (:name IS NULL OR UPPER(m.name) LIKE CONCAT('%', UPPER(:name), '%'))
            order by m.orden
            """, countQuery = """
            SELECT COUNT(m.*) FROM menu m WHERE 
            m.id_module = :idModule AND 
            m.status <> 'X' AND
            (:indexMenu IS NULL OR UPPER(m.index_menu) LIKE CONCAT('%', UPPER(:indexMenu), '%')) AND
            (:name IS NULL OR UPPER(m.name) LIKE CONCAT('%', UPPER(:name), '%'))
            """, nativeQuery = true)
    Page<Menu> paginado(Long idModule, String indexMenu, String name,  Pageable pageable);

    /**
     * Metodo para buscar los menus por idModule que su estado sea distinto de "X" (borrado).
     * 
     * @param idModule
     * @return
     */
    @Query("SELECT m FROM Menu m WHERE m.idModule = :idModule AND m.status <> 'X' ORDER BY m.order, m.name")
    Optional<List<Menu>> findByIdModule(Long idModule);

    /**
     * Metodo para buscar el maximo orden de los menús de un módulo.
     * 
     */
    @Query("SELECT COALESCE(MAX(m.order), 0) FROM Menu m WHERE m.idModule = :idModule AND m.status <> 'X'")
    Long findMaxOrderByModule(Long idModule);
}