package springbootecommerce.config;




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import springbootecommerce.entity.Product;
import springbootecommerce.entity.ProductCategory;

@Configuration
public class MyRestConfig {

    
    
    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {

      return new RepositoryRestConfigurer() {

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        	config.exposeIdsFor(Product.class);
        	config.exposeIdsFor(ProductCategory.class);
        }
      };
    }

}


