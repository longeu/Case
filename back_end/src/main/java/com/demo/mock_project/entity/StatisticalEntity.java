package com.demo.mock_project.entity;
import javax.persistence.*;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class StatisticalEntity {
    @Id
    private Long id;
    private String name;
    private String quantity_sell;

}
