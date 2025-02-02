package com.aplicaciones13.gestor_ws.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor_ws.model.CodigoDefinidoUsuario;
import com.aplicaciones13.gestor_ws.repository.CodigoDefinidoUsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CodigoDefinidoUsuarioService {

    @Autowired
    private CodigoDefinidoUsuarioRepository codigoDefinidoUsuarioRepository;

    public List<CodigoDefinidoUsuario> findAll() {
        return codigoDefinidoUsuarioRepository.findAll();
    }

    public Optional<CodigoDefinidoUsuario> findById(Long id) {
        return codigoDefinidoUsuarioRepository.findById(id);
    }

    public CodigoDefinidoUsuario create(CodigoDefinidoUsuario codigoDefinidoUsuario) {
        return codigoDefinidoUsuarioRepository.save(codigoDefinidoUsuario);
    }

    public CodigoDefinidoUsuario update(Long id, CodigoDefinidoUsuario codigoDefinidoUsuario) {
        if (!codigoDefinidoUsuarioRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de usuario no encontrado", HttpStatus.NOT_FOUND);

        }
        codigoDefinidoUsuario.setIdCodigoDefinidoUsuario(id);
        return codigoDefinidoUsuarioRepository.save(codigoDefinidoUsuario);
    }

    public void delete(Long id) {
        if (!codigoDefinidoUsuarioRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        codigoDefinidoUsuarioRepository.deleteById(id);
    }
}