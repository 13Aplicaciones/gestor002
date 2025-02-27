package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de User
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 2025-02-26
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Método que permite buscar un usuario por su nick.
     * 
     */
    User findByNick(String nick);
}