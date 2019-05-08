package com.eomcs.lms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Notice implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int notice_id;
  private int viewcount;
  private String content;
  private String title;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  

  @Override
  public Notice clone() throws CloneNotSupportedException {
    return (Notice) super.clone();
  }



  @Override
  public String toString() {
    return "Notice [notice_id=" + notice_id + ", viewcount=" + viewcount + ", content=" + content
        + ", title=" + title + ", createdDate=" + createdDate + "]";
  }



  public int getNotice_id() {
    return notice_id;
  }



  public void setNotice_id(int notice_id) {
    this.notice_id = notice_id;
  }



  public int getViewcount() {
    return viewcount;
  }

  public void setViewcount(int viewcount) {
    this.viewcount = viewcount;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }



  public Date getCreatedDate() {
    return createdDate;
  }



  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
 
  
  
  
}
