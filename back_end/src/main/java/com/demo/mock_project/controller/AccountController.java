package com.demo.mock_project.controller;

import com.demo.mock_project.model.AccountModel;
import com.demo.mock_project.model.CreateAccountModel;
import com.demo.mock_project.model.LoginModel;
import com.demo.mock_project.model.UpdateStatusModel;
import com.demo.mock_project.model.respone.LoginResponse;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.AccountService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

  private final AccountService accountService;

  @GetMapping
  public ResponseEntity<ResultModel> getAccounts(
      @RequestParam(value = "page", defaultValue = "1") int page,
      @RequestParam(value = "size", defaultValue = "10") int size,
      @RequestParam(value = "sort", defaultValue = "id") String sort,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sortType", defaultValue = "DESC") String order,
      @RequestParam(value = "status", defaultValue = "2") Integer status,
      @RequestParam(value = "role", defaultValue = "0") Long role,
      @RequestParam(value = "fromDate", defaultValue = "2000-01-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2000-01-01") String toDate
  ) {
    return ResponseEntity.ok(accountService.findAll(page, size, sort, order, search,status,role,fromDate,toDate));
  }

  @PostMapping
//  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<AccountModel> create(
      @Valid @RequestBody CreateAccountModel createAccountModel) {
    return new ResponseEntity<>(accountService.createAccount(createAccountModel), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<AccountModel> getAccount(@PathVariable Long id) {
    return new ResponseEntity<>(accountService.findById(id), HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(
      @Valid @RequestBody LoginModel loginRequest) {
    return new ResponseEntity<>(accountService.login(loginRequest), HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity<AccountModel> update(@Valid @RequestBody AccountModel model) {

    return new ResponseEntity<>(accountService.update(model), HttpStatus.OK);
  }
  @PutMapping("/status/{id}")
  public ResponseEntity<AccountModel> updateStatus(@Valid @RequestBody UpdateStatusModel model) {

    return new ResponseEntity<>(accountService.updateStatus(model), HttpStatus.OK);
  }
  @PutMapping("/profile/{id}")
  public ResponseEntity<AccountModel> updateProfile(@Valid @RequestBody AccountModel model) {

    return new ResponseEntity<>(accountService.updateProfile(model), HttpStatus.OK);
  }
  @GetMapping("/username")
  public Boolean checkAccountByUsername( @RequestParam(value = "username") String username) {
    return accountService.checkAccountByUserName(username);
  }
  @GetMapping("/phone")
  public Boolean checkAccountByPhone(@RequestParam(value = "phone") String phone ,@RequestParam(value = "id") Long id) {
    return accountService.checkAccountByPhone(phone,id);
  }

}
