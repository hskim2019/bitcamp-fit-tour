package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.Board;

public interface TourService {
  List<Board> list(int pageNo, int pageSize);
  int add(Board board);
  Board get(int no);
  int update(Board board);
  int delete(int no);
  int size();
}
