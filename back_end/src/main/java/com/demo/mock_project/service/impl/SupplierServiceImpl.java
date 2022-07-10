package com.demo.mock_project.service.impl;

import java.util.List;

import com.demo.mock_project.entity.SupplierEntity;
import com.demo.mock_project.model.SupplierModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.SupplierRepository;
import com.demo.mock_project.service.SupplierService;
import com.demo.mock_project.utils.CodeCreateUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final Logger logger = LoggerFactory.getLogger(SupplierServiceImpl.class);
    private final ModelMapperUtil modelMapper;
    private final SupplierRepository jpaRepository;

    public SupplierServiceImpl(SupplierRepository jpaRepository, ModelMapperUtil modelMapper) {
        this.jpaRepository = jpaRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public SupplierEntity create(SupplierEntity t) {
        if (t.getId() == null) {
            t.setCode(CodeCreateUtil.getCode(t, jpaRepository.count() + 1));
            return jpaRepository.save(t);
        }
        throw new RuntimeException("SupplierEntity id is not null");
    }

    @Override
    public ResultModel findAll(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
            Integer status) {
        try {
            Pageable pageable = PaginationUtil.pageable(pageNumber, pageSize, sortBy, sortOrder);
            List<SupplierEntity> result = jpaRepository.findAll(name, status, pageable);
            Long count = jpaRepository.count(name, status);
            return ResultModelUtil.getResultModel(count, pageNumber, pageSize,
                    modelMapper.map(result, SupplierModel.class));
        } catch (Exception e) {
            logger.error("Error: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public ResultModel findAll(int page, int size, String sort, String order, String search) {
        try {
            Pageable pageable = PaginationUtil.pageable(page, size, sort, order);
            List<SupplierEntity> result = jpaRepository.findAllByNameContainingOrPhoneContaining(search, search,
                    pageable);
            Long count = jpaRepository.countByNameContainingOrPhoneContaining(search, search);
            return ResultModelUtil.getResultModel(count, page, size, modelMapper.map(result, SupplierModel.class));
        } catch (Exception e) {
            logger.error("Error: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public SupplierEntity update(SupplierEntity t) {
        if (t.getId() != null) {
            return jpaRepository.save(t);
        }
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public SupplierEntity findById(Long id) {
        return jpaRepository.findById(id).orElse(null);
    }

}
