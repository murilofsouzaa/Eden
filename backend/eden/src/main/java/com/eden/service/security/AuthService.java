package com.eden.service.security;

import com.eden.dto.login.JwtAuthenticationResponse;
import com.eden.dto.login.LoginRequest;

public interface AuthService {

    JwtAuthenticationResponse authenticate(LoginRequest loginRequest);
}
