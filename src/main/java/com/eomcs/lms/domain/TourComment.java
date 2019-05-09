package com.eomcs.lms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class TourComment {
  private int no;
  private int memberNo;
  private int tourNo;
  private int order;
  private int level;
  private String content;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  
  @Override
  public String toString() {
    return "TourComment [no=" + no + ", memberNo=" + memberNo + ", tourNo=" + tourNo + ", order="
        + order + ", level=" + level + ", content=" + content + ", createdDate=" + createdDate
        + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public int getTourNo() {
    return tourNo;
  }
  public void setTourNo(int tourNo) {
    this.tourNo = tourNo;
  }
  public int getOrder() {
    return order;
  }
  public void setOrder(int order) {
    this.order = order;
  }
  public int getLevel() {
    return level;
  }
  public void setLevel(int level) {
    this.level = level;
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
  
  
}
