package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.anotacion.InvokeUser;
import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.mapping.ModuleMapper;
import com.aplicaciones13.gestor.model.Module;
import com.aplicaciones13.gestor.payload.request.ModuleRequest;
import com.aplicaciones13.gestor.payload.response.ModuleListaResponse;
import com.aplicaciones13.gestor.payload.response.ModuleResponse;
import com.aplicaciones13.gestor.repository.ModuleRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Clase para el servicio de la entidad Module.
 * 
 * @autor omargo33
 * @since 2025-01-25
 */
@Slf4j
@Service
@Transactional
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    /**
     * Metodo para obtener un module por su UUID.
     * 
     * @param uuid
     * @return
     */
    public ModuleResponse findByUuid(String uuid) {
        return moduleRepository.findByUuid(uuid)
                .map(ModuleMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Module no encontrado", HttpStatus.NOT_FOUND));
    }

    /**
     * Metodo para crear un module.
     * 
     * @param moduleRequest
     * @return
     */
    @InvokeUser
    public ModuleResponse create(ModuleRequest moduleRequest) {
        Module module = ModuleMapper.INSTANCE.toEntity(moduleRequest);
        validateUniqueIndex(module.getIndex());

        module.setUser(moduleRequest.getUserHidden());
        module = moduleRepository.saveAndFlush(module);

        return ModuleMapper.INSTANCE.toResponse(module);
    }

    /**
     * Metodo para actualizar un module.
     * 
     * @param uuid
     * @param moduleRequest
     * @return
     */
    @InvokeUser
    public ModuleResponse update(String uuid, ModuleRequest moduleRequest) {
        validateUniqueIndexUuid(moduleRequest.getIndex(), uuid);

        Module module = moduleRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Module no encontrado", HttpStatus.NOT_FOUND));

        module.setIndex(moduleRequest.getIndex());
        module.setName(moduleRequest.getName());
        module.setContext(moduleRequest.getContext());
        module.setUserApp(moduleRequest.getUserApp());
        module.setStatus(moduleRequest.getStatus());
        module.setUser(moduleRequest.getUserHidden());

        module = moduleRepository.saveAndFlush(module);
        return ModuleMapper.INSTANCE.toResponse(module);
    }

    /**
     * Metodo para eliminar un module.
     * 
     * @param uuid
     */
    @InvokeUser
    public void delete(String uuid) {
        Module module = moduleRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Module no encontrado", HttpStatus.NOT_FOUND));

        module.setStatus("X");
        module = moduleRepository.save(module);
    }

    /**
     * Metodo para validar que el index sea unico.
     * 
     * @param index
     */
    private void validateUniqueIndex(String index) {
        if (moduleRepository.findByIndex(index).isPresent()) {
            throw new DataIntegrityViolationException("El index ya existe");
        }
    }

    /**
     * Metodo para validar que el index sea unico.
     * 
     * @param index
     * @param uuid
     */
    private void validateUniqueIndexUuid(String index, String uuid) {
        Optional<Module> existingModule = moduleRepository.findByIndex(index);
        if (existingModule.isPresent() && !existingModule.get().getUuid().equals(uuid)) {
            throw new DataIntegrityViolationException("El index ya existe");
        }
    }

    /**
     * Metodo para obtener todos los modules paginados.
     * 
     * @param index
     * @param name
     * @param status
     * @param pageable
     * @return
     */
    public Page<ModuleResponse> paginada(String index, String name, String status, Pageable pageable) {
        Page<Module> listaModules = moduleRepository.paginado(index, name, status, pageable);
        return listaModules.map(ModuleMapper.INSTANCE::toResponse);
    }
   
    /**
     * Metodo para obtener todos los modules.
     * 
     * @return
     */
    public List<ModuleListaResponse> findAll() {
        return moduleRepository.findAll().stream().map(ModuleMapper.INSTANCE::toListaResponse).collect(Collectors.toList());
    }
}