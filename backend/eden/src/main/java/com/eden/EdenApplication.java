package com.eden;

import java.nio.file.Path;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EdenApplication {

	public static void main(String[] args) {
		SpringApplication.run(EdenApplication.class, args);
	}


	//Testando o user.dir e o path
	@Bean
	public ApplicationRunner runner(){
		return args ->{
			try {
				Path current = Path.of(System.getProperty("user.dir"));
				Path parent = current.getParent();
				Path grandParent = parent != null ? parent.getParent() : null;

				if (grandParent != null) {
					Path clothesDir = grandParent.resolve("frontend").resolve("public").resolve("clothes");
					System.out.println(grandParent);
					System.out.println(clothesDir);
				} else {
					// Running in an environment where the expected parent directories
					// are not present (for example, inside a container). Skip this
					// startup-only filesystem check.
					System.out.println("Base directory not available; skipping filesystem checks.");
				}
			} catch (Exception ex) {
				System.out.println("Exception while computing baseDir: " + ex.getMessage());
			}
			 
		};
	}

}
