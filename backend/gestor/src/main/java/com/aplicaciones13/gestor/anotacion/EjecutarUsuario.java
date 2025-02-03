package com.aplicaciones13.gestor.anotacion;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Anotación que se encarga de asignar el usuario logueado a las entidades que implementan la interfaz UuidUsuarioFechaPrograma.
 * 
 * @author omargo33
 * @since 2025-01-24
 * 
 * @see com.aplicaciones13.gestor.aspect.SetUsuarioAspect
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface EjecutarUsuario {
}