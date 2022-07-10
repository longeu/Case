package com.demo.mock_project.controller;

import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.model.ImportGoodsModel;
import com.demo.mock_project.model.ProductModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.ProductService;
import com.demo.mock_project.utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/products")

public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapperUtil modelMapper;


    @GetMapping()
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
        ResultModel response = productService
                .findAll(search, categoryId, status, page , size,  from, to, sort, order);
        if(response != null) {
            return new ResponseEntity(response, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("{id}")
    public ResponseEntity<ProductModel> getById(@PathVariable Long id) {
        ProductEntity product = productService.findById(id);
        ProductModel response = modelMapper.map(product, ProductModel.class);
        if(response != null) {
            return new ResponseEntity(response, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }



    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteById (@PathVariable Long id) {
        if (productService.delete(id))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);
    }

    @PutMapping()
    public ResponseEntity<Boolean> deleteWithIds (
            @RequestParam(value = "status") int status,
            @Valid @RequestBody List<Long> ids) {
        if (productService.deleteByIdIn(ids, status))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);
    }

    @PostMapping
    public ResponseEntity<ProductEntity> create (@Valid @RequestBody ProductModel request) {
        ProductEntity product = modelMapper.map(request, ProductEntity.class);
        ProductModel response = modelMapper.map(productService.create(product), ProductModel.class);
        if(response != null) {
            return new ResponseEntity(response, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductEntity> update (@PathVariable Long id,
                                                 @Valid @RequestBody ProductModel request) {
        ProductEntity product = modelMapper.map(request, ProductEntity.class);
        ProductModel response = modelMapper.map(productService.update(product), ProductModel.class);
        if(response != null) {
            return new ResponseEntity(response, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
