package com.demo.mock_project.entity;


import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity

public class CustomerDetailEntity {

    @Id
    private Long id;
    private Date createdAt;

    private Date updatedAt;

    private String code;

    private String phone;


    private Boolean gender;


    private String name;

    private Date birth;


    private String email;


    private String address;
    private String addressDetail;

    @MapKeyColumn(name = "total_quantity")
    private Integer totalQuantity;

    @MapKeyColumn(name = "total_orders")
    private Integer totalOrders;
    @MapKeyColumn(name = "total_rice")
    private BigDecimal totalPrice;
}
