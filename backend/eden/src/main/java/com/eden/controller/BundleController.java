package com.eden.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eden.dto.product.BundleResponse;
import com.eden.service.product.BundleService;

@RestController
@RequestMapping("/bundles")
public class BundleController {

    private final BundleService bundleService;

    public BundleController(BundleService bundleService) {
        this.bundleService = bundleService;
    }

    @GetMapping
    public ResponseEntity<List<BundleResponse>> getAllBundles() {
        return ResponseEntity.ok(bundleService.getAllBundles());
    }
}
