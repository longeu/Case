package com.demo.mock_project.repository;

import com.demo.mock_project.entity.CustomerDetailEntity;
import com.demo.mock_project.entity.CustomerEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDetailRepository extends BaseRepository<CustomerDetailEntity, Long> {




  @Query(value = "SELECT distinct c.*, sum(o.total_quantity) as total_quantity, count(o.customer_id) as total_orders,sum(o.total_price) as total_price FROM customer c left join  orders o  on o.customer_id=c.id "
          + " where  date_format(c.created_at,'%Y-%m-%d') >= ?4 and date_format(c.created_at,'%Y-%m-%d') <=?5 and ( c.code like %?1% or  c.name like %?1% or c.address like %?1% or c.address_detail like %?1%  or c.phone like %?1% or c.email like %?1%) GROUP BY c.id order by c.id desc limit ?2,?3 ",nativeQuery = true)
  List<CustomerDetailEntity> findAllByFilter(String search,Integer page , Integer limit,String fromDate,String toDate);
  @Query(value = "SELECT c.*, sum(o.total_quantity) as total_quantity, count(o.customer_id) as total_orders,sum(o.total_price) as total_price FROM customer c left join  orders o  on o.customer_id=c.id "
          + "where c.id=?1  GROUP BY c.id  ",nativeQuery = true)
  CustomerDetailEntity findOne(java.lang.Long id);
  @Query(value = "SELECT distinct count(c.id) FROM customer c"
          + " where  date_format(c.created_at,'%Y-%m-%d') >= ?2 and date_format(c.created_at,'%Y-%m-%d') <=?3 and (c.code like %?1% or  c.name like %?1% or c.address_detail like %?1% or c.address like %?1% or c.phone like %?1% or c.email like %?1%)  ",nativeQuery = true)
  Long countByFilter(String search,String fromDate,String toDate);

}
