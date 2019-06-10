package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eomcs.lms.dao.FaqDao;
import com.eomcs.lms.domain.Faq;
import com.eomcs.lms.service.FaqService;

@Service
public class FaqServiceImpl implements FaqService{

	FaqDao faqDao;

	public FaqServiceImpl(FaqDao faqDao) {
		this.faqDao = faqDao;
	}

	// 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
	@Override
	public List<Faq> list(String category, int pageNo, int pageSize) {
		// 게시물 목록을 가져오는 경우 서비스 객체에서 특별하게 할 일이 없다.
		// 그럼에도 불구하고 Command 객체와 DAO 사이에 Service 객체를 두기로 했으면 
		// 일관성을 위해 Command 객체는 항상 Service 객체를 통해 데이터를 다뤄야 한다.
		// 

		HashMap<String,Object> params = new HashMap<>();
		params.put("category", category);
		params.put("size", pageSize);
		params.put("rowNo", (pageNo - 1) * pageSize);

		return faqDao.findAll(params);
	}
	
	@Override
	public List<Faq> search(String category) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("category", category);
		return faqDao.findAll(params);
	}

	@Override
	public int add(Faq faq) {
		// 이 메서드도 하는 일이 없다.
		// 그래도 일관된 프로그래밍을 위해 Command 객체는 항상 Service 객체를 경유하여 DAO를 사용해야 한다.
		return faqDao.insert(faq);
	}

	@Override
	public Faq get(int no) {
		// 이제 조금 서비스 객체가 뭔가를 하는 구만.
		// Command 객체는 데이터를 조회한 후 조회수를 높이는 것에 대해 신경 쓸 필요가 없어졌다.
		Faq faq = faqDao.findByNo(no);
		return faq;
	}

	@Override
	public int update(Faq faq) {
		// 이 메서드도 별로 할 일이 없다.
		// 그냥 DAO를 실행시키고 리턴 값을 그대로 전달한다.
		return faqDao.update(faq);
	}

	@Override
	public int delete(int no) {
		// 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
		// 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
		return faqDao.delete(no);
	}

	@Override
	public int size() {
		// 전체 게시물의 개수
		return faqDao.countAll();
	}
}







