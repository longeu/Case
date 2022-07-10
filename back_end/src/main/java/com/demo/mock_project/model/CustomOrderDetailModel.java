package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomOrderDetailModel extends BaseModel {

    private ProductDetailModel productDetail;

    private Integer orderId;

    @NotNull(message = "Price is required ")
    private BigDecimal price;

    @NotNull(message = "Quantity is required")
    private BigDecimal quantity;

    private BigDecimal discount;


}
