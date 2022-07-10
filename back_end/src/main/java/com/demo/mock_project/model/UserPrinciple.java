package com.demo.mock_project.model;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.RoleEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class UserPrinciple implements UserDetails {

  private static final long serialVersionUID = 1L;

  private Long id;

  private String name;

  private String username;
  private String image;
  private String phone;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;
  private Set<String> roles;
  private Set<String> scopes;

  public UserPrinciple(Long id, String name,
      String username, String phone, String password,String image,
      Collection<? extends GrantedAuthority> authorities,Set<String> roles ,Set<String> scopes) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.phone = phone;
    this.password = password;
    this.authorities = authorities;
    this.roles=roles;
    this.scopes=scopes;
    this.image=image;
  }

  public static UserPrinciple build(AccountEntity entity, Set<String> roles,Set<String> scopes) {

    List<GrantedAuthority> authorities = roles.stream().map(role ->
        new SimpleGrantedAuthority(role)
    ).collect(Collectors.toList());

    return new UserPrinciple(
        entity.getId(),
        entity.getFullName(),
        entity.getUsername(),
        entity.getPhone(),
        entity.getPassword(),
        entity.getImage(),
        authorities,
        roles,
        scopes


    );
  }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    UserPrinciple user = (UserPrinciple) o;
    return Objects.equals(id, user.id);
  }
}

