package com.eden.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.eden.dto.product.BundleResponse;
import com.eden.service.product.BundleService;

@CrossOrigin(origins = {"https://edenclothing.vercel.app", "https://eden-927f-hidbs269m-murilofsouzaas-projects.vercel.app"})

@RestController
@RequestMapping("/api/bundles")
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
