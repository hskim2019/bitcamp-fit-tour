package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Reservation;

public interface ReservationDao {
  int insert(Reservation reservation);
  List<Reservation> findAll(Map<String,Object> paramMap);
  Reservation findByNo(int no);
  List<Reservation> myReservation(int no);
  int update(Reservation reservation);
  int delete(int no);
  int countAll(String search);
  List<Reservation> findByCompletedReservation(Map<String,Object> paramMap);
  List<Reservation> findByOldReservation(Map<String,Object> paramMap);
  List<Reservation> findAllTour();
}






