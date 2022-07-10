package com.demo.mock_project.model;

import java.math.BigDecimal;
import java.util.Set;
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
public class OrderModel extends BaseModel {

  @NotNull(message = "TotalPrice is required ")
  private BigDecimal totalPrice;

  @NotNull(message = "TotalQuantity is required")
  private Integer totalQuantity;

  private Integer accountId;

  private String accountName;

  @NotNull(message = "Money is required")
  private BigDecimal money;

  private String note;


  private Integer status;

  @NotNull(message = "Customer is required")
  private String customerName;

  private String customerPhone;
  private String code;
  private BigDecimal discount;
  private Set<OrderDetailModel> orderDetails;
}
