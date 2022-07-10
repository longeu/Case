package com.demo.mock_project.controller;

import com.demo.mock_project.entity.NewCustomerEntity;
import com.demo.mock_project.entity.TopStaffEntity;
import com.demo.mock_project.entity.TotalRevenueEntity;
import com.demo.mock_project.model.BusinessSituation;
import com.demo.mock_project.model.RevenueStatisticModel;
import com.demo.mock_project.model.TopCustomerModel;
import com.demo.mock_project.model.TopProductModel;
import com.demo.mock_project.repository.TopProductRepository;
import com.demo.mock_project.service.CustomerService;
import com.demo.mock_project.service.OrderService;
import com.demo.mock_project.service.StatisticalService;
import com.demo.mock_project.utils.ModelMapperUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/statisticals")
@RequiredArgsConstructor
public class StatisticalController {

  private final StatisticalService statisticalService;
  private final CustomerService customerService;

  private final OrderService orderService;


    @GetMapping("/customer")
    public ResponseEntity<List<TopCustomerModel>> getTopCustomer(@RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
        @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate
    ){
        return new ResponseEntity<>(statisticalService.statisticTopCustomer(fromDate,toDate), HttpStatus.OK);
    }
  @GetMapping("/product")
  public ResponseEntity<List<TopProductModel>> getTopProduct(@RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate
  ){
    return new ResponseEntity<>(statisticalService.statisticTopProduct(fromDate,toDate), HttpStatus.OK);
  }

  @GetMapping("/day")
  public ResponseEntity<List<NewCustomerEntity>> getAllDay(
      @RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate
  ) {
    return new ResponseEntity<>(customerService.findAllByDay(), HttpStatus.OK);
  }

  @GetMapping("/total")
  public ResponseEntity<TotalRevenueEntity> getAllTotal(
      @RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate) {

    return new ResponseEntity<>(orderService.findAllTotal(fromDate,toDate), HttpStatus.OK);
  }

  @GetMapping("/revenue")
  public ResponseEntity<List<RevenueStatisticModel>> revenueStatistics(
      @RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate) {
    return ResponseEntity.ok(statisticalService.revenueStatistics(fromDate, toDate));
  }

  @GetMapping("/topStaff")
  public ResponseEntity<List<TopStaffEntity>> getAllTopStaff(
      @RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate) {

    return new ResponseEntity<>(orderService.findAllTopStaff(), HttpStatus.OK);
  }
  @GetMapping("/business")
  public ResponseEntity<BusinessSituation> getAllBusinessSituation(
      @RequestParam(value = "fromDate", defaultValue = "2021-12-01") String fromDate,
      @RequestParam(value = "toDate", defaultValue = "2021-12-08") String toDate
  ) {
    return new ResponseEntity<>(statisticalService.getBusinessSituation(fromDate,toDate), HttpStatus.OK);
  }
}
