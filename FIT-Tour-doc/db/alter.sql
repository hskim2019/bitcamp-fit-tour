alter table member modify tel varchar(50);
alter table member add photo varchar(255) not null default 'defalut.jpg';
alter table tour_comment change ranking parent_id INT(11) NULL;
