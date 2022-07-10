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

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "product_detail")
public class ProductDetailEntity extends BaseEntity {

    @ManyToOne(cascade = CascadeType.DETACH, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "size")
    private String size;

    @Column(name = "code")
    private String code;

    @Column(name = "barcode")
    private String barCode;

    @Column(name = "color")
    private String color;

    @Column(name = "quantity")
    @Min(0)
    private int quantity;

    @Column(name = "price")
    @Min(0)
    private BigDecimal price;


    @Column(name = "price_sell")
    @Min(0)
    private BigDecimal priceSell;

    @Column(name = "discount")
    @Min(0)
    @Max(100)
    private Float discount;

    @Column(name = "discount_sell")
    @Min(0)
    @Max(100)
    private Float discountSell;

    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "quantity_sell", columnDefinition = "integer default 0")
    @Min(0)
    private Integer quantitySell;

    @Column(name = "status")
    private Integer status;

//    @OneToMany(mappedBy = "productDetail")
//    private Set<ImportGoodsDetailEntity> importGoodsDetails;

}
