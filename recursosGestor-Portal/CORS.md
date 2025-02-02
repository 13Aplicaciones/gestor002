Configurar CORS (Cross-Origin Resource Sharing) en una aplicación Spring Boot con seguridad habilitada puede ser un poco complicado si no se hace correctamente. A continuación, te guiaré paso a paso para configurar CORS en tu aplicación Spring Boot 3.4.2 con Spring Security.

  
### 1. **Habilitar CORS en Spring Boot**  
  
Primero, asegúrate de que tienes una configuración básica de CORS en tu aplicación Spring Boot. Puedes hacerlo de varias maneras:  
  
#### **Opción 1: Configuración Global de CORS**  
  
Puedes configurar CORS globalmente en tu aplicación Spring Boot utilizando un `WebMvcConfigurer`.  
  
```java  
import org.springframework.context.annotation.Configuration;  
import org.springframework.web.servlet.config.annotation.CorsRegistry;  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;  
  
@Configuration  
public class CorsConfig implements WebMvcConfigurer {  
  
    @Override  
    public void addCorsMappings(CorsRegistry registry) {  
        registry.addMapping("/**")  
                .allowedOrigins("[http://localhost:3000](http://localhost:3000/)") // Permite solicitudes desde este origen  
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos  
                .allowedHeaders("*") // Cabeceras permitidas  
                .allowCredentials(true); // Permite credenciales (cookies, autenticación)  
    }  
}  
```  
  
#### **Opción 2: Configuración de CORS en un Controlador Específico**  
  
Si prefieres configurar CORS solo para ciertos endpoints, puedes usar la anotación `@CrossOrigin` en tu controlador.  
  
```java  
import org.springframework.web.bind.annotation.CrossOrigin;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
@CrossOrigin(origins = "[http://localhost:3000](http://localhost:3000/)", allowCredentials = "true")  
public class MyController {  
  
    @GetMapping("/mi-endpoint")  
    public String miEndpoint() {  
        return "Hola, mundo!";  
    }  
}  
```  
  
### 2. **Configurar CORS en Spring Security**  
  
Si tienes Spring Security habilitado en tu aplicación, es probable que necesites configurar CORS también en la configuración de seguridad. Spring Security puede bloquear las solicitudes CORS si no se configura correctamente.  
  
#### **Configuración de CORS en Spring Security**  
  
En tu configuración de seguridad, asegúrate de permitir las solicitudes CORS. Aquí tienes un ejemplo de cómo hacerlo:  
  
```java  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.security.config.annotation.web.builders.HttpSecurity;  
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;  
import org.springframework.security.web.SecurityFilterChain;  
import org.springframework.web.cors.CorsConfiguration;  
import org.springframework.web.cors.CorsConfigurationSource;  
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;  
  
import java.util.Arrays;  
  
@Configuration  
@EnableWebSecurity  
public class SecurityConfig {  
  
    @Bean  
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {  
        http  
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Habilita CORS  
            .csrf(csrf -> csrf.disable()) // Deshabilita CSRF si no lo necesitas  
            .authorizeHttpRequests(auth -> auth  
                .requestMatchers("/public/**").permitAll() // Permite acceso público a ciertos endpoints  
                .anyRequest().authenticated() // Requiere autenticación para el resto  
            );  
  
        return http.build();  
    }  
  
    @Bean  
    public CorsConfigurationSource corsConfigurationSource() {  
        CorsConfiguration configuration = new CorsConfiguration();  
        configuration.setAllowedOrigins(Arrays.asList("[http://localhost:3000](http://localhost:3000/)")); // Orígenes permitidos  
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos permitidos  
        configuration.setAllowedHeaders(Arrays.asList("*")); // Cabeceras permitidas  
        configuration.setAllowCredentials(true); // Permite credenciales  
  
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
        source.registerCorsConfiguration("/**", configuration); // Aplica la configuración a todos los endpoints  
  
        return source;  
    }  
}  
```  
  
### 3. **Consideraciones Adicionales**  
  
- **CSRF**: Si tu aplicación no necesita protección CSRF (por ejemplo, si solo estás construyendo una API REST), puedes deshabilitarla con `.csrf(csrf -> csrf.disable())`. Sin embargo, si tu aplicación maneja formularios HTML, es recomendable mantener CSRF habilitado.  
  
- **Cabeceras Personalizadas**: Si estás utilizando cabeceras personalizadas en tus solicitudes, asegúrate de que estén permitidas en la configuración de CORS.  
  
- **Pruebas**: Asegúrate de probar tu configuración de CORS desde un cliente real (por ejemplo, una aplicación frontend) para verificar que todo funcione como se espera.  
  
### 4. **Depuración de Problemas**  
  
Si sigues teniendo problemas con CORS, puedes habilitar el registro de depuración para ver qué está bloqueando las solicitudes:  
  
```yaml  
logging:  
  level:  
    org.springframework.security: DEBUG  
    org.springframework.web: DEBUG  
```  
  
Esto te dará más información sobre por qué las solicitudes CORS están siendo bloqueadas.  
  
### Resumen  
  
1. Configura CORS globalmente o por controlador.  
2. Asegúrate de que Spring Security permita las solicitudes CORS.  
3. Deshabilita CSRF si no lo necesitas.  
4. Prueba y depura tu configuración.  
  
Con estos pasos, deberías poder resolver los problemas de configuración de CORS en tu aplicación Spring Boot con Spring Security.  

  

  
