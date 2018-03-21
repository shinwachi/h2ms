package edu.harvard.h2ms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 *
 * Reference: https://spring.io/guides/gs/securing-web/
 *
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	private static String REALM="MY_TEST_REALM";
			

    private static final String[] AUTH_WHITELIST = {
            // Front page
            "/",

            // swagger ui
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/registration",
            "/v2/api-docs",
            "/webjars/**"
    };
 

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    	// disable csrf to enable non-browser API call
    	http.csrf().disable();
    	
        http.authorizeRequests()
            .antMatchers(AUTH_WHITELIST).permitAll()
            .anyRequest().authenticated()
            .and().httpBasic().realmName(REALM).authenticationEntryPoint(getBasicAuthEntryPoint())
            .and()
        .formLogin()
            .loginPage("/login")
            .permitAll()
            .and()
        .logout()
            .permitAll();
    }
    
    @Bean CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint() {
    	return new CustomBasicAuthenticationEntryPoint();
    }
    
    /**
     * This isn't absolutely necessary for password flow.  See:
     * http://www.baeldung.com/rest-api-spring-oauth2-angularjs
     * section 2.4. Security Configuration
     * This enables form-login driven auth process
     */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
    	return super.authenticationManagerBean();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("user").password("password").roles("USER");
        auth
            .inMemoryAuthentication()
                .withUser("admin").password("password").roles("ADMIN");
    }

}
