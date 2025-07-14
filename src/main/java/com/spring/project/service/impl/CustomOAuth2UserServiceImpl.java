package com.spring.project.service.impl;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.spring.project.dto.user.UserDTO;
import com.spring.project.repository.UserRepository;
import com.spring.project.service.CustomOAuth2UserService;

@Service
public class CustomOAuth2UserServiceImpl extends DefaultOAuth2UserService implements CustomOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        try {
            OAuth2User oAuth2User = super.loadUser(userRequest);
            
            if (oAuth2User == null || oAuth2User.getAttributes() == null) {
                throw new OAuth2AuthenticationException(
                    new OAuth2Error("invalid_user_info_response", "OAuth2 사용자 정보가 없습니다.", null));
            }
            
            Map<String, Object> attributes = oAuth2User.getAttributes();
            return processOAuth2User(attributes);
            
        } catch (Exception e) {
            System.out.println("OAuth2 사용자 로드 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            throw new OAuth2AuthenticationException(
                new OAuth2Error("oauth2_processing_error", "OAuth2 처리 중 오류가 발생했습니다.", null), e);
        }
    }

    @Override
    public OAuth2User processOAuth2User(Map<String, Object> attributes) {
        try {
            // UserDTO 처리 후 UserDTO 정보를 attributes에 포함
            UserDTO userDTO = processUserData(attributes);
            
            // UserDTO 정보를 attributes에 추가하여 나중에 사용할 수 있도록 함
            Map<String, Object> modifiedAttributes = new java.util.HashMap<>(attributes);
            modifiedAttributes.put("userDTO", userDTO);
            
            // OAuth2User 반환
            return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                modifiedAttributes,
                "id" // Google OAuth2의 id 필드 사용
            );
            
        } catch (Exception e) {
            System.out.println("OAuth2 사용자 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("OAuth2 사용자 처리 실패", e);
        }
    }
    
    private UserDTO processUserData(Map<String, Object> attributes) {
        // Google OAuth2 응답에서 사용자 정보 추출
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String googleId = (String) attributes.get("id"); // OAuth2의 id 필드
        
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("이메일 정보를 가져올 수 없습니다.");
        }
        
        if (name == null || name.trim().isEmpty()) {
            name = email.split("@")[0]; // 이메일의 사용자명 부분을 기본 이름으로 사용
        }

        UserDTO user = userRepository.findByEmail(email);
        if (user == null) {
            user = new UserDTO();
            // OAuth2 사용자는 고유한 username 생성 (Google의 id 값 활용)
            user.setUsername("google_" + googleId);
            user.setEmail(email);  // 이메일은 별도 필드에 저장
            user.setPassword("OAUTH2_USER");
            user.setNickname(name);
            user.setUser_type("USER");
            user.setExperience_points(0);
            userRepository.insertUser(user);
            System.out.println("새 OAuth2 사용자 등록: " + email + " (username: " + user.getUsername() + ")");
        } else {
            System.out.println("기존 OAuth2 사용자 로그인: " + email);
        }

        return user; // UserDTO를 반환하여 나중에 사용할 수 있도록 함
    }
}
