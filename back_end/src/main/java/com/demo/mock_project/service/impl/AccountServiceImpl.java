package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.AccountRoleEntity;
import com.demo.mock_project.model.AccountModel;
import com.demo.mock_project.model.CreateAccountModel;
import com.demo.mock_project.model.LoginModel;
import com.demo.mock_project.model.UpdateStatusModel;
import com.demo.mock_project.model.UserPrinciple;
import com.demo.mock_project.model.respone.LoginResponse;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.AccountRepository;
import com.demo.mock_project.repository.AccountRoleRepository;
import com.demo.mock_project.repository.RoleRepository;
import com.demo.mock_project.service.AccountService;
import com.demo.mock_project.utils.CodeCreateUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;
import com.demo.mock_project.utils.jwt.JwtProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

  private final JwtProvider jwtProvider;
  private final AccountRepository accountRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder encoder;
  private final ModelMapperUtil modelMapper;
  private final RoleRepository roleRepository;
  private final AccountRoleRepository accountRoleRepository;
  private final Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);

  @Override
  public LoginResponse login(LoginModel loginModel) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              loginModel.getUsername(),
              loginModel.getPassword()
          )
      );
      SecurityContextHolder.getContext().setAuthentication(authentication);
      UserPrinciple user = (UserPrinciple) authentication.getPrincipal();
      String jwt = jwtProvider.generateJwtToken(user);

      return
          LoginResponse.builder()
              .id(user.getId())
              .image(user.getImage())
              .phone(user.getPhone())
              .fullName(user.getName())
              .scopes(user.getScopes())
              .token(jwt)
              .username(user.getUsername()).build();

    } catch (Exception e) {
      throw new EntityNotFoundException("Username or password is incorrect !");
    }
  }

  @Transactional
  @Override
  public AccountModel createAccount(CreateAccountModel createAccountModel) {
    try {
      createAccountModel.setPassword(encoder.encode(createAccountModel.getPassword()));
      AccountEntity accountEntity = modelMapper.map(createAccountModel, AccountEntity.class);
      accountEntity.setCode(CodeCreateUtil.getCode(accountEntity,accountRepository.count()));
      return getAccountModel(accountRepository.save(accountEntity), createAccountModel.getRoles());
    } catch (Exception e) {
      logger.error(e.getMessage());
      return null;
    }
  }

  @Override
  public AccountModel create(AccountModel accountModel) {
    return null;
  }

  @Override
  @Transactional
  public AccountModel update(AccountModel accountModel) {
    try {
      AccountEntity accountEntity = accountRepository.findById(accountModel.getId())
          .orElseThrow(() ->
              new EntityNotFoundException("NOT_FOUND")
          );
      Integer check = accountRoleRepository.deleteAllByAccount(accountEntity);
      AccountEntity newAccount = modelMapper.map(accountModel, AccountEntity.class);
      newAccount.setPassword(accountEntity.getPassword());
      AccountEntity finalAccountEntity = accountRepository.save(newAccount);

      return getAccountModel(finalAccountEntity, accountModel.getRoles());
    } catch (Exception e) {
      logger.error(e.getMessage());
      return null;
    }

  }

  @Override
  public boolean delete(Long id) {
    return false;

  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, String search) {
    return null;
  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, String search, Integer status, Long role,String fromDate, String toDate) {
    try {
      List<AccountEntity> accountEntities = accountRepository.findAllByFilter(status,role,search,(page-1)*size,size,fromDate,toDate);
      Long count = accountRepository.CountAllByFilter(status,role,search,fromDate,toDate);
      List<AccountModel> result = new ArrayList<AccountModel>();
      accountEntities.forEach((item)->{
          AccountModel accountModel = modelMapper.map(item,AccountModel.class);
          accountModel.setRoles(item.getAccountRoleEntities().stream().map(x->x.getRole().getId()).collect(Collectors.toSet()));
            result.add(accountModel);
      });
      return ResultModelUtil.getResultModel(count, page, size, result);
    } catch (Exception e) {
      throw new EntityNotFoundException(e.getMessage());
    }
  }

  @Override
  public AccountModel updateStatus(UpdateStatusModel model) {
    try {
      AccountEntity accountEntity = accountRepository.findById(model.getId())
          .orElseThrow(() ->
              new EntityNotFoundException("NOT_FOUND")
          );

      accountEntity.setStatus(model.getStatus());
      accountRepository.save(accountEntity);

      return modelMapper.map(accountEntity, AccountModel.class);
    } catch (Exception e) {
      logger.error(e.getMessage());
      return null;
    }
  }

  @Override
  public AccountModel updateProfile(AccountModel model) {
    try {
      AccountEntity accountEntity = accountRepository.findById(model.getId())
          .orElseThrow(() ->
              new EntityNotFoundException("NOT_FOUND")
          );

      accountEntity.setFullName(model.getFullName());
      accountEntity.setBirth(model.getBirth());
      accountEntity.setAddress(model.getAddress());
      accountEntity.setGender(model.isGender());
      accountEntity.setImage(model.getImage());
      accountEntity.setPhone(model.getPhone());

      accountRepository.save(accountEntity);
      return modelMapper.map(accountEntity, AccountModel.class);
    } catch (Exception e) {
      logger.error(e.getMessage());
      return null;
    }
  }

  @Override
  public Boolean checkAccountByUserName(String username) {
    AccountEntity accountEntity = accountRepository.findByUsername(username);
    if (accountEntity!=null){
      return  true;
    }
    return false;

  }

  @Override
  public Boolean checkAccountByPhone(String phone, Long id) {
    AccountEntity accountEntity = accountRepository.findByPhone(phone);
    if (accountEntity!=null && accountEntity.getId()!=id){
      return  true;
    }
    return false;
  }


  @Override
  public AccountModel findById(Long id) {
    AccountEntity accountEntity = accountRepository.findById(id)
        .orElseThrow(() ->
            new EntityNotFoundException("NOT_FOUND")
        );
    List<AccountRoleEntity> accountRoleEntities = accountRoleRepository
        .findAllByAccount_Id(accountEntity.getId());
    Set<Long> roles = accountRoleEntities.stream().map(x -> x.getRole().getId()).collect(
        Collectors.toSet());

    AccountModel result = modelMapper.map(accountEntity, AccountModel.class);
    result.setRoles(roles);
    return result;
  }

  private AccountModel getAccountModel(AccountEntity finalAccountEntity, Set<Long> roles) {
    try {
      roles.forEach(roleId -> {

        AccountRoleEntity e = new AccountRoleEntity();
        e.setAccount(finalAccountEntity);
        e.setRole(roleRepository.getById(roleId));
        accountRoleRepository.save(e);
      });

      return modelMapper.map(finalAccountEntity, AccountModel.class);
    } catch (Exception e) {

      logger.error(e.getMessage());
      return null;
    }
  }
}
