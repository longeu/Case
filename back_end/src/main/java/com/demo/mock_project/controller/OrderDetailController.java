package com.demo.mock_project.controller;

import com.demo.mock_project.entity.OrderDetailEntity;
import com.demo.mock_project.model.*;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.OrderDetailService;
import com.demo.mock_project.utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/order_details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailService orderDetailService;
    private final ModelMapperUtil modelMapper;

    @GetMapping("/ent/{id}")
    public ResponseEntity<OrderDetailEntity> getOrderEntity(@PathVariable("id") Long id){
//        OrderDetailEntity orderDetailEntity = orderDetailService.findById(id);
       return  null;
    }

    @GetMapping
    public ResponseEntity<ResultModel> getAll(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "asc") String order,
            @RequestParam(value = "orderDetailId", defaultValue = "") String orderDetailId) {
      return null;
}



    @GetMapping(value = "/product_detail/{id}")
    public ResponseEntity<ResultModel> getAllByProduct(
            @PathVariable Long id,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "desc") String order,
            @RequestParam(value = "search", defaultValue = "") String search) {
        ResultModel response = orderDetailService.findAllByProductDetail(id, page, size, sort, order);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping(value = "/order_id/{id}")
    public ResponseEntity<ResultModel> getAllByOrder(
            @PathVariable Long id,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "desc") String order,
            @RequestParam(value = "search", defaultValue = "") String search) {
        ResultModel response = orderDetailService.findAllByOrder(id, page, size, sort, order);
        return new ResponseEntity(response, HttpStatus.OK);
    }






}
