package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Método que permite buscar un usuario por su nick.
     * 
     */
    User findByNick(String nick);
}