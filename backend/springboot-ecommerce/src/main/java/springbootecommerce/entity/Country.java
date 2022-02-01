package springbootecommerce.entity;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import javax.persistence.Table;


@Entity
@Table(name="country")
public class Country {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
	
	@Column(name = "code")
    private String code;
	
	@Column(name = "name")
    private String name;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "country",targetEntity = State.class)
    private Set<State> states;
	
	public Country() {}


	public Country(String code, String name) {
		this.code = code;
		this.name = name;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Set<State> getStates() {
		return states;
	}


	public void setStates(Set<State> states) {
		this.states = states;
	}
	
	

}
