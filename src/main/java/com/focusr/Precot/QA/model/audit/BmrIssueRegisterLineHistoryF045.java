package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_BMR_ISSUE_REGISTER_LINE_HISTORY_FO39", schema = AppConstants.schema)
public class BmrIssueRegisterLineHistoryF045 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "SNO")
	private String sNo;
	
	@Column(name = "DATE")
	private String bmrDate;
	
	@Column(name = "DEPARTMENT_NAME")
	private String departmentNameLine;
	
	@Column(name = "NOOF_BMR")
	private String noOfBmr;
	
	@Column(name = "ISSUEDBY")
	private String issuedBy;
	
	@Column(name = "RECEIVEDBY")
	private String receivedBy;	
	
	@Column(name = "HISTORY_ID")
	private Long historyId;
}
