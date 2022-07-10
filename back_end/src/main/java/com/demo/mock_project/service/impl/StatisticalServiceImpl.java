package com.demo.mock_project.service.impl;

import com.demo.mock_project.model.BusinessSituation;
import com.demo.mock_project.model.RevenueStatisticModel;
import com.demo.mock_project.model.TopCustomerModel;
import com.demo.mock_project.model.TopProductModel;
import com.demo.mock_project.repository.*;
import com.demo.mock_project.service.StatisticalService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StatisticalServiceImpl implements StatisticalService {
    private final Logger log = LoggerFactory.getLogger(StatisticalServiceImpl.class);
    private  final  RevenueStatisticRepository revenueStatisticRepository;
    private final TopCustomerRepository topCustomerRepository;
    private final TopProductRepository topProductRepository;
    private final OrderRepository orderRepository;
    private final  CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private  final ImportGoodsRepository importGoodsRepository;

    @Override
    public List<RevenueStatisticModel> revenueStatistics(String fromDate, String toDate) {
        try {
            return revenueStatisticRepository.revenueStatistics(fromDate,toDate);
        }catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public List<TopCustomerModel> statisticTopCustomer(String fromDate, String toDate) {
       try {
           return topCustomerRepository.findAllByTotal(fromDate,toDate);
       }catch (Exception e){
           log.error(e.getMessage());
           return null;
       }
    }

    @Override
    public List<TopProductModel> statisticTopProduct(String fromDate, String toDate) {
        try {
            return topProductRepository.findAll(fromDate,toDate);
        }catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public BusinessSituation getBusinessSituation(String fromDate, String toDate) {
         Long totalCustomer = customerRepository.countAllByCreateDate(fromDate,toDate);
         Long totalOrder= orderRepository.countAllByCreateDate(fromDate,toDate);
         Long totalOrderSuccess= orderRepository.countAllByCreateDate(fromDate,toDate);
         Long totalImport= importGoodsRepository.countAllByCreateDate(fromDate,toDate);
         Long totalSupplier= supplierRepository.countAllByCreateDate(fromDate,toDate);

        return new BusinessSituation(totalCustomer,totalOrder,totalOrderSuccess,totalImport,totalSupplier);
    }
}
