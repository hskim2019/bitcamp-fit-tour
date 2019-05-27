package com.eomcs.lms.domain;

public class TourTheme {

  private int tourNo;
  private int themeNo;
  
  @Override
  public String toString() {
    return "TourTheme [tourNo=" + tourNo + ", themeNo=" + themeNo + "]";
  }

  public int getTourNo() {
    return tourNo;
  }

  public void setTourNo(int tourNo) {
    this.tourNo = tourNo;
  }

  public int getThemeNo() {
    return themeNo;
  }

  public void setThemeNo(int themeNo) {
    this.themeNo = themeNo;
  }
  
  
  
}
