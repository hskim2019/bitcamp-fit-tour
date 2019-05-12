package com.eomcs.lms.dao;

import java.util.HashMap;
import java.util.List;
import com.eomcs.lms.domain.TourComment;

public interface TourCommentDao {
  int insert(TourComment tourComment);
  List<TourComment> findAll();
  List<TourComment> findByTourNo(int no);
  int update(TourComment tourComment);
  int delete(int no);
  int countCommentbyTourNo(int no);
  List<TourComment> findByTourNo(HashMap<String, Object> params);
  int countAll();
}







