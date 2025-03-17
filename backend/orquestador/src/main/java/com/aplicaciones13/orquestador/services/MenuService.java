package com.aplicaciones13.orquestador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orquestador.model.Menu;
import com.aplicaciones13.orquestador.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    //TODO: validar si se puede cachear
    //@Cacheable(value = "menuService", key = "#index", cacheManager = "cacheManagerWithTtl")
    @Cacheable(value = "menuService", key = "#indexMenu")
    public Optional<Menu> findByIndexMenu(String indexMenu) {
        return menuRepository.findByIndexMenu(indexMenu);
    }
}
