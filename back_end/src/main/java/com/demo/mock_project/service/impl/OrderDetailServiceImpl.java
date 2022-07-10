package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.*;
import com.demo.mock_project.model.CustomOrderDetailModel;
import com.demo.mock_project.model.OrderDetailModel;
import com.demo.mock_project.model.ProductDetailModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.*;
import com.demo.mock_project.service.OrderDetailService;
import com.demo.mock_project.utils.FilterUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl  implements OrderDetailService {
    private final OrderRepository orderRepository;
    private final ProductDetailRepository productDetailRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ModelMapperUtil modelMapper;



    @Override
    public ResultModel findAllByFilter(int pageNumber, int pageSize, String sortBy, String sortOrder, String name, List<FilterUtil> filter) {
        return null;
    }

    @Override
    public ResultModel findAllByProductDetail(Long productDetailId, int page, int size, String sort, String order) {
        try {
            Pageable paging = PaginationUtil.pageable(page, size, sort, order);
            Optional<ProductDetailEntity> product = productDetailRepository.findById(productDetailId);
            Page<OrderDetailEntity> result = orderDetailRepository
                    .findAllByProductDetail(product.get(), paging);
            if (result.isEmpty()) {
                return null;
            }
            return ResultModelUtil.getResultModel(Long.valueOf(result.getTotalPages()),
                    result.getNumber(), size,
                    modelMapper.map(result.getContent(), CustomOrderDetailModel.class));
        } catch (Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }

    @Override
    public ResultModel findAllByOrder(Long orderId, int page, int size, String sort, String order) {
        try {
            Pageable paging = PaginationUtil.pageable(page, size, sort, order);
            Optional<OrderEntity> orders = orderRepository.findById(orderId);
            Page<OrderDetailEntity> result = orderDetailRepository
                    .findAllByOrder(orders.get(), paging);
            if (result.isEmpty()) {
                return null;
            }
            return ResultModelUtil.getResultModel(Long.valueOf(result.getTotalPages()),
                    result.getNumber(), size,
                    modelMapper.map(result.getContent(), CustomOrderDetailModel.class));
        } catch (Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }





}
