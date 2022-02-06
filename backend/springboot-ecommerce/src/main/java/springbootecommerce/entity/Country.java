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

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="country")
@Getter
@Setter
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
	
}
