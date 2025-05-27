package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = " WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY", schema = AppConstants.schema)
public class weighingscalecalibrationreportHistoryCLF007 extends UserDateAudit{
	
	@Id
	@Column(name = "LAB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long lab_id;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "UNIT_H")
	private String unit_h;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "EQ_ID_NO")
	private String eq_id_no;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "TOLERANCE")
	private String tolerance;
	
	private String text;
	
	private String number;
	
	private String number_b;
	
	@Column(name = "BALANCEMAXWEIGHT")
	private String balancemaxweight;
	
	@Column(name = "BALANCEMINWEIGHT")
	private String balanceminweight;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;
	


	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;
	


	
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
	private String qc_sign;
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "weighingscalecalibrationreportCLF007")
	private List<obervationHistoryCLF007> obser;
	

}
