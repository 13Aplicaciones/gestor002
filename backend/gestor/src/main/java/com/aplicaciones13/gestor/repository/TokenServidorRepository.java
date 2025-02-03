package com.aplicaciones13.gestor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.TokenServidor;

@Repository
public interface TokenServidorRepository extends JpaRepository<TokenServidor, Long> {

    Optional<TokenServidor> findByToken(String token);
}