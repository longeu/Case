package com.demo.mock_project.service;

import java.util.Date;
import java.util.List;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.model.ImportGoodsModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.utils.FilterUtil;

public interface ImportGoodsService extends BaseService<ImportGoodsEntity> {
    ResultModel findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
            List<FilterUtil> filter);

    ResultModel findAll(int pageNumber, int pageSize, String sortBy, String sortOrder, Long supplierId, int status, String code);

    ResultModel findAll(int page, int size, String sort, String order, String search, Date createdDate,
            Date createdDate2);
    ResultModel findAll(int page, int size, String sort, String order, Long supplierId, int status, String code, Date createdDate,
                        Date createdDate2);

    ImportGoodsEntity update(ImportGoodsModel t);

    ImportGoodsEntity create(ImportGoodsModel t);
}
