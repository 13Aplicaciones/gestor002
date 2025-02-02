package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio de la entidad Token.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    
    /**
     * Metodo para buscar un token por correo.
     * @param correo
     * @return
     */
    Optional<Token> findByCorreo(String correo);
        
    /**
     * Metodo para buscar un token por socialNick.
     * 
     * @param socialNick
     * @return
     */
    Optional<Token> findBySocialNick(String socialNick);
    
    /**
     * Metodo para buscar un token por idUsuario.
     * 
     * @param idUsuario
     * @return
     */
    List<Token> findByIdUsuario(Long idUsuario);
}