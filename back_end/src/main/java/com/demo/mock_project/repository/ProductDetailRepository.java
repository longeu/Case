package com.demo.mock_project.repository;

import com.demo.mock_project.entity.OrderEntity;
import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.entity.StatisticalEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends BaseRepository<ProductDetailEntity, Long> {


    Page<ProductDetailEntity> findAllByProduct(ProductEntity product, Pageable paging);

    Page<ProductDetailEntity>  findAllByProductAndStatus(ProductEntity product
            , int status, Pageable paging);


    @Modifying
    @Query(value = "update product_detail set status = :status " +
            "where product_id = :product_id", nativeQuery = true)
   Integer  saveAllByProductId(@Param("product_id") Long productId,
                                                @Param("status") int status);

    @Query(value = "select count(pd.status) from product_detail pd " +
            "where pd.product_id = :id and pd.status = :status ", nativeQuery = true)
    int countStatusByProductId(@Param("id") Long productId, @Param("status") int status);

    @Query(value = "select sum(quantity_sell) from product_detail  " +
            "where product_id = :id", nativeQuery = true)
    int countQuantitySellByProductId(@Param("id") Long productId);


  @Query(value = "select pd.* from product_detail pd join product p on pd.product_id = p.id where "
      + "pd.status =?1 and (p.name like %?2% or pd.code like %?3% or pd.color like %?4% or "
      + "pd.size like %?5% or pd.barcode like %?6%) order by pd.quantity_sell desc limit 0,?7",nativeQuery = true)
  List<ProductDetailEntity> findAllByFilter(Integer status,String name,String code,String color,String size,String barcode,Integer limit);

  @Query(value = "CALL GetProductDetails(:search, :category_id, :status, " +
          ":page, :size, :from, :to, :order); ", nativeQuery = true)
    List<ProductDetailEntity> findAllByNameAndCategoryAndStatus(
            @Param("search") String search,
          @Param("category_id") Long categoryId,
          @Param("status")Integer status,
          @Param("page") int page,
          @Param("size") int size,
          @Param("from") String from,
          @Param("to") String to,
          @Param("order") String order
  );

    @Query(value = "CALL CountProductDetails(:search, :category_id, :status, :from, :to); ", nativeQuery = true)
    int countProductDetails(
            @Param("search") String search,
            @Param("category_id") Long categoryId,
            @Param("status")Integer status,
            @Param("from") String from,
            @Param("to") String to
    );
}
