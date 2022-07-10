package com.demo.mock_project.repository;

import com.demo.mock_project.entity.*;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalRevenueRepository extends BaseRepository<TotalRevenueEntity, Long> {
    @Query(value = "select *, sum(o.total_price) as total_revenue from orders o where date(o.created_at) between ?1 and ?2 ",nativeQuery = true)
    TotalRevenueEntity findAllTotal(String fromDate, String toDate);



}
