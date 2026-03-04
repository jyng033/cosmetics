# 회원가입/로그인 기능 실행 가이드

## 1) 설치

```bash
npm install
```

## 2) 환경변수 설정

`.env.example`를 참고해서 `.env` 파일을 생성하세요.

```env
PORT=4000
FRONTEND_URL=http://localhost:5500
JWT_SECRET=change-this-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-account@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Be Natural <no-reply@benatural.com>"
```

- SMTP를 설정하면 실제 메일이 발송됩니다.
- SMTP를 설정하지 않으면 테스트 메일 계정(Ethereal)로 동작하며, 서버 콘솔에 미리보기 URL이 출력됩니다.

## 3) 서버 실행

```bash
npm run dev
```

## 4) 사용 페이지

- 회원가입/로그인: `auth.html`
- 쇼핑몰 메인: `index.html`
- 관리자페이지: `admin.html`

## 정책 반영 사항

- 아이디는 이메일 형식만 허용
- 비밀번호: 소문자 + 숫자 + 특수문자 각각 1개 이상 포함, 최소 8자
- 회원가입 필수 입력: 이름, 연락처, 주소, 이메일, 비밀번호, 생년월일
- 선택 입력: 성별
- 만 14세 이상 확인 체크 + 생년월일 기준 나이 검증
- 이메일 인증 완료 전 로그인 불가
