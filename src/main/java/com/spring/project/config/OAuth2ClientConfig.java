package com.spring.project.config;
import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

// @Configuration // 임시 비활성화 - application.properties 설정 사용
@Configuration
public class OAuth2ClientConfig {

    // @Bean // 임시 비활성화
    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
    }
    
    private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("google")
            .clientId("")
            .clientSecret("")
            .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .redirectUriTemplate("")
            .scope("") // openid 제거 - 일반 OAuth2만 사용
            .authorizationUri("")
            .tokenUri("")
            .userInfoUri("") // 일반 OAuth2 userinfo endpoint
            .userNameAttributeName("") // Google OAuth2 사용자 ID
            .clientName("")
            .build();
    }
}


