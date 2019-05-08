package com.eomcs.lms.domain;

public class LoginType {

	private int no;
	private String loginType;
	
	@Override
	public String toString() {
		return "LoginType [no=" + no + ", loginType=" + loginType + "]";
	}
	
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getLoginType() {
		return loginType;
	}
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}
	
}
