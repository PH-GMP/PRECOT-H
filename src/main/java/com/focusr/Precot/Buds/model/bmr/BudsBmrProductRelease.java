package com.focusr.Precot.Buds.model.bmr;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_PRODUCT_RELEASE", schema = AppConstants.schema)
public class BudsBmrProductRelease extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "CHECKER_NAME")
	private String checkerName;
	
	@Column(name = "CHECKER_DATE")
	private String checkerDate;
	
	@Column(name = "CHECKER_SIGN")
	private String checkerSign;
	
	@Column(name = "APPROVER_NAME")
	private String approverName;
	
	@Column(name = "APPROVER_DATE")
	private String approverDate;
	
	@Column(name = "APPROVER_SIGN")
	private String approverSign;
	
	@Column(name = "CHECKER_STATUS")
	private String checkerStatus;
	
	@Column(name = "APPROVER_STATUS")
	private String approverStatus;
	
}
