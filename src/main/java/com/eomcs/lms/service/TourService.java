package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.Tour;

public interface TourService {
  List<Tour> list(int pageNo, int pageSize);
  int add(Tour tour);
  Tour get(int no);
  int update(Tour tour);
  int delete(int no);
  int size();
}
