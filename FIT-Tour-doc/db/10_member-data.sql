-- 회원 예제 데이터
insert into member(
member_id , 
login_type_id, 
email, 
password, 
name, 
nickname, 
birth, 
sms_check, 
email_check, 
tel, 
phone_check, 
rank)
values(101, 1, 'user1@test.com', password('1111'), '홍길동', '별명1', '2009-1-1', '1', '1', '1111-1234', '1', 2);
insert into member(member_id, login_type_id, email, password, name, nickname, birth, sms_check, email_check, tel, phone_check, rank)
values(102, 2, 'user2@test.com', password('1111'), '임꺽정', '별명2', '2009-2-2', '0', '0', '2222-1234', '0', 1);
insert into member(member_id, login_type_id, email, password, name, nickname, birth, sms_check, email_check, tel, phone_check, rank)
values(103, 1, 'user3@test.com', password('1111'), '유관순', '별명3', '1999-3-2', '1', '0', '3333-1234', '1', 1);
insert into member(member_id, login_type_id, email, password, name, nickname, birth, sms_check, email_check, tel, phone_check, rank)
values(104, 3, 'user4@test.com', password('1111'), '안창호', '별명4', '2006-9-2', '1', '0', '4444-1234', '0', 1);
insert into member(member_id, login_type_id, email, password, name, nickname, birth, sms_check, email_check, tel, phone_check, rank)
values(105, 4, 'user5@test.com', password('1111'), '윤봉길', '별명5', '2000-7-2', '1', '0', '5555-1234', '0', 1);