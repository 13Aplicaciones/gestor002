package com.aplicaciones13.gestor.services;

import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.base.payload.common.LovResponse;
import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.gestor.mapping.MenuMapper;
import com.aplicaciones13.gestor.model.Menu;
import com.aplicaciones13.gestor.model.Module;
import com.aplicaciones13.gestor.payload.request.MenuPatchStatusRequest;
import com.aplicaciones13.gestor.payload.request.MenuRequest;
import com.aplicaciones13.gestor.payload.response.MenuResponse;
import com.aplicaciones13.gestor.repository.MenuRepository;
import com.aplicaciones13.gestor.repository.ModuleRepository;

/**
 * Servicio para gestionar los menús de la aplicación.
 * Proporciona métodos para crear, actualizar, buscar y eliminar menús.
 * Utiliza el repositorio MenuRepository para interactuar con la base de datos.
 * 
 * @author omargo33
 * @since 2025-07-31
 * 
 */
@Service
@Transactional
public class MenuService {

    private MenuRepository menuRepository;
    private ModuleRepository moduleRepository;
    private final JwtService jwtService;

    /**
     * Constructor del servicio MenuService.
     * 
     * @param menuRepository
     */
    public MenuService(MenuRepository menuRepository, ModuleRepository moduleRepository, JwtService jwtService) {
        this.menuRepository = menuRepository;
        this.moduleRepository = moduleRepository;
        this.jwtService = jwtService;
    }

    /**
     * Busca un menú por su UUID.
     * 
     * @param uuid
     * @return
     */
    public MenuResponse findByUuid(String uuid) {
        Menu menu = menuRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Menu no encontrado", HttpStatus.NOT_FOUND));
        return MenuMapper.INSTANCE.toResponse(menu);
    }

    /**
     * Busca un menú por su índice único (indexMenu).
     * 
     * @param index
     * @return
     */
    public MenuResponse findByIndex(String index) {
        Menu menu = menuRepository.findByIndexMenu(index)
                .orElseThrow(() -> new ResourceHttpStatusException("Menu no encontrado", HttpStatus.NOT_FOUND));
        return MenuMapper.INSTANCE.toResponse(menu);
    }

    /**
     * Busca un menú por UUID del modulo y devuelve una lista de menús asociados a
     * un módulo.
     * 
     * @param uuidModule UUID del módulo
     * @param indexMenu  Índice único del menú (opcional)
     * @param name       Nombre del menú (opcional)
     * @param pageable   Objeto Pageable para la paginación de resultados
     * @return Paginación de menús
     */
    public Page<MenuResponse> paginada(String uuidModule, String indexMenu, String name, Pageable pageable) {
        Module module = moduleRepository.findByUuid(uuidModule)
                .orElseThrow(() -> new ResourceHttpStatusException("Module no encontrado", HttpStatus.NOT_FOUND));

        Page<Menu> listMenus = menuRepository.paginado(module.getIdModule(), indexMenu, name, pageable);
        return listMenus.map(MenuMapper.INSTANCE::toResponse);
    }

    /**
     * Crea un nuevo menú.
     * 
     * Verifica si el índice de menú ya existe y lanza una excepción si es así.
     * 
     * Busca el módulo por su UUID y lanza una excepción si no se encuentra.
     * 
     * Crea un nuevo objeto Menu a partir de la solicitud,
     * establece sus propiedades y lo guarda en la base de datos.
     * 
     * @param request Solicitud que contiene los datos del menú a crear.
     * @throws ResourceHttpStatusException si el índice de menú ya existe o el
     *                                     módulo no se encuentra.
     * @return Respuesta que contiene los datos del menú creado.
     */
    public MenuResponse create(MenuRequest request) {
        menuRepository.findByIndexMenu(request.getIndexMenu())
                .ifPresent(menu -> {
                    throw new ResourceHttpStatusException("El índice de menú ya existe", HttpStatus.CONFLICT);
                });

        Module module = moduleRepository.findByUuid(request.getUuidModule())
                .orElseThrow(() -> new ResourceHttpStatusException("Module no encontrado", HttpStatus.NOT_FOUND));

        Menu menu = MenuMapper.INSTANCE.toEntity(request);
        menu.setIdModule(module.getIdModule());
        menu.setUser(jwtService.getUsername());
        menu.setStatus("A");
        menu.setOrder(menuRepository.findMaxOrderByModule(module.getIdModule()));
        menu = menuRepository.save(menu);

        MenuResponse response = MenuMapper.INSTANCE.toResponse(menu);
        response.setUuidModule(module.getUuid());
        response.setUser(jwtService.getUsername());
        return response;
    }

    /**
     * Actualiza el estado de un menú.
     * 
     * Busca el menú por su UUID y lanza una excepción si no se encuentra.
     * 
     * Establece el nuevo estado del menú y guarda los cambios en la base de datos.
     * 
     * @param uuid    UUID del menú a actualizar.
     * @param request Solicitud que contiene el nuevo estado del menú.
     * @return Respuesta que contiene los datos del menú actualizado.
     */
    public MenuResponse updateStatus(String uuid, MenuPatchStatusRequest request) {
        Menu menu = menuRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        menu.setStatus(request.getStatus());
        menu.setUser(jwtService.getUsername());
        menu = menuRepository.save(menu);
        return MenuMapper.INSTANCE.toResponse(menu);
    }

    /**
     * Actualiza un menú existente.
     * 
     * @param uuid    UUID del menú a actualizar.
     * @param request Solicitud que contiene los datos del menú a actualizar.
     * @return Respuesta que contiene los datos del menú actualizado.
     */
    public MenuResponse update(String uuid, MenuRequest request) {
        Menu menu = menuRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Menu no encontrado"));
        menu.setType(request.getType());
        menu.setName(request.getName());
        menu.setTaskFlow(request.getTaskFlow());
        menu.setUserApp(jwtService.getUsername());
        menu = menuRepository.save(menu);
        return MenuMapper.INSTANCE.toResponse(menu);
    }

    /**
     * Metodo para borrar un menu.
     * 
     * Elimina un menú estableciendo su estado a "X" (eliminado).
     * Utiliza el UUID del menú para buscarlo en la base de datos.
     * Lanza una excepción si el menú no se encuentra.
     * El usuario que realiza la operación se registra automáticamente
     * utilizando el servicio JwtService para obtener el nombre de usuario.
     * 
     * @throws ResourceHttpStatusException si el menú no se encuentra.
     * @param uuid UUID del menú a eliminar.
     */
    public void delete(String uuid) {
        Menu menu = menuRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Menu no encontrado", HttpStatus.NOT_FOUND));
        menu.setStatus("X");
        menu.setUser(jwtService.getUsername());
        menuRepository.save(menu);
    }

    /**
     * Cambia el orden de un menú dentro de su módulo.
     * 
     * Permite mover un menú a la primera, última, arriba o abajo en la lista de menús
     * del mismo módulo. Actualiza el orden de todos los menús después de realizar el
     * cambio.
     * 
     * @param uuid    UUID del menú a cambiar de orden.
     * @param acction Acción a realizar: "FIRST", "UP", "DOWN", "LAST".
     */
    public void changeOrder(String uuid, String acction) {
        Menu menuPivot = menuRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceHttpStatusException("Menu no encontrado", HttpStatus.NOT_FOUND));

        LinkedList<Menu> listMenus = new LinkedList<>(
                menuRepository.findByIdModule(menuPivot.getIdModule()).orElseThrow(
                        () -> new ResourceHttpStatusException("Menus no encontrados", HttpStatus.NOT_FOUND)));

        int selectedPosition = listMenus.indexOf(listMenus.stream()
                .filter(menu -> menu.getUuid().equals(uuid))
                .findFirst()
                .orElseThrow(() -> new ResourceHttpStatusException("Menu no encontrado", HttpStatus.NOT_FOUND)));
    
        switch (acction) {
            case "FIRST":
                menuPivot = listMenus.remove(selectedPosition);
                listMenus.addFirst(menuPivot);
                break;
            case "UP":
                if (selectedPosition > 0) {
                    menuPivot = listMenus.remove(selectedPosition);
                    listMenus.add(selectedPosition - 1, menuPivot);
                }
                break;
            case "DOWN":
                if (selectedPosition < listMenus.size() - 1) {
                    menuPivot = listMenus.remove(selectedPosition);
                    listMenus.add(selectedPosition + 1, menuPivot);
                }
                break;
            case "LAST":
                menuPivot = listMenus.remove(selectedPosition);
                listMenus.addLast(menuPivot);
                break;
            default:
                break;
        }
        AtomicLong counter = new AtomicLong(1);
        listMenus.forEach(item -> {
            item.setOrder(counter.getAndIncrement());
            menuRepository.saveAndFlush(item);
        });
    }
}