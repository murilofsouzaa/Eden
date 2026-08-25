package com.eden.service.accessory;

import java.util.List;

import com.eden.dto.accessory.AccessoryResponse;

public interface AccessoryService {

    List<AccessoryResponse> getAllAccessories();

    AccessoryResponse getAccessoryById(Long id);
}