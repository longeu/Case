package com.demo.mock_project.model;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StorageModel extends BaseModel {

  @NotBlank(message = "Name is required")
  private String name;

  @NotBlank(message = "Code is required")
  private String code;

  @NotBlank(message = "Description is required")
  private String description;

  @NotBlank(message = "Address is required")
  private String address;
}
