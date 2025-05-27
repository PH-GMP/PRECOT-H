package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import java.util.Date;

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
@Table(name = "PUNCHING_BMR_PRODUCT_RELEASE", schema = AppConstants.schema)
public class PunchingBmrProductRelease extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRODUCT_ID")
	private Long productId;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "CHECKED_BY")
	private String checkedBy;
	
	@Column(name = "CHECKED_ON")
	private Date checkedOn;
	
	@Column(name = "CHECKER_STATUS")
	private String checkerStatus;
	
	@Column(name = "APPROVED_BY")
	private String approvedBy;
	
	@Column(name = "APPROVED_ON")
	private Date approvedOn;
	
	@Column(name = "APPROVER_STATUS")
	private String appoverStatus;
}
