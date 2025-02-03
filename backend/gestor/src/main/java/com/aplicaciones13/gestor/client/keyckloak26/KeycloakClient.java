package com.aplicaciones13.gestor.client.keyckloak26;

import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.aplicaciones13.gestor.client.keyckloak26.KeycloakRequest.ApplicationTokenRequest;
import com.aplicaciones13.gestor.client.keyckloak26.KeycloakRequest.UserRequest;
import com.aplicaciones13.gestor.client.keyckloak26.KeycloakRequest.UserScopeRequest;
import com.aplicaciones13.gestor.client.keyckloak26.KeycloakResponse.KeycloakTokenResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

/**
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 2024-12-22
 * 
 */
@Component
public class KeycloakClient {
    private final RestTemplate restTemplate;

    /**
     * Constructor
     * 
     * @param restTemplate
     */
    public KeycloakClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Metodo para obtener un token de acceso a partir de un user y contraseña
     * 
     * @param url
     * @param clientId
     * @param userName
     * @param password
     * @param grantType
     * @return
     */
    public KeycloakTokenResponse fetchToken(String url, UserRequest userRequest) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", userRequest.getClientId());
        body.add("username", userRequest.getUsername());
        body.add("password", userRequest.getPassword());
        body.add("grant_type", userRequest.getGrantType());

        return fetchFormUrlEncoded(url, body, KeycloakTokenResponse.class);
    }

    /**
     * Metodo para obtener un token de acceso a partir de un cliente y un secreto
     * 
     * @param url
     * @param clientId
     * @param clientSecret
     * @param grantType
     * @return
     */
    public KeycloakTokenResponse fetchToken(String url, ApplicationTokenRequest applicationTokenRequest) {

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", applicationTokenRequest.getClientId());
        body.add("client_secret", applicationTokenRequest.getClientSecret());
        body.add("grant_type", applicationTokenRequest.getGrantType());

        return fetchFormUrlEncoded(url, body, KeycloakTokenResponse.class);
    }

    /**
     * Metodo para obtener un token de acceso a partir de un cliente, un secreto; un
     * user y contraseña, y scope
     * 
     * @param url
     * @param clientId
     * @param clientSecret
     * @param grantType
     * @return
     */
    public KeycloakTokenResponse fetchToken(String url, UserScopeRequest userScopeRequest) {

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", userScopeRequest.getClientId());
        body.add("client_secret", userScopeRequest.getClientSecret());
        body.add("grant_type", userScopeRequest.getGrantType());
        body.add("username", userScopeRequest.getUsername());
        body.add("password", userScopeRequest.getPassword());
        body.add("scope", userScopeRequest.getScope());

        return fetchFormUrlEncoded(url, body, KeycloakTokenResponse.class);
    }

    /**
     * Metodo para obtener un token de acceso a partir de un cliente, un secreto; un
     * 
     * @param <V>
     * @param url
     * @param body
     * @param responseType
     * @return
     */
    private <V> V fetchFormUrlEncoded(String url, MultiValueMap<String, String> body, Class<V> responseType) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<V> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    responseType);

            if (response.getStatusCode() != HttpStatus.OK) {
                //TODO
                //throw new ResourceHttpStatusException("Failed to fetch token", response.getStatusCode());
            }
            return response.getBody();
         } catch (HttpClientErrorException e) {
            //TODO
            //throw new ResourceHttpStatusException(e.getStatusText(), e.getStatusCode());
            return null;
        } 
    }
}
