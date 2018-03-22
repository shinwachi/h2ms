package edu.harvard.h2ms.domain.core;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;


import org.springframework.security.core.GrantedAuthority;

@Entity
public class Authority implements GrantedAuthority {
	@Id
	@Column(unique = true, nullable = false)
	private String authority;
	
	@ManyToMany(mappedBy = "authorities")
	private List<User> users = new ArrayList<>();

	@Override
	public String getAuthority() {
		return authority;
	}
}
