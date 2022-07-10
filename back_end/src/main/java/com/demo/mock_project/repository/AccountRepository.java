package com.demo.mock_project.repository;

import com.demo.mock_project.entity.AccountEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository  extends JpaRepository<AccountEntity,Long> {
  AccountEntity findByUsername(String username);

  @Query(value = "call GetAllAccounts(?1,?2,?3,?4,?5,?6,?7)",nativeQuery = true)
  List<AccountEntity> findAllByFilter(Integer status,Long roleId,String search,Integer pageNumber,Integer size,String fromDate, String toDate);

  @Query(value = "call CountAllAccounts(?1,?2,?3,?4,?5)",nativeQuery = true)
  Long CountAllByFilter(Integer status,Long roleId,String search,String fromDate, String toDate);


  AccountEntity findByPhone(String phone);

}
