package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.FreeReviewDao;
import com.eomcs.lms.domain.City;
import com.eomcs.lms.domain.FreeReview;
import com.eomcs.lms.service.FreeReviewService;

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

  @Override
  public FreeReview getMemberId(int no) {
    return freeReviewDao.get(no);
  }

  @Override
  public int addFreeReviewCity(HashMap<String, Object> paramMap) {
    return freeReviewDao.insertCity(paramMap);
  }

  @Override
  public List<City> getCityName(int no) {
    
    return freeReviewDao.selectReviewCity(no);
  }

  @Override
  public int deleteFreeReviewCity(int no) {
    return freeReviewDao.deleteReviewCity(no);
  }

  @Override
  public List<FreeReview> findByTourNo(int tourNo) {
    return freeReviewDao.findByTourNo(tourNo);
  }

  
  
}








