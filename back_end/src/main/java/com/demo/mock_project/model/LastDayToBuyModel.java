package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.Date;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LastDayToBuyModel {

    private String name;
    private Date created_at;
    private Integer customer_id;




}