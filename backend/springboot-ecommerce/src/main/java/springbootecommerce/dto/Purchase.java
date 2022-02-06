package springbootecommerce.dto;

import java.util.Set;

import lombok.Data;
import springbootecommerce.entity.Address;
import springbootecommerce.entity.Customer;
import springbootecommerce.entity.Order;
import springbootecommerce.entity.OrderItem;
@Data
public class Purchase {
	
	private Customer customer;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItems;
	
	
	
	
	
	
	

}
