package com.aplicaciones13.gestor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
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
}