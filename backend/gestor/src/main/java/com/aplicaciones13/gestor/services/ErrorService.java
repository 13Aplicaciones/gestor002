package com.aplicaciones13.gestor.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.anotacion.InvokeUser;
import com.aplicaciones13.gestor.mapping.ErrorMapper;
import com.aplicaciones13.gestor.payload.request.ErrorRequest;
import com.aplicaciones13.gestor.payload.response.ErrorResponse;
import com.aplicaciones13.gestor.repository.ErrorRepository;
import com.aplicaciones13.gestor.model.Error;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ErrorService {

    @Autowired
    private ErrorRepository errorRepository;
    
    /**
     * Valida que el índice sea único en la base de datos con excepción del uuid
     * 
     * @param indice
     * @param uuid
     */
    public void validateUniqueIndexUuid(String indice, String uuid) {
        Optional<Error> existingError = errorRepository.findByIndex(indice);
        if (existingError.isPresent() && !existingError.get().getUuid().toString().equals(uuid)) {
            throw new DataIntegrityViolationException("El índice ya existe");
        }
    }

    /**
     * Valida que el índice sea único en la base de datos
     * 
     * @param indice
     */
    public void validateUniqueIndex(String indice) {
        if (errorRepository.findByIndex(indice).isPresent()) {
            throw new DataIntegrityViolationException("El índice ya existe");
        }
    }

    /**
     * Busca los errores por índice y mensaje
     * 
     * @param indice
     * @param mensaje
     * @param pagingSort
     * @return
     */
    public Page<Error> findByIndexAndMessage(String indice, String mensaje, Pageable pagingSort) {
        return errorRepository.findByIndexContaining(indice, mensaje, pagingSort);
    }

    /**
     * Busca los errores por índice
     * 
     * @param indice
     * @return
     */
    public ErrorResponse findByIndex(String indice) {
        return errorRepository.findByIndex(indice)
                .map(ErrorMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
    }

    /**
     * Busca los errores por id
     * 
     * @param id
     * @return
     */
    public ErrorResponse findByIdError(Long id) {
        return errorRepository.findByIdError(id)
                .map(ErrorMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
    }

    /**
     * Busca los errores por uuid
     * 
     * @param uuid
     * @return
     */
    public ErrorResponse findByUuid(String uuid) {        
        return errorRepository.findByUuid(uuid)
                .map(ErrorMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
    }

    /**
     * Crear un error
     * 
     * @param pagingSort
     * @return
     */
    @InvokeUser
    public ErrorResponse create(ErrorRequest errorRequest) {        
        validateUniqueIndex(errorRequest.getIndex());
        Error error = ErrorMapper.INSTANCE.toEntity(errorRequest);
        error.setUser(errorRequest.getUserHidden());    
        error = errorRepository.saveAndFlush(error);
        return ErrorMapper.INSTANCE.toResponse(error);
    }

    /**
     * Actualiza un error
     * 
     * @param uuid
     * @param errorRequest
     * @return
     */
    @InvokeUser
    public ErrorResponse update(String uuid, ErrorRequest errorRequest) {
        validateUniqueIndexUuid(errorRequest.getIndex(), uuid);


        Error error = errorRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));

        error.setIndex(errorRequest.getIndex());
        error.setMessage(errorRequest.getMessage());
        error.setDescription(errorRequest.getDescription());
        error.setUserApp(errorRequest.getUserApp());
        error.setUser(errorRequest.getUserHidden());
        error = errorRepository.saveAndFlush(error);
        return ErrorMapper.INSTANCE.toResponse(error);
    }

    /**
     * Elimina un error
     * 
     * @param uuid
     */
    public void deleteByUuid(String uuid) {
        Error error = errorRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));

        errorRepository.delete(error);
    }
}