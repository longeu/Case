package com.demo.mock_project.controller;

import com.demo.mock_project.entity.CategoryEntity;
import com.demo.mock_project.model.CategoryModel;
import com.demo.mock_project.service.CategoryService;
import com.demo.mock_project.utils.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapperUtil modelMapper;

    @GetMapping
    public ResponseEntity<CategoryModel> getAll() {
        List<CategoryEntity> categories = categoryService.findAll();
        List<CategoryModel> response =  modelMapper.map(categories, CategoryModel.class);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping
    public  ResponseEntity<CategoryModel> create(@Valid @RequestBody CategoryModel request) {
        CategoryEntity category = categoryService.create(modelMapper.map(request, CategoryEntity.class));
        if(category != null) {
            return new ResponseEntity(modelMapper.map(category, CategoryModel.class), HttpStatus.OK);
        }
        else {
          return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
