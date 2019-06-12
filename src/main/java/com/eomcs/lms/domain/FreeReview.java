package com.eomcs.lms.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class FreeReview {
	private int no;
	private int memberNo;
	private int reservationNo;
	private String title;
	private String content;
	private int viewCount;
	public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	  private Date createdDate;//여행일	
	
	private Member member;
	
	
	public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
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
	public int getReservationNo() {
		return reservationNo;
	}
	public void setReservationNo(int reservationNo) {
		this.reservationNo = reservationNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
  @Override
  public String toString() {
    return "FreeReview [no=" + no + ", memberNo=" + memberNo + ", reservationNo=" + reservationNo
        + ", title=" + title + ", content=" + content + ", viewCount=" + viewCount
        + ", createdDate=" + createdDate + ", member=" + member + "]";
  }
	
	
}

