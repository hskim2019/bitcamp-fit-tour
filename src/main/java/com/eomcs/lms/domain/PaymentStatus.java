package com.eomcs.lms.domain;

public class PaymentStatus {

	private int no;//상태번호
	private String status;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  @Override
  public String toString() {
    return "PaymentStatus [no=" + no + ", status=" + status + "]";
  }
	
	
 
	
	
}
