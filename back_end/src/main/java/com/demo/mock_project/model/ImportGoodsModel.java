package com.demo.mock_project.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ImportGoodsModel extends BaseModel {

  private Long accountId;
  private String accountName;

  // @NotNull(message = "totalPrice is required")
  private BigDecimal totalPrice;

  // @NotNull(message = "Total quantity is required")
  private Integer totalQuantity;

  // @NotNull(message = "Status is required")
  private Integer status;

  private Long supplierId;
  private String supplierName;

  private BigDecimal price;

  private List<ImportGoodsDetailModel> importGoodsDetails; 

  private Float discount;

  private String description;

  private  String code;
}
