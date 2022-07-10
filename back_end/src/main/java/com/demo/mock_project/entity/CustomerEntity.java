package com.demo.mock_project.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "customer" ,uniqueConstraints = {@UniqueConstraint(columnNames = {"email", "phone"})})
@DynamicUpdate
public class CustomerEntity extends BaseEntity{

    @Column(name = "code")
    private String code;
    @Column(name = "phone")
    private String phone;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "name")
    private String name;

    @Column(name = "birth")
    private Date birth;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;
    @Column(name = "address_detail")
    private String addressDetail;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.DETACH)
    @JsonIgnore
    private Set<OrderEntity> orders;

}
