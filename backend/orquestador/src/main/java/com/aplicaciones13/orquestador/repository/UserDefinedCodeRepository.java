package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.UserDefinedCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDefinedCodeRepository extends JpaRepository<UserDefinedCode, Long> {
    List<UserDefinedCode> findByModule_IndexAndGroupNotOrderByGroupAscOrderAsc(String moduleIndex, String group);
}