package com.learnspring.dto;
// dto = data transfer object

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountType {
    private Long count;
    private String type;
}
