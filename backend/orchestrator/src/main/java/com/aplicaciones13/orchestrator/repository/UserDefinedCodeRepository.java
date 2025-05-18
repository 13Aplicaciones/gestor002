package com.aplicaciones13.orchestrator.repository;

import com.aplicaciones13.orchestrator.model.UserDefinedCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de User Defined Code
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-02-26
 */
@Repository
public interface UserDefinedCodeRepository extends JpaRepository<UserDefinedCode, Long> {
    List<UserDefinedCode> findByModule_IndexModuleAndGroupNotOrderByGroupAscOrderAsc(String moduleIndex, String group);
}