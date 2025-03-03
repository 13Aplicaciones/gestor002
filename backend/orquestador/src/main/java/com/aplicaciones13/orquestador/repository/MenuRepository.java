package com.aplicaciones13.orquestador.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.orquestador.model.Menu;

/**
 * Repositorio de Module
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-02-26
 */
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    /**
     * Metodo para encontrar menu desde el index
     */
    Optional<Menu> findByIndex(String index);

}
