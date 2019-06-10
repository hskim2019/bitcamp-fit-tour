package com.eomcs.lms.service;

import java.util.List;

import com.eomcs.lms.domain.Faq;

public interface FaqService {
	
	  List<Faq> list(String category, int pageNo, int pageSize);
	  List<Faq> search(String category);
	  int add(Faq faq);
	  Faq get(int no);
	  int update(Faq faq);
	  int delete(int no);
	  int size();

}
