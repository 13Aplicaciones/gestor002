package com.aplicaciones13.orquestador.repository;

import com.aplicaciones13.orquestador.model.ConfigPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConfigPermissionRepository extends JpaRepository<ConfigPermission, Long> {
    @Query(value = "SELECT " 
            + "u.id_user AS user_id_user, u.nick AS user_nick, u.name AS user_name, u.last_name AS user_last_name, u.status AS user_status, " 
            + "ru.id_rol_user AS rol_user_id_rol_user, ru.id_rol AS rol_user_id_rol, ru.id_user AS rol_user_id_user, " 
            + "p.id_permission AS permission_id_permission, p.id_menu AS permission_id_menu, p.id_rol  AS permission_id_rol, p.create AS permission_create, p.update AS permission_update, p.delete  AS permission_delete, p.audit  AS permission_audit, " 
            + "m.id_menu AS menu_id_menu, m.id_module AS menu_id_module, m.type AS menu_type, m.index AS menu_index, m.name AS menu_name, m.task_flow AS menu_task_flow, m.status AS menu_status, m.orden AS menu_orden, " 
            + "mo.id_module AS module_id_module, mo.index AS module_index, mo.name AS module_name, mo.context AS module_context, mo.status AS module_status, mo.uuid AS module_uuid "
            + "FROM user u "
            + "JOIN rol_user ru ON u.id_user = ru.id_user " 
            + "JOIN permission p ON ru.id_rol = p.id_rol " 
            + "JOIN menu m ON p.id_menu = m.id_menu " 
            + "JOIN module mo ON m.id_module = mo.id_module "
            + "WHERE mo.status = 'A' AND m.status = 'A' AND u.nick = ?", nativeQuery = true)

    List<ConfigPermission> findAllPermissionsByNick(String nick);
}
