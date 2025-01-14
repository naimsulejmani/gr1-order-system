package dev.naimsulejmani.gr1ordersystem.controllers.api.v1;

import dev.naimsulejmani.gr1ordersystem.dtos.OrderDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderRestController {

    private static long orderId = 0;
    private final List<OrderDto> orders = new ArrayList<>();

    @GetMapping
    public List<OrderDto> getOrders() {
        return orders;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable long id) {
//        return orders.stream()
//                .filter(order -> order.getId() == id)
//                .findFirst()
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());

        var order = orders.stream().filter(o -> o.getId() == id).findFirst().orElseThrow();
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto order) {
        order.setId(++orderId);
        orders.add(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable long id, @RequestBody OrderDto order) {
        var existingOrder = orders.stream().filter(o -> o.getId() == id)
                .findFirst().orElseThrow();
        existingOrder.setCustomer(order.getCustomer());
        existingOrder.setDate(order.getDate());
        existingOrder.setComment(order.getComment());
        existingOrder.setEmployee(order.getEmployee());
        return ResponseEntity.ok(existingOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable long id) {
//        var order = orders.stream().filter(o -> o.getId() == id).findFirst().orElseThrow();
//        orders.remove(order);
        orders.removeIf(o -> o.getId() == id);
        return ResponseEntity.noContent().build();
    }

}













