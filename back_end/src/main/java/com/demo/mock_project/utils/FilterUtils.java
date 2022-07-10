package com.demo.mock_project.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
@AllArgsConstructor
public class FilterUtils {
  private String column;
  private String value;
}
