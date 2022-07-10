package com.demo.mock_project.service.impl;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.ImportGoodsDetailEntity;
import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.SupplierEntity;
import com.demo.mock_project.model.ImportGoodsModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.AccountRepository;
import com.demo.mock_project.repository.ImportGoodsDetailRepository;
import com.demo.mock_project.repository.ImportGoodsRepository;
import com.demo.mock_project.repository.ProductDetailRepository;
import com.demo.mock_project.repository.SupplierRepository;
import com.demo.mock_project.service.ImportGoodsService;
import com.demo.mock_project.utils.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImportGoodsServiceImpl implements ImportGoodsService {

  private final AccountRepository accountRepository;
  private final SupplierRepository supplierRepository;
  private final Logger logger = LoggerFactory.getLogger(ImportGoodsServiceImpl.class);
  private final ModelMapperStandardUtil modelMapper;
  private final ImportGoodsRepository jpaRepository;
  private final ImportGoodsDetailRepository importGoodsDetailRepository;
  private final ProductDetailRepository productDetailRepository;

  @Override
  @Transactional
  public ImportGoodsEntity create(ImportGoodsModel t) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    AccountEntity result = accountRepository.findByUsername(principal.getName());
    Optional<SupplierEntity> supplierResult = supplierRepository.findById(t.getSupplierId());
    try {
      if (supplierResult.isPresent()) {
        ImportGoodsEntity importGoodsEntity = new ImportGoodsEntity();
        importGoodsEntity.setCode(CodeCreateUtil.getCode(ImportGoodsEntity.class, jpaRepository.count()));
        importGoodsEntity.setTotalQuantity(t.getTotalQuantity());
        importGoodsEntity.setTotalPrice(t.getTotalPrice());
        importGoodsEntity.setPrice(t.getPrice());
        importGoodsEntity.setDiscount(t.getDiscount());
        importGoodsEntity.setDescription(t.getDescription());
        importGoodsEntity.setSupplier(supplierResult.get());
        importGoodsEntity.setAccount(result);
        importGoodsEntity.setStatus(0);
        ImportGoodsEntity importGoodsEntityResult = jpaRepository.save(importGoodsEntity);
        t.getImportGoodsDetails().forEach(importGoodsDetail -> {
          logger.info("product details id: {}", importGoodsDetail.getProductDetailId());
          ImportGoodsDetailEntity importGoodsDetailEntity = new ImportGoodsDetailEntity();
          importGoodsDetailEntity.setQuantity(importGoodsDetail.getQuantity());
          importGoodsDetailEntity.setImportGoods(importGoodsEntityResult);
          importGoodsDetailEntity.setDiscount(importGoodsDetail.getDiscount());
          importGoodsDetailEntity.setPrice(importGoodsDetail.getPrice());
          importGoodsDetailEntity.setTotalPrice(importGoodsDetail.getTotalPrice());
          ProductDetailEntity productDetailEntity = productDetailRepository
              .findById(importGoodsDetail.getProductDetailId()).get();
          importGoodsDetailEntity.setProductDetail(productDetailEntity);
          importGoodsDetailRepository.save(importGoodsDetailEntity);
          logger.info("success: ");
        });
        return importGoodsEntityResult;
      }

      return null;
    } catch (Exception e) {
      logger.error("create importGoods error: {}", e.getMessage());
      return null;
    }
  }

  @Override
  public ResultModel findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
      List<FilterUtil> filter) {
    return null;
  }

  @Override
  public ResultModel findAll(int pageNumber, int pageSize, String sortBy, String sortOrder, Long supplierId, int status, String code) {
    try {
      Optional<SupplierEntity> supplierResult = supplierRepository.findById(supplierId);
      Pageable pageable = PaginationUtil.pageable(pageNumber, pageSize, sortBy, sortOrder);

      logger.info("1");
      List<ImportGoodsEntity> result;
      Long count;
      if (status == 2) {
        result = jpaRepository.findAllBySupplierIdAndCodeContaining(supplierId, code, pageable);
        count = jpaRepository.countBySupplierIdAndCodeContaining(supplierId, code);
      } else {
        result = jpaRepository.findAllBySupplierAndStatusAndCodeContaining(supplierResult, status, code, pageable);
        count = jpaRepository.countBySupplierAndStatusAndCodeContaining(supplierResult, status, code);
      }
      return ResultModelUtil.getResultModel(count, pageNumber, pageSize,
          modelMapper.map(result, ImportGoodsModel.class));

    } catch (Exception e) {
      return null;
    }
  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, String search) {
    try {
      Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
      Page<ImportGoodsEntity> result = jpaRepository.findAllBySupplierNameContainingOrCodeContaining(search,search, pageable);
      List<ImportGoodsModel> importGoodsModels = result.getContent().stream().map(val -> {
        ImportGoodsModel resultModel = modelMapper.map(val, ImportGoodsModel.class);
        resultModel.setSupplierName(val.getSupplier().getName());
        return resultModel;
      }).collect(Collectors.toList());
      Long count = jpaRepository.countBySupplierNameContainingOrCodeContaining(search,search);
      return ResultModelUtil.getResultModel(count, page, size, importGoodsModels);
    } catch (Exception e) {
      logger.error("Error find all: {}", e.getMessage());
      return null;
    }
  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, String search, Date createdDate,
      Date createdDate2) {
    try {
      Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
      Long count;
      List<ImportGoodsEntity> result;
      if (createdDate == null) {
        result = jpaRepository.findAllByCreatedAtBefore(createdDate2, pageable);
        count = jpaRepository.countByCreatedAtBefore(createdDate2);
      } else {
        result = jpaRepository.findAllByCreatedAtBetweenAndSupplierNameContaining(createdDate, createdDate2,
            search, pageable);
        count = jpaRepository.countByCreatedAtBetweenAndSupplierNameContaining(createdDate, createdDate2,
            search);
      }
      List<ImportGoodsModel> importGoodsModels = result.stream().map(val -> {
        ImportGoodsModel resultModel = modelMapper.map(val, ImportGoodsModel.class);
        resultModel.setSupplierName(val.getSupplier().getName());
        return resultModel;
      }).collect(Collectors.toList());
      return ResultModelUtil.getResultModel(count, page, size, importGoodsModels);
    } catch (Exception e) {
      logger.error("Error: {}", e.getMessage());
      return null;
    }
  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, Long supplierId, int status, String code, Date createdDate,
      Date createdDate2) {
    try {
      Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
      Long count;
      List<ImportGoodsEntity> result;
      if (createdDate == null) {
        result = jpaRepository.findAllByCreatedAtBeforeAndSupplierIdAndCodeContaining(createdDate2, supplierId, code, pageable);
        count = jpaRepository.countByCreatedAtBeforeAndSupplierIdAndCodeContaining(createdDate2, supplierId, code);
      }else if(status ==2){
        result = jpaRepository.findAllByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndCodeContaining(createdDate, createdDate2,
            supplierId, code, pageable);
        count = jpaRepository.countByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndCodeContaining(createdDate, createdDate2,
            supplierId, code);
      } else {
        result = jpaRepository.findAllByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndStatusAndCodeContaining(createdDate, createdDate2,
            supplierId, status, code, pageable);
        count = jpaRepository.countByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndStatusAndCodeContaining(createdDate, createdDate2,
            supplierId, status, code);
      }
      List<ImportGoodsModel> importGoodsModels = result.stream().map(val -> {
        ImportGoodsModel resultModel = modelMapper.map(val, ImportGoodsModel.class);
        resultModel.setSupplierName(val.getSupplier().getName());
        return resultModel;
      }).collect(Collectors.toList());
      logger.info("end");
      return ResultModelUtil.getResultModel(count, page, size, importGoodsModels);
    } catch (Exception e) {
      logger.error("Error: {}", e.getMessage());
      return null;
    }
  }

  @Override
  @Transactional
  public ImportGoodsEntity update(ImportGoodsModel t) {
    logger.info("put");
    try {
      Principal principal = SecurityContextHolder.getContext().getAuthentication();
      AccountEntity result = accountRepository.findByUsername(principal.getName());
      Optional<ImportGoodsEntity> importGoodsResult = jpaRepository.findById(t.getId());
      Optional<SupplierEntity> supplierResult = supplierRepository.findById(t.getSupplierId());
      if (importGoodsResult.isPresent()  && supplierResult.isPresent()) {
        ImportGoodsEntity importGoodsEntity = importGoodsResult.get();
        importGoodsDetailRepository.deleteAllByImportGoods(importGoodsResult.get());
        importGoodsEntity.setTotalQuantity(t.getTotalQuantity());
        importGoodsEntity.setTotalPrice(t.getTotalPrice());
        importGoodsEntity.setPrice(t.getPrice());
        importGoodsEntity.setDiscount(t.getDiscount());
        importGoodsEntity.setDescription(t.getDescription());
        importGoodsEntity.setSupplier(supplierResult.get());
        importGoodsEntity.setAccount(result);
        importGoodsEntity.setStatus(t.getStatus());
        t.getImportGoodsDetails().forEach(importGoodsDetail -> {
          logger.info("create importGoodsDetail: {}", importGoodsDetail.getQuantity());
          ImportGoodsDetailEntity importGoodsDetailEntity = new ImportGoodsDetailEntity();
          importGoodsDetailEntity.setQuantity(importGoodsDetail.getQuantity());
          importGoodsDetailEntity.setImportGoods(importGoodsResult.get());
          importGoodsDetailEntity.setDiscount(importGoodsDetail.getDiscount());
          importGoodsDetailEntity.setPrice(importGoodsDetail.getPrice());
          importGoodsDetailEntity.setTotalPrice(importGoodsDetail.getTotalPrice());
          ProductDetailEntity productDetailEntity = productDetailRepository
              .findById(importGoodsDetail.getProductDetailId()).get();
          importGoodsDetailEntity.setProductDetail(productDetailEntity);
          importGoodsDetailRepository.save(importGoodsDetailEntity);
          if (t.getStatus() == 1) {
            productDetailEntity
                .setQuantity(productDetailEntity.getQuantity() + importGoodsDetail.getQuantity());
            productDetailRepository.save(productDetailEntity);
          }
        });
        return jpaRepository.save(importGoodsEntity);
      }
      return null;
    } catch (Exception e) {
      logger.error("Error: {}", e.getMessage());
      return null;
    }
  }


  @Override
  public boolean delete(Long id) {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public ImportGoodsEntity findById(Long id) {
    Optional<ImportGoodsEntity> result = jpaRepository.findById(id);
    if (result.isPresent()) {
      return result.get();
    }
    throw new RuntimeException("Not found");
  }

  @Override
  public ImportGoodsEntity update(ImportGoodsEntity t) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public ImportGoodsEntity create(ImportGoodsEntity t) {
    // TODO Auto-generated method stub
    return null;
  }

}
