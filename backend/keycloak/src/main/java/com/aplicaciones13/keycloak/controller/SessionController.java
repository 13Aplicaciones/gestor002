package com.aplicaciones13.keycloak.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.keycloak.services.SessionManagementService;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionManagementService sessionService;

    public SessionController(SessionManagementService sessionService) {
        this.sessionService = sessionService;
    }
    
    @PostMapping("/logout/all")
    public ResponseEntity<Void> logoutAllUsers() {
        sessionService.logoutAllUsers();
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/logout/user/{userId}")
    public ResponseEntity<Void> logoutUser(@PathVariable String userId) {
        sessionService.logoutUser(userId);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/logout/group/{groupId}")
    public ResponseEntity<Void> logoutUsersByGroup(@PathVariable String groupId) {
        sessionService.logoutUsersByGroup(groupId);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/logout/role/{roleName}")
    public ResponseEntity<Void> logoutUsersByRole(@PathVariable String roleName) {
        sessionService.logoutUsersByRole(roleName);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserSessions(@PathVariable String userId) {
        return ResponseEntity.ok(sessionService.getUserSessions(userId));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllActiveSessions() {
        return ResponseEntity.ok(sessionService.getAllActiveSessions());
    }
    
    @PostMapping("/revoke/client/{clientId}")
    public ResponseEntity<Void> revokeClientTokens(
            @PathVariable String clientId,
            @RequestBody Map<String, Long> body) {
        
        Long notBefore = body.getOrDefault("notBefore", System.currentTimeMillis() / 1000);
        sessionService.revokeClientTokens(clientId, notBefore);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/revoke/realm")
    public ResponseEntity<Void> revokeRealmTokens(@RequestBody Map<String, Long> body) {
        Long notBefore = body.getOrDefault("notBefore", System.currentTimeMillis() / 1000);
        sessionService.revokeRealmTokens(notBefore);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/revoke/token")
    public ResponseEntity<Void> revokeToken(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        sessionService.revokeToken(token);
        return ResponseEntity.ok().build();
    }
}