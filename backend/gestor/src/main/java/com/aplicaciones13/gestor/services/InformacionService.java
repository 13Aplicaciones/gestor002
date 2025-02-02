package com.aplicaciones13.gestor_ws.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor_ws.mapping.InformacionMapper;
import com.aplicaciones13.gestor_ws.model.Informacion;
import com.aplicaciones13.gestor_ws.payload.request.InformacionRequest;
import com.aplicaciones13.gestor_ws.payload.response.InformacionResponse;
import com.aplicaciones13.gestor_ws.repository.InformacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Clase para el servicio de la entidad Informacion.
 * 
 * @author omargo33
 * @fecha 2025-01-22
 * 
 */
@Service
@Transactional
public class InformacionService {

    @Autowired
    private InformacionRepository informacionRepository;

    /**
     * Metodo para obtener la busqueda de la informacion por el nombre y page
     */
    public Page<Informacion> findByNombre(String nombre, Pageable pagingSort) {
        return informacionRepository.findByNombreContaining(nombre, pagingSort);
    }

    public InformacionResponse findByUuid(String uuid) {
        return informacionRepository.findByUuid(uuid)
                .map(InformacionMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
    }

    @EjecutarUsuario
    public InformacionResponse create(InformacionRequest informacionRequest) {
        Informacion informacion = InformacionMapper.INSTANCE.toEntity(informacionRequest);
        informacion = informacionRepository.saveAndFlush(informacion);
        return InformacionMapper.INSTANCE.toResponse(informacion);
    }

    @EjecutarUsuario
    public InformacionResponse update(String uuid, InformacionRequest informacionRequest) {
        Informacion informacion = informacionRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));

        informacion.setNombre(informacionRequest.getNombre());
        informacion.setValor01(informacionRequest.getValor01());
        informacion.setValor02(informacionRequest.getValor02());
        informacion.setUsuarioPrograma(informacionRequest.getUsuarioPrograma());
        informacion = informacionRepository.saveAndFlush(informacion);
        return InformacionMapper.INSTANCE.toResponse(informacion);
    }

    public void delete(String uuid) {
        Informacion informacion = informacionRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
        informacionRepository.delete(informacion);
    }
}