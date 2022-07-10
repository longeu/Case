package com.demo.mock_project.entity;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
@Table(name = "orders")

public class OrderEntity extends BaseEntity {
    //Liên kết với bảng account
    @NotNull(message = "accountId is required")
    @ManyToOne(optional = false ,cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity account;

    @Column(name = "status")
    @NotNull(message = "Status is required")
    private int status;

    @Column(name = "total_price")
    @NotNull(message = "totalPrice is required")
    private BigDecimal totalPrice;

    //Liên kết với bảng customer
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;

    @Column(name = "total_quantity")
    @NotNull(message = "Total quantity is required")
    private int totalQuantity;



    @Column(name = "money")
    @NotNull(message = "Money is required")
    private BigDecimal money;

    @Column(name = "note")
    private String note;

    //Liên kết với bảng order-details
    @OneToMany(cascade = CascadeType.DETACH, mappedBy = "order")
    @JsonIgnore
    private Set<OrderDetailEntity> orderDetails;
    @Column(name="discount")
    private BigDecimal discount;

    @Column(name = "code")
    private String code;
}
