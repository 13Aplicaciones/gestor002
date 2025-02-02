package com.aplicaciones13.gestor_ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicaciones13.gestor_ws.model.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
}