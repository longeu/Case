package com.demo.mock_project.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TopProductModel {
  @Id
  private Long id;
  private Integer productId;
  private String productName;
  private String size;
  private String color;
  private String code;

  private Integer totalPriceSell;
  private Integer totalQuantitySell;





}
