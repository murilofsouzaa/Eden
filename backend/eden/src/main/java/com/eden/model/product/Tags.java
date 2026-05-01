package com.eden.model.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="tags")
public class Tags{
    Long id;
    String name;
}