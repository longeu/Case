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
public class  CategoryModel extends BaseModel {

  @NotBlank(message = "Name is required")
  private String name;

  private String code;

  private String description;
}
