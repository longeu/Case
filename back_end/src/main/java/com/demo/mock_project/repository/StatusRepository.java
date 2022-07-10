package com.demo.mock_project.repository;

import com.demo.mock_project.entity.StatisticalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<StatisticalEntity, Long> {
    @Query(value = "SELECT p.id as id , p.name  ,SUM(d.quantity_sell) as 'quantity_sell' FROM product_detail d join product p on d.product_id= p.id\n" +
            "GROUP by d.product_id order by SUM(d.quantity_sell) desc limit 0,5",nativeQuery = true)
    List<StatisticalEntity> findAllByQuantitySell();
}
