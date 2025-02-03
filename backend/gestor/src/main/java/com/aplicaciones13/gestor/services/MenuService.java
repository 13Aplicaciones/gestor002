package com.aplicaciones13.gestor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.gestor.model.Menu;
import com.aplicaciones13.gestor.payload.request.MenuRequest;
import com.aplicaciones13.gestor.payload.response.MenuResponse;
import com.aplicaciones13.gestor.repository.MenuRepository;

import java.util.List;

@Service
@Transactional
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<MenuResponse> findAll() {
        return menuRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public MenuResponse findById(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        return toResponse(menu);
    }

    @InvokeUser
    public MenuResponse create(MenuRequest request) {
        Menu menu = toEntity(request);
        menu = menuRepository.save(menu);
        return toResponse(menu);
    }

    @InvokeUser
    public MenuResponse update(Long id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        menu.setType(request.getType());
        menu.setIndex(request.getIndex());
        menu.setName(request.getName());
        menu.setTaskFlow(request.getTaskFlow());
        menu.setStatus(request.getStatus());
        menu.setOrder(request.getOrder());
        menu.setUserApp(request.getUserApp());
        menu = menuRepository.save(menu);
        return toResponse(menu);
    }

    public void delete(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        menuRepository.delete(menu);
    }

    private Menu toEntity(MenuRequest request) {
        Menu menu = new Menu();
        menu.setType(request.getType());
        menu.setIndex(request.getIndex());
        menu.setName(request.getName());
        menu.setTaskFlow(request.getTaskFlow());
        menu.setStatus(request.getStatus());
        menu.setOrder(request.getOrder());
        //Seguridades
        //menu.setUser(request.getUser());
        menu.setUserApp(request.getUserApp());
        return menu;
    }

    private MenuResponse toResponse(Menu menu) {
        MenuResponse response = new MenuResponse();
        response.setIdMenu(menu.getIdMenu());
        response.setType(menu.getType());
        response.setIndex(menu.getIndex());
        response.setName(menu.getName());
        response.setTaskFlow(menu.getTaskFlow());
        response.setStatus(menu.getStatus());
        response.setOrder(menu.getOrder());
        response.setUser(menu.getUser());
        response.setUserApp(menu.getUserApp());
        return response;
    }
}