package com.aplicaciones13.gestor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.UserDefinedCode;

/**
 * Repositorio de la entidad UserDefinedCode.
 * 
 * @author omargo33
 * @since 2025-01-26
 * 
 */
@Repository
public interface UserDefinedCodeRepository extends JpaRepository<UserDefinedCode, Long> {

    /**
     * Metodo para buscar la lista de resgistros que tengan el campo grupo
     * 
     * @param group
     * @return
     */
    List<UserDefinedCode> findByGroup(String group);

    /**
     * Metodo para buscar por idUserDefinedCode.
     * 
     * @param idUserDefinedCode
     */
    Optional<UserDefinedCode> findByIdUserDefinedCode(long idUserDefinedCode);

    /**
     * Metodo para buscar por paginado por con query personalizado
     * 
     * @param idModule
     * @param group
     * @param name
     * @param description
     * @param pageable
     * @return
     */
    @Query(value = 
                "SELECT * FROM GS_002_01.user_defined_code u WHERE u.id_module = ?1 AND (?2 IS NULL OR UPPER(u.group) LIKE CONCAT('%', UPPER(?2), '%')) AND (?3 IS NULL OR UPPER(u.name) LIKE CONCAT('%', UPPER(?3), '%')) AND (?4 IS NULL OR UPPER(u.description) LIKE CONCAT('%', UPPER(?4), '%'))",
            countQuery = "SELECT count(*) FROM GS_002_01.user_defined_code u WHERE u.id_module = ?1 AND (?2 IS NULL OR UPPER(u.group) LIKE CONCAT('%', UPPER(?2), '%')) AND (?3 IS NULL OR UPPER(u.name) LIKE CONCAT('%', UPPER(?3), '%')) AND (?4 IS NULL OR UPPER(u.description) LIKE CONCAT('%', UPPER(?4), '%'))",
            nativeQuery = true)
    Page<UserDefinedCode> paginated(Long idModule, String group, String name, String description, Pageable pageable);
}