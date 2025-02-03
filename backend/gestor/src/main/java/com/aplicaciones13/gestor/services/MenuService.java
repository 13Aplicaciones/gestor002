package com.aplicaciones13.gestor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.gestor.anotacion.EjecutarUsuario;
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

    @EjecutarUsuario
    public MenuResponse create(MenuRequest request) {
        Menu menu = toEntity(request);
        menu = menuRepository.save(menu);
        return toResponse(menu);
    }

    @EjecutarUsuario
    public MenuResponse update(Long id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        menu.setTipo(request.getTipo());
        menu.setIndice(request.getIndice());
        menu.setNombre(request.getNombre());
        menu.setRutaFlujo(request.getRutaFlujo());
        menu.setEstado(request.getEstado());
        menu.setOrden(request.getOrden());
        menu.setUsuarioPrograma(request.getUsuarioPrograma());
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
        menu.setTipo(request.getTipo());
        menu.setIndice(request.getIndice());
        menu.setNombre(request.getNombre());
        menu.setRutaFlujo(request.getRutaFlujo());
        menu.setEstado(request.getEstado());
        menu.setOrden(request.getOrden());
        //Seguridades
        //menu.setUsuario(request.getUsuario());
        menu.setUsuarioPrograma(request.getUsuarioPrograma());
        return menu;
    }

    private MenuResponse toResponse(Menu menu) {
        MenuResponse response = new MenuResponse();
        response.setIdMenu(menu.getIdMenu());
        response.setTipo(menu.getTipo());
        response.setIndice(menu.getIndice());
        response.setNombre(menu.getNombre());
        response.setRutaFlujo(menu.getRutaFlujo());
        response.setEstado(menu.getEstado());
        response.setOrden(menu.getOrden());
        response.setUsuario(menu.getUsuario());
        response.setUsuarioPrograma(menu.getUsuarioPrograma());
        return response;
    }
}