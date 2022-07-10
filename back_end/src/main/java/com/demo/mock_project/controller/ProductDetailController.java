package com.demo.mock_project.controller;

import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.model.ProductDetailModel;
import com.demo.mock_project.model.ProductModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.ProductDetailService;
import com.demo.mock_project.utils.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/product_details")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @Autowired
    private ModelMapperUtil modelMapper;

//    @GetMapping
//    public ResponseEntity<ResultModel> getAll(
//        @RequestParam(value = "page", defaultValue = "1") int page,
//        @RequestParam(value = "size", defaultValue = "10") int size,
//        @RequestParam(value = "sort", defaultValue = "id") String sort,
//        @RequestParam(value = "sortType", defaultValue = "asc") String order,
//        @RequestParam(value = "search", defaultValue = "") String search) {
//        ResultModel response = productDetailService.findAll(page, size, sort, order, search);
//        return new ResponseEntity(response, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<ResultModel> getAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "order", defaultValue = "desc") String order,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "categoryId", defaultValue = "0") Long categoryId,
            @RequestParam(value = "status", defaultValue = "0") Integer status,
            @RequestParam(value = "from", defaultValue = "2000-01-01") String from,
            @RequestParam(value = "to", defaultValue = "2000-01-01") String to) {

        ResultModel response = productDetailService.findAll(search, categoryId, status,
                page, size, sort, order, from, to );
        if(response != null) {
            return  new ResponseEntity(response, HttpStatus.OK);
        }
        else {
            return new ResponseEntity( HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ResultModel> getAllByProduct(
        @PathVariable Long id,
        @RequestParam(value = "page", defaultValue = "1") int page,
        @RequestParam(value = "size", defaultValue = "10") int size,
        @RequestParam(value = "sort", defaultValue = "id") String sort,
        @RequestParam(value = "sortType", defaultValue = "desc") String order,
        @RequestParam(value = "search", defaultValue = "") String search) {
        ResultModel response = productDetailService.findAllByProduct(id, page, size, sort, order);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/product/{id}/status")
    public ResponseEntity<ResultModel> getAllByProductAndStatus(
            @PathVariable Long id,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "desc") String order,
            @RequestParam(value = "status", defaultValue = "1") int status) {
        ResultModel response = productDetailService.findAllByProductAndStatus(id,status, page, size, sort, order);
        return new ResponseEntity(response, HttpStatus.OK);
    }



    @DeleteMapping(value = "{id}")
    public ResponseEntity<Boolean> deleteById (@PathVariable Long id) {
        if (productDetailService.delete(id))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);
    }

    @PutMapping
    public ResponseEntity<Boolean> deleteWithIds (
            @RequestParam(value = "status") int status,
            @Valid @RequestBody List<Long> ids) {
         if (productDetailService.deleteByIdIn(ids, status))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);
    }

    @PostMapping
    public ResponseEntity<ProductEntity> create (@Valid @RequestBody ProductDetailModel request) {
        ProductDetailEntity productDetail = modelMapper.map(request, ProductDetailEntity.class);
        ProductDetailModel response = modelMapper.map(productDetailService
            .create(productDetail), ProductDetailModel.class);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductEntity> update (@PathVariable Long id,
        @Valid @RequestBody ProductDetailModel request) {
        ProductDetailEntity product = modelMapper.map(request, ProductDetailEntity.class);
        ProductDetailModel response = modelMapper.map(productDetailService
            .update(product), ProductDetailModel.class);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/sale")
    public ResponseEntity<List<ProductDetailModel>> getAllByFilter(
        @RequestParam(value = "size", defaultValue = "7") int size,
        @RequestParam(value = "search", defaultValue = "") String search) {
        List<ProductDetailModel> response = productDetailService.findAllByFilter(size, search);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
