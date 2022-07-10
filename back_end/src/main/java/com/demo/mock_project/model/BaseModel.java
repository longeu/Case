package com.demo.mock_project.model;


import java.util.Date;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class BaseModel {
    private Long id;

    private Date createdAt;

    private Date updatedAt;
}
