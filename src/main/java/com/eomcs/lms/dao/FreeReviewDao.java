// 프록시 패턴 적용 - MemberDao에서 인터페이스를 추출한다.
package com.eomcs.lms.dao;

import java.util.HashMap;
import java.util.List;
import com.eomcs.lms.domain.FreeReview;

public interface FreeReviewDao {
  int insert(FreeReview member);

  List<FreeReview> findAll(HashMap<String, Object> params);

  int countAll(String search);
 
}







