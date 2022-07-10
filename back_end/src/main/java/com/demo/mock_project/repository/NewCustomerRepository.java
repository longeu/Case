package com.demo.mock_project.repository;

import com.demo.mock_project.entity.NewCustomerEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface NewCustomerRepository extends BaseRepository<NewCustomerEntity, Long> {

    @Query(value = "SELECT *,  (date(created_at)) AS day, COUNT(*) AS number_customer FROM customer GROUP BY day ORDER BY day ASC",nativeQuery = true)
    List<NewCustomerEntity> findAllByDay();



}
