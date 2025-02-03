package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.anotacion.InvokeUser;
import com.aplicaciones13.gestor.anotacion.InvokeUser;
import com.aplicaciones13.gestor.mapping.InformationMapper;
import com.aplicaciones13.gestor.model.Information;
import com.aplicaciones13.gestor.payload.request.InformationRequest;
import com.aplicaciones13.gestor.payload.response.InformationResponse;
import com.aplicaciones13.gestor.repository.InformationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Clase para el servicio de la entidad Information.
 * 
 * @author omargo33
 * @fecha 2025-01-22
 * 
 */
@Service
@Transactional
public class InformationService {

    @Autowired
    private InformationRepository informationRepository;

    /**
     * Metodo para obtener la busqueda de la information por el name y page
     */
    public Page<Information> findByName(String name, Pageable pagingSort) {
        return informationRepository.findByNameContaining(name, pagingSort);
    }

    public InformationResponse findByUuid(String uuid) {
        return informationRepository.findByUuid(uuid)
                .map(InformationMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
    }

    @InvokeUser
    public InformationResponse create(InformationRequest informationRequest) {
        Information information = InformationMapper.INSTANCE.toEntity(informationRequest);
        information = informationRepository.saveAndFlush(information);
        return InformationMapper.INSTANCE.toResponse(information);
    }

    @InvokeUser
    public InformationResponse update(String uuid, InformationRequest informationRequest) {
        Information information = informationRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));

        information.setName(informationRequest.getName());
        information.setValue01(informationRequest.getValue01());
        information.setValue02(informationRequest.getValue02());
        information.setUserApp(informationRequest.getUserApp());
        information = informationRepository.saveAndFlush(information);
        return InformationMapper.INSTANCE.toResponse(information);
    }

    public void delete(String uuid) {
        Information information = informationRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Error not found", HttpStatus.NOT_FOUND));
        informationRepository.delete(information);
    }
}