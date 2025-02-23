package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    List<Parameter> findByModule_Index(String moduleIndex);
}