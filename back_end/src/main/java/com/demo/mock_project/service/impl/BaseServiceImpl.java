package com.demo.mock_project.service.impl;

import java.util.Date;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;

import com.demo.mock_project.config.DateConfig;
import com.demo.mock_project.repository.BaseRepository;
import com.demo.mock_project.service.BaseService;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class BaseServiceImpl<T, R extends BaseRepository<T, Long>> implements BaseService<T> {

    private final Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);
    protected final R jpaRepository;

    @Override
    public T create(T t) {
        try {

            t.getClass().getMethod("setCreatedAt", Date.class).invoke(t, DateConfig.getTimestamp());
            t.getClass().getMethod("setUpdatedAt", Date.class).invoke(t, DateConfig.getTimestamp());
            T result = jpaRepository.save(t);
            logger.info("id: {}", result.getClass().getMethod("getId").invoke(result));
            return result;
        } catch (Exception e) {
            logger.error("Error creating: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public T update(T t) {
        try {
            T result = findById(Long.valueOf(t.getClass().getMethod("getId").invoke(t).toString()));
            t.getClass().getMethod("setUpdatedAt", Date.class).invoke(t,
                    result.getClass().getMethod("getCreatedAt").invoke(result));
            t.getClass().getMethod("setUpdatedAt", Date.class).invoke(t, DateConfig.getTimestamp());
            logger.info("id: {}", t.getClass().getMethod("getCreatedAt").invoke(t));
            return jpaRepository.save(t);
        } catch (Exception e) {
            logger.error("Error updating: {}", e.getMessage());
            throw new EntityNotFoundException(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            Optional<T> result = jpaRepository.existsById(id) ? jpaRepository.findById(id) : Optional.empty();
            if (result.isPresent()) {
                jpaRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            logger.error("Error deleting: {}", e.getMessage());
            return false;
        }
    }


    @Override
    public T findById(Long id) {
        try {
            Optional<T> result = jpaRepository.findById(id);
            if (result.isPresent()) {
                return result.get();
            }
            return null;
        } catch (Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }

}
