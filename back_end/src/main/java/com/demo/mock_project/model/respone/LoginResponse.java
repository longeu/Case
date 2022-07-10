package com.demo.mock_project.model.respone;


import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginResponse {
    private Long id;
    private String fullName;
    private String phone;
    private String username;
    private String image;
    private String token;
    private Set<String> scopes;
}
