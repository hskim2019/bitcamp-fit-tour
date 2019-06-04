package com.eomcs.lms.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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
      System.out.println(con.getURL().toString());
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if (responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else { // 에러 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      System.out.println(response.toString());
    } catch (Exception e) {
      System.out.println(e);
    }
    return false;
  }


}
