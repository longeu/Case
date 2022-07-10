package com.demo.mock_project.repository;


import com.demo.mock_project.model.TopCustomerModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TopCustomerRepository extends BaseRepository<TopCustomerModel, Long> {
    @Query(value = "SELECT c.id,c.name,c.gender ,SUM(total_price) as total_price FROM orders o join customer c on o.customer_id = c.id\n" +
            "where date(o.created_at) between ?1 and ?2 GROUP by o.customer_id order by SUM(o.total_price) desc limit 0,5;",nativeQuery = true)
    List<TopCustomerModel> findAllByTotal(String fromDate,String toDate);

}
