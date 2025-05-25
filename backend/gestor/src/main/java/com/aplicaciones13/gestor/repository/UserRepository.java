package com.aplicaciones13.gestor.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.User;

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
     
    @Query(value = "SELECT * FROM GS_002_01.user u WHERE u.status != 'X' and (?1 IS NULL OR upper(u.nick) LIKE CONCAT('%', upper(?1),  '%')) AND (?2 IS NULL OR upper(u.name) LIKE CONCAT('%', upper(?2) , '%')) AND (?3 IS NULL OR upper(u.last_name) LIKE CONCAT('%', upper(?3), '%')) AND (?4 IS NULL OR upper(u.status) LIKE CONCAT('%', upper(?4) , '%'))",
        countQuery = "SELECT count(*) FROM GS_002_01.user u WHERE u.status != 'X' and (?1 IS NULL OR upper(u.nick) LIKE CONCAT('%',  upper(?1) , '%')) AND (?2 IS NULL OR upper(u.name) LIKE CONCAT('%', upper(?2) , '%')) AND (?3 IS NULL OR upper(u.last_name) LIKE CONCAT('%', upper(?3) , '%')) AND (?4 IS NULL OR upper(u.status) LIKE CONCAT('%', upper(?4) , '%'))",
        nativeQuery = true)
    Page<User> paginated(
            String nick,
            String name,
            String lastName,
            String status,
            Pageable pageable);



    /**
     * Método para buscar un user por su UUID y status sea diferente de X
     * 
     * @param uuid
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.user WHERE uuid = ?1 and status != 'X'", nativeQuery = true)
    Optional<User> findByUuid(String uuid);

    /**
     * Método para buscar una entidad de Error por index y status sea diferente de
     * X
     * 
     * @param index
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.user WHERE nick = ?1 and status != 'X'", nativeQuery = true)
    Optional<User> findByNick(String nick);
}