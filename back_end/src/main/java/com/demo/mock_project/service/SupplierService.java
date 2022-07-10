package com.demo.mock_project.service;


import com.demo.mock_project.entity.SupplierEntity;
import com.demo.mock_project.model.respone.ResultModel;

public interface SupplierService extends BaseService<SupplierEntity> {

    ResultModel findAll(int pageNumber, int pageSize, String sortBy, String sortOrder, String name, Integer status);

}
