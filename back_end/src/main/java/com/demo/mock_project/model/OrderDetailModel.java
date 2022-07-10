package com.demo.mock_project.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetailModel extends BaseModel {

    @NotBlank(message = "OrderId is required")
    private Integer orderId;

    @NotNull(message = "Price is required ")
    private BigDecimal price;

    @NotBlank(message = "Quantity is required")
    private BigDecimal quantity;

    private BigDecimal discount;

    private Integer accountId;

    private Integer customerId;

    private Integer productDetailId;

    private String productName;

}
