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


ALTER TABLE country ADD continent VARCHAR(50) NOT NULL;
update country set continent = '유럽' where country_id between 1 and 38;
update country set continent = '아시아' where country_id between 39 and 63;
update country set continent = '아메리카' where country_id between 64 and 80;
update country set continent = '오세아니아' where country_id between 81 and 85;
update country set continent = '아프리카' where country_id between 86 and 90;
