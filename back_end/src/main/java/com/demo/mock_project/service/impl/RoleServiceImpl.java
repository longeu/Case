package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.RoleEntity;
import com.demo.mock_project.model.RoleModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.RoleRepository;
import com.demo.mock_project.service.RoleService;
import com.demo.mock_project.utils.ModelMapperUtil;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends BaseServiceImpl<RoleEntity, RoleRepository> implements RoleService {

  private  final ModelMapperUtil modelMapperUtil;
  public RoleServiceImpl(RoleRepository jpaRepository,
      ModelMapperUtil modelMapperUtil) {
    super(jpaRepository);
    this.modelMapperUtil = modelMapperUtil;
  }

  @Override
  public ResultModel findAll(int page, int size, String sort, String order, String search) {
    return null;
  }

  @Override
  public ResultModel fillAll() {
    ResultModel result = ResultModel.builder()
        .data(modelMapperUtil.map(jpaRepository.findAll(), RoleModel.class)).build();
    return result;
  }
}
