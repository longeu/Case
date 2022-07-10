package com.demo.mock_project.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class TopStaffEntity {

    @Id
    private Long id;
    private String fullname;
    private Boolean gender;
    private int total_price;
}
