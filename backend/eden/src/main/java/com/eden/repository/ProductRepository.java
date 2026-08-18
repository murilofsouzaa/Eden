package com.eden.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eden.model.product.Product;
import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;
import com.eden.model.product.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p")
    List<Product> findAllWithDetails();

    @Override
    @EntityGraph(attributePaths = {"variants", "images"})
    Optional<Product> findById(Long id);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p JOIN p.variants v WHERE v.status = :status")
    List<Product> findAllByVariantStatus(@Param("status") ProductStatus status);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p JOIN p.variants v WHERE v.category = :category")
    List<Product> findAllByVariantCategory(@Param("category") ProductCategories category);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p JOIN p.variants v WHERE v.category = :category AND v.gender = :gender")
    List<Product> findAllByVariantCategoryAndGender(@Param("category") ProductCategories category, @Param("gender") ProductGender gender);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p WHERE LOWER(p.modeling) = LOWER(:modeling)")
    List<Product> findAllByModelingIgnoreCase(@Param("modeling") String modeling);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p JOIN p.variants v WHERE v.gender = :gender")
    List<Product> findAllByVariantGender(@Param("gender") ProductGender gender);

        @EntityGraph(attributePaths = {"variants", "images"})
        @Query("""
                        SELECT DISTINCT p FROM Product p JOIN p.variants v
                        WHERE (:min IS NULL OR v.price >= :min)
                            AND (:max IS NULL OR v.price <= :max)
                        """)
        List<Product> findAllByVariantPriceBetween(@Param("min") BigDecimal minPrice, @Param("max") BigDecimal maxPrice);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :part, '%'))")
    List<Product> searchByTitle(@Param("part") String part);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p JOIN p.variants v WHERE v.category IN :categories")
    List<Product> findAllByVariantCategories(@Param("categories") List<ProductCategories> categories);

    @EntityGraph(attributePaths = {"variants", "images"})
    @Query("SELECT DISTINCT p FROM Product p WHERE p.id IN :ids")
    List<Product> findAllWithDetailsByIdIn(@Param("ids") List<Long> ids);
}
