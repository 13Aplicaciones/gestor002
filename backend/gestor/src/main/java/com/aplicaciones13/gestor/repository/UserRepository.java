package com.aplicaciones13.gestor.repository;

import com.aplicaciones13.gestor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;

/**
 * Repositorio de la entidad user.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Metodo para buscar un user por su nick, name, apellido, status y la
     * fecha tenga un rango y status sea parte de la busqueda.
     * 
     * @param nick
     * @param name
     * @param apellido
     * @param status
     * @param userDateInicio
     * @param userDateFin
     * @param pageable
     * @return
     */
    @Query("SELECT u FROM user u WHERE (:nick IS NULL OR upper(u.nick) LIKE %:nick%) AND (:name IS NULL OR upper(u.name) LIKE %:name%) AND (:lastName IS NULL OR upper(u.lastName) LIKE %:lastName%) AND (:status IS NULL OR upper(u.status) LIKE %:status%) AND (u.userDate > :userDateInicio AND u.userDate < :userDateFin)")
    Page<User> paginado(
            String nick,
            String name,
            String lastName,
            String status,
            Date userDateInicio,
            Date userDateFin,
            Pageable pageable);

    /**
     * Método para buscar un user por su UUID y status sea diferente de X
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.User WHERE uuid = ?1 and status != 'X'", nativeQuery = true)
    Optional<User> findByUuid(String uuid);

    /**
     * Método para buscar una entidad de Error por index y status sea diferente de
     * X
     * 
     * @param index
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.User WHERE nick = ?1 and status != 'X'", nativeQuery = true)
    Optional<User> findByNick(String nick);
}