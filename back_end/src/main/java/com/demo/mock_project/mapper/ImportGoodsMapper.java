package com.demo.mock_project.mapper;

import java.util.Optional;

import com.demo.mock_project.config.DateConfig;
import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.entity.SupplierEntity;
import com.demo.mock_project.model.ImportGoodsModel;
import com.demo.mock_project.repository.SupplierRepository;
import com.demo.mock_project.service.ImportGoodsService;
import com.demo.mock_project.utils.ModelMapperUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class ImportGoodsMapper {
    private final ImportGoodsService importGoodsService;
    private final ModelMapperUtil modelMapper;
    private final Logger logger = LoggerFactory.getLogger(ImportGoodsMapper.class);
    private final SupplierRepository supplierRepository;

    public ImportGoodsModel create(ImportGoodsModel importGoodsModel) {
        try {
            Optional<SupplierEntity> supplierResult = supplierRepository.findById(importGoodsModel.getSupplierId());
            if (supplierResult.isPresent()) {
                ImportGoodsEntity result = modelMapper.map(importGoodsModel, ImportGoodsEntity.class);
                result.setCreatedAt(DateConfig.getTimestamp());
                result.setUpdatedAt(DateConfig.getTimestamp());
                result = importGoodsService.create(result);
                return modelMapper.map(result, ImportGoodsModel.class);
            }
            return null;
        } catch (Exception e) {
            logger.error("Error mapping importGoodsEntity to importGoodsModel", e);
            return null;
        }
    }

    public ImportGoodsModel update(ImportGoodsModel importGoodsModel) {
        try {
            ImportGoodsEntity result = modelMapper.map(importGoodsModel, ImportGoodsEntity.class);
            result.setUpdatedAt(DateConfig.getTimestamp());
            result = importGoodsService.update(result);
            return modelMapper.map(result, ImportGoodsModel.class);
        } catch (Exception e) {
            logger.error("Error mapping importGoodsModel to importGoodsEntity", e);
            return null;
        }
    }
}
