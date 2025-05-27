package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_HAND_SANITIZATION_LIST_HISTORY_F025",schema=AppConstants.schema)
public class SpunlaceHandSanitizationListHistoryF025 {
	
	@Id
	@Column(name = "LIST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long listId;
	
	@Column(name = "SERIAL_NUMBER")
	private int serialNumber;
	
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
	
}
