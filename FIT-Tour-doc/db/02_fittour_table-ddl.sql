-- 회원
DROP TABLE IF EXISTS member RESTRICT;

-- 상품
DROP TABLE IF EXISTS tour RESTRICT;

-- 현지투어상품
DROP TABLE IF EXISTS local_tour_template_review RESTRICT;

-- 자유후기
DROP TABLE IF EXISTS free_review RESTRICT;

-- 상품안내사진
DROP TABLE IF EXISTS tour_guidance_photo RESTRICT;

-- 예약
DROP TABLE IF EXISTS reservation RESTRICT;

-- 상품댓글
DROP TABLE IF EXISTS tour_comment RESTRICT;

-- 공지사항
DROP TABLE IF EXISTS notice RESTRICT;

-- 판매불가 날짜
DROP TABLE IF EXISTS imposibility_date RESTRICT;

-- 여행테마
DROP TABLE IF EXISTS theme RESTRICT;

-- 상품여행테마
DROP TABLE IF EXISTS tour_theme RESTRICT;

-- 상품회원(위시리스트)
DROP TABLE IF EXISTS member_tour_wishlist RESTRICT;

-- 도시
DROP TABLE IF EXISTS city RESTRICT;

-- 국가
DROP TABLE IF EXISTS country RESTRICT;

-- 로그인유형
DROP TABLE IF EXISTS login_type RESTRICT;

-- 자유후기방문도시
DROP TABLE IF EXISTS free_review_city RESTRICT;

-- 결제상태
DROP TABLE IF EXISTS payment_status RESTRICT;

-- 자주묻는 질문
DROP TABLE IF EXISTS faq RESTRICT;

-- 회원
CREATE TABLE member (
  member_id       INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  login_type_id   INTEGER      NOT NULL COMMENT '로그인유형번호', -- 로그인유형번호
  email           VARCHAR(40)  NOT NULL COMMENT '이메일(아이디)', -- 이메일(아이디)
  certification   VARCHAR(255) NOT NULL COMMENT '인증번호', -- 인증번호
  password        VARCHAR(100) NOT NULL COMMENT '비밀번호', -- 비밀번호
  name            VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
  nickname        VARCHAR(50)  NULL     COMMENT '별명', -- 별명
  birth           VARCHAR(20)  NOT NULL COMMENT '생년월일', -- 생년월일
  sms_check       BOOLEAN      NOT NULL COMMENT 'sms 수신동의', -- sms 수신동의
  email_check     BOOLEAN      NOT NULL COMMENT '이메일 수신동의', -- 이메일 수신동의
  phone_check     BOOLEAN      NOT NULL COMMENT '휴대폰인증여부', -- 휴대폰인증여부
  tel             VARCHAR(50)  NOT NULL COMMENT '전화번호', -- 전화번호
  registered_date DATETIME     NOT NULL DEFAULT now() COMMENT '가입일', -- 가입일
  rank            INTEGER      NOT NULL COMMENT '등급', -- 등급
  photo           VARCHAR(255) NOT NULL DEFAULT 'default.jpg' COMMENT '사진' -- 사진
)
COMMENT '회원';

-- 회원
ALTER TABLE member
  ADD CONSTRAINT PK_member -- 회원 기본키
    PRIMARY KEY (
      member_id -- 회원번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_member
  ON member ( -- 회원
    email ASC,         -- 이메일(아이디)
    login_type_id ASC, -- 로그인유형번호
    certification ASC  -- 인증번호
  );

ALTER TABLE member
  MODIFY COLUMN member_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 상품
CREATE TABLE tour (
  tour_id        INTEGER      NOT NULL COMMENT '상품번호', -- 상품번호
  city_id        INTEGER      NULL     COMMENT '도시번호', -- 도시번호
  title          VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
  sub_heading    VARCHAR(255) NULL     COMMENT '소제목', -- 소제목
  content        MEDIUMTEXT   NOT NULL COMMENT '내용', -- 내용
  created_date   DATETIME     NOT NULL DEFAULT now() COMMENT '작성일', -- 작성일
  total_hour     INTEGER      NOT NULL COMMENT '총소요시간', -- 총소요시간
  hash_tag       VARCHAR(255) NOT NULL COMMENT '상품 해시 태그', -- 상품 해시 태그
  personnel      INTEGER      NOT NULL COMMENT '인원', -- 인원
  transportation VARCHAR(25)  NOT NULL COMMENT '주 이동수단', -- 주 이동수단
  price          INTEGER      NOT NULL COMMENT '가격', -- 가격
  location       VARCHAR(255) NULL     COMMENT '위치' -- 위치
)
COMMENT '상품';

-- 상품
ALTER TABLE tour
  ADD CONSTRAINT PK_tour -- 상품 기본키
    PRIMARY KEY (
      tour_id -- 상품번호
    );

-- 상품 유니크 인덱스
CREATE UNIQUE INDEX UIX_tour
  ON tour ( -- 상품
    hash_tag ASC -- 상품 해시 태그
  );

ALTER TABLE tour
  MODIFY COLUMN tour_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '상품번호';

-- 현지투어상품
CREATE TABLE local_tour_template_review (
  tour_id INTEGER NOT NULL COMMENT '상품번호' -- 상품번호
)
COMMENT '현지투어상품';

-- 자유후기
CREATE TABLE free_review (
  free_review_id INTEGER      NOT NULL COMMENT '자유후기번호', -- 자유후기번호
  member_id      INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  reservation_id INTEGER      NULL     COMMENT '예약번호', -- 예약번호
  title          VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
  content        MEDIUMTEXT   NOT NULL COMMENT '내용', -- 내용
  created_date   DATETIME     NOT NULL DEFAULT now() COMMENT '작성일', -- 작성일
  score          INTEGER      NOT NULL COMMENT '평점', -- 평점
  viewcount      INTEGER      NOT NULL COMMENT '조회수' -- 조회수
)
COMMENT '자유후기';

-- 자유후기
ALTER TABLE free_review
  ADD CONSTRAINT PK_free_review -- 자유후기 기본키
    PRIMARY KEY (
      free_review_id -- 자유후기번호
    );

ALTER TABLE free_review
  MODIFY COLUMN free_review_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '자유후기번호';

-- 상품안내사진
CREATE TABLE tour_guidance_photo (
  photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
  tour_id    INTEGER      NOT NULL COMMENT '상품번호', -- 상품번호
  photo_name VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
  photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '상품안내사진';

-- 상품안내사진
ALTER TABLE tour_guidance_photo
  ADD CONSTRAINT PK_tour_guidance_photo -- 상품안내사진 기본키
    PRIMARY KEY (
      photo_id -- 사진번호
    );

ALTER TABLE tour_guidance_photo
  MODIFY COLUMN photo_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '사진번호';

-- 예약
CREATE TABLE reservation (
  reservation_id   INTEGER      NOT NULL COMMENT '예약번호', -- 예약번호
  tour_id          INTEGER      NOT NULL COMMENT '상품번호', -- 상품번호
  member_id        INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  status_id        INTEGER      NOT NULL COMMENT '상태번호', -- 상태번호
  tour_date        DATETIME     NOT NULL COMMENT '여행일', -- 여행일
  personnel        INTEGER      NOT NULL COMMENT '여행인원', -- 여행인원
  tourist_tel      VARCHAR(50)  NOT NULL COMMENT '예약자 연락처', -- 예약자 연락처
  requirement      TEXT         NULL     COMMENT '요청사항', -- 요청사항
  payment_id       VARCHAR(255) NOT NULL COMMENT '결제번호', -- 결제번호
  payment_date     DATETIME     NOT NULL DEFAULT now() COMMENT '결제일', -- 결제일
  reservation_date DATETIME     NOT NULL DEFAULT now() COMMENT '예약일', -- 예약일
  buyer_name       VARCHAR(50)  NOT NULL COMMENT '예약자명', -- 예약자명
  cancel_reason    TEXT         NULL     COMMENT '예약취소사유' -- 예약취소사유
)
COMMENT '예약';

-- 예약
ALTER TABLE reservation
  ADD CONSTRAINT PK_reservation -- 예약 기본키
    PRIMARY KEY (
      reservation_id -- 예약번호
    );

-- 예약 유니크 인덱스
CREATE UNIQUE INDEX UIX_reservation
  ON reservation ( -- 예약
    payment_id ASC -- 결제번호
  );

ALTER TABLE reservation
  MODIFY COLUMN reservation_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '예약번호';

-- 상품댓글
CREATE TABLE tour_comment (
  tour_comment_id INTEGER  NOT NULL COMMENT '댓글번호', -- 댓글번호
  member_id       INTEGER  NOT NULL COMMENT '작성자', -- 작성자
  tour_id         INTEGER  NOT NULL COMMENT '상품번호', -- 상품번호
  parent_id       INTEGER  NOT NULL COMMENT '부모댓글', -- 부모댓글
  level           INTEGER  NOT NULL COMMENT '댓글레벨', -- 댓글레벨
  content         TEXT     NOT NULL COMMENT '내용', -- 내용
  created_date    DATETIME NOT NULL DEFAULT now() COMMENT '작성일' -- 작성일
)
COMMENT '상품댓글';

-- 상품댓글
ALTER TABLE tour_comment
  ADD CONSTRAINT PK_tour_comment -- 상품댓글 기본키
    PRIMARY KEY (
      tour_comment_id -- 댓글번호
    );

ALTER TABLE tour_comment
  MODIFY COLUMN tour_comment_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '댓글번호';

-- 공지사항
CREATE TABLE notice (
  notice_id    INTEGER      NOT NULL COMMENT '공지사항 번호', -- 공지사항 번호
  title        VARCHAR(255) NOT NULL COMMENT '공지사항 제목', -- 공지사항 제목
  content      TEXT         NOT NULL COMMENT '공지사항 내용', -- 공지사항 내용
  viewcount    INTEGER      NOT NULL COMMENT '공지사항 조회수', -- 공지사항 조회수
  created_date DATETIME     NOT NULL DEFAULT now() COMMENT '공지사항 작성일' -- 공지사항 작성일
)
COMMENT '공지사항';

-- 공지사항
ALTER TABLE notice
  ADD CONSTRAINT PK_notice -- 공지사항 기본키
    PRIMARY KEY (
      notice_id -- 공지사항 번호
    );

ALTER TABLE notice
  MODIFY COLUMN notice_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '공지사항 번호';

-- 판매불가 날짜
CREATE TABLE imposibility_date (
  imposibility_date_id INTEGER  NOT NULL COMMENT '불가능 번호', -- 불가능 번호
  tour_id              INTEGER  NOT NULL COMMENT '상품번호', -- 상품번호
  imposibility_date    DATETIME NOT NULL COMMENT '불가능 날짜' -- 불가능 날짜
)
COMMENT '판매불가 날짜';

-- 판매불가 날짜
ALTER TABLE imposibility_date
  ADD CONSTRAINT PK_imposibility_date -- 판매불가 날짜 기본키
    PRIMARY KEY (
      imposibility_date_id -- 불가능 번호
    );

ALTER TABLE imposibility_date
  MODIFY COLUMN imposibility_date_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '불가능 번호';

-- 여행테마
CREATE TABLE theme (
  theme_id INTEGER     NOT NULL COMMENT '여행테마번호', -- 여행테마번호
  theme    VARCHAR(50) NOT NULL COMMENT '여행테마명' -- 여행테마명
)
COMMENT '여행테마';

-- 여행테마
ALTER TABLE theme
  ADD CONSTRAINT PK_theme -- 여행테마 기본키
    PRIMARY KEY (
      theme_id -- 여행테마번호
    );

-- 여행테마 유니크 인덱스
CREATE UNIQUE INDEX UIX_theme
  ON theme ( -- 여행테마
    theme ASC -- 여행테마명
  );

ALTER TABLE theme
  MODIFY COLUMN theme_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '여행테마번호';

-- 상품여행테마
CREATE TABLE tour_theme (
  tour_id  INTEGER NOT NULL COMMENT '상품번호', -- 상품번호
  theme_id INTEGER NOT NULL COMMENT '여행테마번호' -- 여행테마번호
)
COMMENT '상품여행테마';

-- 상품여행테마
ALTER TABLE tour_theme
  ADD CONSTRAINT PK_tour_theme -- 상품여행테마 기본키
    PRIMARY KEY (
      tour_id,  -- 상품번호
      theme_id  -- 여행테마번호
    );

-- 상품회원(위시리스트)
CREATE TABLE member_tour_wishlist (
  member_id INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  tour_id   INTEGER NOT NULL COMMENT '상품번호' -- 상품번호
)
COMMENT '상품회원(위시리스트)';

-- 상품회원(위시리스트)
ALTER TABLE member_tour_wishlist
  ADD CONSTRAINT PK_member_tour_wishlist -- 상품회원(위시리스트) 기본키
    PRIMARY KEY (
      member_id, -- 회원번호
      tour_id    -- 상품번호
    );

-- 도시
CREATE TABLE city (
  city_id    INTEGER     NOT NULL COMMENT '도시번호', -- 도시번호
  country_id INTEGER     NOT NULL COMMENT '국가번호', -- 국가번호
  city_name  VARCHAR(50) NOT NULL COMMENT '도시이름' -- 도시이름
)
COMMENT '도시';

-- 도시
ALTER TABLE city
  ADD CONSTRAINT PK_city -- 도시 기본키
    PRIMARY KEY (
      city_id -- 도시번호
    );

ALTER TABLE city
  MODIFY COLUMN city_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '도시번호';

-- 국가
CREATE TABLE country (
  country_id   INTEGER     NOT NULL COMMENT '국가번호', -- 국가번호
  country_name VARCHAR(50) NOT NULL COMMENT '국가', -- 국가
  continent    VARCHAR(50) NOT NULL COMMENT '대륙번호' -- 대륙번호
)
COMMENT '국가';

-- 국가
ALTER TABLE country
  ADD CONSTRAINT PK_country -- 국가 기본키
    PRIMARY KEY (
      country_id -- 국가번호
    );

-- 국가 유니크 인덱스
CREATE UNIQUE INDEX UIX_country
  ON country ( -- 국가
    country_name ASC -- 국가
  );

ALTER TABLE country
  MODIFY COLUMN country_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '국가번호';

-- 로그인유형
CREATE TABLE login_type (
  login_type_id INTEGER     NOT NULL COMMENT '로그인유형번호', -- 로그인유형번호
  type_name     VARCHAR(50) NOT NULL COMMENT '로그인유형' -- 로그인유형
)
COMMENT '로그인유형';

-- 로그인유형
ALTER TABLE login_type
  ADD CONSTRAINT PK_login_type -- 로그인유형 기본키
    PRIMARY KEY (
      login_type_id -- 로그인유형번호
    );

-- 로그인유형 유니크 인덱스
CREATE UNIQUE INDEX UIX_login_type
  ON login_type ( -- 로그인유형
    type_name ASC -- 로그인유형
  );

ALTER TABLE login_type
  MODIFY COLUMN login_type_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '로그인유형번호';

-- 자유후기방문도시
CREATE TABLE free_review_city (
  free_review_id INTEGER NOT NULL COMMENT '자유후기번호', -- 자유후기번호
  city_id        INTEGER NOT NULL COMMENT '도시번호' -- 도시번호
)
COMMENT '자유후기방문도시';

-- 자유후기방문도시
ALTER TABLE free_review_city
  ADD CONSTRAINT PK_free_review_city -- 자유후기방문도시 기본키
    PRIMARY KEY (
      free_review_id, -- 자유후기번호
      city_id         -- 도시번호
    );

-- 결제상태
CREATE TABLE payment_status (
  status_id INTEGER     NOT NULL COMMENT '상태번호', -- 상태번호
  status    VARCHAR(50) NOT NULL COMMENT '결제상태' -- 결제상태
)
COMMENT '결제상태';

-- 결제상태
ALTER TABLE payment_status
  ADD CONSTRAINT PK_payment_status -- 결제상태 기본키
    PRIMARY KEY (
      status_id -- 상태번호
    );

-- 결제상태 유니크 인덱스
CREATE UNIQUE INDEX UIX_payment_status
  ON payment_status ( -- 결제상태
    status ASC -- 결제상태
  );

ALTER TABLE payment_status
  MODIFY COLUMN status_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '상태번호';

-- 자주묻는 질문
CREATE TABLE faq (
  faq_id       INTEGER      NOT NULL COMMENT 'FAQ번호', -- FAQ번호
  category     VARCHAR(50)  NOT NULL COMMENT 'FAQ분류', -- FAQ분류
  title        VARCHAR(255) NOT NULL COMMENT 'FAQ제목', -- FAQ제목
  content      MEDIUMTEXT   NOT NULL COMMENT 'FAQ내용', -- FAQ내용
  created_date DATETIME     NOT NULL DEFAULT now() COMMENT 'FAQ작성일' -- FAQ작성일
)
COMMENT '자주묻는 질문';

-- 자주묻는 질문
ALTER TABLE faq
  ADD CONSTRAINT PK_faq -- 자주묻는 질문 기본키
    PRIMARY KEY (
      faq_id -- FAQ번호
    );

ALTER TABLE faq
  MODIFY COLUMN faq_id INTEGER NOT NULL AUTO_INCREMENT COMMENT 'FAQ번호';

-- 회원
ALTER TABLE member
  ADD CONSTRAINT FK_login_type_TO_member -- 로그인유형 -> 회원
    FOREIGN KEY (
      login_type_id -- 로그인유형번호
    )
    REFERENCES login_type ( -- 로그인유형
      login_type_id -- 로그인유형번호
    );

-- 상품
ALTER TABLE tour
  ADD CONSTRAINT FK_city_TO_tour -- 도시 -> 상품
    FOREIGN KEY (
      city_id -- 도시번호
    )
    REFERENCES city ( -- 도시
      city_id -- 도시번호
    );

-- 현지투어상품
ALTER TABLE local_tour_template_review
  ADD CONSTRAINT FK_tour_TO_local_tour_template_review -- 상품 -> 현지투어상품
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 자유후기
ALTER TABLE free_review
  ADD CONSTRAINT FK_member_TO_free_review -- 회원 -> 자유후기
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES member ( -- 회원
      member_id -- 회원번호
    );

-- 자유후기
ALTER TABLE free_review
  ADD CONSTRAINT FK_reservation_TO_free_review -- 예약 -> 자유후기
    FOREIGN KEY (
      reservation_id -- 예약번호
    )
    REFERENCES reservation ( -- 예약
      reservation_id -- 예약번호
    );

-- 상품안내사진
ALTER TABLE tour_guidance_photo
  ADD CONSTRAINT FK_tour_TO_tour_guidance_photo -- 상품 -> 상품안내사진
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 예약
ALTER TABLE reservation
  ADD CONSTRAINT FK_tour_TO_reservation -- 상품 -> 예약
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 예약
ALTER TABLE reservation
  ADD CONSTRAINT FK_member_TO_reservation -- 회원 -> 예약
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES member ( -- 회원
      member_id -- 회원번호
    );

-- 예약
ALTER TABLE reservation
  ADD CONSTRAINT FK_payment_status_TO_reservation -- 결제상태 -> 예약
    FOREIGN KEY (
      status_id -- 상태번호
    )
    REFERENCES payment_status ( -- 결제상태
      status_id -- 상태번호
    );

-- 상품댓글
ALTER TABLE tour_comment
  ADD CONSTRAINT FK_member_TO_tour_comment -- 회원 -> 상품댓글
    FOREIGN KEY (
      member_id -- 작성자
    )
    REFERENCES member ( -- 회원
      member_id -- 회원번호
    );

-- 상품댓글
ALTER TABLE tour_comment
  ADD CONSTRAINT FK_tour_TO_tour_comment -- 상품 -> 상품댓글
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 판매불가 날짜
ALTER TABLE imposibility_date
  ADD CONSTRAINT FK_tour_TO_imposibility_date -- 상품 -> 판매불가 날짜
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 상품여행테마
ALTER TABLE tour_theme
  ADD CONSTRAINT FK_tour_TO_tour_theme -- 상품 -> 상품여행테마
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 상품여행테마
ALTER TABLE tour_theme
  ADD CONSTRAINT FK_theme_TO_tour_theme -- 여행테마 -> 상품여행테마
    FOREIGN KEY (
      theme_id -- 여행테마번호
    )
    REFERENCES theme ( -- 여행테마
      theme_id -- 여행테마번호
    );

-- 상품회원(위시리스트)
ALTER TABLE member_tour_wishlist
  ADD CONSTRAINT FK_member_TO_member_tour_wishlist -- 회원 -> 상품회원(위시리스트)
    FOREIGN KEY (
      member_id -- 회원번호
    )
    REFERENCES member ( -- 회원
      member_id -- 회원번호
    );

-- 상품회원(위시리스트)
ALTER TABLE member_tour_wishlist
  ADD CONSTRAINT FK_tour_TO_member_tour_wishlist -- 상품 -> 상품회원(위시리스트)
    FOREIGN KEY (
      tour_id -- 상품번호
    )
    REFERENCES tour ( -- 상품
      tour_id -- 상품번호
    );

-- 도시
ALTER TABLE city
  ADD CONSTRAINT FK_country_TO_city -- 국가 -> 도시
    FOREIGN KEY (
      country_id -- 국가번호
    )
    REFERENCES country ( -- 국가
      country_id -- 국가번호
    );

-- 자유후기방문도시
ALTER TABLE free_review_city
  ADD CONSTRAINT FK_city_TO_free_review_city -- 도시 -> 자유후기방문도시
    FOREIGN KEY (
      city_id -- 도시번호
    )
    REFERENCES city ( -- 도시
      city_id -- 도시번호
    );

-- 자유후기방문도시
ALTER TABLE free_review_city
  ADD CONSTRAINT FK_free_review_TO_free_review_city -- 자유후기 -> 자유후기방문도시
    FOREIGN KEY (
      free_review_id -- 자유후기번호
    )
    REFERENCES free_review ( -- 자유후기
      free_review_id -- 자유후기번호
    );