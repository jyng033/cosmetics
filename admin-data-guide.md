# 관리자 데이터 관리 가이드

`admin.html`은 현재 **브라우저 로컬스토리지(localStorage)** 기반으로 동작합니다.
빠르게 화면을 확인하거나 데모를 보여줄 때는 유용하지만, 실서비스 운영에는 한계가 있습니다.

## 현재 버전(로컬스토리지)의 특징

- 장점: 서버 없이 즉시 사용 가능, 구현이 간단함
- 단점: 기기/브라우저마다 데이터가 분리됨, 권한 제어 불가, 데이터 유실 가능성 존재
- 적합한 용도: 프로토타입, 디자인 검증, 관리자 화면 동작 테스트

## 실서비스 데이터 관리 권장 구조

1. **백엔드 API 구축**
   - 회원 API: `GET/POST/PATCH/DELETE /api/admin/members`
   - 주문 API: `GET/POST/PATCH /api/admin/orders`
2. **DB 저장**
   - 권장: PostgreSQL(MySQL도 가능)
   - 핵심 테이블:
     - `users(id, name, email, grade, status, created_at, updated_at)`
     - `orders(id, order_no, user_id, amount, status, ordered_at, updated_at)`
3. **인증/권한**
   - 관리자 로그인(JWT/세션) 필수
   - `admin` 권한 사용자만 관리자 API 접근 허용
4. **감사 로그(audit log)**
   - 누가/언제/무엇을 변경했는지 기록
   - 예: 주문 상태 변경, 회원 등급 변경
5. **백업/복구 정책**
   - DB 자동 백업(일 단위)
   - 백업 파일 보관 기간과 복구 절차 문서화

## 운영 시 실무 체크리스트

- 개인정보 최소 수집 및 암호화(이메일/전화번호 등)
- 관리자페이지 접근 IP 제한 또는 2차 인증(2FA)
- 대량 수정/삭제 기능에 확인 절차 추가
- 주문 상태 변경 시 알림(문자/메일) 연동
- 월 1회 이상 복구 리허설로 백업 유효성 검증

## 다음 단계 제안

- 현재 `admin.js`의 로컬스토리지 함수(`readStorage`, `writeStorage`)를 API 호출(fetch)로 교체
- 백엔드에서 검증 로직(중복 주문번호, 회원 상태 제한 등) 추가
- 관리자 권한이 없는 경우 `admin.html` 접근 차단
