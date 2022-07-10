package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.AccountRoleEntity;
import com.demo.mock_project.entity.AuthorityEntity;
import com.demo.mock_project.model.UserPrinciple;
import com.demo.mock_project.repository.AccountRepository;
import com.demo.mock_project.repository.AccountRoleRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private AccountRepository service;
  private AccountRoleRepository accountRoleRepository;

  public UserDetailsServiceImpl(AccountRepository service,
      AccountRoleRepository accountRoleRepository) {
    this.service = service;
    this.accountRoleRepository = accountRoleRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AccountEntity accountEntity = service.findByUsername(username);
    if (accountEntity==null || accountEntity.getStatus()==0 ) {
      throw new  EntityNotFoundException("NOT_FOUND");
    }
    List<AccountRoleEntity> accountRoleEntities = accountRoleRepository.findAllByAccount_Id(accountEntity.getId());
    Set<String> roles = accountRoleEntities.stream().map(x->x.getRole().getName()).collect(Collectors.toSet());

    Set<String> scopes= new HashSet<>();

    for (AccountRoleEntity aR:accountRoleEntities) {
      for (AuthorityEntity e:aR.getRole().getAuthorities()) {
        scopes.add(e.getName());
      }
    }
    return UserPrinciple.build(accountEntity,roles,scopes);
  }
}
