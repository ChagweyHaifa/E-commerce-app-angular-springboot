package springbootecommerce.service;



import springbootecommerce.dto.Purchase;
import springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {
	PurchaseResponse placeOrder(Purchase purchase);
}
