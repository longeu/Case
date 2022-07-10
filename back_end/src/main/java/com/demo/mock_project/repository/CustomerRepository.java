package com.demo.mock_project.repository;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerRepository extends BaseRepository<CustomerEntity, Long> {

    @Query(value = "SELECT * FROM customer a  where a.code like %?1% or  a.name like %?1% or a.address like %?1% or a.phone like %?1% or a.email like %?1%  ",nativeQuery = true)
    Page<CustomerEntity> findAll(String search, Pageable pageable);
    @Query( value = "select count(o.id) from customer o where date(o.created_at) between ?1 and ?2   ",nativeQuery = true)
    Long countAllByCreateDate(String fromDate,String toDate);

    CustomerEntity findByPhone(String phone);
    CustomerEntity findByEmail(String email);
}
