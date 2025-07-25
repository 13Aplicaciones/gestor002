package com.aplicaciones13.orchestrator.services;

import com.aplicaciones13.orchestrator.mapping.StaticMapper;
import com.aplicaciones13.orchestrator.model.Menu;
import com.aplicaciones13.orchestrator.model.VStatic;
import com.aplicaciones13.orchestrator.payload.response.StaticResponse;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Servicio para la gestión de estadísticas
 * 
 * @autor omargo33
 * @since 2025-03-03
 */
@Service
public class StaticsService {

    @PersistenceContext
    private EntityManager entityManager;

    private final MenuService menuService;

    /**
     * Constructor del servicio StaticsService.
     * 
     * @param menuService Servicio para interactuar con los menús
     */
    public StaticsService(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * Metodo para ejecutar una consulta dinamica
     * 
     * @param indexMenu
     * @return
     */
    @SuppressWarnings("unchecked")
    //TODO: validar si se puede cachear con tiempo diferenciado si se puede borrar.
    //@Cacheable(value = "StaticsService", key = "#indexMenu", cacheManager = "cacheManagerWithTtl")
    @Cacheable(value = "StaticsService", key = "#indexMenu")
    public List<StaticResponse> executeDynamicQuery(String indexMenu) {

        Optional<Menu> menu = menuService.findByIndexMenu(indexMenu);

        if (!menu.isPresent()) {
            return new ArrayList<StaticResponse>();
        }

        if (menu.get().getStatisticsQuery() == null || menu.get().getStatisticsQuery().isEmpty()) {
            return new ArrayList<StaticResponse>();
        }

        Query query = entityManager.createNativeQuery(menu.get().getStatisticsQuery(), VStatic.class);
        List<VStatic> responseStatic = query.getResultList();

        return responseStatic.stream()
                .map(StaticMapper.INSTANCE::toResponse)
                .collect(Collectors.toList());
    }
}