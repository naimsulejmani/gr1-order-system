package dev.naimsulejmani.gr1ordersystem.controllers.api.v1;

import dev.naimsulejmani.gr1ordersystem.dtos.ProductDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductRestController {

    @GetMapping
    public List<ProductDto> getProducts() {
        return List.of(
                new ProductDto(1, "Laptop", 1000, 10),
                new ProductDto(2, "Mouse", 20, 100),
                new ProductDto(3, "Keyboard", 50, 50)
        );
    }
}
