package com.demo.mock_project.service;

import com.demo.mock_project.entity.*;
import com.demo.mock_project.model.CustomerDetailModel;
import com.demo.mock_project.model.CustomerModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.utils.FilterUtil;

import java.util.List;

public interface CustomerService {

    CustomerModel create(CustomerModel customerModel);
    CustomerModel update(CustomerModel customerModel);
    CustomerModel findById(Long id);
    ResultModel findAll(int page, int size, String sort, String search,String order,String fromDate,String toDate);

    List<NewCustomerEntity> findAllByDay();

    CustomerDetailModel getByCustomerId(Long id);
    Boolean checkCustomerByEmail(String email,Long id);
    Boolean checkCustomerByPhone(String phone,Long id);

}
