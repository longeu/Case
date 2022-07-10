package com.demo.mock_project.service.impl;
import com.demo.mock_project.entity.CategoryEntity;
import com.demo.mock_project.entity.ProductDetailEntity;
import com.demo.mock_project.entity.ProductEntity;
import com.demo.mock_project.model.ProductModel;
import com.demo.mock_project.model.respone.ResultModel;
import com.demo.mock_project.repository.CategoryRepository;
import com.demo.mock_project.repository.ProductDetailRepository;
import com.demo.mock_project.repository.ProductRepository;
import com.demo.mock_project.service.ProductService;
import com.demo.mock_project.utils.CodeCreateUtil;
import com.demo.mock_project.utils.ModelMapperUtil;
import com.demo.mock_project.utils.PaginationUtil;
import com.demo.mock_project.utils.ResultModelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;

import java.util.*;

@Service
public class ProductServiceImpl extends BaseServiceImpl<ProductEntity, ProductRepository> implements ProductService  {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private  ModelMapperUtil modelMapper;


    public ProductServiceImpl(ProductRepository jpaRepository) {
        super(jpaRepository);
    }


    @Override
    @Transactional
    public ProductEntity create(ProductEntity p) {
        try {

            Optional<CategoryEntity> category = categoryRepository
                    .findById(p.getCategory().getId());
            p.setCategory(category.get());
            saveProductDetails(productRepository.save(p));
            return p;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Transactional
    @Override
    public ProductEntity update(ProductEntity p) {
        try {
            if(p.getStatus() == 2) {
                productDetailRepository.saveAllByProductId(p.getId(), 2);
            }
            productRepository.save(p);
            saveProductDetails(p);
            return p;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public void saveProductDetails (ProductEntity p) {
        try {

            String pdSize = String.valueOf(p.getProductDetail().size());
            for(ProductDetailEntity pd : p.getProductDetail()) {
                if(pd.getCode().equals("")) {
                    pd.setCode(generateCode(productDetailRepository.count()));
                }
                if(pd.getBarCode().equals("")) {
                    pd.setBarCode(generateBarcode(pd.getCode()));
                }

               pd.setProduct(productRepository.getById(p.getId()));
                if (pd.getId()==null){
                    pd.setQuantitySell(0);
                }
                productDetailRepository.save(pd);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
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



    @Transactional
    @Override
    public boolean delete(Long id) {
        try {
            ProductEntity product = findById(id);
            product.setStatus(3);
            productDetailRepository.saveAllByProductId(id, 3);
            productRepository.save(product);
            return true;
        }
        catch (Exception e) {
            return  false;
        }
    }

    @Transactional
    public boolean tranferStatus(Long id) {
        try {
            ProductEntity product = findById(id);
            if(product.getStatus() == 1) {
                product.setStatus(2);
            }
            else {
                product.setStatus(1);
            }
            productDetailRepository.saveAllByProductId(id, 2);
            productRepository.save(product);
            return true;
        }
        catch (Exception e) {
            return  false;
        }
    }


    @Transactional
    @Override
    public boolean deleteByIdIn(List<Long> ids, int status) {
        try {
            if(status == 1) {
                ids.forEach((id) -> {
                    delete(id);
                });
                return true;
            }
            else {
                ids.forEach((id) -> {
                    tranferStatus(id);
                });
                return true;
            }

        }
        catch (Exception e) {
            return false;
        }
    }


    @Override
    public ResultModel findAll(int page, int size, String sort, String order, String search) {
        try {
            Pageable paging = PaginationUtil.pageable(page, size, sort, order);
            Page<ProductEntity> products = null;
            if(search.equals("")) {
                products = productRepository.findAll(paging);
            }
            else {
                products = productRepository.findByNameContaining(search, paging);
            }
            List<ProductModel> result = null;


            return ResultModelUtil.getResultModel(Long.valueOf(products.getTotalPages()),
                    products.getNumber(), size,
                    modelMapper.map(products.getContent(), ProductModel.class));
        }
        catch (Exception e) {
            return null;
        }

    }

    @Override
    public ProductEntity findById(Long id) {
        return super.findById(id);
    }


    public String formateDate (String date) {
        Date formatDate = null;
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            formatDate = formatter.parse(date);
            String result = new SimpleDateFormat("yyyy-MM-dd").format(formatDate);
            return  result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public ResultModel findAll(String search, Long categoryId, Integer status
            , int page, int size, String from, String to, String sort, String order) {
        try {
                List<ProductEntity> result = null;
            result = productRepository
                    .findByNameAndCategoryAndStatus(search, categoryId,
                            status, page*size, size,
                            formateDate(from), formateDate(to),
                            sort, order);

            double total =  productRepository
                    .countProducts(search, categoryId, status,
                    formateDate(from), formateDate(to));


            return ResultModelUtil.getResultModel(Double
                            .valueOf(total)
                            .longValue(), page, size,
                    modelMapper.map(resetStatusOfProducts(result), ProductModel.class));
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    List<ProductEntity> resetStatusOfProducts( List<ProductEntity> products) {
        List<ProductEntity> result = new ArrayList<>();
        try
        {
            for(ProductEntity product : products) {
                int numberOfProductDetails = productDetailRepository
                        .countStatusByProductId(product.getId(), 1);
                if(numberOfProductDetails == 0 && product.getStatus() != 1) {
                    product.setStatus(2);
                    productRepository.save(product);
                    result.add(product);
                }
            }
            return products;

        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


}
