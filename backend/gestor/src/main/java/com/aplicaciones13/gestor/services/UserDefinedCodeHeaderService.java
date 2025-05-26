package com.aplicaciones13.gestor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.UserDefinedCode;
import com.aplicaciones13.gestor.repository.UserDefinedCodeRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserDefinedCodeHeaderService {

    @Autowired
    private UserDefinedCodeRepository codigoDefinidouserRepository;

    public List<UserDefinedCode> findAll() {
        return codigoDefinidouserRepository.findAll();
    }

    public Optional<UserDefinedCode> findById(Long id) {
        return codigoDefinidouserRepository.findById(id);
    }

    public UserDefinedCode create(UserDefinedCode UserDefinedCode) {
        return codigoDefinidouserRepository.save(UserDefinedCode);
    }

    public UserDefinedCode update(Long id, UserDefinedCode UserDefinedCode) {
        if (!codigoDefinidouserRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de user no encontrado", HttpStatus.NOT_FOUND);

        }
        UserDefinedCode.setIdUserDefinedCode(id);
        return codigoDefinidouserRepository.save(UserDefinedCode);
    }

    public void delete(Long id) {
        if (!codigoDefinidouserRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de user no encontrado", HttpStatus.NOT_FOUND);
        }
        codigoDefinidouserRepository.deleteById(id);
    }
}