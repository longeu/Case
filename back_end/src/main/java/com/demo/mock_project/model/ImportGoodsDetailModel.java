package com.demo.mock_project.model;

import java.math.BigDecimal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ImportGoodsDetailModel extends BaseModel {

  @NotEmpty(message = "ImportGoodsId is required")
  private Long importGoodsId;

  // @NotEmpty(message = "ProductId is required")
  private Long productDetailId;

  // @NotEmpty(message = "Quantity is required")
  private Integer quantity;

  // @NotBlank(message = "totalPrice is required")
  private BigDecimal totalPrice;

  private BigDecimal discount;

  private ProductDetailModel productDetail;

  private BigDecimal price;

  // private String productCode;
}
