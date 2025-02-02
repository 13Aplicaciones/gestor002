package com.aplicaciones13.gestor_ws.aspect;

import java.lang.reflect.Field;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aplicaciones13.gestor_ws.anotacion.SetUsuario;
import com.aplicaciones13.gestor_ws.services.JwtService;

import lombok.extern.slf4j.Slf4j;

/**
 * Aspecto que se encarga de asignar el usuario logueado a las entidades que implementan la interfaz UuidUsuarioFechaPrograma.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@Slf4j
@Aspect
@Component
public class SetUsuarioAspect {

    @Autowired
    private JwtService jwtService;
                         
    @Around("@annotation(com.aplicaciones13.gestor_ws.anotacion.EjecutarUsuario)")
    public Object setUsuario(ProceedingJoinPoint joinPoint) throws Throwable  {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            agregarUsuario(arg);
        }
        return joinPoint.proceed();
    }

    /**
     * Método que se encarga de asignar el usuario logueado a los campos que tengan la anotación SetUsuario.
     * 
     * @param objeto
     */
    private void agregarUsuario(Object objeto) {
        Class<?> clazz = objeto.getClass();
        while (clazz != null) {
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(SetUsuario.class)) {
                    field.setAccessible(true);
                    try {
                        field.set(objeto, jwtService.getUsername());
                    } catch (IllegalAccessException e) {
                        log.error("Error al agregarUsuario el campo: {} {}", field.getName(), e.getMessage());
                    }
                }
            }
            clazz = clazz.getSuperclass();
        }
    }
}