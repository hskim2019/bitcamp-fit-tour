package com.eomcs.lms.domain;

import java.sql.Date;

public class FittourMember {
	
	private String no;
	private int loginNo;
	private String email;
	private String password;
	private String name;
	private String nickname;
	private Date birth;
	private boolean smsCheck;
	private boolean emailCheck;
	private String tel;
	private Date registeredDate;
	private boolean phoneVerification;
	private int rank;
	
	@Override
	public String toString() {
		return "FittourMember [no=" + no + ", loginNo=" + loginNo + ", email=" + email + ", password=" + password
				+ ", name=" + name + ", nickname=" + nickname + ", birth=" + birth + ", smsCheck=" + smsCheck
				+ ", emailCheck=" + emailCheck + ", tel=" + tel + ", registeredDate=" + registeredDate
				+ ", phoneVerification=" + phoneVerification + ", rank=" + rank + "]";
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public int getLoginNo() {
		return loginNo;
	}
	public void setLoginNo(int loginNo) {
		this.loginNo = loginNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public boolean isSmsCheck() {
		return smsCheck;
	}
	public void setSmsCheck(boolean smsCheck) {
		this.smsCheck = smsCheck;
	}
	public boolean isEmailCheck() {
		return emailCheck;
	}
	public void setEmailCheck(boolean emailCheck) {
		this.emailCheck = emailCheck;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public Date getRegisteredDate() {
		return registeredDate;
	}
	public void setRegisteredDate(Date registeredDate) {
		this.registeredDate = registeredDate;
	}
	public boolean isPhoneVerification() {
		return phoneVerification;
	}
	public void setPhoneVerification(boolean phoneVerification) {
		this.phoneVerification = phoneVerification;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	
	

}
