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
     
    @Query(value = "SELECT * FROM GS_002_01.User u WHERE (?1 IS NULL OR upper(u.nick) LIKE '%' || upper('?1') || '%') AND (?2 IS NULL OR upper(u.name) LIKE '%' || upper('?2') || '%') AND (?3 IS NULL OR upper(u.lastName) LIKE '%' || upper('?3') || '%') AND (?4 IS NULL OR upper(u.status) LIKE '%' || upper('?4') || '%') AND (u.userDate > ?5 AND u.userDate < ?6)",
        countQuery = "SELECT count(*) FROM GS_002_01.User u WHERE (?1 IS NULL OR upper(u.nick) LIKE '%' || upper('?1') || '%') AND (?2 IS NULL OR upper(u.name) LIKE '%' || upper('?2') || '%') AND (?3 IS NULL OR upper(u.lastName) LIKE '%' || upper('?3') || '%') AND (?4 IS NULL OR upper(u.status) LIKE '%' || upper('?4') || '%') AND (u.userDate > ?5 AND u.userDate < ?6)",
        nativeQuery = true)
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