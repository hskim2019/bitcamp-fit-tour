package com.eomcs.lms.domain;

import java.sql.Date;

public class Tour {
  private int no;
  private String title;
  private String subHeading;
  private String content;
  private Date createdDate;
  private int totalHour;
  private String hashTag;
  private int personnel;
  private String transportation;
  private int price;
  
  @Override
  public String toString() {
    return "Tour [no=" + no + ", title=" + title + ", subHeading=" + subHeading + ", content="
        + content + ", createdDate=" + createdDate + ", totalHour=" + totalHour + ", hashTag="
        + hashTag + ", personnel=" + personnel + ", transportation=" + transportation + ", price="
        + price + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getSubHeading() {
    return subHeading;
  }
  public void setSubHeading(String subHeading) {
    this.subHeading = subHeading;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public int getTotalHour() {
    return totalHour;
  }
  public void setTotalHour(int totalHour) {
    this.totalHour = totalHour;
  }
  public String getHashTag() {
    return hashTag;
  }
  public void setHashTag(String hashTag) {
    this.hashTag = hashTag;
  }
  public int getPersonnel() {
    return personnel;
  }
  public void setPersonnel(int personnel) {
    this.personnel = personnel;
  }
  public String getTransportation() {
    return transportation;
  }
  public void setTransportation(String transportation) {
    this.transportation = transportation;
  }
  public int getPrice() {
    return price;
  }
  public void setPrice(int price) {
    this.price = price;
  }

  
  
}

