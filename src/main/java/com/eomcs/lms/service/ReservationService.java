package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.domain.Reservation;

public interface ReservationService {
  List<Reservation> list(int pageNo, int pageSize, String search);
  int add(Reservation reservation);
  Reservation get(int no);
  int update(Reservation member);
  int delete(int no);
  int size(String search);
}
