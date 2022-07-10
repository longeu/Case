package com.demo.mock_project.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductModel extends BaseModel {

  @NotBlank(message = "Name is required")
  private String name;

  private String description;

  private String image;

  private Integer status;

  private Integer categoryId;

  private String categoryName;

  private Set<ProductDetailModel> productDetails;
}
