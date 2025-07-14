package com.spring.project.config;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.spring.project.dto.user.UserDTO;
import com.spring.project.service.impl.CustomOAuth2UserServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomOAuth2UserServiceImpl customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 비활성화
            .authorizeRequests()
                .antMatchers("/", "/index.jsp", "/index.do", "/mainpage.do", 
                           "/*.css", "/*.js", "/*.ico", "/*.png", "/*.jpg", "/*.gif", "/*.svg",
                           "/css/**", "/js/**", "/images/**", "/login**", "/oauth2/**", 
                           "/registerpage.do", "/loginpage.do", "/login.do", 
                           "/sendEmailVerification.do", "/verifyEmailCode.do").permitAll()
                .anyRequest().authenticated()
            .and()
            .oauth2Login()
                .loginPage("/loginpage.do")
                .userInfoEndpoint()
                    .userService(customOAuth2UserService)
                .and()
                .successHandler(new OAuth2AuthenticationSuccessHandler())
                .failureHandler((request, response, exception) -> {
                    System.out.println("OAuth2 로그인 실패: " + exception.getMessage());
                    exception.printStackTrace();
                    response.sendRedirect("/SpringProject404/loginpage.do?error=1");
                })
            .and()
            .formLogin()
                .loginPage("/loginpage.do")
                .defaultSuccessUrl("/mainpage.do", true)
                .permitAll()
            .and()
            .logout()
                .logoutSuccessUrl("/mainpage.do")
                .permitAll();
    }
    
    private static class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                Authentication authentication) throws IOException, ServletException {
            
            if (authentication.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                Map<String, Object> attributes = oauth2User.getAttributes();
                
                if (attributes.containsKey("userDTO")) {
                    UserDTO userDTO = (UserDTO) attributes.get("userDTO");
                    HttpSession session = request.getSession();
                    session.setAttribute("userSession", userDTO);
                    System.out.println("OAuth2 로그인 성공 - 세션에 사용자 정보 설정: " + userDTO.getEmail());
                }
            }
            
            response.sendRedirect("/SpringProject404/mainpage.do");
        }
    }
}
