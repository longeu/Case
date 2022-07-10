package com.demo.mock_project.service;

import com.demo.mock_project.entity.CategoryEntity;
import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.model.respone.ResultModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService extends BaseService<ProductEntity> {
    ResultModel findAll(String search,Long categoryId,Integer status,int page
            , int size, String sort, String order, String from, String to);


    boolean deleteByIdIn(List<Long> ids, int status);
}
