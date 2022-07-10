package com.demo.mock_project.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class TopCustomerModel {

  @Id
  private Long id;
  private String name;
  private Boolean gender;
  private String totalPrice;
}