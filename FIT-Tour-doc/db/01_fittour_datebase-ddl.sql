--관리자 로그인
sudo mysql -u root -p


--데이터베이스 생성
CREATE DATABASE fittourdb
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;

--데이터베이스 권한 설정
GRANT ALL ON fittourdb.* TO 'bitcamp'@'localhost';
  
--데이터베이스 목록 보기
show databases;

--bitcamp 로그인
mysql -u bitcamp -p

--fittourdb 사용
use fittourdb;

--fittour_table_ddl.sql 파일로 

