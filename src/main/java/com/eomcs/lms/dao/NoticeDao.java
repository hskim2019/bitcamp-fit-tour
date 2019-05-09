package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Notice;

public interface NoticeDao {
  int insert(Notice notice);
  List<Notice> findAll(Map<String,Object> params);
  Notice findByNo(int no);
  int increaseCount(int no);
  int update(Notice notice);
  int delete(int no);
  int countAll();
}







