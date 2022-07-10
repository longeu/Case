package com.demo.mock_project.repository;

import com.demo.mock_project.entity.AccountEntity;
import com.demo.mock_project.entity.AccountRoleEntity;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRoleRepository extends BaseRepository<AccountRoleEntity,Long> {
      List<AccountRoleEntity> findAllByAccount_Id(Long id);
      Integer deleteAllByAccount(AccountEntity accountEntity);
}
