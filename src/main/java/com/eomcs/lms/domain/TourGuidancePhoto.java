package com.eomcs.lms.domain;

public class TourGuidancePhoto {
  private int no;
  private int tourNo;
  private String name;
  private String path;
  
  @Override
  public String toString() {
    return "TourPhoto [no=" + no + ", tourNo=" + tourNo + ", name=" + name + ", path=" + path + "]";
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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }
  
  
}
