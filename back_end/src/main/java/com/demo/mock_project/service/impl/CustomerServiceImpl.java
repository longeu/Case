package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.*;
import com.demo.mock_project.model.CustomerDetailModel;
import com.demo.mock_project.model.CustomerModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.*;
import com.demo.mock_project.service.CustomerService;
import com.demo.mock_project.utils.CodeCreateUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CustomerServiceImpl  implements CustomerService {

    private final ModelMapperUtil modelMapper;
    private final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
    private final CustomerRepository customerRepository;

    private final NewCustomerRepository newCustomerRepository;
    private final CustomerDetailRepository customerDetailRepository;
    @Override
    public CustomerModel create(CustomerModel customerModel) {
        CustomerEntity entity = modelMapper.map(customerModel,CustomerEntity.class);
        entity.setCode(CodeCreateUtil.getCode(entity,customerRepository.count()));
        return  modelMapper.map(customerRepository.save(entity),CustomerModel.class);
    }

    @Override
    public CustomerModel update(CustomerModel customerModel) {
        CustomerEntity entity = modelMapper.map(customerModel,CustomerEntity.class);

        return  modelMapper.map(customerRepository.save(entity),CustomerModel.class);
    }

    @Override
    public CustomerModel findById(Long id) {
        try {
            return modelMapper.map(customerDetailRepository.findOne(id),CustomerModel.class);
        }catch (Exception e){
            logger.error(e.getMessage());
            throw  new EntityNotFoundException(e.getMessage());
        }
    }

    @Override
    public ResultModel findAll(int page, int size, String sort, String search, String order ,String fromDate,String toDate) {
        try {
            List<CustomerDetailEntity> result = customerDetailRepository.findAllByFilter(search,(page-1)*size,size,fromDate,toDate);
            return ResultModelUtil.getResultModel(customerDetailRepository.countByFilter(search,fromDate,toDate), page, size,
                    modelMapper.map(result, CustomerDetailModel.class));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return null;
        }
    }




    @Override
    public List<NewCustomerEntity> findAllByDay() {
        try {

            List<NewCustomerEntity> result = newCustomerRepository.findAllByDay();

            return result;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return null;
        }
    }







    @Override
    public CustomerDetailModel getByCustomerId(Long id) {
        try {
            return modelMapper.map(customerDetailRepository.findOne(id),CustomerDetailModel.class);
        }catch (Exception e){
            logger.error(e.getMessage());
            throw  new EntityNotFoundException(e.getMessage());
        }
    }

    @Override
    public Boolean checkCustomerByEmail(String email,Long id) {
        CustomerEntity customerEntity = customerRepository.findByEmail(email);
        if (customerEntity!=null&& customerEntity.getId()!=id){
            return  true;
        }
        return false;
    }

    @Override
    public Boolean checkCustomerByPhone(String phone,Long id) {
        CustomerEntity customerEntity = customerRepository.findByPhone(phone);
        if (customerEntity!=null&& customerEntity.getId()!=id){
            return  true;
        }
        return false;
    }
}
