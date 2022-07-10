package com.demo.mock_project.repository;


import com.demo.mock_project.entity.TopStaffEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TopStaffRepository extends BaseRepository<TopStaffEntity, Long> {
    @Query(value = "SELECT a.id,a.fullname,a.gender ,SUM(total_price) as 'total_price' FROM orders o join account a on o.account_id = a.id\n" +
            "GROUP by o.account_id order by SUM(o.total_price) desc limit 0,5",nativeQuery = true)
    List<TopStaffEntity> findAllTopStaff();

}
