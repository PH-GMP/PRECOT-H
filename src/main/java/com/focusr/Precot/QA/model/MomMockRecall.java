package com.focusr.Precot.QA.model;

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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.DryGoodsSuperHodSubmit;
import com.focusr.Precot.mssql.database.model.padpunching.MachineDetailsF002;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "MOM_MOC_RECALL_TBL", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "YEAR" }) })
public class MomMockRecall {

	@Id
	@Column(name = "MOM_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mom_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "VENUE")
	private String venue;

	@Column(name = "AGENDA")
	private String agenda;

	@Column(name = "REASON")
	private String reason;

	// MANAGER STATUS

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SAVED_ON")
	private Date manager_saved_on;

	@Column(name = "MANAGER_SAVED_BY")
	private String manager_saved_by;

	@Column(name = "MANAGER_SAVED_ID")
	private Long manager_saved_id;

	@Column(name = "MANAGER_SUBMITTED_ON")
	private Date manager_submitted_on;

	@Column(name = "MANAGER_SUBMITTED_BY")
	private String manager_submitted_by;

	@Column(name = "MANAGER_SUBMITTED_ID")
	private Long manager_submitted_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

	// PLANT HEAD
	@Column(name = "PLANT_HEAD_STATUS")
	private String plant_head_status;

	@Column(name = "PLANT_HEAD_APPROVED_ON")
	private Date plant_head_approved_on;

	@Column(name = "PLANT_HEAD_APPROVED_BY")
	private String plant_head_approved_by;

	@Column(name = "PLANT_HEAD_APPROVER_ID")
	private Long plant_head_approver_id;

	@Column(name = "PLANT_HEAD_SIGN")
	private String plant_head_sign;

//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "momHeader")
//	private List<MomMocKRecallHeader> momHeaderDetails;

	@OneToMany(targetEntity = MomMocKRecallHeader.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "MOM_ID", referencedColumnName = "MOM_ID ")
	private List<MomMocKRecallHeader> momHeaderDetails;
	
	
	


//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "momLines")
//	private List<MomMockRecallLines> momLineDetails;

	@OneToMany(targetEntity = MomMockRecallLines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "MOM_ID", referencedColumnName = "MOM_ID ")
	private List<MomMockRecallLines> momLineDetails;

}
