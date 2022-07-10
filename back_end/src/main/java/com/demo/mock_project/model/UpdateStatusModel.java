package com.demo.mock_project.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class UpdateStatusModel {
  private Long id;
  private Integer status;
}
