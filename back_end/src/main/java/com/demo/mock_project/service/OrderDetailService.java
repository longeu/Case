package com.demo.mock_project.service;

import com.demo.mock_project.entity.OrderDetailEntity;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.BaseRepository;
import com.demo.mock_project.utils.FilterUtil;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface OrderDetailService  {
    ResultModel findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name,
                                List<FilterUtil> filter);

    ResultModel findAllByProductDetail(Long productDetailId, int page, int size, String sort, String order);

    ResultModel findAllByOrder(Long orderId, int page, int size, String sort, String order);
}
