package com.demo.mock_project.entity;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "supplier")
@DynamicUpdate
public class SupplierEntity extends BaseEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "debt")
    private BigDecimal debt;

    @Column(name = "tax_code")
    private String taxCode;

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "person_in_charge")
    private String personInCharge;

    @Column(name = "person_in_charge_phone")
    private String personInChargePhone;

    @Column(name = "person_in_charge_email")
    private String personInChargeEmail;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "supplier")
    private Set<ImportGoodsEntity> importGoods;

    @Column(name = "status", columnDefinition = "integer default 0")
    private Integer status;
    
    @Column(name = "website")
    private String website;

    @Column(name="address_detail")
    private String addressDetail;
}
