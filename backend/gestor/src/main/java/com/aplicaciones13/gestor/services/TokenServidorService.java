package com.aplicaciones13.gestor.services;


import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.TokenServidor;
import com.aplicaciones13.gestor.payload.request.TokenServidorRequest;
import com.aplicaciones13.gestor.repository.TokenServidorRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class TokenServidorService {

    @Autowired
    private TokenServidorRepository tokenServidorRepository;

    public TokenServidor findById(Long id) {
        return tokenServidorRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Token no encontrado", HttpStatus.NOT_FOUND));
    }

    public TokenServidor create(TokenServidorRequest request) {
        TokenServidor tokenServidor = new TokenServidor();
        tokenServidor.setIdToken(request.getIdToken());
        tokenServidor.setTipo(request.getTipo());
        tokenServidor.setToken(request.getToken());
        tokenServidor.setUsuarioPrograma(request.getUsuarioPrograma());
        validateUniqueToken(tokenServidor.getToken());
        return tokenServidorRepository.save(tokenServidor);
    }

    public TokenServidor update(Long id, TokenServidorRequest request) {
        TokenServidor tokenServidor = findById(id);
        tokenServidor.setIdToken(request.getIdToken());
        tokenServidor.setTipo(request.getTipo());
        tokenServidor.setToken(request.getToken());
        tokenServidor.setUsuarioPrograma(request.getUsuarioPrograma());
        return tokenServidorRepository.save(tokenServidor);
    }

    public void delete(Long id) {
        TokenServidor tokenServidor = findById(id);
        tokenServidorRepository.delete(tokenServidor);
    }

    private void validateUniqueToken(String token) {
        if (tokenServidorRepository.findByToken(token).isPresent()) {
            throw new DataIntegrityViolationException("El token ya existe");
        }
    }
}