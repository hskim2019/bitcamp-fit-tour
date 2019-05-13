package com.eomcs.lms.domain;

public class LoginType {

	private int no;
	private String typeName;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTypeName() {
    return typeName;
  }
  public void setTypeName(String typeName) {
    this.typeName = typeName;
  }
  @Override
  public String toString() {
    return "LoginType [no=" + no + ", typeName=" + typeName + "]";
  }
	
	
	
}
