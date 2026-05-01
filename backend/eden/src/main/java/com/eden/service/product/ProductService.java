package com.eden.service.product;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.eden.dto.product.CreateProductRequest;
import com.eden.dto.product.ProductResponse;
import com.eden.dto.product.ProductVariantRequest;
import com.eden.dto.product.ProductVariantResponse;
import com.eden.dto.product.UpdateProductRequest;
import com.eden.mapper.ProductMapper;
import com.eden.model.order.OrderStatus;
import com.eden.model.product.Product;
import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;
import com.eden.model.product.ProductImage;
import com.eden.model.product.ProductStatus;
import com.eden.model.product.ProductVariant;
import com.eden.repository.OrderItemRepository;
import com.eden.repository.ProductRepository;
import com.eden.repository.ProductVariantRepository;

@Service
public class ProductService <T>{

    final private ProductRepository productRepository;
    final private OrderItemRepository orderItemRepository;
    final private ProductVariantRepository productVariantRepository;

    public ProductService(ProductRepository productRepository,
        OrderItemRepository orderItemRepository,
        ProductVariantRepository productVariantRepository
    ){
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.productVariantRepository = productVariantRepository;
    }

    public ProductResponse createProduct(CreateProductRequest request){
        validateCreateRequest(request);

        Product product = new Product();
        product.setTitle(request.title());
        product.setDescription(request.description());
        product.setImageUrl(request.imageUrl());
        product.setModeling(request.modeling());
        product.setWeight(request.weight());
        product.setMaterial(request.material());

        applyGallery(product, request.imageUrl(), request.gallery());
        request.variants().forEach(variantRequest -> product.addVariant(toVariantEntity(variantRequest)));
        ensureDefaultVariant(product);

        Product saved = productRepository.save(product);
        return ProductMapper.toResponse(saved);
    }

    public ProductResponse updateProduct(Long id, UpdateProductRequest request){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        if (request.title() != null && !request.title().isBlank()) {
            product.setTitle(request.title());
        }
        if (request.description() != null && !request.description().isBlank()) {
            product.setDescription(request.description());
        }
        if (request.imageUrl() != null) {
            product.setImageUrl(request.imageUrl());
        }
        if (request.modeling() != null) {
            product.setModeling(request.modeling());
        }
        if (request.weight() != null) {
            product.setWeight(request.weight());
        }
        if (request.material() != null) {
            product.setMaterial(request.material());
        }

        if (request.gallery() != null || request.imageUrl() != null) {
            String hero = request.imageUrl() != null ? request.imageUrl() : product.getImageUrl();
            applyGallery(product, hero, request.gallery());
        }

        if (request.variants() != null && !request.variants().isEmpty()) {
            product.getVariants().clear();
            request.variants().forEach(variantRequest -> product.addVariant(toVariantEntity(variantRequest)));
            ensureDefaultVariant(product);
        }

        Product saved = productRepository.save(product);
        return ProductMapper.toResponse(saved);
    }

    public ProductResponse deleteProduct(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        productRepository.delete(product);

        return ProductMapper.toResponse(product);
    }

    public ProductResponse getProductById(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        return ProductMapper.toResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAllWithDetails();
        return ProductMapper.toResponseList(products);
    }

    public ProductVariantResponse getVariant(Long id) {
        ProductVariant variant = productVariantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Variant not found"));
        return ProductMapper.toVariantResponse(variant);
    }
    
    public List<ProductResponse> getAllAvailableProducts(){
        List<Product> products = productRepository.findAllByVariantStatus(ProductStatus.AVAILABLE);
        return ProductMapper.toResponseList(products);
    }

    public List<ProductResponse> getAllProductsByCategory(ProductCategories category){
        List<Product> products = productRepository.findAllByVariantCategory(category);
        return ProductMapper.toResponseList(products);
    }

    public List<ProductResponse> getAllProductsBetweenPrice (BigDecimal minPrice, BigDecimal maxPrice){
       List<Product> products = productRepository.findAllByVariantPriceBetween(minPrice, maxPrice);
        return ProductMapper.toResponseList(products);
    }

    public List<ProductResponse> getAllProductsByTextPart(String part){
       List<Product> products = productRepository.searchByTitle(part);
        return ProductMapper.toResponseList(products);
    }

    public List<ProductResponse> getAllProductsByGender(ProductGender gender){
        List<Product> products = productRepository.findAllByVariantGender(gender);
        return ProductMapper.toResponseList(products);
    }

    public List<ProductResponse> getAllAcessories(){
        List<Product> products = productRepository.findAllByVariantCategories(
            List.of(
                ProductCategories.BAGS,
                ProductCategories.CAPS,
                ProductCategories.BELTS,
                ProductCategories.HATS,
                ProductCategories.WATER_BOTTLE,
                ProductCategories.ACCESSORY
            )
        );
        return ProductMapper.toResponseList(products);
    }   

    public List<ProductResponse> getBestSellers(OrderStatus status){
        List<Long> productIds = orderItemRepository.findTopBestSellerIds(status);
        if (productIds.isEmpty()) {
            return List.of();
        }

        List<Product> products = productRepository.findAllWithDetailsByIdIn(productIds);
        java.util.Map<Long, Product> productById = products.stream()
                .collect(java.util.stream.Collectors.toMap(Product::getId, product -> product));

        List<Product> orderedProducts = productIds.stream()
                .map(productById::get)
                .filter(Objects::nonNull)
                .toList();

        return ProductMapper.toResponseList(orderedProducts);
    }


    private void validateCreateRequest(CreateProductRequest request) {
        if (request.title() == null || request.title().isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or blank");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Description cannot be null or blank");
        }
        if (request.variants() == null || request.variants().isEmpty()) {
            throw new IllegalArgumentException("At least one variant is required");
        }
        request.variants().forEach(variant -> {
            if (variant.price() == null) {
                throw new IllegalArgumentException("Variant price cannot be null");
            }
            if (variant.status() == null) {
                throw new IllegalArgumentException("Variant status cannot be null");
            }
            if (variant.stock() < 0) {
                throw new IllegalArgumentException("Variant stock cannot be negative");
            }
        });
    }

    

    private void applyGallery(Product product, String heroImage, List<String> gallery) {
        product.getImages().clear();
        List<String> resolvedGallery = new ArrayList<>();

        if (gallery != null && !gallery.isEmpty()) {
            gallery.stream()
                    .filter(Objects::nonNull)
                    .filter(url -> !url.isBlank())
                    .forEach(resolvedGallery::add);
        }

        if (resolvedGallery.isEmpty() && heroImage != null && !heroImage.isBlank()) {
            resolvedGallery.add(heroImage);
        }

        boolean isFirst = true;
        for (String url : resolvedGallery) {
            ProductImage image = new ProductImage();
            image.setUrl(url);
            image.setMain(isFirst);
            product.addImage(image);
            isFirst = false;
        }

        if (!resolvedGallery.isEmpty()) {
            product.setImageUrl(resolvedGallery.get(0));
        }
    }

    private ProductVariant toVariantEntity(ProductVariantRequest request) {
        ProductVariant variant = new ProductVariant();
        variant.setSku(request.sku());
        variant.setColor(request.color());
        variant.setSize(request.size());
        variant.setPrice(request.price());
        variant.setStock(request.stock());
        variant.setStatus(request.status());
        variant.setDefaultVariant(Boolean.TRUE.equals(request.defaultVariant()));
        return variant;
    }

    private void ensureDefaultVariant(Product product) {
        boolean hasDefault = product.getVariants().stream().anyMatch(ProductVariant::isDefaultVariant);
        if (!hasDefault && !product.getVariants().isEmpty()) {
            product.getVariants().iterator().next().setDefaultVariant(true);
        }
    }
}

