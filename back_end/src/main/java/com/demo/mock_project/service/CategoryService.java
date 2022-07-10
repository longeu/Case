package com.demo.mock_project.service;

import com.demo.mock_project.entity.CategoryEntity;

import java.util.List;

public interface CategoryService extends BaseService<CategoryEntity> {
    List<CategoryEntity> findAll();
}
