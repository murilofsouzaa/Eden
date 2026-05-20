package com.eden.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eden.model.accessory.Accessory;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
}