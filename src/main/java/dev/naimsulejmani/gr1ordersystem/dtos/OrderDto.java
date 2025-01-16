package dev.naimsulejmani.gr1ordersystem.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private long id;
    private CustomerDto customer;
    private LocalDate date;
    private String comment;
    private String employee;
    private List<OrderDetailDto> orderDetails;
}
