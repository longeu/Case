package com.demo.mock_project.service;

import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.model.ProductDetailModel;
import com.demo.mock_project.model.respone.ResultModel;

import java.util.List;

public interface ProductDetailService  extends BaseService<ProductDetailEntity> {

    ResultModel findAllByProduct(Long productId, int page, int size, String sort, String order);

    ResultModel findAll(String search, Long categoryId, Integer status,
                        int page, int size,
                        String sort, String order,
                        String from, String to);

    ResultModel findAllByProductAndStatus(Long productId, int status,
                                          int page, int size, String sort, String order);

    boolean deleteByIdIn(List<Long> ids, int status);

    List<ProductDetailModel> findAllByFilter (Integer size,String search);

}
