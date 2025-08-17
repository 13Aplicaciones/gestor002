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

    /**
     * Método para buscar ítems de combo para un LOV (List of Values) por término de
     * búsqueda.
     * 
     * @param searchTerm término a buscar en label o description
     * @param pageable   configuración de paginación
     * @return página de ítems de combo
     */
    @Query(value = """
                SELECT * from (
            select c.uuid as 'index',
                        c.index_combo as label,
                        m.index_module as label_alternative,
                        concat(c.name, ' (',  m.name, ')' ) as description,
                        c.status as status,
                        0 as value,
                        0 as orden,
                        0 as double_value
                        from module m, combo c
                        where m.id_module = c.id_module
                        AND (?1 IS NULL OR upper(c.index_combo) LIKE CONCAT('%', upper(?1), '%'))
                        AND (?2 IS NULL OR upper(m.index_module) LIKE CONCAT('%', upper(?2), '%'))
                ) AS combined
                """,

            countQuery = """
                    SELECT COUNT(*) FROM (
                    select c.uuid as 'index',
                            c.index_combo as label,
                            m.index_module as label_alternative,
                            concat(c.name, ' (',  m.name, ')' ) as description,
                            c.status as status,
                            0 as value,
                            0 as orden,
                            0 as double_value
                            from module m, combo c
                            where m.id_module = c.id_module
                            AND (?1 IS NULL OR upper(c.index_combo) LIKE CONCAT('%', upper(?1), '%'))
                            AND (?2 IS NULL OR upper(m.index_module) LIKE CONCAT('%', upper(?2), '%'))
                    ) AS combined
                    """, nativeQuery = true)
    Page<Lov> findForLovComboItem(String label, String labelAlternative, Pageable pageable);
    
  

    /**
     * Método para buscar módulos para un LOV (List of Values) por término de
     * búsqueda.
     * 
     * @param label            término a buscar en index_module
     * @param labelAlternative término a buscar en name
     * @param pageable         configuración de paginación
     * @return página de módulos
     */
    @Query(value = """
            select
            	m.uuid as 'index',
            	m.index_module as label,
            	m.name as label_alternative,
            	m.context as description,
            	m.status as status,
            	0 as value,
            	0 as orden,
            	0 as double_value
            from
            	module m
            where
                 (?1 IS NULL OR upper(m.index_module) LIKE CONCAT('%', upper(?1), '%'))
            	 AND (?2 IS NULL OR upper(m.name) LIKE CONCAT('%', upper(?2), '%'))
            """, countQuery = """
            SELECT
                COUNT(*)
            FROM
                module m
            where
                (?1 IS NULL OR upper(m.index_module) LIKE CONCAT('%', upper(?1), '%'))
                AND (?2 IS NULL OR upper(m.name) LIKE CONCAT('%', upper(?2), '%'))
            """, nativeQuery = true)

    Page<Lov> findForLovModule(String label, String labelAlternative, Pageable pageable);

    /**
     * Metodo para buscar la descripción del modulo para un LOV (List of Values)
     * 
     * @param code Codigo generalizado para el modulo que usa el item combo
     * @return
     */
    @Query(value = """
            select m.index_module
            from module m
            where m.uuid = ?1
            """, nativeQuery = true)
    String findForLovModuleDescription(String code);
}