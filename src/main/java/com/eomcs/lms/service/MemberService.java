package com.eomcs.lms.service;

import java.util.List;
import com.eomcs.lms.domain.Member;

public interface MemberService {
  List<Member> list(int pageNo, int pageSize, String search);
  int add(Member member);
  int signUp(Member member) throws Exception;
  Member get(int no);
  Member get(String email, String password);
  Member get(String email);
  int update(Member member);
  int delete(int no);
  int size(String search);
  int confirm(String email,String certification);
  void reEamil(String email) throws Exception;
}
