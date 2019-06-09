package com.eomcs.lms.dao;

import java.util.List;
import java.util.Map;

import com.eomcs.lms.domain.Faq;


public interface FaqDao {
	  int insert(Faq faq);
	  List<Faq> findAll(Map<String,Object> params);
	  Faq findByNo(int no);
	  int update(Faq notice);
	  int delete(int no);
	  int countAll();

}
