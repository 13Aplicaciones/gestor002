package com.aplicaciones13.gestor.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.ComboItemMapper;
import com.aplicaciones13.gestor.model.ComboItem;
import com.aplicaciones13.gestor.payload.request.ComboItemRequest;
import com.aplicaciones13.gestor.payload.response.ComboItemResponse;
import com.aplicaciones13.gestor.repository.ComboItemRepository;

/**
 * Clase para el servicio de la entidad ComboItem.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Service
@Transactional
public class ComboItemService {

    private final ComboItemRepository comboItemRepository;

    /**
     * Constructor del servicio ComboItemService.
     * 
     * @param comboItemRepository
     */
    public ComboItemService(ComboItemRepository comboItemRepository) {
        this.comboItemRepository = comboItemRepository;
    }

    /**
     * Método para obtener la búsqueda de combo items por nombre y paginación.
     * 
     * @param name nombre a buscar
     * @param pagingSort configuración de paginación y ordenamiento
     * @return página de combo items
     */
    public Page<ComboItem> findByName(String name, Pageable pagingSort) {
        return comboItemRepository.findByNameContaining(name, pagingSort);
    }

    /**
     * Método para buscar un combo item por UUID.
     * 
     * @param uuid identificador único
     * @return respuesta del combo item encontrado
     * @throws ResourceHttpStatusException si no se encuentra el combo item
     */
    public ComboItemResponse findByUuid(String uuid) {
        return comboItemRepository.findByUuid(uuid)
                .map(ComboItemMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));
    }

    /**
     * Método para crear un nuevo combo item.
     * 
     * @param comboItemRequest datos del combo item a crear
     * @return respuesta con el combo item creado
     */
    @InvokeUser
    public ComboItemResponse create(ComboItemRequest comboItemRequest) {
        ComboItem comboItem = ComboItemMapper.INSTANCE.toEntity(comboItemRequest);
        comboItem = comboItemRepository.saveAndFlush(comboItem);
        return ComboItemMapper.INSTANCE.toResponse(comboItem);
    }

    /**
     * Método para actualizar un combo item existente.
     * 
     * @param uuid identificador único del combo item
     * @param comboItemRequest nuevos datos del combo item
     * @return respuesta con el combo item actualizado
     * @throws ResourceHttpStatusException si no se encuentra el combo item
     */
    @InvokeUser
    public ComboItemResponse update(String uuid, ComboItemRequest comboItemRequest) {
        ComboItem comboItem = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));

        comboItem.setName(comboItemRequest.getName());
        comboItem.setStatus(comboItemRequest.getStatus());
        comboItem.setUserApp(comboItemRequest.getUserApp());
        comboItem = comboItemRepository.saveAndFlush(comboItem);
        return ComboItemMapper.INSTANCE.toResponse(comboItem);
    }

    /**
     * Método para eliminar un combo item.
     * 
     * @param uuid identificador único del combo item
     * @throws ResourceHttpStatusException si no se encuentra el combo item
     */
    public void delete(String uuid) {
        ComboItem comboItem = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));
        comboItemRepository.delete(comboItem);
    }
}