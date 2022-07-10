package com.demo.mock_project.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class LastDayToBuyEntity {

    @Id
    private Long id;
    private String name;
    private Date created_at;
    private int customer_id;

}
