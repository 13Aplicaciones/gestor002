package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
}