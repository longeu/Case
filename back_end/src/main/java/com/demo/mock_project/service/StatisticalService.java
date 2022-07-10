package com.demo.mock_project.service;

import com.demo.mock_project.model.BusinessSituation;
import com.demo.mock_project.model.RevenueStatisticModel;

import com.demo.mock_project.model.TopCustomerModel;
import com.demo.mock_project.model.TopProductModel;
import java.util.List;

public interface StatisticalService {

   List<RevenueStatisticModel> revenueStatistics(String fromDate,String toDate);

   List<TopCustomerModel> statisticTopCustomer(String fromDate,String toDate);
   List<TopProductModel> statisticTopProduct(String fromDate,String toDate);

   BusinessSituation getBusinessSituation(String fromDate,String toDate);
}
