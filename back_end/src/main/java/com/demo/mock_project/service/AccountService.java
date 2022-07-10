package com.demo.mock_project.service;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.model.AccountModel;
import com.demo.mock_project.model.CreateAccountModel;
import com.demo.mock_project.model.LoginModel;
import com.demo.mock_project.model.UpdateStatusModel;
import com.demo.mock_project.model.respone.LoginResponse;
import com.demo.mock_project.model.respone.ResultModel;
import java.util.Optional;


public interface AccountService extends BaseService<AccountModel>{

  LoginResponse login(LoginModel loginModel);
  AccountModel createAccount(CreateAccountModel createAccountModel);
  ResultModel findAll(int page, int size, String sort, String order, String search,Integer status,Long role,String fromDate, String toDate);
  AccountModel updateStatus(UpdateStatusModel model);
  AccountModel updateProfile(AccountModel model);
  Boolean checkAccountByUserName(String username);
  Boolean checkAccountByPhone(String phone, Long id);

}
