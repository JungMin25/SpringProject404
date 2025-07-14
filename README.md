# SpringProject404 - Java 코딩 학습 플랫폼

## 프로젝트 설정

### 1. OAuth2 설정

이 프로젝트를 실행하기 위해서는 Google OAuth2 설정이 필요합니다.

1. src/main/resources/application.properties.template 파일을 복사하여 pplication.properties 파일을 생성합니다.

`ash
copy src/main/resources/application.properties.template src/main/resources/application.properties
`

2. Google Cloud Console에서 OAuth2 클라이언트 ID와 시크릿을 생성합니다.

3. pplication.properties 파일에서 다음 값들을 실제 값으로 변경합니다:
   - YOUR_GOOGLE_CLIENT_ID: Google OAuth2 클라이언트 ID
   - YOUR_GOOGLE_CLIENT_SECRET: Google OAuth2 클라이언트 시크릿

### 2. 데이터베이스 설정

프로젝트는 404DB 데이터베이스를 사용합니다. 데이터베이스 설정은 src/main/resources/config/database.properties 파일에서 확인할 수 있습니다.

### 3. 프로젝트 실행

설정이 완료되면 프로젝트를 빌드하고 실행할 수 있습니다.

`ash
mvn clean install
mvn tomcat7:run
`

## 주의사항

- pplication.properties 파일은 민감한 정보를 포함하고 있으므로 git에 커밋하지 마세요.
- 실제 배포 시에는 환경변수를 사용하는 것을 권장합니다.
