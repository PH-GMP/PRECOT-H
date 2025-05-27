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
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE","MONTH","YEAR"}) })
public class DistributionAndDestructionRecordF003 extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DISTRUCTION_ID")
	private Long distructionId;	

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NUMBER")
	private String revisionNumber;
	
	//ISSUANCE RECORD
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	
	
//	QA MR
	
	@Column(name = "QA_MR_STATUS")
	private String qa_mr_status;

	@Column(name = "QA_MRSAVE_ON")
	private Date qa_mr_save_on;

	@Column(name = "QA_MR_SAVE_BY")
	private String qa_mr_save_by;

	@Column(name = "QA_MR_SAVE_ID")
	private Long qa_mr_save_id;

	@Column(name = "QA_MR_SUBMIT_ON")
	private Date qa_mr_submit_on;

	@Column(name = "QA_MR_SUBMIT_BY")
	private String qa_mr_submit_by;

	@Column(name = "QA_MR_SUBMIT_ID")
	private Long qa_mr_submit_id;

	@Column(name = "QA_MR_SIGN")
	private String qa_mr_sign;
	
	@Lob
	@Column(name = "QA_MR_SIGNATURE_IMAGE")
	private byte[] qa_mr_signature_image;
	
	@OneToMany(targetEntity = DistributionAndDestructionRecordLinesF003.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "DISTRUCTION_ID", referencedColumnName = "DISTRUCTION_ID")
	private List<DistributionAndDestructionRecordLinesF003> details;
	

}
