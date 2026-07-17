package com.eden.dto.user;

import java.time.LocalDate;

import com.eden.model.user.Gender;
import com.eden.model.user.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;


public record CreateUserRequest(

        @NotNull
        String name,
        @NotNull
        LocalDate birthDay,
        Gender gender,
        @Email
        String email,
        @NotNull
        String password,
        UserRole role

) {
}
