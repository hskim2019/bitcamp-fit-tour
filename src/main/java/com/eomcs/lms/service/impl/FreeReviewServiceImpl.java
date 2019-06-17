package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.FreeReviewDao;
import com.eomcs.lms.domain.FreeReview;
import com.eomcs.lms.service.FreeReviewService;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class FreeReviewServiceImpl implements FreeReviewService {
  
  
  FreeReviewDao freeReviewDao;

  
  public FreeReviewServiceImpl(FreeReviewDao freeReviewDao) {
    this.freeReviewDao = freeReviewDao;
  }

  @Override
  public int add(FreeReview freeReview) {
    return freeReviewDao.insert(freeReview);
  }

  @Override
  public List<FreeReview> list(int pageNo, int pageSize, String search) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("search", search);
    
    return freeReviewDao.findAll(params);
  }

  @Override
  public int size(String search) {
    return freeReviewDao.countAll(search);
  }

  @Override
  public int delete(int no) {
    return freeReviewDao.delete(no);
  }

  @Override
  public FreeReview get(int no) {
    FreeReview freeReview = freeReviewDao.findByNo(no);
    if (freeReview != null) {
      freeReviewDao.increaseCount(no);
    }
    return freeReview;
  }

  @Override
  public int update(FreeReview freeReview) {
    return freeReviewDao.update(freeReview);
  }

  
  
}








