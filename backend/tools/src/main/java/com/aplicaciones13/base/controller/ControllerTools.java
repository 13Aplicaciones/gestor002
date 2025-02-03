package com.aplicaciones13.base.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;

/**
 * Clase de utilidades para los controladores.
 * 
 * @author @omargo33
 * @since 2025-01-12
 * 
 */
public class ControllerTools {

    /**
     * Metodo para generar la paginacion de una lista.
     * 
     * @param <T>
     * @param pageItems
     * @return
     */
    public static <T> Map<String, Object> generateFooterPage(Page<T> pageItems) {
        Map<String, Object> response = new HashMap<>();
        response.put("items", pageItems.getContent());
        response.put("currentPage", pageItems.getNumber());
        response.put("totalItems", pageItems.getTotalElements());
        response.put("totalPages", pageItems.getTotalPages());
        return response;
    }

    /**
     * Metodo para generar lor orderes de una paginacion.
     * 
     * @param sort
     * @return
     */
    public static Pageable generateOrders(int page, int size,String[] sort){
        List<Sort.Order> orders = new ArrayList<>();
        if (sort[0].contains(",")) {
            for (String sortOrder : sort) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(Sort.Direction.fromString(_sort[1]), _sort[0]));
            }
        } else {
            orders.add(new Sort.Order(Sort.Direction.fromString(sort[1]), sort[0]));
        }

        return PageRequest.of(page, size, Sort.by(orders));
    }
}
