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

    public static final String LOV_COMBO_ITEM = "comboItem";
    public static final String LOV_MODULE = "module";

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
     * @param label            término a buscar en label
     * @param labelAlternative término alternativo a buscar en label_alternative
     * @param pageable         configuración de paginación
     * @return página de ítems de combo
     */
    public Page<LovResponse> findLov(String lovName, String label, String labelAlternative, Pageable pageable) {
        switch (lovName) {
            case LOV_COMBO_ITEM:
                return lovRepository.findForLovComboItem(label, labelAlternative, pageable)
                        .map(LovMapper.INSTANCE::toResponse);
            case LOV_MODULE:
                return lovRepository.findForLovModule(label, labelAlternative, pageable)
                        .map(LovMapper.INSTANCE::toResponse);
            default:
                throw new IllegalArgumentException("LOV name not recognized: " + lovName);
        }
    }
}
