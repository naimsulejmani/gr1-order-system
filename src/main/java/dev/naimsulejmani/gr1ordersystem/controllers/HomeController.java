package dev.naimsulejmani.gr1ordersystem.controllers;

import dev.naimsulejmani.gr1ordersystem.dtos.CustomerDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/create-order")
    public String createOrder(Model model) {

        List<CustomerDto> customers = List.of(
                new CustomerDto(1, "Naim Sulejmani", "Bit Pazar"),
                new CustomerDto(2, "Filan Fisteku", "Pazari i gjelbert"),
                new CustomerDto(3, "Agon Krasniqi", "Pejondi!")
        );

        model.addAttribute("customers", customers);
        return "create-order";
    }
}








