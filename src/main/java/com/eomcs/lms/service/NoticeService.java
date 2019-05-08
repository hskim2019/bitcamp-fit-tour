package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.Notice;

public interface NoticeService {
  List<Notice> list(int pageNo, int pageSize);
  int add(Notice notice);
  Notice get(int notice_id);
  int update(Notice notice);
  int delete(int notice_id);
  int size();
}
