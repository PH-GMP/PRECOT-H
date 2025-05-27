package com.focusr.Precot.Buds.model.audit;

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

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.BudsDailyProductionStoppageLine;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_DAILY_PRODUCTION_SLIVER_HEAD_HISTORY", schema = AppConstants.schema)
public class BudsDailyProductionSliverHeaderHistory extends UserDateAudit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "FORM_NUMBER")
	private String formNumber;
	
	@Column(name = "FORM_NAME")
	private String formName;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "REJECT_REASON")
	private String rejectReason;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "LAYDOWN_NUMBER")
	private String laydownNumber;
	
		// 1. MACHINE DETAILS
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "MACHINE_DATE")
	private String machineDate;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "ORDER_NUMBER")
	private String orderNumber;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "CUSTOMER_NAME")
	private String customerName;
	
	@Column(name = "STD_WEIGHT")
	private String stdWeight;
	
		// 2. MACHINE PARAMETERS
	
	@Column(name = "GPM")
	private String gpm;
	
	@Column(name = "DRAFT")
	private String draft;
	
	@Column(name = "DOFFER_SPEED")
	private String dofferSpeed;
	
	@Column(name = "SLIVER_LENGTH")
	private String sliverLength;
	
	
		// COMMON 
	
	@Column(name = "TOTAL1")
	private String total1;
	
	@Column(name = "TOTAL2")
	private String total2;
	
	@Column(name = "TOTAL_PRODUCTION")
	private String totalProduction;
	
	@Column(name = "COMPACTOR_WASTE")
	private String compactorWaste;
	
	@Column(name = "SLIVER_WEIGHT")
	private String sliverWeight;
	
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
	
	
		// 3. PERFECT CARD SLIVER PRODUCTION 
	
	@OneToMany(targetEntity = BudsDailyProductionSliverLineHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<BudsDailyProductionSliverLineHistory> sliverLine; 
	
		// 4. STOPPAGE 
	
//	@OneToMany(mappedBy = "stoppage", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<BudsDailyProductionStoppageLineHistory> stoppageDetails;
	
	@OneToMany(targetEntity = BudsDailyProductionStoppageLineHistory.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<BudsDailyProductionStoppageLineHistory> stoppageDetails; 
	
}
