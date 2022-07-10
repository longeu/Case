package com.demo.mock_project.model;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
public class ProductDetailModel extends BaseModel {

  @NotNull
  private Integer productId;

  private String productName;

  @NotBlank(message = "Size is required")
  private String size;

  @NotBlank(message = "Color is required")
  private String color;


  private String code;


  private String barCode;

  private String image;

  private Integer status;

  @Min(value = 0)
  private BigDecimal price;

  @Min(value = 0)
  private BigDecimal priceSell;

  @Min(value = 0)
  private int quantity;

  @Min(value = 0)
  @Max(value =100)
  private float discount;

  @Min(value = 0)
  @Max(value =100)
  private float discountSell;
  
  @Min(value = 0)
  private Integer quantitySell;

  private String description;

}

