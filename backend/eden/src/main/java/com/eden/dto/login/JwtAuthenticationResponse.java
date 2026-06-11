package com.eden.dto.login;

public record JwtAuthenticationResponse(
    String accessToken,
    String tokenType
) {

    public JwtAuthenticationResponse(String accessToken) {
        this(accessToken, "Bearer");
    }
}