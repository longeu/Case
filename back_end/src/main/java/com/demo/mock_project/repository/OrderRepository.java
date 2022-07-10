package com.demo.mock_project.repository;

import com.demo.mock_project.entity.*;

import com.demo.mock_project.model.RevenueStatisticModel;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends BaseRepository<OrderEntity, Long> {
    @Query( value = "call GetAllOrders(?1,?2,?3,?4,?5,?6,?7,?8)",nativeQuery = true)
    List<OrderEntity> findAllByFilter(int status, Long accountId,Long customerId, String search, int pageNumber,
        int size, String fromDate, String toDate);
    @Query( value = "call CountAllOrders(?1,?2,?3,?4,?5,?6)",nativeQuery = true)
    Long CountAllByFilter(int status, Long accountId,Long customerId, String search, String fromDate, String toDate);

    @Query( value = "select count(o.id) from orders o where date(o.created_at) between ?1 and ?2   ",nativeQuery = true)
    Long countAllByCreateDate(String fromDate,String toDate);
}
