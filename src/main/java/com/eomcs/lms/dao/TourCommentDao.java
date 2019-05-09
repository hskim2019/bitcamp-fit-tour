package com.eomcs.lms.dao;

import java.util.List;
import com.eomcs.lms.domain.TourComment;

public interface TourCommentDao {
  int insert(TourComment tourComment);
  List<TourComment> findAll();
  TourComment findByNo(int no);
  int update(TourComment board);
  int delete(int no);
  int countAll();
}







