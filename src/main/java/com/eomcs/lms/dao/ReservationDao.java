// 프록시 패턴 적용 - MemberDao에서 인터페이스를 추출한다.
package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;
import com.eomcs.lms.domain.Reservation;

public interface ReservationDao {
  int insert(Reservation reservation);
  List<Reservation> findAll(Map<String,Object> paramMap);
  Reservation findByNo(int no);
  int update(Reservation reservation);
  int delete(int no);
  int countAll(String search);
}






