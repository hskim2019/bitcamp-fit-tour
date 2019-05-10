package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.TourComment;

public interface TourCommentService {
  List<TourComment> list();
  int add(TourComment tourComment);
  List<TourComment> get(int no);
  int update(TourComment tourComment);
  int delete(int no);
}
