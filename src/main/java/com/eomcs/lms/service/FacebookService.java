package com.eomcs.lms.service;

import java.util.Map;

public interface FacebookService {
  

  @SuppressWarnings("rawtypes")
  Map getLoginUser(String accessToken);
}
