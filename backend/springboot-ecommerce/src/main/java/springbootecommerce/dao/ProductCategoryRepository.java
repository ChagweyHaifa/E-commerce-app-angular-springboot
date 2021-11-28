package springbootecommerce.dao;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.CrossOrigin;

import springbootecommerce.entity.ProductCategory;



@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategories", path = "category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {


}


