package com.aplicaciones13.gestor.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aplicaciones13.base.payload.common.LovResponse;
import com.aplicaciones13.base.mapping.LovMapper;
import com.aplicaciones13.gestor.repository.LovRepository;

/**
 * Servicio para manejar List of Values (LOV).
 * 
 * @author omargo33
 * @since 2025-06-14
 */
@Service
public class LovService {
    
    private final LovRepository lovRepository;

    /**
     * Constructor del servicio LovService.
     * 
     * @param lovRepository repositorio de LOV
     */
    public LovService(LovRepository lovRepository) {
        this.lovRepository = lovRepository;
    }

    /**
     * Busca ítems de combo para un LOV (List of Values) por término de búsqueda.
     * 
     * @param label término a buscar en label
     * @param labelAlternative término alternativo a buscar en label_alternative
     * @param pageable   configuración de paginación
     * @return página de ítems de combo
     */
    public Page<LovResponse> findLovComboItem(String label, String labelAlternative, Pageable pageable) {
        return lovRepository.findForLovComboItem(label, labelAlternative, pageable)
                .map(LovMapper.INSTANCE::toResponse);
    }

}

