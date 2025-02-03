package com.aplicaciones13.base.anotacion;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Anotación que se encarga de asignar el user logueado a las entidades que implementan la interfaz UuidUserDateApp.
 * 
 * @author omargo33
 * @since 2025-01-24
 * 
 * @see com.aplicaciones13.gestor.aspect.SetuserAspect
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SetUser {
}