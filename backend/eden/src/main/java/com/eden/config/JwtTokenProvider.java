package com.eden.config; // Change this to match your real package

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // IMPORTANT: In production, store this in application.properties and make it a long secure random string.
    private final String jwtSecret = "YourSuperSecretKeyForJWTGenerationThatIsAtLeast32BytesLong!"; 
    private final int jwtExpirationInMs = 3600000; // Token valid for 1 hour
    private final Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

    // Generates a token when a user successfully logs in
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}