package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.ReservationDao;
import com.eomcs.lms.domain.Reservation;
import com.eomcs.lms.service.ReservationService;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class ReservationServiceImpl implements ReservationService {
  
  ReservationDao reservationDao;
  
  public ReservationServiceImpl(ReservationDao reservationDao) {
    this.reservationDao = reservationDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<Reservation> list(int pageNo, int pageSize, String search) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("search", search);
    
    return reservationDao.findAll(params);
  }
  
  @Override
  public int add(Reservation reservation) {
    return reservationDao.insert(reservation);
  }
  
  @Override
  public Reservation get(int no) {
    return reservationDao.findByNo(no);
  }
  
  @Override
  public int update(Reservation reservation) {
    return reservationDao.update(reservation);
  }
  
  @Override
  public int delete(int no) {
    return reservationDao.delete(no);
  }
  

  
  @Override
  public int size(String search) {
    return reservationDao.countAll(search);
  }
}







