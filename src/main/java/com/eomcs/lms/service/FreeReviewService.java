package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.FreeReview;

public interface FreeReviewService {
	

	int add(FreeReview freeReview);

  List<FreeReview> list(int pageNo, int pageSize, String search);

  int size(String search);

  int delete(int no);

  FreeReview get(int no);

  int update(FreeReview freeReview);

	
}
