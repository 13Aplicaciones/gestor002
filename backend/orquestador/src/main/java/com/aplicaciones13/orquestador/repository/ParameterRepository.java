package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Parameter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de Parameter
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-02-26
 */
@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    
    /**
     * Busca los parámetros de un módulo en particular a partir del índice del módulo.
     * 
     * @param moduleIndex
     * @return
     */
    List<Parameter> findByModule_Index(String moduleIndex);


    /**
     * Busca un parámetro a partir de su índice y el índice del módulo al que pertenece.
     * 
     * @param index
     * @param moduleIndex
     * @return
     */
    Parameter findByIndexAndModule_Index(String index, String moduleIndex);
}