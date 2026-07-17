package com.eden.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eden.dto.product.CreateProductRequest;
import com.eden.dto.product.ProductResponse;
import com.eden.dto.product.ProductVariantResponse;
import com.eden.dto.product.UpdateProductRequest;
import com.eden.model.order.OrderStatus;
import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;
import com.eden.service.product.ProductService;

import jakarta.validation.Valid;
//Verificar se alguma coisa veio null, quando não podia
//O spring recebe o JSON
//Converte para User
//O @Valid dispara a validação
//Se der erro ele sequer entra no método

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    //TODO add pagination
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/variants/{id}")
    public ResponseEntity<ProductVariantResponse> getVariants(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getVariant(id));
    }

    //TODO add pagination
    @GetMapping("/available")
    public ResponseEntity<List<ProductResponse>> getAllAvailableProducts(){
        return ResponseEntity.ok(productService.getAllAvailableProducts());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByCategory(@PathVariable String category){
        ProductCategories enumCategory = ProductCategories.valueOf(category.toUpperCase());
        return ResponseEntity.ok(productService.getAllProductsByCategory(enumCategory));
    }

    @GetMapping("/modeling/{modeling}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByModeling(@PathVariable String modeling){
        return ResponseEntity.ok(productService.getAllProductsByModeling(modeling));
    }

    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByGender(@PathVariable String gender){
        ProductGender enumGender = ProductGender.valueOf(gender.toUpperCase());
        return ResponseEntity.ok(productService.getAllProductsByGender(enumGender));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/acessories")
    public ResponseEntity<List<ProductResponse>> getAllAcessories(){
        return ResponseEntity.ok(productService.getAllAcessories());
    }

    @GetMapping("/filter/price")
    public ResponseEntity<List<ProductResponse>> getAllProductsBetweenPrice(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice){
        return ResponseEntity.ok(productService.getAllProductsBetweenPrice(minPrice, maxPrice));
    }

    @GetMapping("/filter/{part}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByTextPart(@PathVariable String part){
        return ResponseEntity.ok(productService.getAllProductsByTextPart(part));
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<List<ProductResponse>> getBestSellers(
            @RequestParam(defaultValue = "DELIVERED") OrderStatus status){
        return ResponseEntity.ok(productService.getBestSellers(status));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody @Valid CreateProductRequest productRequest){
        return ResponseEntity.ok(productService.createProduct(productRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,
                                                         @RequestBody @Valid UpdateProductRequest updateProductRequest){
        return ResponseEntity.ok(productService.updateProduct(id, updateProductRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable Long id){
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
}
