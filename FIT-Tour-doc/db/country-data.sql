
RENAME TABLE tour_free_review_city TO city;
RENAME TABLE tour_free_review_country TO country;
alter table tour add city_id int(11) not null;

ALTER TABLE tour
ADD CONSTRAINT FK_city_TO_tour -- 도시 -> 투어
FOREIGN KEY (
city_id -- 도시번호
)
REFERENCES city ( -- 도시
city_id -- 도시번호
);

alter table country change country country_name VARCHAR(50);

insert into country(country_id, country_name) values(1, '네덜란드');
insert into country(country_id, country_name) values(2, '독일');
insert into country(country_id, country_name) values(3, '룩셈부르크');
insert into country(country_id, country_name) values(4, '모나코');
insert into country(country_id, country_name) values(5, '벨기에');
insert into country(country_id, country_name) values(6, '스위스');
insert into country(country_id, country_name) values(7, '아일랜드');
insert into country(country_id, country_name) values(8, '영국');
insert into country(country_id, country_name) values(9, '오스트리아');
insert into country(country_id, country_name) values(10, '이탈리아');
insert into country(country_id, country_name) values(11, '프랑스');
insert into country(country_id, country_name) values(12, '그리스');
insert into country(country_id, country_name) values(13, '몬테네그로');
insert into country(country_id, country_name) values(14, '몰타');
insert into country(country_id, country_name) values(15, '스페인');
insert into country(country_id, country_name) values(16, '슬로베니아');
insert into country(country_id, country_name) values(17, '영국령 지브롤터');
insert into country(country_id, country_name) values(18, '크로아티아');
insert into country(country_id, country_name) values(19, '터키');
insert into country(country_id, country_name) values(20, '포르투갈');
insert into country(country_id, country_name) values(21, '라트비아');
insert into country(country_id, country_name) values(22, '러시아');
insert into country(country_id, country_name) values(23, '루마니아');
insert into country(country_id, country_name) values(24, '리투아니아');
insert into country(country_id, country_name) values(25, '마케도니아');
insert into country(country_id, country_name) values(26, '불가리아');
insert into country(country_id, country_name) values(27, '세르비아');
insert into country(country_id, country_name) values(28, '슬로바키아');
insert into country(country_id, country_name) values(29, '에스토니아');
insert into country(country_id, country_name) values(30, '우크라이나');
insert into country(country_id, country_name) values(31, '체코');
insert into country(country_id, country_name) values(32, '폴란드');
insert into country(country_id, country_name) values(33, '헝가리');
insert into country(country_id, country_name) values(34, '노르웨이');
insert into country(country_id, country_name) values(35, '덴마크');
insert into country(country_id, country_name) values(36, '스웨덴');
insert into country(country_id, country_name) values(37, '아이슬란드');
insert into country(country_id, country_name) values(38, '핀란드');
insert into country(country_id, country_name) values(39, '라오스');
insert into country(country_id, country_name) values(40, '말레이시아');
insert into country(country_id, country_name) values(41, '몰디브');
insert into country(country_id, country_name) values(42, '미얀마');
insert into country(country_id, country_name) values(43, '베트남');
insert into country(country_id, country_name) values(44, '브루나이');
insert into country(country_id, country_name) values(45, '인도네시아');
insert into country(country_id, country_name) values(46, '캄보디아');
insert into country(country_id, country_name) values(47, '태국');
insert into country(country_id, country_name) values(48, '필리핀');
insert into country(country_id, country_name) values(49, '일본');
insert into country(country_id, country_name) values(50, '중국');
insert into country(country_id, country_name) values(51, '대만');
insert into country(country_id, country_name) values(52, '마카오');
insert into country(country_id, country_name) values(53, '싱가포르');
insert into country(country_id, country_name) values(54, '홍콩');
insert into country(country_id, country_name) values(55, '아랍에미리트');
insert into country(country_id, country_name) values(56, '아제르바이잔');
insert into country(country_id, country_name) values(57, '요르단');
insert into country(country_id, country_name) values(58, '이스라엘');
insert into country(country_id, country_name) values(59, '카타르');
insert into country(country_id, country_name) values(60, '네팔');
insert into country(country_id, country_name) values(61, '몽골');
insert into country(country_id, country_name) values(62, '인도');
insert into country(country_id, country_name) values(63, '카자흐스탄');
insert into country(country_id, country_name) values(64, '미국');
insert into country(country_id, country_name) values(65, '캐나다');
insert into country(country_id, country_name) values(66, '과테말라');
insert into country(country_id, country_name) values(67, '도미니카 공화국');
insert into country(country_id, country_name) values(68, '멕시코');
insert into country(country_id, country_name) values(69, '버진아일랜드');
insert into country(country_id, country_name) values(70, '볼리비아');
insert into country(country_id, country_name) values(71, '브라질');
insert into country(country_id, country_name) values(72, '아르헨티나');
insert into country(country_id, country_name) values(73, '엘살바도르');
insert into country(country_id, country_name) values(74, '우루과이');
insert into country(country_id, country_name) values(75, '칠레');
insert into country(country_id, country_name) values(76, '코스타리카');
insert into country(country_id, country_name) values(77, '콜롬비아');
insert into country(country_id, country_name) values(78, '쿠바');
insert into country(country_id, country_name) values(79, '파나마');
insert into country(country_id, country_name) values(80, '페루');
insert into country(country_id, country_name) values(81, '뉴질랜드');
insert into country(country_id, country_name) values(82, '오스트레일리아');
insert into country(country_id, country_name) values(83, '괌');
insert into country(country_id, country_name) values(84, '사이판');
insert into country(country_id, country_name) values(85, '팔라우');
insert into country(country_id, country_name) values(86, '남아프리카 공화국');
insert into country(country_id, country_name) values(87, '모로코');
insert into country(country_id, country_name) values(88, '이집트');
insert into country(country_id, country_name) values(89, '케냐');
insert into country(country_id, country_name) values(90, '탄자니아');
