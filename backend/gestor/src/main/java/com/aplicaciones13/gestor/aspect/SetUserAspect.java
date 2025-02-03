package com.aplicaciones13.gestor.aspect;

import java.lang.reflect.Field;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aplicaciones13.gestor.anotacion.SetUser;
import com.aplicaciones13.gestor.services.JwtService;

import lombok.extern.slf4j.Slf4j;

/**
 * Aspecto que se encarga de asignar el user logueado a las entidades que implementan la interfaz UuidUserDateApp.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@Slf4j
@Aspect
@Component
public class SetUserAspect {

    @Autowired
    private JwtService jwtService;
                         
    @Around("@annotation(com.aplicaciones13.gestor.anotacion.InvokeUser)")
    public Object setUsuer(ProceedingJoinPoint joinPoint) throws Throwable  {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            addUser(arg);
        }
        return joinPoint.proceed();
    }

    /**
     * Método que se encarga de asignar el user logueado a los campos que tengan la anotación Setuser.
     * 
     * @param objeto
     */
    private void addUser(Object objeto) {
        Class<?> clazz = objeto.getClass();
        while (clazz != null) {
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(SetUser.class)) {
                    field.setAccessible(true);
                    try {
                        field.set(objeto, jwtService.getUsername());
                    } catch (IllegalAccessException e) {
                        log.error("Error al agregaruser el campo: {} {}", field.getName(), e.getMessage());
                    }
                }
            }
            clazz = clazz.getSuperclass();
        }
    }
}