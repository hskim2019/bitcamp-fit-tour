alter table member modify tel varchar(50);
alter table member add photo varchar(255) not null default 'defalut.jpg';
alter table tour_comment change ranking parent_id INT(11) NULL;
alter table tour modify content MEDIUMTEXT;
alter table country add continent varchar(50) not null;
alter table tour add location varchar(255);

alter table free_review modify content MEDIUMTEXT;
ALTER TABLE free_review ADD viewcount int(11) NOT NULL