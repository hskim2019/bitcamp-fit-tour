ALTER TABLE login_type CHANGE login_type type_name varchar(50) NOT NULL;
ALTER TABLE reservation CHANGE payment_date payment_date DATETIME NULL;
ALTER TABLE reservation CHANGE requirment requirement TEXT NULL;

ALTER TABLE member CHANGE birth birth VARCHAR(20) NOT NULL;


ALTER TABLE member ADD certification VARCHAR(255) NOT NULL AFTER email;

DROP INDEX UIX_member ON member;
CREATE UNIQUE INDEX UIX_member
ON member ( -- 회원
email ASC,         -- 이메일(아이디)
login_type_id ASC -- 로그인유형번호

);

-- city 이름에 오타가 있으니 변경 해 주세요
update city
set city_name = '퀸스타운'
where city_id = 248;
