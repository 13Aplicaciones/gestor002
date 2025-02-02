package com.aplicaciones13.gestor_ws.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor_ws.mapping.ModuloMapper;
import com.aplicaciones13.gestor_ws.model.Modulo;
import com.aplicaciones13.gestor_ws.payload.request.ModuloRequest;
import com.aplicaciones13.gestor_ws.payload.response.ModuloListaResponse;
import com.aplicaciones13.gestor_ws.payload.response.ModuloResponse;
import com.aplicaciones13.gestor_ws.repository.ModuloRepository;

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
 * Clase para el servicio de la entidad Modulo.
 * 
 * @autor omargo33
 * @since 2025-01-25
 */
@Slf4j
@Service
@Transactional
public class ModuloService {

    @Autowired
    private ModuloRepository moduloRepository;

    /**
     * Metodo para obtener un modulo por su UUID.
     * 
     * @param uuid
     * @return
     */
    public ModuloResponse findByUuid(String uuid) {
        return moduloRepository.findByUuid(uuid)
                .map(ModuloMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Modulo no encontrado", HttpStatus.NOT_FOUND));
    }

    /**
     * Metodo para crear un modulo.
     * 
     * @param moduloRequest
     * @return
     */
    @EjecutarUsuario
    public ModuloResponse create(ModuloRequest moduloRequest) {
        Modulo modulo = ModuloMapper.INSTANCE.toEntity(moduloRequest);
        validateUniqueIndice(modulo.getIndice());

        modulo.setUsuario(moduloRequest.getUsuarioHidden());
        modulo = moduloRepository.saveAndFlush(modulo);

        return ModuloMapper.INSTANCE.toResponse(modulo);
    }

    /**
     * Metodo para actualizar un modulo.
     * 
     * @param uuid
     * @param moduloRequest
     * @return
     */
    @EjecutarUsuario
    public ModuloResponse update(String uuid, ModuloRequest moduloRequest) {
        validateUniqueIndiceUuid(moduloRequest.getIndice(), uuid);

        Modulo modulo = moduloRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Modulo no encontrado", HttpStatus.NOT_FOUND));

        modulo.setIndice(moduloRequest.getIndice());
        modulo.setNombre(moduloRequest.getNombre());
        modulo.setContexto(moduloRequest.getContexto());
        modulo.setUsuarioPrograma(moduloRequest.getUsuarioPrograma());
        modulo.setEstado(moduloRequest.getEstado());
        modulo.setUsuario(moduloRequest.getUsuarioHidden());

        modulo = moduloRepository.saveAndFlush(modulo);
        return ModuloMapper.INSTANCE.toResponse(modulo);
    }

    /**
     * Metodo para eliminar un modulo.
     * 
     * @param uuid
     */
    @EjecutarUsuario
    public void delete(String uuid) {
        Modulo modulo = moduloRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Modulo no encontrado", HttpStatus.NOT_FOUND));

        modulo.setEstado("X");
        modulo = moduloRepository.save(modulo);
    }

    /**
     * Metodo para validar que el indice sea unico.
     * 
     * @param indice
     */
    private void validateUniqueIndice(String indice) {
        if (moduloRepository.findByIndice(indice).isPresent()) {
            throw new DataIntegrityViolationException("El indice ya existe");
        }
    }

    /**
     * Metodo para validar que el indice sea unico.
     * 
     * @param indice
     * @param uuid
     */
    private void validateUniqueIndiceUuid(String indice, String uuid) {
        Optional<Modulo> existingModulo = moduloRepository.findByIndice(indice);
        if (existingModulo.isPresent() && !existingModulo.get().getUuid().equals(uuid)) {
            throw new DataIntegrityViolationException("El indice ya existe");
        }
    }

    /**
     * Metodo para obtener todos los modulos paginados.
     * 
     * @param indice
     * @param nombre
     * @param estado
     * @param pageable
     * @return
     */
    public Page<ModuloResponse> paginada(String indice, String nombre, String estado, Pageable pageable) {
        Page<Modulo> listaModulos = moduloRepository.paginado(indice, nombre, estado, pageable);
        return listaModulos.map(ModuloMapper.INSTANCE::toResponse);
    }
   
    /**
     * Metodo para obtener todos los modulos.
     * 
     * @return
     */
    public List<ModuloListaResponse> findAll() {
        return moduloRepository.findAll().stream().map(ModuloMapper.INSTANCE::toListaResponse).collect(Collectors.toList());
    }
}