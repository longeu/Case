package com.demo.mock_project.model;

import java.math.BigDecimal;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class OrderDetailCreate  extends BaseModel{
  private BigDecimal price;
  private Integer quantity;
  private ProductDetailModel productDetailModel;
  private BigDecimal discount;
}
