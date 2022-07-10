package com.demo.mock_project.controller;

import com.demo.mock_project.entity.OrderEntity;
import com.demo.mock_project.model.CustomOrderModel;
import com.demo.mock_project.model.OrderCreate;
import com.demo.mock_project.model.OrderModel;
import com.demo.mock_project.model.RevenueStatisticModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.OrderRepository;
import com.demo.mock_project.service.OrderService;
import com.demo.mock_project.utils.ModelMapperUtil;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final ModelMapperUtil modelMapper;
    private OrderRepository repository;

    @GetMapping("/account/{id}")
    public ResponseEntity<OrderCreate> getOrderEntity(@PathVariable("id") Long id){
        OrderCreate orderCreate = modelMapper.map(orderService.findById(id), OrderCreate.class);
        return ResponseEntity.ok(orderCreate);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderModel> getOrder(@PathVariable("id") Long id) {
        OrderModel orderModel = modelMapper.map(orderService.findById(id), OrderModel.class);
        return ResponseEntity.ok(orderModel);
    }


    @GetMapping("/custom/{id}")
    public ResponseEntity<CustomOrderModel> getOrderCustom(@PathVariable("id") Long id) {
        CustomOrderModel orderModel = modelMapper.map(orderService.findById(id), CustomOrderModel.class);
        return ResponseEntity.ok(orderModel);
    }



    @GetMapping
    public ResponseEntity<ResultModel> getAll(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "status", defaultValue = "2") int status,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "accountId", defaultValue = "0") Long accountId,
        @RequestParam(value = "customerId", defaultValue = "0") Long customerId,
            @RequestParam(value = "fromDate", defaultValue = "2000-01-01") String fromDate,
            @RequestParam(value = "toDate", defaultValue = "2000-01-01") String toDate

        ) {
        ResultModel response = orderService.findAllByFilter(status, accountId,customerId, search, page, size, fromDate, toDate);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderModel> create(@Valid @RequestBody OrderCreate model) {
        return  new ResponseEntity<>(orderService.createOrder(model),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<OrderCreate> update(@PathVariable Long id, @Valid @RequestBody OrderCreate request) {

        return  new ResponseEntity<>(request,HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteWithIds (@Valid @RequestBody List<Long> ids) {
        if (orderService.deleteByIdIn(ids))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);
    }
    @PutMapping("{id}/note")
    public ResponseEntity<OrderModel> updateNote(@PathVariable Long id,@RequestBody String note) {

        return  new ResponseEntity<>(orderService.updateNote(id,note),HttpStatus.OK);
    }

}
