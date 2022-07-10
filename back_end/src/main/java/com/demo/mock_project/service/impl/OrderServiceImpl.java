package com.demo.mock_project.service.impl;


import com.demo.mock_project.entity.OrderDetailEntity;
import com.demo.mock_project.entity.OrderEntity;
import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.TopStaffEntity;
import com.demo.mock_project.entity.TotalRevenueEntity;
import com.demo.mock_project.model.OrderCreate;
import com.demo.mock_project.model.OrderDetailCreate;
import com.demo.mock_project.model.OrderModel;
import com.demo.mock_project.model.RevenueStatisticModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.AccountRepository;
import com.demo.mock_project.repository.CustomerRepository;
import com.demo.mock_project.repository.OrderDetailRepository;
import com.demo.mock_project.repository.OrderRepository;
import com.demo.mock_project.repository.ProductDetailRepository;
import com.demo.mock_project.repository.TopStaffRepository;
import com.demo.mock_project.repository.RevenueStatisticRepository;
import com.demo.mock_project.repository.TotalRevenueRepository;
import com.demo.mock_project.service.OrderService;
import com.demo.mock_project.utils.CodeCreateUtil;
import com.demo.mock_project.utils.ModelMapperStandardUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.ResultModelUtil;

import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final AccountRepository accountRepository;
    private final OrderRepository orderRepository;
    private final ModelMapperStandardUtil modelMapper;
    private final OrderDetailRepository orderDetailRepository;
    private final CustomerRepository customerRepository;
    private final ProductDetailRepository productDetailRepository;

    private final TotalRevenueRepository totalRevenueRepository;
    private final TopStaffRepository topStaffRepository;


    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);


    @Override
    public ResultModel findAllByFilter(int status, Long accountId, Long customerId, String search, int pageNumber,
                                       int size, String fromDate, String toDate) {
        try {

            List<OrderEntity> orders = orderRepository
                    .findAllByFilter(status, accountId, customerId, search, (pageNumber - 1) * size, size, fromDate,
                            toDate);
            Long total = orderRepository.CountAllByFilter(status, accountId, customerId, search, fromDate,
                    toDate);

            return ResultModelUtil.getResultModel(total, pageNumber, size,
                    modelMapper.map(orders, OrderModel.class));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new EntityNotFoundException(e.getMessage());

        }

    }

    @Override
    public OrderEntity findById(Long id) {
        try {
            return orderRepository.getById(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new EntityNotFoundException(e.getMessage());
        }

    }


    @Override
    public boolean deleteByIdIn(List<Long> ids) {
        return false;
    }

    @Override
    @Transactional
    public OrderModel createOrder(OrderCreate model) {

        try {
            OrderEntity orderEntity = modelMapper.map(model, OrderEntity.class);
            orderEntity.setAccount(accountRepository.getById(model.getAccountId()));
            if (model.getCustomer()!=null){
                orderEntity.setCustomer(customerRepository.getById(model.getCustomer().getId()));
            }else{
                orderEntity.setCustomer(customerRepository.getById(Long.valueOf(38)));
            }
            orderEntity.setStatus(1);
            orderEntity.setCode(CodeCreateUtil.getCode(orderEntity, orderRepository.count()));
            OrderEntity result = orderRepository.save(orderEntity);
            createOrderDetail(result, model.getOrderDetails());
            return modelMapper.map(result, OrderModel.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }

    }

    public void createOrderDetail(OrderEntity orderEntity, List<OrderDetailCreate> orderDetailCreates) {
        try {
            for (OrderDetailCreate item : orderDetailCreates) {
                OrderDetailEntity orderDetailEntity = modelMapper.map(item, OrderDetailEntity.class);
                Optional<ProductDetailEntity> productDetailEntity = productDetailRepository.findById(item.getProductDetailModel().getId());
                if (productDetailEntity.isEmpty()) {
                    throw new EntityNotFoundException("Không tìm thấy");
                }
                orderDetailEntity.setProductDetail(productDetailEntity.get());
                orderDetailEntity.setOrder(orderEntity);
                updateProductDetail(productDetailEntity.get(), item.getQuantity());
                orderDetailRepository.save(orderDetailEntity);
            }
        } catch (Exception e) {
            log.error(e.getMessage());


        }
    }

    public void updateProductDetail(ProductDetailEntity productDetailEntity, Integer quantity) {
        try {
            productDetailEntity.setQuantitySell(productDetailEntity.getQuantitySell() + quantity);
            productDetailEntity.setQuantity(productDetailEntity.getQuantity() - quantity);
            productDetailRepository.save(productDetailEntity);
        } catch (Exception e) {

            log.error(e.getMessage());
        }
    }

    @Override
    public TotalRevenueEntity findAllTotal(String fromDate, String toDate) {
        try {
            TotalRevenueEntity result = totalRevenueRepository.findAllTotal(fromDate, toDate);

            return result;
        } catch (Exception e) {
            return null;
        }
    }


    @Override
    public List<TopStaffEntity> findAllTopStaff() {
        try {
            List<TopStaffEntity> result = topStaffRepository.findAllTopStaff();

            return result;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public OrderModel updateNote(Long id, String note) {
        try {
            OrderEntity orderEntity = orderRepository.getById(id);
            orderEntity.setNote(note);
            return modelMapper.map(orderRepository.save(orderEntity), OrderModel.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new EntityNotFoundException(e.getMessage());

        }
    }


}
