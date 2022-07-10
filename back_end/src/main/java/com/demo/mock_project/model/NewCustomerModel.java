package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotBlank;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewCustomerModel  extends BaseModel{

    @NotBlank(message = "name_product is required")
    private String name;

    private Integer number_customer;



}