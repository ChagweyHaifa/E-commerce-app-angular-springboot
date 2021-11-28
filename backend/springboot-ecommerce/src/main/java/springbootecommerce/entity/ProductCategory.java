package springbootecommerce.entity;

import java.util.Set;

import javax.persistence.CascadeType;

//import java.util.Set;

//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
//import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="product_category")
public class ProductCategory {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;
    
    public ProductCategory() {
    	
    }
    
    public ProductCategory( String categoryName) {
    	
    	this.categoryName = categoryName;    	
    }
 
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category",targetEntity = Product.class)
    private Set<Product> products;

	public Long getId() {
		return id;
	}
	

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

		public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

  
    

}
