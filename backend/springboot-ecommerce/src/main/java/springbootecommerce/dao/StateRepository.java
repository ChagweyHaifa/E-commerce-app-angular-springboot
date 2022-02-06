package springbootecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import springbootecommerce.entity.State;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Long> {
	//select from state s where s.country_id = {id}
	//http://localhost:8070/api/states/search/findByCountryCode?code=BR
	Page<State> findByCountryCode(@RequestParam("code") String code, Pageable pageable);

}
