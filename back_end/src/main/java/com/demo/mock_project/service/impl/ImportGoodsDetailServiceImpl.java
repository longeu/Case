package com.demo.mock_project.service.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.demo.mock_project.entity.ImportGoodsDetailEntity;
import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.model.ImportGoodsDetailModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.ImportGoodsDetailRepository;
import com.demo.mock_project.repository.ImportGoodsRepository;
import com.demo.mock_project.repository.ProductDetailRepository;
import com.demo.mock_project.repository.ProductRepository;
import com.demo.mock_project.service.ImportGoodsDetailService;
import com.demo.mock_project.utils.FilterUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImportGoodsDetailServiceImpl implements ImportGoodsDetailService {

    private final ImportGoodsRepository importGoodsRepository;
    private final ProductRepository productRepository;
    private final ModelMapperUtil modelMapper;
    private final ImportGoodsDetailRepository jpaRepository;
    private final ProductDetailRepository productDetailRepository;

    @Override
    public ImportGoodsDetailEntity create(ImportGoodsDetailEntity t) {
        if (String.valueOf(t.getId()) != null) {
            throw new EntityNotFoundException("Id is not null");
        } else if (modelMapper.map(t, ImportGoodsDetailModel.class).getImportGoodsId() == null
                || modelMapper.map(t, ImportGoodsDetailModel.class).getProductDetailId() == null) {
            System.out.println("idL: " + t.getId());
            throw new EntityNotFoundException("ImportGoods or product is not null");
        } else {
            Optional<ImportGoodsEntity> importGoodsResult = importGoodsRepository.findById(t.getImportGoods().getId());
            Optional<ProductDetailEntity> productDetailResult = productDetailRepository.findById(t.getProductDetail().getId());
            if (importGoodsResult.isPresent() && productDetailResult.isPresent()) {
                t.setImportGoods(importGoodsResult.get());
                t.setProductDetail(productDetailResult.get());
                return jpaRepository.save(t);
            }
            throw new EntityNotFoundException("ImportGoods or Product not found");
        }
    }

    @Override
    public ImportGoodsDetailEntity update(ImportGoodsDetailEntity t) {
        Optional<ImportGoodsDetailEntity> importGoodsDetailResult = jpaRepository.findById(t.getId());
        if (importGoodsDetailResult.isPresent()) {
            ImportGoodsDetailEntity importGoodsDetailEntity = importGoodsDetailResult.get();
            Optional<ImportGoodsEntity> importGoodsResult = importGoodsRepository.findById(t.getImportGoods().getId());
            Optional<ProductDetailEntity> productDetailResult = productDetailRepository.findById(t.getProductDetail().getId());
            if (importGoodsResult.isPresent() && productDetailResult.isPresent()) {
                importGoodsDetailEntity.setImportGoods(importGoodsResult.get());
                importGoodsDetailEntity.setProductDetail(productDetailResult.get());
                return jpaRepository.save(importGoodsDetailEntity);
            }
            throw new EntityNotFoundException("ImportGoods or Product not found");
        }
        throw new EntityNotFoundException("ImportGoodsDetail not found");
    }

    @Override
    public Object findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
            List<FilterUtil> filter) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResultModel findAll(int pageNumber, int pageSize, String sortBy, String sortOrder, String importGoodsId) {
        try {
            if (importGoodsId == null) {
                Pageable pageable = PaginationUtil.pageable(pageNumber, pageSize, sortBy, sortOrder);
                Page<ImportGoodsDetailEntity> result = jpaRepository.findAll(pageable);
                Long count = jpaRepository.count();
                return ResultModelUtil.getResultModel(count, pageNumber, pageSize,
                        modelMapper.map(result.getContent(), ImportGoodsDetailModel.class));
            } else {
                Optional<ImportGoodsEntity> importGoodsResult = importGoodsRepository
                        .findById(Long.parseLong(importGoodsId));
                if (importGoodsResult.isPresent()) {
                    Pageable pageable = PaginationUtil.pageable(pageNumber, pageSize, sortBy, sortOrder);
                    List<ImportGoodsDetailEntity> result = jpaRepository.findAllByImportGoods(importGoodsResult.get(),
                            pageable);
                    Long count = jpaRepository.countByImportGoods(importGoodsResult.get());
                    return ResultModelUtil.getResultModel(count, pageNumber, pageSize,
                            modelMapper.map(result, ImportGoodsDetailModel.class));
                }
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ResultModel findByImportGoodsId(int page, int size, String sort, String order, String importGoodsId) {
        try {
            if (importGoodsId == null) {
                Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
                Page<ImportGoodsDetailEntity> result = jpaRepository.findAll(pageable);
                Long count = jpaRepository.count();
                return ResultModelUtil.getResultModel(count, page, size,
                        modelMapper.map(result.getContent(), ImportGoodsDetailModel.class));
            } else {
                Optional<ImportGoodsEntity> importGoodsResult = importGoodsRepository
                        .findById(Long.parseLong(importGoodsId));
                if (importGoodsResult.isPresent()) {
                    Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
                    List<ImportGoodsDetailEntity> result = jpaRepository.findAllByImportGoods(importGoodsResult.get(),
                            pageable);
                    Long count = jpaRepository.countByImportGoods(importGoodsResult.get());
                    return ResultModelUtil.getResultModel(count, page, size,
                            modelMapper.map(result, ImportGoodsDetailModel.class));
                }
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            jpaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public ImportGoodsDetailEntity findById(Long id) {
        Optional<ImportGoodsDetailEntity> importGoodsDetailResult = jpaRepository.findById(id);
        if (importGoodsDetailResult.isPresent()) {
            return importGoodsDetailResult.get();
        }
        return null;
    }

}
