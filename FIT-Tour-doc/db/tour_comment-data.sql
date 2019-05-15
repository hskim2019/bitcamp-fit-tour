delete from tour_comment;

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(1, 101, 1, 0, 1, '내용입니다1.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(2, 101, 1, 0, 1, '내용입니다2.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(3, 101, 1, 0, 1, '내용입니다3.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(4, 101, 2, 0, 1, '내용입니다4.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(5, 101, 2, 0, 1, '내용입니다5.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(6, 101, 2, 0, 1, '내용입니다1.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(7, 101, 3, 0, 1, '내용입니다2.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(8, 101, 3, 0, 1, '내용입니다3.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(9, 101, 3, 0, 1, '내용입니다4.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(10, 101, 4, 0, 1, '내용입니다5.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(11, 101, 4, 0, 1, '내용입니다1.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(12, 101, 4, 0, 1, '내용입니다2.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(13, 101, 5, 0, 1, '내용입니다3.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(14, 101, 5, 0, 1, '내용입니다4.');

insert into tour_comment(tour_comment_id, member_id, tour_id, parent_id, level, content)
values(15, 101, 5, 0, 1, '내용입니다5.');



insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 1, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 1, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 2, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 2, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 3, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 1, 3, 2, '대댓글입니다2');

insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 4, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 4, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 5, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 5, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 6, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 2, 6, 2, '대댓글입니다2');

insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 7, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 7, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 8, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 8, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 9, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 3, 9, 2, '대댓글입니다2');

insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 10, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 10, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 11, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 11, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 12, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 4, 12, 2, '대댓글입니다2');

insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 13, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 13, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 14, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 14, 2, '대댓글입니다2');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 15, 2, '대댓글입니다1');
insert into tour_comment(member_id, tour_id, parent_id, level, content)
values(101, 5, 15, 2, '대댓글입니다2');




