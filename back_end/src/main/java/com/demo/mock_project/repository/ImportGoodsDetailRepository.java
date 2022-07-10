package com.demo.mock_project.repository;

import java.util.List;
import java.util.Optional;

import com.demo.mock_project.entity.ImportGoodsDetailEntity;
import com.demo.mock_project.entity.ImportGoodsEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportGoodsDetailRepository extends BaseRepository<ImportGoodsDetailEntity, Long> {

    List<ImportGoodsDetailEntity> findAllByImportGoods(ImportGoodsEntity importGoodsResult,
            Pageable pageable);

    Long countByImportGoods(ImportGoodsEntity importGoodsEntity);

    Integer deleteAllByImportGoods(ImportGoodsEntity importGoodsEntity);

    
}
