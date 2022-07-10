package com.demo.mock_project.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class LoginModel {
  @NotBlank
  @Size(min = 3, max = 60)
  private String username;

  @NotBlank
  @Size(min = 8, max = 40)
  private String password;
}
