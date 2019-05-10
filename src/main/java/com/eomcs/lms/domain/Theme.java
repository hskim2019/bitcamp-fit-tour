package com.eomcs.lms.domain;

public class Theme {

  private int no;
  private String theme;
  
  @Override
  public String toString() {
    return "Theme [no=" + no + ", theme=" + theme + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTheme() {
    return theme;
  }
  public void setTheme(String theme) {
    this.theme = theme;
  }
  
}
