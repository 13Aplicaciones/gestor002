package com.aplicaciones13.gestor_ws.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor_ws.model.CodigoDefinidoUsuario;

/**
 * Repositorio de la entidad CodigoDefinidoUsuario.
 * 
 * @author omargo33
 * @since 2025-01-26
 * 
 */
@Repository
public interface CodigoDefinidoUsuarioRepository extends JpaRepository<CodigoDefinidoUsuario, Long> {
    
    /**
     * Metodo para buscar la lista de resgistros que tengan el campo grupo
     * 
     * @param grupo
     * @return
     */
    List<CodigoDefinidoUsuario> findByGrupo(String grupo);

    /**
     * Metodo para buscar por idCodigoDefinidoUsuario.
     * 
     * @param idCodigoDefinidoUsuario
     */
    Optional<CodigoDefinidoUsuario> findByIdCodigoDefinidoUsuario(long idCodigoDefinidoUsuario);
}