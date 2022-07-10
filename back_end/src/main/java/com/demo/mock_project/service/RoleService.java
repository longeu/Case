package com.demo.mock_project.service;

import com.demo.mock_project.entity.RoleEntity;
import com.demo.mock_project.model.RoleModel;
import com.demo.mock_project.model.respone.ResultModel;
import java.util.List;

public interface RoleService extends BaseService<RoleEntity>{
    ResultModel fillAll();
}
