package com.demo.mock_project.utils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class ModelMapperStandardUtil {
    @Qualifier("modelMapperStandard")
    private final ModelMapper modelMapper;

    /**
     * @param modelMapper
     */
    @Autowired
    public ModelMapperStandardUtil(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public <T, E> T map(final E entity, Class<T> modelClass) {
        return modelMapper.map(entity, modelClass);
    }

    public <T, E> List<T> map(final Collection<? extends E> input, final Class<T> modelClass) {
        return input.stream().map(entity -> modelMapper.map(entity, modelClass)).collect(java.util.stream.Collectors.toList());
    }
}
