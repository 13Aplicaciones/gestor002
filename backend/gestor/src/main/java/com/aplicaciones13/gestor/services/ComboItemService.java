package com.aplicaciones13.gestor.services;

import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.gestor.mapping.ComboItemMapper;
import com.aplicaciones13.gestor.model.Combo;
import com.aplicaciones13.gestor.model.ComboItem;
import com.aplicaciones13.gestor.payload.request.ComboItemPatchStatusRequest;
import com.aplicaciones13.gestor.payload.request.ComboItemRequest;
import com.aplicaciones13.gestor.payload.response.ComboItemResponse;
import com.aplicaciones13.gestor.repository.ComboItemRepository;
import com.aplicaciones13.gestor.repository.ComboRepository;

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
    private final ComboRepository comboRepository;
    private final JwtService jwtService;

    /**
     * Constructor del servicio ComboItemService.
     * 
     * @param comboItemRepository
     */
    public ComboItemService(ComboItemRepository comboItemRepository, ComboRepository comboRepository,
            JwtService jwtService) {
        this.comboItemRepository = comboItemRepository;
        this.comboRepository = comboRepository;
        this.jwtService = jwtService;
    }

    /**
     * Método para obtener la búsqueda de combo items por índice o etiqueta y
     * paginación.
     * 
     * @param indexComboItem índice del combo item
     * @param label          etiqueta del combo item
     * @param description    descripción del combo item
     * @param pagingSort     configuración de paginación y ordenamiento
     * @return página de combo items
     */
    public Page<ComboItemResponse> findByIndexOrLabelOrDescription(String uuidCombo, String label,
            String description, Pageable pagingSort) {
        Combo combo = comboRepository.findByUuid(uuidCombo)
                .orElse(new Combo());

        return comboItemRepository
                .findByIndexOrLabelOrDescriptionContaining(combo.getIdCombo(), label, description, pagingSort)
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
     * Método para actualizar el estado de un combo item.
     * 
     * @param uuid                              identificador único del combo item
     * @param comboItemSearchPatchStatusRequest solicitud con el nuevo estado y
     *                                          usuario de la aplicación
     * @return respuesta con el combo item actualizado
     */
    @InvokeUser
    public ComboItemResponse updateStatus(String uuid, ComboItemPatchStatusRequest comboItemSearchPatchStatusRequest) {
        ComboItem comboItemSearch = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));

        comboItemSearch.setStatus(comboItemSearchPatchStatusRequest.getStatus());
        comboItemSearch.setUser(jwtService.getUsername());

        comboItemSearch = comboItemRepository.saveAndFlush(comboItemSearch);
        return ComboItemMapper.INSTANCE.toResponse(comboItemSearch);
    }

    /**
     * Método para cambiar el orden de un combo item dentro de su combo.
     * 
     * Busca el combo item por su UUID
     * Busca todos los combo items del mismo combo
     * 
     * Selecciona el combo item actual y su posición
     * 
     * Realiza la acción solicitada:
     * - FIRST: Mover al inicio de la lista
     * - UP: Mover hacia arriba un item
     * - DOWN: Mover hacia abajo un item
     * - LAST: Mover al final de la lista
     * 
     * Borra el item de su posición original
     * 
     * Actualiza el orden de los combo items restantes
     * 
     * @param uuid    identificador único del combo item
     * @param acction acción a realizar (FIRST: Mover Top, UP: Mover Arriba, DOWN:
     *                Mover Abajo, LAST: Mover Final)
     */
    public void changeOrder(String uuid, String acction) {
        ComboItem comboItemPivot = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));

        LinkedList<ComboItem> listComboItems = new LinkedList<>(comboItemRepository
                .findByIdCombo(comboItemPivot.getIdCombo())
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItems not found", HttpStatus.NOT_FOUND)));

        int selectedPosition = listComboItems.indexOf(listComboItems.stream()
                .filter(item -> item.getUuid().equals(uuid))
                .findFirst()
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND)));

        switch (acction) {
            case "FIRST": // Mover Top
                comboItemPivot = listComboItems.remove(selectedPosition);
                listComboItems.addFirst(comboItemPivot);
                break;
            case "UP": // Mover hacia arriba un item
                if (selectedPosition > 0) {
                    comboItemPivot = listComboItems.remove(selectedPosition);
                    listComboItems.add(selectedPosition - 1, comboItemPivot);
                }
                break;
            case "DOWN": // Mover hacia abajo un item
                if (selectedPosition < listComboItems.size() - 1) {
                    comboItemPivot = listComboItems.remove(selectedPosition);
                    listComboItems.add(selectedPosition + 1, comboItemPivot);
                }
                break;
            case "LAST": // Mover al final
                comboItemPivot = listComboItems.remove(selectedPosition);
                listComboItems.addLast(comboItemPivot);
                break;
            default:
                break;
        }

        AtomicInteger counter = new AtomicInteger(1);
        listComboItems.forEach(item -> {
            item.setOrden(counter.getAndIncrement());
            comboItemRepository.saveAndFlush(item);
        });
    }

    /**
     * Método para crear un nuevo combo item.
     * 
     * @param comboItemSearchRequest datos del combo item a crear
     * @return respuesta con el combo item creado
     */
    @InvokeUser
    public ComboItemResponse create(ComboItemRequest comboItemSearchRequest) {
        ComboItem comboItemSearch = ComboItemMapper.INSTANCE.toEntity(comboItemSearchRequest);
        comboItemSearch = comboItemRepository.saveAndFlush(comboItemSearch);
        return ComboItemMapper.INSTANCE.toResponse(comboItemSearch);
    }

    /**
     * Método para actualizar un combo item existente.
     * 
     * @param uuid                   identificador único del combo item
     * @param comboItemSearchRequest nuevos datos del combo item
     * @return respuesta con el combo item actualizado
     * @throws ResourceHttpStatusException si no se encuentra el combo item
     */
    @InvokeUser
    public ComboItemResponse update(String uuid, ComboItemRequest comboItemSearchRequest) {
        ComboItem comboItemSearch = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));

        comboItemSearch.setIndexComboItem(comboItemSearchRequest.getIndexComboItem());
        comboItemSearch.setCodeNumber(comboItemSearchRequest.getCodeNumber());
        comboItemSearch.setCodeText(comboItemSearchRequest.getCodeText());
        comboItemSearch.setLabel(comboItemSearchRequest.getLabel());
        comboItemSearch.setDescription(comboItemSearchRequest.getDescription());
        comboItemSearch.setIcon(comboItemSearchRequest.getIcon());
        comboItemSearch.setColor(comboItemSearchRequest.getColor());
        comboItemSearch.setOrden(comboItemSearchRequest.getOrden());
        comboItemSearch.setStatus(comboItemSearchRequest.getStatus());
        comboItemSearch.setUserApp(comboItemSearchRequest.getUserApp());

        comboItemSearch = comboItemRepository.saveAndFlush(comboItemSearch);
        return ComboItemMapper.INSTANCE.toResponse(comboItemSearch);
    }

    /**
     * Método para eliminar un combo item.
     * 
     * @param uuid identificador único del combo item
     * @throws ResourceHttpStatusException si no se encuentra el combo item
     */
    public void delete(String uuid) {
        ComboItem comboItemSearch = comboItemRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("ComboItem not found", HttpStatus.NOT_FOUND));
        comboItemRepository.delete(comboItemSearch);
    }
}