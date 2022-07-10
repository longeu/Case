package com.demo.mock_project.service;

import java.util.List;

import com.demo.mock_project.entity.ImportGoodsDetailEntity;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.utils.FilterUtil;

public interface ImportGoodsDetailService extends BaseService<ImportGoodsDetailEntity> {
    Object findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
            List<FilterUtil> filter);

    ResultModel findByImportGoodsId(int page, int size, String sort, String order, String importGoodsId);
}

