package com.demo.mock_project.utils;

import java.util.List;

import com.demo.mock_project.model.respone.Metadata;
import com.demo.mock_project.model.respone.ResultModel;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class ResultModelUtil {

    public static ResultModel getResultModel(Long total, int page, int limit, List<?> list) {
        ResultModel resultModel = new ResultModel();
        Metadata metadata = new Metadata(total, page, limit);
        resultModel.setMetadata(metadata);
        resultModel.setData(list);
        return resultModel;
    }
}
