package com.focusr.Precot.Buds.model;

import java.util.Date;
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
import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_EQUIPMENT_USUAGE_HEADER", schema = AppConstants.schema)
public class BudsEquipmentUsuageHeader extends  UserDateAudit {

	@Column(name = "EQUIPMENT_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long equipmentId;
	
	@Column(name = "FORMAT_NAME")
	private String formName;
	
	@Column(name = "FORMAT_NUMBER")
	private String formNumber;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "REJECT_REASON")
	private String rejectReason;
	
		// ONE TABLE FIELDS
	
	@Column(name = "EQUIPMENT_DATE")
	private String equipmentDate;
	
	@Column(name = "EQUIPMENT_SHIFT")
	private String equipmentShift;
	
	
	@Column(name = "SALE_ORDER_NO")
	private String saleOrderNo;
	
		// MAPPINGS 
	
	@OneToMany(targetEntity = BudsEquipmentUsuageLine.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "EQUIPMENT_ID", referencedColumnName = "EQUIPMENT_ID")
	private List<BudsEquipmentUsuageLine> equipmentLine;
	
	@Column(name = "OPERATOR_STATUS")
	private String operator_status;

	@Column(name = "OPERATOR_SAVE_BY")
	private String operator_save_by;

	@Column(name = "OPERATOR_SAVE_ON")
	private Date operator_save_on;

	@Column(name = "OPERATOR_SAVE_ID")
	private Long operator_save_id;

	@Column(name = "OPERATOR_SUBMITTED_BY")
	private String operator_submitted_by;

	@Column(name = "OPERATOR_SUBMITTED_ON")
	private Date operator_submitted_on;

	@Column(name = "OPERATOR_SUBMITTED_ID")
	private Long operator_submitted_id;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// HOD
	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
}
