package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;

/**
 * Repositorio de la entidad Usuario.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Metodo para buscar un usuario por su nick, nombre, apellido, estado y la
     * fecha tenga un rango y estado sea parte de la busqueda.
     * 
     * @param nick
     * @param nombre
     * @param apellido
     * @param estado
     * @param usuarioFechaInicio
     * @param usuarioFechaFin
     * @param pageable
     * @return
     */
    @Query("SELECT u FROM Usuario u WHERE (:nick IS NULL OR upper(u.nick) LIKE %:nick%) AND (:nombre IS NULL OR upper(u.nombre) LIKE %:nombre%) AND (:apellido IS NULL OR upper(u.apellido) LIKE %:apellido%) AND (:estado IS NULL OR upper(u.estado) LIKE %:estado%) AND (u.usuarioFecha > :usuarioFechaInicio AND u.usuarioFecha < :usuarioFechaFin)")
    Page<Usuario> paginado(
            String nick,
            String nombre,
            String apellido,
            String estado,
            Date usuarioFechaInicio,
            Date usuarioFechaFin,
            Pageable pageable);

    /**
     * Método para buscar un usuario por su UUID y estado sea diferente de X
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.usuario WHERE uuid = CAST(?1 AS uuid) and estado != 'X'", nativeQuery = true)
    Optional<Usuario> findByUuid(String uuid);

    /**
     * Método para buscar una entidad de Error por indice y estado sea diferente de
     * X
     * 
     * @param indice
     * @return
     */
    @Query(value = "SELECT * FROM gs_001_01.usuario WHERE nick = ?1 and estado != 'X'", nativeQuery = true)
    Optional<Usuario> findByNick(String nick);
}