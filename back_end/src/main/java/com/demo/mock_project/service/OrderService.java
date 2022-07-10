package com.demo.mock_project.service;

import com.demo.mock_project.entity.OrderEntity;
import com.demo.mock_project.entity.TopStaffEntity;
import com.demo.mock_project.entity.TotalRevenueEntity;
import com.demo.mock_project.model.OrderCreate;
import com.demo.mock_project.model.OrderModel;
import com.demo.mock_project.model.RevenueStatisticModel;
import com.demo.mock_project.model.respone.ResultModel;
import java.util.List;

public interface OrderService {

  ResultModel findAllByFilter(int status, Long accountId,Long customerId, String search, int pageNumber,
      int size, String fromDate, String toDate);

  OrderEntity findById (Long id);

  boolean deleteByIdIn(List<Long> ids);

  OrderModel createOrder(OrderCreate model);

  TotalRevenueEntity findAllTotal(String fromDate, String toDate);

  List<TopStaffEntity> findAllTopStaff();
  OrderModel updateNote(Long id, String note);
}
