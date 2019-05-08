package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Notice;

public interface NoticeDao {
  int insert(Notice notice);
  List<Notice> findAll(Map<String,Object> params);
  Notice findByNo(int notice_id);
  int increaseCount(int notice_id);
  int update(Notice notice);
  int delete(int notice_id);
  int countAll();
}







