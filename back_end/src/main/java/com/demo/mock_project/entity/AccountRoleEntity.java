package com.demo.mock_project.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "account_role")
public class AccountRoleEntity extends BaseEntity {
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "account_id")
    private AccountEntity account;
}
