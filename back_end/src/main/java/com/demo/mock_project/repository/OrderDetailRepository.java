package com.demo.mock_project.repository;

import com.demo.mock_project.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends BaseRepository<OrderDetailEntity,Long> {
    Page<OrderDetailEntity> findAllByOrder(OrderEntity orderResult,
                                           Pageable pageable);

    Page<OrderDetailEntity> findAllByProductDetail(ProductDetailEntity productDetail, Pageable paging);

}
