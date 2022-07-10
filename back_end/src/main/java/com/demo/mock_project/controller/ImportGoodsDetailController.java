package com.demo.mock_project.controller;

import com.demo.mock_project.entity.ImportGoodsDetailEntity;
import com.demo.mock_project.model.ImportGoodsDetailModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.service.ImportGoodsDetailService;
import com.demo.mock_project.utils.ModelMapperUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(value = "/api/import-goods-details")
@RequiredArgsConstructor
public class ImportGoodsDetailController {

    private final ImportGoodsDetailService importGoodsDetailService;
    private final ModelMapperUtil modelMapper;

    @GetMapping
    public ResponseEntity<ResultModel> getAll(@RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "asc") String order,
            @RequestParam(value = "importGoodsId", defaultValue = "") String importGoodsId) {
        return ResponseEntity.ok(importGoodsDetailService.findAll(page, size, sort, order, importGoodsId));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ImportGoodsDetailModel> getById(Long id) {
        ImportGoodsDetailModel importGoodsDetailModel = modelMapper.map(importGoodsDetailService.findById(id),
                ImportGoodsDetailModel.class);
        return ResponseEntity.ok(importGoodsDetailModel);
    }

    @GetMapping(value = "/find-by-import-goods-id/{id}")
    public ResponseEntity<ResultModel> findByImportGoodsId(@PathVariable("id") String importGoodsId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id") String sort,
            @RequestParam(value = "sortType", defaultValue = "asc") String order) {

        return ResponseEntity.ok(importGoodsDetailService.findByImportGoodsId(page, size, sort, order, importGoodsId));
    }

    @PostMapping
    public ResponseEntity<ImportGoodsDetailModel> create(ImportGoodsDetailModel importGoodsDetailModel) {
        ImportGoodsDetailEntity importGoodsDetailEntity = modelMapper.map(importGoodsDetailModel,
                ImportGoodsDetailEntity.class);
        return ResponseEntity.ok(modelMapper.map(importGoodsDetailService.create(importGoodsDetailEntity),
                ImportGoodsDetailModel.class));
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<ImportGoodsDetailModel> putMethodName(@PathVariable String id,
            @RequestBody ImportGoodsDetailModel model) {
        ImportGoodsDetailEntity importGoodsDetailEntity = modelMapper.map(model, ImportGoodsDetailEntity.class);
        return ResponseEntity.ok(modelMapper.map(importGoodsDetailService.update(importGoodsDetailEntity),
                ImportGoodsDetailModel.class));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> delete(Long id) {
        if (importGoodsDetailService.delete(id))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.badRequest().body(false);

    }
}
