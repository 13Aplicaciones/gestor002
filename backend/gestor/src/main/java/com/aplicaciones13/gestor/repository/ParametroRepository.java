package com.aplicaciones13.gestor_ws.repository;

import com.aplicaciones13.gestor_ws.model.Parametro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long> {
    Optional<Parametro> findByIndice(String indice);
}