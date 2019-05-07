-- 회원
DROP TABLE IF EXISTS member RESTRICT;

-- 상품
DROP TABLE IF EXISTS tour RESTRICT;

-- 일정(후기)
DROP TABLE IF EXISTS template_review_date RESTRICT;

-- 여행후기(템플릿)
DROP TABLE IF EXISTS template_review RESTRICT;

-- 현지투어상품
DROP TABLE IF EXISTS local_tour_template_review RESTRICT;

-- 레스토랑
DROP TABLE IF EXISTS restaurant_review RESTRICT;

-- 숙소
DROP TABLE IF EXISTS accommodation_review RESTRICT;

-- 관광지
DROP TABLE IF EXISTS tourist_attraction_review RESTRICT;

-- 교통
DROP TABLE IF EXISTS transportation_review RESTRICT;

-- 자유후기
DROP TABLE IF EXISTS free_review RESTRICT;

-- 상품안내사진
DROP TABLE IF EXISTS tour_guidance_photo RESTRICT;

-- 예약
DROP TABLE IF EXISTS reservation RESTRICT;

-- 1:1 문의 
DROP TABLE IF EXISTS personal_inquiry RESTRICT;

-- 상품댓글
DROP TABLE IF EXISTS tour_comment RESTRICT;

-- 공지사항
DROP TABLE IF EXISTS notice RESTRICT;

-- 판매불가 날짜
DROP TABLE IF EXISTS unable_sell_date RESTRICT;

-- 코스
DROP TABLE IF EXISTS tour_course RESTRICT;

-- 코스사진
DROP TABLE IF EXISTS tour_course_photo RESTRICT;

-- 여행테마
DROP TABLE IF EXISTS theme RESTRICT;

-- 상품여행테마
DROP TABLE IF EXISTS tour_theme RESTRICT;

-- 상품회원(위시리스트)
DROP TABLE IF EXISTS member_tour_wishlist RESTRICT;

-- 후기회원(좋아요)
DROP TABLE IF EXISTS member_tour_template_review_like RESTRICT;

-- 자유후기(좋아요)
DROP TABLE IF EXISTS member_tour_free_review_like RESTRICT;

-- 현지투어(자유후기)
DROP TABLE IF EXISTS local_tour_free_review RESTRICT;

-- 현지투어(자유후기)사진
DROP TABLE IF EXISTS local_tour_free_review_photo RESTRICT;

-- 템플릿후기사진
DROP TABLE IF EXISTS template_review_photo RESTRICT;

-- 자유후기 사진
DROP TABLE IF EXISTS free_review_photo RESTRICT;

-- 도시
DROP TABLE IF EXISTS tour_free_review_city RESTRICT;

-- 국가
DROP TABLE IF EXISTS tour_free_review_country RESTRICT;

-- 자유후기댓글
DROP TABLE IF EXISTS free_review_comment RESTRICT;

-- 템플릿여행후기댓글
DROP TABLE IF EXISTS template_review_comment RESTRICT;

-- 로그인유형
DROP TABLE IF EXISTS login_type RESTRICT;

-- 여행활동
DROP TABLE IF EXISTS travel_activity RESTRICT;

-- 여행활동유형
DROP TABLE IF EXISTS activity_type RESTRICT;

-- 자유후기방문도시
DROP TABLE IF EXISTS free_review_city RESTRICT;

-- 결제상태
DROP TABLE IF EXISTS payment_status RESTRICT;

-- 회원
CREATE TABLE member (
member_id             INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
login_type_id         INTEGER      NOT NULL COMMENT '로그인유형번호', -- 로그인유형번호
email                 VARCHAR(40)  NOT NULL COMMENT '이메일(아이디)', -- 이메일(아이디)
password              VARCHAR(100) NOT NULL COMMENT '비밀번호', -- 비밀번호
name                  VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
nickname              VARCHAR(50)  NULL     COMMENT '별명', -- 별명
birth                 VARCHAR(8)   NOT NULL COMMENT '생년월일', -- 생년월일
sms_receive_consent   BOOLEAN      NOT NULL COMMENT 'sms 수신동의', -- sms 수신동의
email_receive_consent BOOLEAN      NOT NULL COMMENT '이메일 수신동의', -- 이메일 수신동의
tel                   INTEGER      NOT NULL COMMENT '전화번호', -- 전화번호
registered_date       DATETIME     NOT NULL COMMENT '가입일', -- 가입일
phone_verification    BOOLEAN      NOT NULL COMMENT '휴대폰인증여부', -- 휴대폰인증여부
rank                  INTEGER      NOT NULL COMMENT '등급' -- 등급
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
login_type_id ASC  -- 로그인유형번호
);

-- 상품
CREATE TABLE tour (
tour_id               INTEGER      NOT NULL COMMENT '상품번호', -- 상품번호
tour_title            VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
tour_sub_heading      VARCHAR(255) NULL     COMMENT '소제목', -- 소제목
tour_guidance_content TEXT         NOT NULL COMMENT '내용', -- 내용
tour_created_date     DATETIME     NOT NULL COMMENT '작성일', -- 작성일
tour_total_hour       INTEGER      NOT NULL COMMENT '총소요시간', -- 총소요시간
tour_hash_tag         VARCHAR(255) NOT NULL COMMENT '상품 해시 태그', -- 상품 해시 태그
tour_personnel        INTEGER      NOT NULL COMMENT '인원', -- 인원
transportation        VARCHAR(25)  NOT NULL COMMENT '주 이동수단', -- 주 이동수단
tour_price            INTEGER      NOT NULL COMMENT '가격' -- 가격
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
tour_hash_tag ASC -- 상품 해시 태그
);

-- 일정(후기)
CREATE TABLE template_review_date (
template_review_date_id  INTEGER  NOT NULL COMMENT '일정번호', -- 일정번호
template_review_id       INTEGER  NOT NULL COMMENT '여행후기 번호', -- 여행후기 번호
tour_free_review_city_id INTEGER  NOT NULL COMMENT '도시번호', -- 도시번호
template_review_date     DATETIME NOT NULL COMMENT '날짜' -- 날짜
)
COMMENT '일정(후기)';

-- 일정(후기)
ALTER TABLE template_review_date
ADD CONSTRAINT PK_template_review_date -- 일정(후기) 기본키
PRIMARY KEY (
template_review_date_id -- 일정번호
);

-- 여행후기(템플릿)
CREATE TABLE template_review (
template_review_id           INTEGER      NOT NULL COMMENT '여행후기 번호', -- 여행후기 번호
member_id                    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
reservation_id               INTEGER      NULL     COMMENT '예약번호', -- 예약번호
template_review_title        VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
template_review_created_date DATETIME     NOT NULL COMMENT '작성일', -- 작성일
template_review_viewcount    INTEGER      NOT NULL COMMENT '조회수' -- 조회수
)
COMMENT '여행후기(템플릿)';

-- 여행후기(템플릿)
ALTER TABLE template_review
ADD CONSTRAINT PK_template_review -- 여행후기(템플릿) 기본키
PRIMARY KEY (
template_review_id -- 여행후기 번호
);

-- 현지투어상품
CREATE TABLE local_tour_template_review (
travel_activity_id INTEGER NOT NULL COMMENT '여행활동번호', -- 여행활동번호
tour_id            INTEGER NOT NULL COMMENT '상품번호' -- 상품번호
)
COMMENT '현지투어상품';

-- 현지투어상품
ALTER TABLE local_tour_template_review
ADD CONSTRAINT PK_local_tour_template_review -- 현지투어상품 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 레스토랑
CREATE TABLE restaurant_review (
travel_activity_id       INTEGER     NOT NULL COMMENT '여행활동번호', -- 여행활동번호
restaurant_review_rating INTEGER     NOT NULL COMMENT '평점', -- 평점
restaurant_review_menu   VARCHAR(50) NULL     COMMENT '추천메뉴' -- 추천메뉴
)
COMMENT '레스토랑';

-- 레스토랑
ALTER TABLE restaurant_review
ADD CONSTRAINT PK_restaurant_review -- 레스토랑 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 숙소
CREATE TABLE accommodation_review (
travel_activity_id                   INTEGER NOT NULL COMMENT '여행활동번호', -- 여행활동번호
accommodation_review_rating          INTEGER NOT NULL COMMENT '평점', -- 평점
accommodation_review_location_rating INTEGER NOT NULL COMMENT '숙소 위치 평가' -- 숙소 위치 평가
)
COMMENT '숙소';

-- 숙소
ALTER TABLE accommodation_review
ADD CONSTRAINT PK_accommodation_review -- 숙소 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 관광지
CREATE TABLE tourist_attraction_review (
travel_activity_id            INTEGER NOT NULL COMMENT '여행활동번호', -- 여행활동번호
tourist_attraction_review_fee INTEGER NOT NULL COMMENT '입장료' -- 입장료
)
COMMENT '관광지';

-- 관광지
ALTER TABLE tourist_attraction_review
ADD CONSTRAINT PK_tourist_attraction_review -- 관광지 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 교통
CREATE TABLE transportation_review (
travel_activity_id          INTEGER     NOT NULL COMMENT '여행활동번호', -- 여행활동번호
transportation_review       VARCHAR(50) NOT NULL COMMENT '이동수단', -- 이동수단
transportation_review_hours INTEGER     NOT NULL COMMENT '소요시간' -- 소요시간
)
COMMENT '교통';

-- 교통
ALTER TABLE transportation_review
ADD CONSTRAINT PK_transportation_review -- 교통 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 자유후기
CREATE TABLE free_review (
free_review_id           INTEGER      NOT NULL COMMENT '자유후기번호', -- 자유후기번호
member_id                INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
reservation_id           INTEGER      NULL     COMMENT '예약번호', -- 예약번호
free_review_title        VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
free_review_content      TEXT         NOT NULL COMMENT '내용', -- 내용
free_review_created_date DATETIME     NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '자유후기';

-- 자유후기
ALTER TABLE free_review
ADD CONSTRAINT PK_free_review -- 자유후기 기본키
PRIMARY KEY (
free_review_id -- 자유후기번호
);

-- 상품안내사진
CREATE TABLE tour_guidance_photo (
tour_guidance_photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
tour_id                  INTEGER      NOT NULL COMMENT '상품번호', -- 상품번호
tour_guidance_photo      VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
tour_guidance_photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '상품안내사진';

-- 상품안내사진
ALTER TABLE tour_guidance_photo
ADD CONSTRAINT PK_tour_guidance_photo -- 상품안내사진 기본키
PRIMARY KEY (
tour_guidance_photo_id -- 사진번호
);

-- 예약
CREATE TABLE reservation (
reservation_id    INTEGER     NOT NULL COMMENT '예약번호', -- 예약번호
tour_id           INTEGER     NOT NULL COMMENT '상품번호', -- 상품번호
member_id         INTEGER     NOT NULL COMMENT '회원번호', -- 회원번호
payment_status_id INTEGER     NOT NULL COMMENT '상태번호', -- 상태번호
tour_date         DATETIME    NOT NULL COMMENT '여행일', -- 여행일
number_of_people  INTEGER     NOT NULL COMMENT '여행인원', -- 여행인원
tourist_tel       VARCHAR(30) NOT NULL COMMENT '예약자 연락처', -- 예약자 연락처
requirment        TEXT        NULL     COMMENT '요청사항', -- 요청사항
payment_id        INTEGER     NOT NULL COMMENT '결제번호', -- 결제번호
payment_date      DATETIME    NOT NULL COMMENT '결제일', -- 결제일
reservation_date  DATETIME    NOT NULL COMMENT '예약일' -- 예약일
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

-- 1:1 문의 
CREATE TABLE personal_inquiry (
personal_inquiry_id                   INTEGER  NOT NULL COMMENT '1:1 문의번호', -- 1:1 문의번호
member_id                             INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
tour_id                               INTEGER  NOT NULL COMMENT '상품번호', -- 상품번호
personal_inquiry_content_content      TEXT     NOT NULL COMMENT '내용', -- 내용
personal_inquiry_content_created_date DATETIME NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '1:1 문의 ';

-- 1:1 문의 
ALTER TABLE personal_inquiry
ADD CONSTRAINT PK_personal_inquiry -- 1:1 문의  기본키
PRIMARY KEY (
personal_inquiry_id -- 1:1 문의번호
);

-- 상품댓글
CREATE TABLE tour_comment (
tour_comment_id           INTEGER  NOT NULL COMMENT '댓글번호', -- 댓글번호
member_id                 INTEGER  NOT NULL COMMENT '작성자', -- 작성자
tour_id                   INTEGER  NOT NULL COMMENT '상품번호', -- 상품번호
tour_comment_order        INTEGER  NOT NULL COMMENT '댓글순서', -- 댓글순서
tour_comment_level        INTEGER  NOT NULL COMMENT '댓글레벨', -- 댓글레벨
tour_comment_content      TEXT     NOT NULL COMMENT '내용', -- 내용
tour_comment_created_date DATETIME NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '상품댓글';

-- 상품댓글
ALTER TABLE tour_comment
ADD CONSTRAINT PK_tour_comment -- 상품댓글 기본키
PRIMARY KEY (
tour_comment_id -- 댓글번호
);

-- 공지사항
CREATE TABLE notice (
notice_id           INTEGER      NOT NULL COMMENT '공지사항 번호', -- 공지사항 번호
notice_title        VARCHAR(255) NOT NULL COMMENT '공지사항 제목', -- 공지사항 제목
notice_content      TEXT         NOT NULL COMMENT '공지사항 내용', -- 공지사항 내용
notice_view_count   INTEGER      NOT NULL COMMENT '공지사항 조회수', -- 공지사항 조회수
notice_created_date DATETIME     NOT NULL COMMENT '공지사항 작성일' -- 공지사항 작성일
)
COMMENT '공지사항';

-- 공지사항
ALTER TABLE notice
ADD CONSTRAINT PK_notice -- 공지사항 기본키
PRIMARY KEY (
notice_id -- 공지사항 번호
);

-- 판매불가 날짜
CREATE TABLE unable_sell_date (
unable_sell_date_id INTEGER  NOT NULL COMMENT '불가능 번호', -- 불가능 번호
tour_id             INTEGER  NOT NULL COMMENT '상품번호', -- 상품번호
unable_sell_date    DATETIME NOT NULL COMMENT '불가능 날짜' -- 불가능 날짜
)
COMMENT '판매불가 날짜';

-- 판매불가 날짜
ALTER TABLE unable_sell_date
ADD CONSTRAINT PK_unable_sell_date -- 판매불가 날짜 기본키
PRIMARY KEY (
unable_sell_date_id -- 불가능 번호
);

-- 코스
CREATE TABLE tour_course (
tour_course_id      INTEGER NOT NULL COMMENT '코스번호', -- 코스번호
tour_id             INTEGER NOT NULL COMMENT '상품번호', -- 상품번호
tour_course_content TEXT    NOT NULL COMMENT '코스내용', -- 코스내용
tour_course_hours   INTEGER NOT NULL COMMENT '코스소요시간' -- 코스소요시간
)
COMMENT '코스';

-- 코스
ALTER TABLE tour_course
ADD CONSTRAINT PK_tour_course -- 코스 기본키
PRIMARY KEY (
tour_course_id -- 코스번호
);

-- 코스사진
CREATE TABLE tour_course_photo (
tour_course_photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
tour_course_id         INTEGER      NOT NULL COMMENT '코스번호', -- 코스번호
tour_course_photo      VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
tour_course_photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '코스사진';

-- 코스사진
ALTER TABLE tour_course_photo
ADD CONSTRAINT PK_tour_course_photo -- 코스사진 기본키
PRIMARY KEY (
tour_course_photo_id -- 사진번호
);

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

-- 후기회원(좋아요)
CREATE TABLE member_tour_template_review_like (
template_review_id INTEGER NOT NULL COMMENT '여행후기 번호', -- 여행후기 번호
member_id          INTEGER NOT NULL COMMENT '회원번호' -- 회원번호
)
COMMENT '후기회원(좋아요)';

-- 후기회원(좋아요)
ALTER TABLE member_tour_template_review_like
ADD CONSTRAINT PK_member_tour_template_review_like -- 후기회원(좋아요) 기본키
PRIMARY KEY (
template_review_id, -- 여행후기 번호
member_id           -- 회원번호
);

-- 자유후기(좋아요)
CREATE TABLE member_tour_free_review_like (
free_review_id INTEGER NOT NULL COMMENT '자유후기번호', -- 자유후기번호
member_id      INTEGER NOT NULL COMMENT '회원번호' -- 회원번호
)
COMMENT '자유후기(좋아요)';

-- 자유후기(좋아요)
ALTER TABLE member_tour_free_review_like
ADD CONSTRAINT PK_member_tour_free_review_like -- 자유후기(좋아요) 기본키
PRIMARY KEY (
free_review_id, -- 자유후기번호
member_id       -- 회원번호
);

-- 현지투어(자유후기)
CREATE TABLE local_tour_free_review (
local_tour_free_review_id      INTEGER NOT NULL COMMENT '현지투어번호', -- 현지투어번호
free_review_id                 INTEGER NOT NULL COMMENT '자유후기번호', -- 자유후기번호
local_tour_free_review_order   INTEGER NOT NULL COMMENT '순서', -- 순서
local_tour_free_review_content TEXT    NOT NULL COMMENT '내용' -- 내용
)
COMMENT '현지투어(자유후기)';

-- 현지투어(자유후기)
ALTER TABLE local_tour_free_review
ADD CONSTRAINT PK_local_tour_free_review -- 현지투어(자유후기) 기본키
PRIMARY KEY (
local_tour_free_review_id -- 현지투어번호
);

-- 현지투어(자유후기)사진
CREATE TABLE local_tour_free_review_photo (
local_tour_free_review_photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
local_tour_free_review_id         INTEGER      NOT NULL COMMENT '현지투어번호', -- 현지투어번호
local_tour_free_review_photo_name VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
local_tour_free_review_photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '현지투어(자유후기)사진';

-- 현지투어(자유후기)사진
ALTER TABLE local_tour_free_review_photo
ADD CONSTRAINT PK_local_tour_free_review_photo -- 현지투어(자유후기)사진 기본키
PRIMARY KEY (
local_tour_free_review_photo_id -- 사진번호
);

-- 템플릿후기사진
CREATE TABLE template_review_photo (
template_review_photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
travel_activity_id         INTEGER      NOT NULL COMMENT '여행활동번호', -- 여행활동번호
template_review_photo      VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
template_review_photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '템플릿후기사진';

-- 템플릿후기사진
ALTER TABLE template_review_photo
ADD CONSTRAINT PK_template_review_photo -- 템플릿후기사진 기본키
PRIMARY KEY (
template_review_photo_id -- 사진번호
);

-- 자유후기 사진
CREATE TABLE free_review_photo (
free_review_photo_id   INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
free_review_id         INTEGER      NOT NULL COMMENT '자유후기번호', -- 자유후기번호
free_review_photo      VARCHAR(255) NOT NULL COMMENT '사진명', -- 사진명
free_review_photo_path VARCHAR(255) NOT NULL COMMENT '사진 경로' -- 사진 경로
)
COMMENT '자유후기 사진';

-- 자유후기 사진
ALTER TABLE free_review_photo
ADD CONSTRAINT PK_free_review_photo -- 자유후기 사진 기본키
PRIMARY KEY (
free_review_photo_id -- 사진번호
);

-- 도시
CREATE TABLE tour_free_review_city (
tour_free_review_city_id    INTEGER     NOT NULL COMMENT '도시번호', -- 도시번호
tour_free_review_country_id INTEGER     NOT NULL COMMENT '국가번호', -- 국가번호
tour_free_review_city       VARCHAR(50) NOT NULL COMMENT '도시이름' -- 도시이름
)
COMMENT '도시';

-- 도시
ALTER TABLE tour_free_review_city
ADD CONSTRAINT PK_tour_free_review_city -- 도시 기본키
PRIMARY KEY (
tour_free_review_city_id -- 도시번호
);

-- 국가
CREATE TABLE tour_free_review_country (
tour_free_review_country_id INTEGER     NOT NULL COMMENT '국가번호', -- 국가번호
tour_free_review_country    VARCHAR(50) NOT NULL COMMENT '국가' -- 국가
)
COMMENT '국가';

-- 국가
ALTER TABLE tour_free_review_country
ADD CONSTRAINT PK_tour_free_review_country -- 국가 기본키
PRIMARY KEY (
tour_free_review_country_id -- 국가번호
);

-- 국가 유니크 인덱스
CREATE UNIQUE INDEX UIX_tour_free_review_country
ON tour_free_review_country ( -- 국가
tour_free_review_country ASC -- 국가
);

-- 자유후기댓글
CREATE TABLE free_review_comment (
tour_free_review_comment_id           INTEGER  NOT NULL COMMENT '자유후기댓글번호', -- 자유후기댓글번호
free_review_id                        INTEGER  NOT NULL COMMENT '자유후기번호', -- 자유후기번호
member_id                             INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
tour_free_review_comment_order        INTEGER  NOT NULL COMMENT '순서', -- 순서
tour_free_review_comment_level        INTEGER  NOT NULL COMMENT '댓글레벨', -- 댓글레벨
tour_free_review_comment_content      TEXT     NOT NULL COMMENT '내용', -- 내용
tour_free_review_comment_created_date DATETIME NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '자유후기댓글';

-- 자유후기댓글
ALTER TABLE free_review_comment
ADD CONSTRAINT PK_free_review_comment -- 자유후기댓글 기본키
PRIMARY KEY (
tour_free_review_comment_id -- 자유후기댓글번호
);

-- 템플릿여행후기댓글
CREATE TABLE template_review_comment (
template_review_comment_id           INTEGER  NOT NULL COMMENT '템플릿여행후기댓글번호', -- 템플릿여행후기댓글번호
member_id                            INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
template_review_id                   INTEGER  NOT NULL COMMENT '여행후기 번호', -- 여행후기 번호
templete_review_comment_order        INTEGER  NOT NULL COMMENT '댓글순서', -- 댓글순서
template_review_comment_level        INTEGER  NOT NULL COMMENT '댓글레벨', -- 댓글레벨
template_review_comment_content      TEXT     NOT NULL COMMENT '내용', -- 내용
template_review_comment_created_date DATETIME NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '템플릿여행후기댓글';

-- 템플릿여행후기댓글
ALTER TABLE template_review_comment
ADD CONSTRAINT PK_template_review_comment -- 템플릿여행후기댓글 기본키
PRIMARY KEY (
template_review_comment_id -- 템플릿여행후기댓글번호
);

-- 로그인유형
CREATE TABLE login_type (
login_type_id INTEGER     NOT NULL COMMENT '로그인유형번호', -- 로그인유형번호
login_type    VARCHAR(50) NOT NULL COMMENT '로그인유형' -- 로그인유형
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
login_type ASC -- 로그인유형
);

-- 여행활동
CREATE TABLE travel_activity (
travel_activity_id            INTEGER      NOT NULL COMMENT '여행활동번호', -- 여행활동번호
template_review_date_id       INTEGER      NOT NULL COMMENT '일정번호', -- 일정번호
activity_type_id              INTEGER      NOT NULL COMMENT '여행활동유형번호', -- 여행활동유형번호
activity_order                INTEGER      NOT NULL COMMENT '활동순서', -- 활동순서
restaurant_review_sub_heading VARCHAR(255) NOT NULL COMMENT '소제목', -- 소제목
content                       TEXT         NOT NULL COMMENT '내용' -- 내용
)
COMMENT '여행활동';

-- 여행활동
ALTER TABLE travel_activity
ADD CONSTRAINT PK_travel_activity -- 여행활동 기본키
PRIMARY KEY (
travel_activity_id -- 여행활동번호
);

-- 여행활동유형
CREATE TABLE activity_type (
activity_type_id INTEGER     NOT NULL COMMENT '여행활동유형번호', -- 여행활동유형번호
activity_type    VARCHAR(50) NOT NULL COMMENT '유형명' -- 유형명
)
COMMENT '여행활동유형';

-- 여행활동유형
ALTER TABLE activity_type
ADD CONSTRAINT PK_activity_type -- 여행활동유형 기본키
PRIMARY KEY (
activity_type_id -- 여행활동유형번호
);

-- 여행활동유형 유니크 인덱스
CREATE UNIQUE INDEX UIX_activity_type
ON activity_type ( -- 여행활동유형
activity_type ASC -- 유형명
);

-- 자유후기방문도시
CREATE TABLE free_review_city (
free_review_id           INTEGER NOT NULL COMMENT '자유후기번호', -- 자유후기번호
tour_free_review_city_id INTEGER NOT NULL COMMENT '도시번호' -- 도시번호
)
COMMENT '자유후기방문도시';

-- 자유후기방문도시
ALTER TABLE free_review_city
ADD CONSTRAINT PK_free_review_city -- 자유후기방문도시 기본키
PRIMARY KEY (
free_review_id,           -- 자유후기번호
tour_free_review_city_id  -- 도시번호
);

-- 결제상태
CREATE TABLE payment_status (
payment_status_id INTEGER     NOT NULL COMMENT '상태번호', -- 상태번호
payment_status    VARCHAR(50) NOT NULL COMMENT '결제상태' -- 결제상태
)
COMMENT '결제상태';

-- 결제상태
ALTER TABLE payment_status
ADD CONSTRAINT PK_payment_status -- 결제상태 기본키
PRIMARY KEY (
payment_status_id -- 상태번호
);

-- 결제상태 유니크 인덱스
CREATE UNIQUE INDEX UIX_payment_status
ON payment_status ( -- 결제상태
payment_status ASC -- 결제상태
);

-- 회원
ALTER TABLE member
ADD CONSTRAINT FK_login_type_TO_member -- 로그인유형 -> 회원
FOREIGN KEY (
login_type_id -- 로그인유형번호
)
REFERENCES login_type ( -- 로그인유형
login_type_id -- 로그인유형번호
);

-- 일정(후기)
ALTER TABLE template_review_date
ADD CONSTRAINT FK_template_review_TO_template_review_date -- 여행후기(템플릿) -> 일정(후기)
FOREIGN KEY (
template_review_id -- 여행후기 번호
)
REFERENCES template_review ( -- 여행후기(템플릿)
template_review_id -- 여행후기 번호
);

-- 일정(후기)
ALTER TABLE template_review_date
ADD CONSTRAINT FK_tour_free_review_city_TO_template_review_date -- 도시 -> 일정(후기)
FOREIGN KEY (
tour_free_review_city_id -- 도시번호
)
REFERENCES tour_free_review_city ( -- 도시
tour_free_review_city_id -- 도시번호
);

-- 여행후기(템플릿)
ALTER TABLE template_review
ADD CONSTRAINT FK_member_TO_template_review -- 회원 -> 여행후기(템플릿)
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 여행후기(템플릿)
ALTER TABLE template_review
ADD CONSTRAINT FK_reservation_TO_template_review -- 예약 -> 여행후기(템플릿)
FOREIGN KEY (
reservation_id -- 예약번호
)
REFERENCES reservation ( -- 예약
reservation_id -- 예약번호
);

-- 현지투어상품
ALTER TABLE local_tour_template_review
ADD CONSTRAINT FK_travel_activity_TO_local_tour_template_review -- 여행활동 -> 현지투어상품
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
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

-- 레스토랑
ALTER TABLE restaurant_review
ADD CONSTRAINT FK_travel_activity_TO_restaurant_review -- 여행활동 -> 레스토랑
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
);

-- 숙소
ALTER TABLE accommodation_review
ADD CONSTRAINT FK_travel_activity_TO_accommodation_review -- 여행활동 -> 숙소
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
);

-- 관광지
ALTER TABLE tourist_attraction_review
ADD CONSTRAINT FK_travel_activity_TO_tourist_attraction_review -- 여행활동 -> 관광지
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
);

-- 교통
ALTER TABLE transportation_review
ADD CONSTRAINT FK_travel_activity_TO_transportation_review -- 여행활동 -> 교통
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
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
payment_status_id -- 상태번호
)
REFERENCES payment_status ( -- 결제상태
payment_status_id -- 상태번호
);

-- 1:1 문의 
ALTER TABLE personal_inquiry
ADD CONSTRAINT FK_member_TO_personal_inquiry -- 회원 -> 1:1 문의 
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 1:1 문의 
ALTER TABLE personal_inquiry
ADD CONSTRAINT FK_tour_TO_personal_inquiry -- 상품 -> 1:1 문의 
FOREIGN KEY (
tour_id -- 상품번호
)
REFERENCES tour ( -- 상품
tour_id -- 상품번호
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
ALTER TABLE unable_sell_date
ADD CONSTRAINT FK_tour_TO_unable_sell_date -- 상품 -> 판매불가 날짜
FOREIGN KEY (
tour_id -- 상품번호
)
REFERENCES tour ( -- 상품
tour_id -- 상품번호
);

-- 코스
ALTER TABLE tour_course
ADD CONSTRAINT FK_tour_TO_tour_course -- 상품 -> 코스
FOREIGN KEY (
tour_id -- 상품번호
)
REFERENCES tour ( -- 상품
tour_id -- 상품번호
);

-- 코스사진
ALTER TABLE tour_course_photo
ADD CONSTRAINT FK_tour_course_TO_tour_course_photo -- 코스 -> 코스사진
FOREIGN KEY (
tour_course_id -- 코스번호
)
REFERENCES tour_course ( -- 코스
tour_course_id -- 코스번호
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

-- 후기회원(좋아요)
ALTER TABLE member_tour_template_review_like
ADD CONSTRAINT FK_template_review_TO_member_tour_template_review_like -- 여행후기(템플릿) -> 후기회원(좋아요)
FOREIGN KEY (
template_review_id -- 여행후기 번호
)
REFERENCES template_review ( -- 여행후기(템플릿)
template_review_id -- 여행후기 번호
);

-- 후기회원(좋아요)
ALTER TABLE member_tour_template_review_like
ADD CONSTRAINT FK_member_TO_member_tour_template_review_like -- 회원 -> 후기회원(좋아요)
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 자유후기(좋아요)
ALTER TABLE member_tour_free_review_like
ADD CONSTRAINT FK_free_review_TO_member_tour_free_review_like -- 자유후기 -> 자유후기(좋아요)
FOREIGN KEY (
free_review_id -- 자유후기번호
)
REFERENCES free_review ( -- 자유후기
free_review_id -- 자유후기번호
);

-- 자유후기(좋아요)
ALTER TABLE member_tour_free_review_like
ADD CONSTRAINT FK_member_TO_member_tour_free_review_like -- 회원 -> 자유후기(좋아요)
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 현지투어(자유후기)
ALTER TABLE local_tour_free_review
ADD CONSTRAINT FK_free_review_TO_local_tour_free_review -- 자유후기 -> 현지투어(자유후기)
FOREIGN KEY (
free_review_id -- 자유후기번호
)
REFERENCES free_review ( -- 자유후기
free_review_id -- 자유후기번호
);

-- 현지투어(자유후기)사진
ALTER TABLE local_tour_free_review_photo
ADD CONSTRAINT FK_local_tour_free_review_TO_local_tour_free_review_photo -- 현지투어(자유후기) -> 현지투어(자유후기)사진
FOREIGN KEY (
local_tour_free_review_id -- 현지투어번호
)
REFERENCES local_tour_free_review ( -- 현지투어(자유후기)
local_tour_free_review_id -- 현지투어번호
);

-- 템플릿후기사진
ALTER TABLE template_review_photo
ADD CONSTRAINT FK_travel_activity_TO_template_review_photo -- 여행활동 -> 템플릿후기사진
FOREIGN KEY (
travel_activity_id -- 여행활동번호
)
REFERENCES travel_activity ( -- 여행활동
travel_activity_id -- 여행활동번호
);

-- 자유후기 사진
ALTER TABLE free_review_photo
ADD CONSTRAINT FK_free_review_TO_free_review_photo -- 자유후기 -> 자유후기 사진
FOREIGN KEY (
free_review_id -- 자유후기번호
)
REFERENCES free_review ( -- 자유후기
free_review_id -- 자유후기번호
);

-- 도시
ALTER TABLE tour_free_review_city
ADD CONSTRAINT FK_tour_free_review_country_TO_tour_free_review_city -- 국가 -> 도시
FOREIGN KEY (
tour_free_review_country_id -- 국가번호
)
REFERENCES tour_free_review_country ( -- 국가
tour_free_review_country_id -- 국가번호
);

-- 자유후기댓글
ALTER TABLE free_review_comment
ADD CONSTRAINT FK_member_TO_free_review_comment -- 회원 -> 자유후기댓글
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 자유후기댓글
ALTER TABLE free_review_comment
ADD CONSTRAINT FK_free_review_TO_free_review_comment -- 자유후기 -> 자유후기댓글
FOREIGN KEY (
free_review_id -- 자유후기번호
)
REFERENCES free_review ( -- 자유후기
free_review_id -- 자유후기번호
);

-- 템플릿여행후기댓글
ALTER TABLE template_review_comment
ADD CONSTRAINT FK_template_review_TO_template_review_comment -- 여행후기(템플릿) -> 템플릿여행후기댓글
FOREIGN KEY (
template_review_id -- 여행후기 번호
)
REFERENCES template_review ( -- 여행후기(템플릿)
template_review_id -- 여행후기 번호
);

-- 템플릿여행후기댓글
ALTER TABLE template_review_comment
ADD CONSTRAINT FK_member_TO_template_review_comment -- 회원 -> 템플릿여행후기댓글
FOREIGN KEY (
member_id -- 회원번호
)
REFERENCES member ( -- 회원
member_id -- 회원번호
);

-- 여행활동
ALTER TABLE travel_activity
ADD CONSTRAINT FK_activity_type_TO_travel_activity -- 여행활동유형 -> 여행활동
FOREIGN KEY (
activity_type_id -- 여행활동유형번호
)
REFERENCES activity_type ( -- 여행활동유형
activity_type_id -- 여행활동유형번호
);

-- 여행활동
ALTER TABLE travel_activity
ADD CONSTRAINT FK_template_review_date_TO_travel_activity -- 일정(후기) -> 여행활동
FOREIGN KEY (
template_review_date_id -- 일정번호
)
REFERENCES template_review_date ( -- 일정(후기)
template_review_date_id -- 일정번호
);

-- 자유후기방문도시
ALTER TABLE free_review_city
ADD CONSTRAINT FK_tour_free_review_city_TO_free_review_city -- 도시 -> 자유후기방문도시
FOREIGN KEY (
tour_free_review_city_id -- 도시번호
)
REFERENCES tour_free_review_city ( -- 도시
tour_free_review_city_id -- 도시번호
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