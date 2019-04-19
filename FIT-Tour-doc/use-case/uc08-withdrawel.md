# UC08 - 회원탈퇴(Withdrawal)
회원이 더이상 시스템의 이용을 원하지 않아 회원을 탈퇴하는 유스케이스

## 주 액터(Primary Actor)
회원

## 보조 액터(Secondary Actor)


## 사전 조건(Preconditions)
로그인이 되어 있어야 한다.

## 종료 조건(Postconditions)
회원 탈퇴가 완료 되었다.

## 시나리오(Flow of Evnets)

### 기본 흐름(Basic Flows)

- 1. 액터가 '프로필관리' 버튼을 클릭할 때 이 유스케이스를 시작한다.
- 2. 시스템은 프로필 관리 폼을 출력한다.
- 3. 액터는 회원 탈퇴 버튼을 클릭한다
- 4. 시스템은 비밀번호 확인 창을 출력한다.
- 5. 액터는 비밀번호를 입력한후 회원탈퇴 완료 버튼을 클릭한다.
- 6. 시스템은 해당 회원을 탈퇴 한 후 '메인' 유스케이스로 간다.

### 대안 흐름(Alternative Flows)
- 3.1 액터가 취소 버튼을 클릭하면,
    - 시스템은 '프로필관리' 유스케이스로 간다.

### 예외 흐름(Exception Flows)
- 4.3 암호와 재확인 암호가 일치하지 않으면,
    - 시스템은 입력된 암호가 일치하지 않음을 알린다.

