package com.demo.mock_project.repository;

import com.demo.mock_project.entity.*;

import com.demo.mock_project.model.RevenueStatisticModel;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenueStatisticRepository extends BaseRepository<RevenueStatisticModel, Long> {

    @Query(value = "SELECT o.id,  (date(o.created_at)) AS created_at, sum(o.total_price) AS total_price FROM orders o where date(o.created_at) between ?1 and ?2  GROUP BY (date(o.created_at)) ORDER BY (date(o.created_at)) asc",nativeQuery = true)
    List<RevenueStatisticModel> revenueStatistics(String fromDate,String toDate);


}
