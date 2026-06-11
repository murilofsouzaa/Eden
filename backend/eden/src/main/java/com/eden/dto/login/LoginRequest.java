package com.eden.dto.login; 

public record LoginRequest(
    String username,
    String password
) {}