// Spring Web imports
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// Spring Core and HTTP imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

// Spring Security Core imports
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

// Custom project imports (Adjust these package paths to match your project structure)


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to connect
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // 1. Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Generate the JWT
        String jwt = tokenProvider.generateToken(authentication);
        
        // 3. Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}