package com.demo.mock_project.model;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomOrderModel extends BaseModel {
    @NotNull(message = "TotalPrice is required ")
    private BigDecimal totalPrice;
    private String code;
    @NotNull(message = "TotalQuantity is required")
    private Integer totalQuantity;

    @NotNull(message = "Customer is required")
    private Integer accountId;

    private String accountName;
    private String accountPhone;
    @NotNull(message = "Money is required")
    private BigDecimal money;

    private String note;

    private Integer status;

    private BigDecimal discount;

    private List<CustomOrderDetailModel> orderDetails;

    private CustomerModel customer;


}
