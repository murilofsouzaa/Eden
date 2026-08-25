package com.eden.service.accessory;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eden.dto.accessory.AccessoryResponse;
import com.eden.exception.ResourceNotFoundException;
import com.eden.model.accessory.Accessory;
import com.eden.repository.AccessoryRepository;

@Service
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;

    public AccessoryServiceImpl(AccessoryRepository accessoryRepository) {
        this.accessoryRepository = accessoryRepository;
    }

    @Override
    public List<AccessoryResponse> getAllAccessories() {
        return accessoryRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public AccessoryResponse getAccessoryById(Long id) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accessory not found with id: " + id));

        return toResponse(accessory);
    }

    private AccessoryResponse toResponse(Accessory accessory) {
        return new AccessoryResponse(
                accessory.getId(),
                accessory.getTitle(),
                accessory.getStock(),
                accessory.getMaterial(),
                accessory.getWeight(),
                accessory.getDescription(),
                accessory.getBrand(),
                resolveImageUrl(accessory),
                accessory.getPrice() == null ? java.math.BigDecimal.ZERO : accessory.getPrice(),
                accessory.getDiscountPercentage()
        );
    }

    private String resolveImageUrl(Accessory accessory) {
        if (accessory.getTitle() == null) {
            return "/icons/empty-box.png";
        }
        return switch (accessory.getTitle()) {
            case "Lifting Essentials" -> "/acessories/30-04-26-Lifting-Essentials.jpeg";
            case "Gym FZS AN07" -> "/acessories/30-04-26-gym-fzs-an07.jpeg";
            case "Black Strap" -> "/acessories/gymshark-black-strap.jpeg";
            case "Prada Water Bottle" -> "/acessories/prada-water-bottle.jpeg";
            case "Tornozeleira Bala" -> "/acessories/tornozeleira-bala.jpeg";
            case "Wrist Wraps HB" -> "/acessories/wrist-wraps-hb.jpeg";
            default -> "/icons/empty-box.png";
        };
    }
}
