package com.eden.service.product;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eden.dto.product.BundleResponse;
import com.eden.repository.BundleRepository;

@Service
public class BundleService {

    private final BundleRepository bundleRepository;

    public BundleService(BundleRepository bundleRepository) {
        this.bundleRepository = bundleRepository;
    }

    public List<BundleResponse> getAllBundles() {
        return bundleRepository.findAllByOrderByNameAsc()
                .stream()
                .map(bundle -> new BundleResponse(bundle.getId(), bundle.getName()))
                .toList();
    }
}
