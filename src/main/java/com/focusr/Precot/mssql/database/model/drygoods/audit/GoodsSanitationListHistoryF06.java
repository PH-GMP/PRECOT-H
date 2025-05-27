package com.focusr.Precot.mssql.database.model.drygoods.audit;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;

import com.focusr.Precot.util.AppConstants;


@Entity
@Table(name = "GOODS_HAND_SANITIZATION_LIST_HISTORY_F24", schema=AppConstants.schema)
public class GoodsSanitationListHistoryF06 extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "SERIAL_NUMBER")
	private int serialNumber;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "ID_NUMBER")
	private String idNumber;
	
	@Column(name = "HOUR1")
	private String hour1;
	
	@Column(name = "HOUR2")
	private String hour2;
	
	@Column(name = "HOUR3")
	private String hour3;
	
	@Column(name = "HOUR4")
	private String hour4;
	
	@Column(name = "HOUR5")
	private String hour5;
	
	@Column(name = "HOUR6")
	private String hour6;
	
	@Column(name = "HOUR7")
	private String hour7;
	
	@Column(name = "HOUR8")
	private String hour8;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "HAND_SANITIZATION_ID")
	private Long handSanitizationId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(int serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getHour1() {
		return hour1;
	}

	public void setHour1(String hour1) {
		this.hour1 = hour1;
	}

	public String getHour2() {
		return hour2;
	}

	public void setHour2(String hour2) {
		this.hour2 = hour2;
	}

	public String getHour3() {
		return hour3;
	}

	public void setHour3(String hour3) {
		this.hour3 = hour3;
	}

	public String getHour4() {
		return hour4;
	}

	public void setHour4(String hour4) {
		this.hour4 = hour4;
	}

	public String getHour5() {
		return hour5;
	}

	public void setHour5(String hour5) {
		this.hour5 = hour5;
	}

	public String getHour6() {
		return hour6;
	}

	public void setHour6(String hour6) {
		this.hour6 = hour6;
	}

	public String getHour7() {
		return hour7;
	}

	public void setHour7(String hour7) {
		this.hour7 = hour7;
	}

	public String getHour8() {
		return hour8;
	}

	public void setHour8(String hour8) {
		this.hour8 = hour8;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getHandSanitizationId() {
		return handSanitizationId;
	}

	public void setHandSanitizationId(Long handSanitizationId) {
		this.handSanitizationId = handSanitizationId;
	}
	
	
	
}
