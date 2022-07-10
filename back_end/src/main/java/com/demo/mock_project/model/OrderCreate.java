package com.demo.mock_project.model;

import java.math.BigDecimal;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class OrderCreate extends BaseModel {
  @NotNull(message = "TotalPrice is required ")
  private BigDecimal totalPrice;

  @NotNull(message = "TotalQuantity is required")
  private Integer totalQuantity;

  private Long accountId;
  private List<OrderDetailCreate> orderDetails;
  private CustomerModel customer;

  @NotNull(message = "Money is required")
  private BigDecimal money;

  private String note;
  private String payment;
  private Integer status;

  private BigDecimal discount;
}
