package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.CategoryEntity;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.CategoryRepository;
import com.demo.mock_project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl
        extends BaseServiceImpl<CategoryEntity, CategoryRepository>
        implements CategoryService
{
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository jpaRepository) {
        super(jpaRepository);
    }

    @Override
    public CategoryEntity create(CategoryEntity categoryEntity) {
        return super.create(categoryEntity);
    }

    @Override
    public CategoryEntity update(CategoryEntity categoryEntity) {
        return super.update(categoryEntity);
    }

    @Override
    public boolean delete(Long id) {
        return super.delete(id);
    }

    @Override
    public CategoryEntity findById(Long id) {
        return super.findById(id);
    }

    @Override
    public ResultModel findAll(int page, int size, String sort, String order, String search) {
        return null;
    }

    @Override
    public List<CategoryEntity> findAll() {
        try {
            return categoryRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }
}
