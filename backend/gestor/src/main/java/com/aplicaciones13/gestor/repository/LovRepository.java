package com.aplicaciones13.gestor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.base.model.Lov;

/**
 * Repositorio de la entidad Lov.
 * 
 * @autor omargo33
 * @since 2025-06-01
 */
@Repository
public interface LovRepository extends JpaRepository<Lov, String> {

    String COMBO_ITEM_BASE = "select c.uuid as 'index', "
            + "c.index_combo as label, "
            + "m.index_module as label_alternative, "
            + "concat(c.name, ' (',  m.name, ')' ) as description, "
            + "c.status as status, "
            + "0 as value, "
            + "0 as orden, "
            + "0 as double_value "
            + "from module m, combo c "
            + "where m.id_module = c.id_module "
            + "AND (?1 IS NULL OR upper(c.index_combo) LIKE CONCAT('%', upper(?1), '%')) "
            + "AND (?2 IS NULL OR upper(m.index_module) LIKE CONCAT('%', upper(?2), '%'))";
    String COMBO_ITEM_QUERY = "SELECT * from ( " + COMBO_ITEM_BASE + " ) AS combined";
    String COMBO_ITEM_COUNT = "SELECT COUNT(*) FROM (" + COMBO_ITEM_BASE + ") AS combined";

    /**
     * Método para buscar ítems de combo para un LOV (List of Values) por término de
     * búsqueda.
     * 
     * @param searchTerm término a buscar en label o description
     * @param pageable   configuración de paginación
     * @return página de ítems de combo
     */
    @Query(value = COMBO_ITEM_QUERY, countQuery = COMBO_ITEM_COUNT, nativeQuery = true)
    Page<Lov> findForLovComboItem(String label, String labelAlternative, Pageable pageable);
}