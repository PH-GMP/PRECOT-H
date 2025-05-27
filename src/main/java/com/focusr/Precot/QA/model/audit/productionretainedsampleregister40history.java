package com.focusr.Precot.QA.model.audit;

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

import com.focusr.Precot.QA.repository.audit.MinutesOfMRMLinesHistory;
import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY", schema = AppConstants.schema)
@Data
public class productionretainedsampleregister40history extends DateAudit{

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "FORMAT")
	private String format;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
    @Column(name = "SAMPLE_RETAINED_BY")
    private String sampleRetainedBy;

    @Column(name = "APPROVED_BY")
    private String approvedBy;
	
	@Column(name = "INS_SAVED_ON")
	private Date ins_saved_on;

	@Column(name = "INS_SAVED_BY")
	private String ins_saved_by;

	@Column(name = "INS_SAVED_ID")
	private Long ins_saved_id;
	
	@Column(name = "INS_STATUS")
	private String ins_status;
	
	
	@Column(name = "INS_SIGN")
	private String ins_sign;

	@Column(name = "INS_SUBMIT_ON")
	private Date ins_submit_on;

	@Column(name = "INS_SUBMIT_BY")
	private String ins_submit_by;

	@Column(name = "INS_SUBMIT_ID")
	private Long ins_submit_id;
    
    @Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "QC_SIGN")
	private String qc_sign;
	
	@Column(name = "ISSUE_STATUS")
	private String issue_status;
	
	@Column(name = "version")
	private int version;
	

	@Column(name = "REASON")
	private String reason;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "productionretainedsampleregister40")

	private List<productionretainedsampleregisterHistorychild1> productionSampleA;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "productionretainedsampleregister40")
//	@JoinColumn(name = "TEST_ID", referencedColumnName = "TEST_ID")RESH, mappedBy = "productionretainedsampleregister40")

	private List<productionretainedsampleregisterHistorychild2> productionSampleB;
	
}
