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
  public int size(int searchCagetory, String search) {
    HashMap<String,Object> params = new HashMap<>();

    if(searchCagetory == 0) {
      params.put("searchAll", search);
    } else if (searchCagetory == 1) {
      params.put("searchwithName", search);
    } else if (searchCagetory == 2) {
      params.put("searchwithNickname", search);
    } else if (searchCagetory == 3) {
      params.put("searchwithEmail", search);
    } else if (searchCagetory == 4) {
      params.put("searchwithTel", search);
    }
    return freeReviewDao.countAll(params);
  }

  @Override
  public List<FreeReview> cityList(int pageNo, int pageSize, List<String> citys) {
    HashMap<String,Object> params = new HashMap<>();
    if(citys.size() >= 1) {
      
      params.put("searchOne", citys.get(0));
    }
    if(citys.size() >= 2) {
      params.put("searchTwo", citys.get(1));
    }
    if(citys.size() >= 3) {
      params.put("searchThree", citys.get(2));
    }
    if(citys.size() >= 4) {
      params.put("searchFour", citys.get(3));
    }
    if(citys.size() >= 5) {
      params.put("searchFive", citys.get(4));
    }
    if(citys.size() >= 6) {
      params.put("searchSix", citys.get(5));
    }
    if(citys.size() >= 7) {
      params.put("searchSeven", citys.get(6));
    }
    if(citys.size() >= 8) {
      params.put("searchEight", citys.get(7));
    }
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    return freeReviewDao.findCity(params);
  }
  
  
  
  @Override
  public int citySize(List<String> citys) {
    HashMap<String,Object> params = new HashMap<>();
    if(citys.size() >= 1) {
      
      params.put("searchOne", citys.get(0));
    }
    if(citys.size() >= 2) {
      params.put("searchTwo", citys.get(1));
    }
    if(citys.size() >= 3) {
      params.put("searchThree", citys.get(2));
    }
    if(citys.size() >= 4) {
      params.put("searchFour", citys.get(3));
    }
    if(citys.size() >= 5) {
      params.put("searchFive", citys.get(4));
    }
    if(citys.size() >= 6) {
      params.put("searchSix", citys.get(5));
    }
    if(citys.size() >= 7) {
      params.put("searchSeven", citys.get(6));
    }
    if(citys.size() >= 8) {
      params.put("searchEight", citys.get(7));
    }
    
    return freeReviewDao.countCity(params);
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

  @Override
  public int reservationNull(int no) {
    return freeReviewDao.reservationNull(no);
    
  }


  
  
}








