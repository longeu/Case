package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotBlank;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TopStaffModel {

    private String fullname;
    private boolean gender;
    private Integer total_price;




}