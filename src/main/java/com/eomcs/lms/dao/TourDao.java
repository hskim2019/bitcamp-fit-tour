package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.domain.TourComment;

public interface TourDao {
  int insert(Tour tour);
  List<Tour> findAll(Map<String,Object> params);
  Tour findByNo(int no);
  int increaseCount(int no);
  int update(Tour tour);
  int delete(int no);
  int countAll();
  TourComment findComment();
}







