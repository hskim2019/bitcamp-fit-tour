package com.eomcs.lms.service;

import java.util.Map;

public interface NaverService {
  

  @SuppressWarnings("rawtypes")
  Map getLoginUser(String accessToken);
}
