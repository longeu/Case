package com.demo.mock_project.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class SupplierModel extends BaseModel{
   
    private String code;

    private String name;

    private String address;

    private String website;

    private String phone;

    private String email;

    private BigDecimal debt;

    private String taxCode;

    private String bankAccount;

    private String bankName;

    private String personInCharge;

    private String personInChargePhone;

    private String personInChargeEmail;

    private String description;

    private Integer status;

    private String addressDetail;
}
