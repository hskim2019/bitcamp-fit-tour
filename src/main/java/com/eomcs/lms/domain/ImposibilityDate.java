package com.eomcs.lms.domain;

import java.sql.Date;

public class ImposibilityDate {
  private int no;
  private int tourNo;
  private Date imposibilityDate;
  
  
  @Override
  public String toString() {
    return "ImposibilityDate [no=" + no + ", tourNo=" + tourNo + ", imposibilityDate="
        + imposibilityDate + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getTourNo() {
    return tourNo;
  }
  public void setTourNo(int tourNo) {
    this.tourNo = tourNo;
  }
  public Date getImposibilityDate() {
    return imposibilityDate;
  }
  public void setImposibilityDate(Date imposibilityDate) {
    this.imposibilityDate = imposibilityDate;
  }
  
  
}

