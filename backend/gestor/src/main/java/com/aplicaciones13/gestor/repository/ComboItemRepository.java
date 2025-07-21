package com.aplicaciones13.gestor.repository;

import java.util.List;
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
     * Método para buscar por índice o etiqueta (like) y que sea pageable.
     * 
     * @param indexComboItem índice del ítem de combo
     * @param label          etiqueta del ítem de combo
     * @param descripcion    descripción del ítem de combo
     * 
     * @return página de ítems de combo
     */
    @Query(value = """
            SELECT * FROM combo_item ci WHERE
                ci.id_combo = COALESCE(?1, 0) and
                (?2 IS NULL OR upper(ci.label) LIKE CONCAT('%', upper(?2), '%')) and
                (?3 IS NULL OR upper(ci.description) LIKE CONCAT('%', upper(?3), '%'))
                """, countQuery = """
            SELECT COUNT(*) FROM combo_item ci WHERE
                ci.id_combo = COALESCE(?1, 0) and
                (?2 IS NULL OR upper(ci.label) LIKE CONCAT('%', upper(?2), '%')) and
                (?3 IS NULL OR upper(ci.description) LIKE CONCAT('%', upper(?3), '%'))
                """, nativeQuery = true)
    Page<ComboItem> findByIndexOrLabelOrDescriptionContaining(Long idCombo, String label, String description,
            Pageable pageable);

    /**
     * Método para buscar ítems de combo para un LOV (List of Values) por término de
     * búsqueda.
     * 
     * @param searchTerm término a buscar en label o description
     * @param pageable   configuración de paginación
     * @return página de ítems de combo
     */
    @Query(value = """
                SELECT * FROM combo_item ci WHERE (?1 IS NULL OR upper(ci.label) LIKE CONCAT('%', upper(?1), '%'))
                UNION ALL
                SELECT * FROM combo_item ci WHERE (?1 IS NULL OR upper(ci.description) LIKE CONCAT('%', upper(?1), '%'))
            """, countQuery = """
            SELECT COUNT(*) FROM (
                SELECT * FROM combo_item ci WHERE (?1 IS NULL OR upper(ci.label) LIKE CONCAT('%', upper(?1), '%'))
                UNION ALL
                SELECT * FROM combo_item ci WHERE (?1 IS NULL OR upper(ci.description) LIKE CONCAT('%', upper(?1), '%'))
            ) AS combined
            """, nativeQuery = true)
    Page<ComboItem> findForLov(String searchTerm, Pageable pageable);

    /**
     * Método para buscar una entidad de ComboItem por UUID.
     * 
     * @param uuid identificador único
     * @return optional con el ítem de combo encontrado
     */
    @Query(value = "SELECT * FROM combo_item WHERE uuid = ?1", nativeQuery = true)
    Optional<ComboItem> findByUuid(String uuid);

    /**
     * Método para buscar ítems de combo por ID de combo.
     * 
     * @param idCombo  ID del combo
     * @param pageable configuración de paginación
     * @return página de ítems de combo
     */
    @Query(value = "SELECT * FROM combo_item WHERE id_combo = ?1 ORDER BY orden ASC", nativeQuery = true)
    Page<ComboItem> findByIdCombo(Long idCombo, Pageable pageable);



    /**
     * Metodo para buscar todos los items del mismo id_codigo ordnados por orden
     */
    @Query(value = "SELECT * FROM combo_item WHERE id_combo = ?1 ORDER BY orden ASC", nativeQuery = true)
    Optional<List<ComboItem>> findByIdCombo(Long idCombo);

}