package com.demo.mock_project.controller;

import com.demo.mock_project.entity.LastDayToBuyEntity;
import com.demo.mock_project.model.CustomerDetailModel;
import com.demo.mock_project.model.CustomerModel;
import com.demo.mock_project.model.respone.ResultModel;
//import com.demo.mock_project.repository.CustomerDetailRepository;
import com.demo.mock_project.service.CustomerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    private final CustomerService customerService;
    private final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @GetMapping("/{id}")
    public ResponseEntity<CustomerModel> getCustomerById(@PathVariable("id") Long id) {

        return ResponseEntity.ok(customerService.findById(id));
    }
    @GetMapping
    public ResponseEntity<ResultModel> getCustomers(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "sortType", defaultValue = "asc") String order,
            @RequestParam(value = "fromDate", defaultValue = "2000-01-01") String fromDate,
            @RequestParam(value = "toDate", defaultValue = "2000-01-01") String toDate

    ) {
        return ResponseEntity.ok(customerService.findAll(page, size, sort, search, order,fromDate,toDate));

    }

    @PostMapping
    public ResponseEntity<CustomerModel> postByName(@RequestBody CustomerModel model) {
        logger.info("CustomerModel: {}", model.toString());

        return ResponseEntity.ok(customerService.create(model));

    }


    @PutMapping("/{id}")
    public ResponseEntity<CustomerModel> putByName(@PathVariable("id") Long id, @RequestBody CustomerModel model) {

        return ResponseEntity.ok(customerService.update(model));

    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<CustomerDetailModel> getCustomer(@PathVariable("id") Long id) {
        CustomerDetailModel result = customerService.getByCustomerId(id);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/email")
    public Boolean checkAccountByUsername( @RequestParam(value = "email") String email,@RequestParam(value = "id") Long id) {
        return customerService.checkCustomerByEmail(email,id);
    }
    @GetMapping("/phone")
    public Boolean checkAccountByPhone(@RequestParam(value = "phone") String phone,@RequestParam(value = "id") Long id) {
        return customerService.checkCustomerByPhone(phone,id);
    }
}


