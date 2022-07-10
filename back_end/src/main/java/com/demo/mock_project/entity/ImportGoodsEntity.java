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
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "purchase_order")
public class ImportGoodsEntity extends BaseEntity {
   
    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity account;

    @Column(name = "code")
    private String code;

    @Column(name = "total_price")
    // @NotNull(message = "totalPrice is required")
    private BigDecimal totalPrice;

    @Column(name = "total_quantity")
    // @NotNull(message = "Total quantity is required")
    private Integer totalQuantity;

    @Column(name = "status")
    @NotNull(message = "Status is required")
    private Integer status;
    
    @OneToMany(mappedBy = "importGoods", cascade = CascadeType.DETACH)
    private Set<ImportGoodsDetailEntity>  importGoodsDetails;

    @Column(name = "discount")
    private Float discount;

    @Column(name = "price")
    private BigDecimal price;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierEntity supplier;

    @Column(name = "description")
    private String description;
}
