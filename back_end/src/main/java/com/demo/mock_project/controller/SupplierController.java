package com.demo.mock_project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.demo.mock_project.entity.SupplierEntity;
import com.demo.mock_project.model.SupplierModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.SupplierRepository;
import com.demo.mock_project.service.SupplierService;
import com.demo.mock_project.utils.FilterUtil;
import com.demo.mock_project.utils.ModelMapperUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierRepository jpaRepository;
    private final SupplierService supplierService;
    private final ModelMapperUtil modelMapper;
    private final Logger logger = LoggerFactory.getLogger(SupplierController.class);



    @GetMapping("/{id}")
    public ResponseEntity<SupplierModel> getSupplierById(@PathVariable("id") Long id) {
        SupplierEntity supplierEntity = supplierService.findById(id);
        SupplierModel supplierModel = modelMapper.map(supplierEntity, SupplierModel.class);
        return ResponseEntity.ok(supplierModel);
    }

    @GetMapping
    public ResponseEntity<ResultModel> getSuppliers(@RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "order", defaultValue = "desc") String order,
            @RequestParam(value = "search", defaultValue = "") String name,
            @RequestParam(value = "status", defaultValue = "-1") Integer status) {
        if (status == -1) {
            return ResponseEntity.ok(supplierService.findAll(page, size, sort, order, name));
        }
        return ResponseEntity.ok(supplierService.findAll(page, size, sort, order, name, status));
    }

    @PostMapping
    public ResponseEntity<SupplierModel> postMethodName(@RequestBody SupplierModel model) {
        logger.info("SupplierModel: {}", model.toString());
        SupplierEntity supplier = modelMapper.map(model, SupplierEntity.class);
        return ResponseEntity.ok(modelMapper.map(supplierService.create(supplier), SupplierModel.class));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierModel> putMethodName(@PathVariable("id") Long id, @RequestBody SupplierModel model) {
        SupplierEntity supplier = modelMapper.map(model, SupplierEntity.class);
        supplier.setId(id);
        return ResponseEntity.ok(modelMapper.map(supplierService.update(supplier), SupplierModel.class));

    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SupplierModel> updateStatus(@PathVariable("id") Long id, @RequestBody SupplierModel model) {
        Optional<SupplierEntity> supplier = jpaRepository.findById(id);
        if (supplier.isPresent()) {
            SupplierEntity supplierEntity = supplier.get();
            supplierEntity.setStatus(model.getStatus());
            supplierEntity.setId(id);
            jpaRepository.save(supplierEntity);
            return ResponseEntity.ok(modelMapper.map(jpaRepository.save(supplierEntity), SupplierModel.class));
        }
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteMethodName(@PathVariable("id") Long id) {
        logger.info("id: {}", id);
        if (supplierService.delete(id))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().build();
    }
}
