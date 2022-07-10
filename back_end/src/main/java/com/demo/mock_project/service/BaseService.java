package com.demo.mock_project.service;

import java.util.List;

import com.demo.mock_project.model.respone.ResultModel;

import com.demo.mock_project.utils.FilterUtils;

public interface BaseService<T> {

    T create(T t);

    T update(T t);

    boolean delete(Long id);

    ResultModel findAll(int page, int size, String sort, String order, String search);

    T findById(Long id);

    

}
