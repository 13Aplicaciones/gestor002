package com.aplicaciones13.gestor.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.aplicaciones13.gestor.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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
     * @param email
     * @return
     */
    @Query("SELECT t FROM Token t WHERE t.email = ?1 AND t.status != 'X'")
    Optional<Token> findByEmail(String email);
        
    /**
     * Metodo para buscar un token por socialNick.
     * 
     * @param socialNick
     * @return
     */
    @Query("SELECT t FROM Token t WHERE t.socialNick = ?1 AND t.status != 'X'")
    Optional<Token> findBySocialNick(String socialNick);
    
    /**
     * Metodo para buscar un token por idUser.
     * 
     * @param idUser
     * @return
     */
    @Query("SELECT t FROM Token t WHERE t.idUser = ?1 AND t.type = ?2 AND t.status != 'X'")
    List<Token> findByIdUserAndType(Long idUser, String type);

    /**
     * Metodo para Borrar logimante todas los items de un token.
     * 
     * @param idUser
     * @param type
     * @return
     */
    @Modifying
    @Query("UPDATE Token t SET t.status = 'X' WHERE t.idUser = ?1 AND t.type = ?2")
    void deleteByIdUser(Long idUser, String type);

    /**
     * Metodo para buscar un token por su uuid.
     * 
     * @param idUser
     * @param pageable
     * @return
     */
    @Query(value = "SELECT * FROM GS_002_01.token t WHERE t.id_user = ?1",
        countQuery = "SELECT count(*) FROM GS_002_01.token t WHERE t.idUser = ?1",
        nativeQuery = true)
    Page<Token> paginated(
            Long idUser,            
            Pageable pageable);
    
}