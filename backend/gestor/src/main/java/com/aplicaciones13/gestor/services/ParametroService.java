package com.aplicaciones13.gestor.services;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.anotacion.EjecutarUsuario;
import com.aplicaciones13.gestor.mapping.ParametroMapper;
import com.aplicaciones13.gestor.model.Parametro;
import com.aplicaciones13.gestor.payload.request.ParametroRequest;
import com.aplicaciones13.gestor.payload.response.ParametroResponse;
import com.aplicaciones13.gestor.repository.ParametroRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class ParametroService {

    @Autowired
    private ParametroRepository parametroRepository;

    public ParametroResponse findByIndice(String indice) {
        return parametroRepository.findByIndice(indice)
                .map(ParametroMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ResourceHttpStatusException("Parametro no encontrado", HttpStatus.NOT_FOUND));
    }

    @EjecutarUsuario
    public ParametroResponse create(ParametroRequest parametroRequest) {
        Parametro parametro = ParametroMapper.INSTANCE.toEntity(parametroRequest);
        validateUniqueIndice(parametro.getIndice());
        parametro = parametroRepository.saveAndFlush(parametro);
        return ParametroMapper.INSTANCE.toResponse(parametro);
    }

    @EjecutarUsuario
    public ParametroResponse update(String indice, ParametroRequest parametroRequest) {
        validateUniqueIndice(parametroRequest.getIndice());

        Parametro parametro = parametroRepository.findByIndice(indice)
                .orElseThrow(() -> new ResourceHttpStatusException("Parametro no encontrado", HttpStatus.NOT_FOUND));

        parametro.setIndice(parametroRequest.getIndice());
        parametro.setClave(parametroRequest.getClave());
        parametro.setNombre(parametroRequest.getNombre());
        parametro.setDescripcion(parametroRequest.getDescripcion());
        parametro.setValorTexto01(parametroRequest.getValorTexto01());
        parametro.setValorTexto02(parametroRequest.getValorTexto02());
        parametro.setValorNumero01(parametroRequest.getValorNumero01());
        parametro.setValorNumero02(parametroRequest.getValorNumero02());
        parametro.setDefaultTexto01(parametroRequest.getDefaultTexto01());
        parametro.setDefaultTexto02(parametroRequest.getDefaultTexto02());
        parametro.setDefaultNumero01(parametroRequest.getDefaultNumero01());
        parametro.setDefaultNumero02(parametroRequest.getDefaultNumero02());
        parametro.setUsuarioPrograma(parametroRequest.getUsuarioPrograma());
        parametro = parametroRepository.saveAndFlush(parametro);
        return ParametroMapper.INSTANCE.toResponse(parametro);
    }

    public void delete(String indice) {
        Parametro parametro = parametroRepository.findByIndice(indice)
                .orElseThrow(() -> new ResourceHttpStatusException("Parametro no encontrado", HttpStatus.NOT_FOUND));

        parametroRepository.delete(parametro);
    }

    private void validateUniqueIndice(String indice) {
        if (parametroRepository.findByIndice(indice).isPresent()) {
            throw new DataIntegrityViolationException("El indice ya existe");
        }
    }
}