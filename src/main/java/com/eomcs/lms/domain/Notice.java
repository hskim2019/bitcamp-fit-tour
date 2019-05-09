package com.eomcs.lms.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Notice implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int viewcount;
  private String content;
  private String title;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
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

  @Override
  public String toString() {
    return "Notice [no=" + no + ", viewcount=" + viewcount + ", content=" + content + ", title="
        + title + ", createdDate=" + createdDate + "]";
  }

 
 
  
  
  
}
