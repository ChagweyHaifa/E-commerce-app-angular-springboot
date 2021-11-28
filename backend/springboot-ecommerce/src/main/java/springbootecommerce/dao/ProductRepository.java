package springbootecommerce.dao;




import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import springbootecommerce.entity.Product;






@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
//select from product p where p.category_id = {id}
//http://localhost:8070/api/products/search/findByCategoryId?id=1
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	
//select from product p where p.name like concat('%',:name,'%');
//	http://localhost:8070/api/products/search/findByNameContaining?name=python
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}


