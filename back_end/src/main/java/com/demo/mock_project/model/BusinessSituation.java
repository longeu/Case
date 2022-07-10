package com.demo.mock_project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusinessSituation {
  private Long totalCustomer;
  private Long totalOrder;
  private Long totalOrderSuccess;
  private Long totalImport;
  private Long totalSupplier;
}
