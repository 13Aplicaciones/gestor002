package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.Combo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de la entidad Combo.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface ComboRepository extends JpaRepository<Combo, Long> {

    /**
     * Método para buscar un combo por su nombre (like) y que sea pageable.
     * 
     * @param name
     * @param pageable
     * @return
     */
    @Query(value = """
            SELECT * FROM GS_002_01.combo c WHERE
            c.status <> 'E' AND c.id_module = ?1 AND
            (?2 IS NULL OR upper(c.name) LIKE CONCAT('%', upper(?2), '%'))
            """, countQuery = """
            SELECT COUNT(*) FROM GS_002_01.combo c WHERE
            c.status <> 'E' AND c.id_module = ?1 AND
            (?2 IS NULL OR upper(c.name) LIKE CONCAT('%', upper(?2), '%'))
            """, nativeQuery = true)
    Page<Combo> findByIdModuleNameContaining(Long idModule, String name, Pageable pageable);

    /**
     * Método para buscar un combo por UUID.
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM combo WHERE uuid = ?1", nativeQuery = true)
    Optional<Combo> findByUuid(String uuid);

    /**
     * Método para buscar de manera logica un combo por su UUID, cambiando el estado
     * a 'E' (eliminado).
     * 
     * @param uuid
     * @return
     */
    @Modifying
    @Query(value = "UPDATE combo SET status = 'E' WHERE uuid = ?1", nativeQuery = true)
    void deleteByUuid(String uuid);

}