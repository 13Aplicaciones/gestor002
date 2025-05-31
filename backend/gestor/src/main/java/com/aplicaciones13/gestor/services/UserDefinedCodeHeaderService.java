package com.aplicaciones13.gestor.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.gestor.model.Module;
import com.aplicaciones13.gestor.model.UserDefinedCode;
import com.aplicaciones13.gestor.repository.ModuleRepository;
import com.aplicaciones13.gestor.repository.UserDefinedCodeRepository;

@Service
@Transactional
public class UserDefinedCodeHeaderService {

    private static String initialGroup = "001";

    private final UserDefinedCodeRepository userDefinedCodeRepository;
    private final ModuleRepository moduleRepository;

    /**
     * Constructor de la clase UserDefinedCodeHeaderService.
     * 
     * @param userDefinedCodeRepository
     * @param moduleRepository
     */
    public UserDefinedCodeHeaderService(UserDefinedCodeRepository userDefinedCodeRepository,
            ModuleRepository moduleRepository) {
        this.userDefinedCodeRepository = userDefinedCodeRepository;
        this.moduleRepository = moduleRepository;
    }

    /**
     * Obtiene todos los registros de la entidad user de manera paginada.
     * 
     * @param nick
     * @param name
     * @param apellido
     * @param status
     * @param pageable
     * @return
     */
    public Page<UserDefinedCode> findPage(String uuidModule, String name, String description,
            Pageable pageable) {
        Module module = getModule(uuidModule);
        return userDefinedCodeRepository.paginated(module.getIdModule(), initialGroup, name, description, pageable);
    }

    public Optional<UserDefinedCode> findById(Long id) {
        return userDefinedCodeRepository.findById(id);
    }

    public UserDefinedCode create(UserDefinedCode UserDefinedCode) {
        return userDefinedCodeRepository.save(UserDefinedCode);
    }

    public UserDefinedCode update(Long id, UserDefinedCode UserDefinedCode) {
        if (!userDefinedCodeRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de user no encontrado", HttpStatus.NOT_FOUND);

        }
        UserDefinedCode.setIdUserDefinedCode(id);
        return userDefinedCodeRepository.save(UserDefinedCode);
    }

    public void delete(Long id) {
        if (!userDefinedCodeRepository.existsById(id)) {
            throw new ResourceHttpStatusException("Código definido de user no encontrado", HttpStatus.NOT_FOUND);
        }
        userDefinedCodeRepository.deleteById(id);
    }

    /**
     * Obtiene el modulo por uuidModule.
     * 
     * @param uuidModule
     * @return
     */
    private Module getModule(String uuidModule) {
        return moduleRepository.findByUuid(uuidModule)
                .orElseThrow(() -> new ResourceHttpStatusException("Módulo No encontrado", HttpStatus.NOT_FOUND));
    }
}