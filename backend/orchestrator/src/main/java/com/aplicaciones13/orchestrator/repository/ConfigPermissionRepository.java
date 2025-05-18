package com.aplicaciones13.orchestrator.repository;

import com.aplicaciones13.orchestrator.model.ConfigPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de ConfigPermission
 * 
 * Se encarga de realizar las consultas a la base de datos
 * 
 * @author omargo33
 * @since 1.0
 * 
 */
@Repository
public interface ConfigPermissionRepository extends JpaRepository<ConfigPermission, Long> {
        
    /**
     * Método que permite buscar todos los permisos de un usuario por su id.
     * 
     * @param idUser
     * @return
     */
    @Query(value = "SELECT "
            + "ROW_NUMBER() OVER (ORDER BY mo.orden, m.orden) AS row_num, "             
            + "ru.id_rol_user AS rol_user_id_rol_user, ru.id_rol AS rol_user_id_rol, ru.id_user AS rol_user_id_user, "
            + "p.id_permission AS permission_id_permission, p.id_menu AS permission_id_menu, p.id_rol AS permission_id_rol, p.create AS permission_create, p.update AS permission_update, p.delete AS permission_delete, p.audit AS permission_audit, "
            + "m.id_menu AS menu_id_menu, m.id_module AS menu_id_module, m.type AS menu_type, m.index_menu AS menu_index, m.name AS menu_name, m.task_flow AS menu_task_flow, m.status AS menu_status, m.orden AS menu_orden, "
            + "mo.id_module AS module_id_module, mo.index_module AS module_index, mo.name AS module_name, mo.context AS module_context, mo.status AS module_status, mo.uuid AS module_uuid "
            + "FROM rol_user ru, "
            + "permission p, "
            + "menu m, "
            + "module mo "
            + "WHERE mo.status = 'A' AND m.status = 'A' AND ru.id_user = ? "
            + "AND ru.id_rol = p.id_rol "
            + "AND p.id_menu = m.id_menu "
            + "AND m.id_module = mo.id_module "
            + "order by mo.orden, m.orden" 
            , nativeQuery = true)
    List<ConfigPermission> findAllPermissionsByNick(long idUser);
}
