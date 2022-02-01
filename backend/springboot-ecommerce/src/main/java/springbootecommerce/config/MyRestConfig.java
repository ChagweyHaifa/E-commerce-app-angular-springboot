package springbootecommerce.config;




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfiguration;
import org.springframework.data.rest.core.mapping.HttpMethods;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import springbootecommerce.entity.Country;
import springbootecommerce.entity.Product;
import springbootecommerce.entity.ProductCategory;
import springbootecommerce.entity.State;

@Configuration
public class MyRestConfig {

    
    
    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {

      return new RepositoryRestConfigurer() { 
    	  
//    	HttpMethod[] theUnsupportedActions = {HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        	
//        	ExposureConfiguration exConfig = config.getExposureConfiguration();
//        	exConfig.forDomainType(ProductCategory.class).withItemExposure((metadata, httpMethods) -> 
//            httpMethods.disable(theUnsupportedActions));
        	
        	config.exposeIdsFor(Product.class);
        	config.exposeIdsFor(ProductCategory.class);
        	config.exposeIdsFor(State.class);
        	config.exposeIdsFor(Country.class);
        }
      };
    }

}


