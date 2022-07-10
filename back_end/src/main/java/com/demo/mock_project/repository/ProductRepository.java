package com.demo.mock_project.repository;

import com.demo.mock_project.entity.CategoryEntity;
import com.demo.mock_project.entity.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Repository
public interface ProductRepository extends BaseRepository<ProductEntity, Long> {


    @Query(value = "CALL GetAllProducts(:name , :category_id, :status, " +
            ":page, :size, :from, :to, :sort, :order);"
        ,nativeQuery = true)
    List<ProductEntity> findByNameAndCategoryAndStatus(@Param("name") String name,
        @Param("category_id") Long categoryId,
        @Param("status")Integer status,
        @Param("page") int page,
        @Param("size") int size,
        @Param("from") String from,
        @Param("to") String to,
        @Param("sort") String sort,
        @Param("order") String order
    );

    @Query(value = "CALL CountProducts(:name , :category_id, :status, :from, :to);"
        ,nativeQuery = true)
    int countProducts(@Param("name") String name,
        @Param("category_id") Long categoryId,
        @Param("status")Integer status,
        @Param("from") String from,
        @Param("to") String to
    );

    Page<ProductEntity> findByNameContaining(String name, Pageable paging);



}
