package com.demo.mock_project.entity;

import java.util.Date;
import java.util.List;
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
@Table(name = "account" ,uniqueConstraints = {@UniqueConstraint(columnNames = {"username", "phone"})})
@DynamicUpdate
public class AccountEntity extends BaseEntity{

    @Column(name = "code")
    private String code;
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "birth")
    private Date birth;

    @Column(name = "address")
    private String address;
    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "status")
    private Integer status;

    @OneToMany(mappedBy="account")
    @JsonIgnore
    private List<AccountRoleEntity> accountRoleEntities;

}
