package com.eomcs.lms.util;

import java.net.HttpURLConnection;
import java.net.URL;

public class AccessToken {
  
  
  public boolean accessToken(String token) {

    String header = "Bearer " + token; // Bearer 다음에 공백 추가
    try {
      String apiURL = "https://openapi.naver.com/v1/nid/me";
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty("Authorization", header);
      int responseCode = con.getResponseCode();
      if (responseCode == 200) { // 토큰 정상 호출
        System.out.println("토큰 정상");
        return true;
      } else { // 토큰 비정상
        System.out.println("토큰 비 정상");
        return false;
      }

    } catch (Exception e) {
      System.out.println(e);// 예외 호출
      return false;
    }
  }
  
  
}
