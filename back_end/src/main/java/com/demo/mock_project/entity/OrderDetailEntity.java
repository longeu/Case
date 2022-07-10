package com.demo.mock_project.entity;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "order_detail")
public class OrderDetailEntity extends BaseEntity{

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private BigDecimal price;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_detail_id")
    @JsonIgnore
    private ProductDetailEntity productDetail;
    @Column(name="discount")
    private BigDecimal discount;
}
