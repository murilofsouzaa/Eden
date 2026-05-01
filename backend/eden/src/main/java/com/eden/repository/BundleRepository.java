package com.eden.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eden.model.product.Bundle;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, Long> {
    List<Bundle> findAllByOrderByNameAsc();
}
