package com.demo.mock_project.repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.ImportGoodsEntity;
import com.demo.mock_project.entity.SupplierEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ImportGoodsRepository extends BaseRepository<ImportGoodsEntity, Long> {


    List<ImportGoodsEntity> findAllByCreatedAtBefore(Date createdDate, Pageable pageable);

    Long countByCreatedAtBefore(Date createdDate);

    List<ImportGoodsEntity> findAllBySupplierAndStatusAndCodeContaining(Optional<SupplierEntity> supplierResult, int status,String code, Pageable pageable);

    Long countBySupplierAndStatusAndCodeContaining(Optional<SupplierEntity> supplierResult, int status, String code);

    List<ImportGoodsEntity> findAllBySupplierIdAndCodeContaining(Long supplierId, String code, Pageable pageable);

    Long countBySupplierIdAndCodeContaining(Long supplierId, String code);

    List<ImportGoodsEntity> findAllByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndStatusAndCodeContaining(Date createdDate,
                                                                                            Date createdDate2, Long id, int status, String code, Pageable pageable);

    Long countByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndStatusAndCodeContaining(Date createdDate, Date createdDate2,
                                                                       Long id, int status, String code);

    List<ImportGoodsEntity> findAllByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndCodeContaining(Date createdDate,
                                                                                                             Date createdDate2, Long id, String code, Pageable pageable);

    Long countByUpdatedAtAfterAndCreatedAtBeforeAndSupplierIdAndCodeContaining(Date createdDate, Date createdDate2,
                                                                                        Long id, String code);

    List<ImportGoodsEntity> findAllByCreatedAtBetweenAndSupplierNameContaining(Date createdDate, Date createdDate2,
                                                                               String name, Pageable pageable);

    Long countByCreatedAtBetweenAndSupplierNameContaining(Date createdDate, Date createdDate2, String name);

    Page<ImportGoodsEntity> findAllBySupplierNameContainingOrCodeContaining(String name,String code ,Pageable pageable);

    Long countBySupplierNameContainingOrCodeContaining(String search,String code );

    List<ImportGoodsEntity> findAllByCreatedAtBeforeAndSupplierIdAndCodeContaining(Date createdDate, Long supplierId,  String code , Pageable pageable);

    Long countByCreatedAtBeforeAndSupplierIdAndCodeContaining(Date createdDate,Long supplierId, String code);

    Long countBySupplierId(Long supplierId);

    @Query(value = "SELECT SUM(total_price) FROM purchase_order WHERE supplier_id = ?1 AND status = 1", nativeQuery = true)
    BigDecimal sumBySupplierId(Long supplierId);


    @Query( value = "select count(o.id) from purchase_order o where date(o.created_at) between ?1 and ?2   ",nativeQuery = true)
    Long countAllByCreateDate(String fromDate,String toDate);

}


