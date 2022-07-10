package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotBlank;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StatisticalModel  extends BaseModel{

    @NotBlank(message = "name_product is required")
    private String name_product;

    private Integer quantity;

    private Integer quantity_sell;

}
