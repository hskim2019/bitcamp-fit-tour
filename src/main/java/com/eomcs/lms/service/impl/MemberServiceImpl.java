package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.MemberDao;
import com.eomcs.lms.domain.Member;
import com.eomcs.lms.service.MemberService;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class MemberServiceImpl implements MemberService {

	MemberDao memberDao;


	public MemberServiceImpl(MemberDao memberDao) {
		this.memberDao = memberDao;
	}

	// 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
	@Override
	public List<Member> list(int pageNo, int pageSize, int searchCagetory, String search) {

		HashMap<String,Object> params = new HashMap<>();
		params.put("size", pageSize);
		params.put("rowNo", (pageNo - 1) * pageSize);
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

		return memberDao.findAll(params);
	}

	@Override
	public int add(Member member) {
		return memberDao.insert(member);
	}

	@Override
	public int signUp(Member member) throws Exception {
		return memberDao.signUp(member);
	}



	@Override
	public Member get(int no) {
		return memberDao.findByNo(no);
	}

	@Override
	public int update(Member member) {
		return memberDao.update(member);
	}

	@Override
	public int delete(int no) {
		return memberDao.delete(no);
	}

	@Override
	public Member get(String email, String password) {
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("email", email);
		paramMap.put("password", password);

		return memberDao.findByEmailPassword(paramMap);
	}

	@Override
	public Member get(String email) {
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("email", email);


		return memberDao.findByEmail(paramMap);
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
		return memberDao.countAll(params);
		//    return memberDao.countAll(searchCagetory, search);
	}

	@Override
	public int confirm(String email, String certification) {
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("email", email);
		paramMap.put("certification", certification);

		return memberDao.confirm(paramMap);
	}



	@Override
	public Member get(String email, int loginTypeNo) {
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("email", email);
		paramMap.put("loginTypeNo", loginTypeNo);

		return memberDao.findByEmailLoginTypeNo(paramMap);
	}

	@Override
	public int snsSignUp(Member member) {
		System.out.println(member);
		return memberDao.snsSignUp(member);
	}

	@Override
	public int updatePassWord(Map<String, Object> paramMap) {
		return memberDao.updatePassWord(paramMap);
	}

	@Override
	public int updatePhoto(Map<String, Object> paramMap) {
		return memberDao.updatePhoto(paramMap);
	}

	@Override
	public int tempPassword(Member member) {
		return memberDao.tempPassWord(member);
	}
}







