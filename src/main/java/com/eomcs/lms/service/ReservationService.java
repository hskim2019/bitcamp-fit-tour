package com.eomcs.lms.service;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Reservation;

public interface ReservationService {
  List<Reservation> list(int pageNo, int pageSize, String search, int tourNo);
  int add(Reservation reservation);
  Reservation get(int no);
  List<Reservation> getMyReservation(int no);
  int update(Reservation member);
  int delete(int no);
  int size(String search, int tourNo);
  List<Reservation> findByCompletedReservation(Map<String,Object> paramMap);
  List<Reservation> findByOldReservation(Map<String,Object> paramMap);
  List<Reservation> tourlist();
}
