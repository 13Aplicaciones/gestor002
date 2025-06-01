package com.aplicaciones13.gestor.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.ComboMapper;
import com.aplicaciones13.gestor.model.Combo;
import com.aplicaciones13.gestor.payload.request.ComboRequest;
import com.aplicaciones13.gestor.payload.response.ComboResponse;
import com.aplicaciones13.gestor.repository.ComboRepository;

/**
 * Clase para el servicio de la entidad Combo.
 * 
 * Esta clase contiene la lógica de negocio relacionada con la entidad Combo,
 * incluyendo métodos para crear, actualizar, eliminar y buscar combos.
 * 
 * @autor omargo33
 * @fecha 2025-01-22
 */
@Service
@Transactional
public class ComboService {

    private final ComboRepository comboRepository;

    /**
     * Constructor del servicio ComboService.
     * 
     * @param comboRepository
     */
    public ComboService(ComboRepository comboRepository) {
        this.comboRepository = comboRepository;
    }

    /**
     * Método para obtener un combo por su UUID.
     * 
     * @param uuid UUID del combo a buscar.
     * @return ComboResponse con los datos del combo.
     */
    public ComboResponse findByUuid(String uuid) {
        return comboRepository.findByUuid(uuid)
                .map(ComboMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Combo no encontrado", HttpStatus.NOT_FOUND));
    }

    /**
     * Método para crear un nuevo combo.
     * 
     * @param comboRequest Datos del combo a crear.
     * @return ComboResponse con los datos del combo creado.
     */
    @InvokeUser
    public ComboResponse create(ComboRequest comboRequest) {
        Combo combo = ComboMapper.INSTANCE.toEntity(comboRequest);
        combo = comboRepository.saveAndFlush(combo);
        return ComboMapper.INSTANCE.toResponse(combo);
    }

    /**
     * Método para actualizar un combo existente.
     * 
     * @param uuid UUID del combo a actualizar.
     * @param comboRequest Datos actualizados del combo.
     * @return ComboResponse con los datos del combo actualizado.
     */
    @InvokeUser
    public ComboResponse update(String uuid, ComboRequest comboRequest) {
        Combo combo = comboRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Combo no encontrado", HttpStatus.NOT_FOUND));

        combo.setIdModule(comboRequest.getIdModule());
        combo.setIndexCombo(comboRequest.getIndexCombo());
        combo.setName(comboRequest.getName());
        combo.setStatus(comboRequest.getStatus());
        combo.setUserApp(comboRequest.getUserApp());
        combo = comboRepository.saveAndFlush(combo);
        return ComboMapper.INSTANCE.toResponse(combo);
    }

    /**
     * Método para eliminar un combo.
     * 
     * @param uuid UUID del combo a eliminar.
     */
    public void delete(String uuid) {
        Combo combo = comboRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Combo no encontrado", HttpStatus.NOT_FOUND));
        comboRepository.delete(combo);
    }

    /**
     * Método para buscar combos de manera paginada.
     * 
     * @param pageable Parámetros de paginación.
     * @return Page de ComboResponse con los combos encontrados.
     */
    public Page<ComboResponse> findByNameContaining(String name, Pageable pageable) {
        return comboRepository.findByNameContaining(name, pageable)
                .map(ComboMapper.INSTANCE::toResponse);
    }
}