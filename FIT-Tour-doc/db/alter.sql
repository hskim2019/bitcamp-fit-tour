alter table member modify tel varchar(50);
alter table member add photo varchar(255) not null default 'defalut.jpg';
alter table tour_comment change ranking parent_id INT(11) NULL;
alter table tour modify content MEDIUMTEXT;
alter table country add continent varchar(50) not null;
alter table tour add location varchar(255);


--/리뷰 6월 10일쯤 추가
alter table free_review modify content MEDIUMTEXT;
ALTER TABLE free_review ADD viewcount int(11) NOT NULL;


--/예약 6월 13일 추가
alter table reservation modify payment_id  varchar(255);

--/예약 6월 14일 추가
ALTER TABLE reservation ADD buyer_name varchar(30) NOT NULL;


--/평점 6월 17일 추가
ALTER TABLE free_review ADD score int(10) NOT NULL;
