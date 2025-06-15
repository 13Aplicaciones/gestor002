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
     * @param searchTerm término a buscar en label o description
     * @param pageable   configuración de paginación
     * @return página de ítems de combo
     */
    public Page<LovResponse> findLovComboItem(String searchTerm, Pageable pageable) {
        return lovRepository.findForLovComboItem(searchTerm, pageable)
                .map(LovMapper.INSTANCE::toResponse);
    }

}

