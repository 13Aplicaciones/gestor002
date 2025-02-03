package com.aplicaciones13.gestor.services;


import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.TokenServer;
import com.aplicaciones13.gestor.payload.request.TokenServerRequest;
import com.aplicaciones13.gestor.repository.TokenServerRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class TokenServerService {

    @Autowired
    private TokenServerRepository tokenServidorRepository;

    public TokenServer findById(Long id) {
        return tokenServidorRepository.findById(id)
                .orElseThrow(() -> new ResourceHttpStatusException("Token no encontrado", HttpStatus.NOT_FOUND));
    }

    public TokenServer create(TokenServerRequest request) {
        TokenServer tokenServidor = new TokenServer();
        tokenServidor.setIdToken(request.getIdToken());
        tokenServidor.setType(request.getType());
        tokenServidor.setToken(request.getToken());
        tokenServidor.setUserApp(request.getUserApp());
        validateUniqueToken(tokenServidor.getToken());
        return tokenServidorRepository.save(tokenServidor);
    }

    public TokenServer update(Long id, TokenServerRequest request) {
        TokenServer tokenServidor = findById(id);
        tokenServidor.setIdToken(request.getIdToken());
        tokenServidor.setType(request.getType());
        tokenServidor.setToken(request.getToken());
        tokenServidor.setUserApp(request.getUserApp());
        return tokenServidorRepository.save(tokenServidor);
    }

    public void delete(Long id) {
        TokenServer tokenServidor = findById(id);
        tokenServidorRepository.delete(tokenServidor);
    }

    private void validateUniqueToken(String token) {
        if (tokenServidorRepository.findByToken(token).isPresent()) {
            throw new DataIntegrityViolationException("El token ya existe");
        }
    }
}