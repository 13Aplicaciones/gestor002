package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
}