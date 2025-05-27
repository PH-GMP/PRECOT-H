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

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.SaveSubmitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_CARD", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "EMPLOYEE_NO", "DEPARTMENT" }) })
public class QaTrainingCard extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CARD_ID")
	private Long card_id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "EMPLOYEE_NAME")
	private String employeeName;

	@Column(name = "TRAINING_CARD_NO")
	private String trainingCardNo;

	@Column(name = "ISSUED_BY")
	private String issuedBy;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "EMPLOYEE_NO")
	private String employeeNo;

	@Column(name = "DESIGNATION")
	private String designation;

	@Column(name = "DATE_OF_JOINING")
	private String dateOfJoining;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;

	// status
	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_SAVE_ON")
	private Date hodSaveOn;

	@Column(name = "HOD_SAVE_BY")
	private String hodSaveBy;

	@Column(name = "HOD_SAVE_ID")
	private Long hodSaveId;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hodSubmitOn;

	@Column(name = "HOD_SUBMIT_BY")
	private String hodSubmitBy;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hodSubmitId;

	@Column(name = "HOD_SIGN")
	private String hodSign;

	@OneToMany(targetEntity = QaTrainingCardDetails.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "CARD_ID", referencedColumnName = "CARD_ID")
	private List<QaTrainingCardDetails> details;

}
