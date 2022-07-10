package com.demo.mock_project.service.impl;

import com.demo.mock_project.entity.*;
import com.demo.mock_project.model.ProductDetailModel;
import com.demo.mock_project.model.ProductModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.ProductDetailRepository;
import com.demo.mock_project.repository.ProductRepository;
import com.demo.mock_project.service.ProductDetailService;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class ProductDetailServiceImpl
        extends BaseServiceImpl<ProductDetailEntity, ProductDetailRepository>
        implements ProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private ModelMapperUtil modelMapper;
    Logger log = LoggerFactory.getLogger(ProductDetailServiceImpl.class);

    public ProductDetailServiceImpl(ProductDetailRepository jpaRepository) {
        super(jpaRepository);
    }

    @Override
    public ProductDetailEntity create(ProductDetailEntity productDetail) {
        Optional<ProductEntity> product = productRepository
                .findById(productDetail.getProduct().getId());
        productDetail.setQuantitySell(0);

        productDetail.setCode(generateCode(productDetailRepository.count()));
        productDetail.setBarCode(generateBarcode(productDetail.getCode()));
        productDetail.setProduct(product.get());
        return super.create(productDetail);
    }

    @Override
    public ProductDetailEntity update(ProductDetailEntity productDetailEntity) {

        return super.update(productDetailEntity);
    }

    @Transactional
    @Override
    public boolean delete(Long id) {
        try {
            ProductDetailEntity productDetail = findById(id);
            productDetail.setStatus(3);
            productDetailRepository.save(productDetail);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean tranferStatus(Long id) {
        try {
            ProductDetailEntity productDetail = findById(id);
            if (productDetail.getStatus() == 1) {
                productDetail.setStatus(2);
            } else {
                productDetail.setStatus(1);
            }

            productDetailRepository.save(productDetail);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteByIdIn(List<Long> ids, int status) {
        try {
            if (status == 1) {
                ids.forEach((id) -> {
                    delete(id);
                });
                return true;
            } else {
                ids.forEach((id) -> {
                    tranferStatus(id);
                });
                return true;
            }

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<ProductDetailModel> findAllByFilter(Integer size, String search) {
        try {

            List<ProductDetailEntity> result = productDetailRepository.findAllByFilter(1, search, search, search, search, search, size);
            ;


            return modelMapper.map(result, ProductDetailModel.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public ProductDetailEntity findById(Long id) {
        return super.findById(id)
                ;
    }

    @Override
    public ResultModel findAll(int page, int size, String sort, String order, String search) {
        return null;
    }

    @Override
    public ResultModel findAllByProduct(Long productId, int page, int size, String sort, String order) {
        try {
            Pageable paging = PaginationUtil.pageable(page, size, sort, order);
            Optional<ProductEntity> product = productRepository.findById(productId);
            Page<ProductDetailEntity> result = productDetailRepository
                    .findAllByProduct(product.get(), paging);
            if (result.isEmpty()) {
                return null;
            }
            return ResultModelUtil.getResultModel(Long.valueOf(result.getTotalPages()),
                    result.getNumber(), size,
                    modelMapper.map(result.getContent(), ProductDetailModel.class));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new EntityNotFoundException(e.getMessage());
        }
    }

    @Override
    public ResultModel findAllByProductAndStatus(Long productId, int status, int page, int size, String sort, String order) {
        try {
            Pageable paging = PaginationUtil.pageable(page, size, sort, order);
            Optional<ProductEntity> product = productRepository.findById(productId);
            Page<ProductDetailEntity> result = productDetailRepository
                    .findAllByProductAndStatus(product.get(), status, paging);
            if (result.isEmpty()) {
                return null;
            }
            return ResultModelUtil.getResultModel(Long.valueOf(result.getTotalPages()),
                    result.getNumber(), size,
                    modelMapper.map(result.getContent(), ProductDetailModel.class));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new EntityNotFoundException(e.getMessage());
        }
    }


    @Override
    public ResultModel findAll(String search, Long categoryId, Integer status
            , int page, int size
            , String sort, String order
            , String from, String to) {
        try {
            List<ProductDetailEntity> result = null;
            result = productDetailRepository
                    .findAllByNameAndCategoryAndStatus(search, categoryId,
                            status, page * size, size,
                            formateDate(from), formateDate(to), order);

            double total = productDetailRepository
                    .countProductDetails(search, categoryId, status,
                            formateDate(from), formateDate(to));


            return ResultModelUtil.getResultModel(Double
                            .valueOf(total)
                            .longValue(), page, size,
                    modelMapper.map(result, ProductDetailModel.class));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String generateCode(Long size) {

        String prefix = "P";
        String suffix = String.format("%04d", size);
        return prefix.toUpperCase() + suffix;
    }

    public String generateBarcode(String code) {
        String prefix = "0";
        String suffix = code + "DGH12";
        return prefix + suffix;
    }

    public String formateDate(String date) {
        Date formatDate = null;
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            formatDate = formatter.parse(date);
            String result = new SimpleDateFormat("yyyy-MM-dd").format(formatDate);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

}
