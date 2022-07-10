package com.demo.mock_project.repository;

import java.util.List;

import com.demo.mock_project.entity.SupplierEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends BaseRepository<SupplierEntity, Long> {

    List<SupplierEntity> findAllByNameContainingOrPhoneContaining(String name, String phone, Pageable pageable);

    Long countByNameContainingOrPhoneContaining(String name, String phone);

    @Query(value = "SELECT * FROM supplier WHERE status = ?2 AND ( name LIKE %?1% OR phone LIKE %?1% )", nativeQuery = true)
    List<SupplierEntity> findAll(String name, Integer status, Pageable pageable);

    @Query(value = "select count(*) FROM supplier WHERE status = ?2 AND ( name LIKE %?1% OR phone LIKE %?1% )", nativeQuery = true)
    Long count(String name, Integer status);

    @Query( value = "select count(o.id) from supplier o where date(o.created_at) between ?1 and ?2   ",nativeQuery = true)
    Long countAllByCreateDate(String fromDate,String toDate);
}
