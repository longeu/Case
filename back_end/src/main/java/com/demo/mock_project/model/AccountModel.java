package com.demo.mock_project.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.demo.mock_project.entity.AccountRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class  AccountModel extends BaseModel {
  private String code;
  private String username;


  private String image;

  private String fullName;


  private String phone;

  private Date birth;
  private Set<Long> roles;
  private String address;
  private String addressDetail;
  private boolean gender;
  private Integer status;

}
