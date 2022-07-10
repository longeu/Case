package com.demo.mock_project.controller;

import com.demo.mock_project.model.RoleModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class RoleController {
  private final RoleService roleService;
  @GetMapping
  public ResponseEntity<ResultModel> getRoles(){
    return new ResponseEntity<>(roleService.fillAll(), HttpStatus.OK);
  }
}
