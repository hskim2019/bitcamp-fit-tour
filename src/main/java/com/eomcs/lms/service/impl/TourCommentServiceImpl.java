package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.TourCommentDao;
import com.eomcs.lms.domain.TourComment;
import com.eomcs.lms.service.TourCommentService;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class TourCommentServiceImpl implements TourCommentService {
  
  TourCommentDao tourCommentDao;
  
  public TourCommentServiceImpl(TourCommentDao tourCommentDao) {
    this.tourCommentDao = tourCommentDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<TourComment> list() {
    
    return tourCommentDao.findAll();
  }
  
  @Override
  public int add(TourComment tourComment) {
    // 이 메서드도 하는 일이 없다.
    // 그래도 일관된 프로그래밍을 위해 Command 객체는 항상 Service 객체를 경유하여 DAO를 사용해야 한다.
    return tourCommentDao.insert(tourComment);
  }
  
  @Override
  public List<TourComment> get(int no, int pageNo, int pageSize, int deleteCount) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("no", no);
    params.put("size", pageSize);
    
    
//    if (pageNo == 2 && deleteCount == 3) {
//      deleteCount = 0;
//    }
    
    params.put("rowNo", ((pageNo - 1) * pageSize) - deleteCount);
    List<TourComment> tourComment = tourCommentDao.findByTourNo(params);
    return tourComment;
  }
  
  @Override
  public int update(TourComment tourComment) {
    // 이 메서드도 별로 할 일이 없다.
    // 그냥 DAO를 실행시키고 리턴 값을 그대로 전달한다.
    return tourCommentDao.update(tourComment);
  }
  
  @Override
  public int delete(int no) {
    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
    return tourCommentDao.delete(no);
  }

  @Override
  public int countCommentbyTourNo(int no) {
    
    return tourCommentDao.countCommentbyTourNo(no);
  }

  @Override
  public int size() {
    return tourCommentDao.countAll();
  }
  
  
  
}







