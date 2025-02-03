package com.aplicaciones13.gestor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor.model.TokenServer;

@Repository
public interface TokenServerRepository extends JpaRepository<TokenServer, Long> {

    Optional<TokenServer> findByToken(String token);
}