package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Table(name = "PHYSICAL_AND_CHEMICAL_LAB_SAMPLE ", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE"}) })
@Entity
@Data
public class physicalchemalLabCLF001 extends UserDateAudit {

	@Id
	@Column(name = "LAB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lab_id;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "DESCRIPTION_MATERIAL")
	private String description_material;
	
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "SAMPLE_GIVEN")
	private String sample_given;
	
	@Column(name = "SAMPLE_RECEIVED")
	private String sample_received;
	
	@Column(name = "SAMPLE_DONE")
	private String sample_done;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "QC_STATUS")
	private String hod_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long hod_submit_id;
	
	@Column(name = "chemist_STATUS")
	private String chemist_status;

	@Column(name = "chemist_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "chemist_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "chemist_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "chemist_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "chemist_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "chemist_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "chemist_SIGN")
	private String chemist_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "QC_SIGN")
	private String hod_sign;
}
