package com.aplicaciones13.orquestador.model;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "view_config_permission")
@Data
public class ConfigPermission {

    @Id
    @Column(name = "row_num")
    private Long rowNum;

    @Column(name = "rol_user_id_rol_user")
    private Long idRolUser;

    @Column(name = "rol_user_id_rol")
    private Long idRol;

    @Column(name = "rol_user_id_user")
    private Long idUser;

    @Column(name = "permission_id_permission")
    private Long idPermission;

    @Column(name = "permission_id_menu")
    private Long idMenu;

    @Column(name = "permission_create")
    private String create;

    @Column(name = "permission_update")
    private String update;

    @Column(name = "permission_delete")
    private String delete;

    @Column(name = "permission_audit")
    private String audit;

    @Column(name = "menu_id_menu")
    private Long menuIdMenu;

    @Column(name = "menu_id_module")
    private Long menuIdModule;

    @Column(name = "menu_type")
    private String menuType;

    @Column(name = "menu_index")
    private String menuIndex;

    @Column(name = "menu_name")
    private String menuName;

    @Column(name = "menu_task_flow")
    private String menuTaskFlow;

    @Column(name = "menu_status")
    private String menuStatus;

    @Column(name = "menu_orden")
    private Integer menuOrden;

    @Column(name = "menu_icon")
    private String menuIcon;

    @Column(name = "module_id_module")
    private Long moduleIdModule;

    @Column(name = "module_index")
    private String moduleIndex;

    @Column(name = "module_name")
    private String moduleName;

    @Column(name = "module_context")
    private String moduleContext;

    @Column(name = "module_status")
    private String moduleStatus;

    @Column(name = "module_uuid")
    private String moduleUuid;

    @Column(name = "module_icon")
    private String moduleIcon;
}