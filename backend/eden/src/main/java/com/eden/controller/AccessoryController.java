package com.eden.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eden.dto.accessory.AccessoryResponse;
import com.eden.service.accessory.AccessoryService;

@RestController
@RequestMapping("/acessories")
public class AccessoryController {

    private final AccessoryService accessoryService;

    public AccessoryController(AccessoryService accessoryService) {
        this.accessoryService = accessoryService;
    }

    @GetMapping
    public ResponseEntity<List<AccessoryResponse>> getAllAccessories() {
        return ResponseEntity.ok(accessoryService.getAllAccessories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccessoryResponse> getAccessoryById(@org.springframework.web.bind.annotation.PathVariable Long id) {
        return ResponseEntity.ok(accessoryService.getAccessoryById(id));
    }
}