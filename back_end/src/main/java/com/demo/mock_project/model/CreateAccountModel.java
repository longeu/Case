package com.demo.mock_project.model;
import java.util.Date;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class CreateAccountModel {
  @NotBlank(message = "Username is required")
  private String username;
  @NotBlank(message = "Password is required")
  @Size(min = 8,message ="Password must be at least 8 characters")
  private String password;

  private String image;

  @NotBlank(message = "FullName is required")
  private String fullName;

  @NotBlank(message = "Phone is required")
  @Pattern(regexp="(^$|[0-9]{10})",message = "Phone number is not in the correct format")
  private String phone;

  @NotNull(message = "Birth is required")
  private Date birth;


  private String address;
  @NotBlank(message = "Address  is required")
  private String addressDetail;
  @NotEmpty(message = "Roles is required")
  private Set<Long> roles;
  private boolean gender;

  private  Integer status;
  

}
