package com.demo.mock_project.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import javax.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Data
@Entity
@NoArgsConstructor
public class RevenueStatisticModel {

  @Id
  private Long id;

  private Date createdAt;

  private BigDecimal totalPrice;

}
