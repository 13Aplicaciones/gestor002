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
     * Método para obtener la búsqueda de combo items por índice o etiqueta y paginación.
     * 
     * @param indexComboItem índice del combo item
     * @param label etiqueta del combo item
     * @param descripcion descripción del combo item
     * @param pagingSort configuración de paginación y ordenamiento
     * @return página de combo items
     */
    public Page<ComboItemResponse> findByIndexOrLabelOrDescription(String indexComboItem, String label, String descripcion, Pageable pagingSort) {
        return comboItemRepository.findByIndexOrLabelOrDescripcionContaining(indexComboItem, label, descripcion, pagingSort)
                .map(ComboItemMapper.INSTANCE::toResponse);
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

        comboItem.setIndexComboItem(comboItemRequest.getIndexComboItem());
        comboItem.setCodeNumber(comboItemRequest.getCodeNumber());
        comboItem.setCodeText(comboItemRequest.getCodeText());
        comboItem.setLabel(comboItemRequest.getLabel());
        comboItem.setDescription(comboItemRequest.getDescription());
        comboItem.setIcon(comboItemRequest.getIcon());
        comboItem.setColor(comboItemRequest.getColor());
        comboItem.setOrden(comboItemRequest.getOrden());
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