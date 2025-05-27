package com.focusr.Precot.mssql.database.model.Qc;

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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021", schema = AppConstants.schema)
public class Qc_MediaGrowthPromotionTestReportF021 extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "SNO")
	private Long sno;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;

	@Column(name = "INCUBATION_START_ON")
	private String incubationStartOn;

	@Column(name = "MICROBIOLOGIST_STATUS")
	private String microbiologist_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ON")
	private Date microbiologist_submit_on;

	@Column(name = "MICROBIOLOGIST_SUBMIT_BY")
	private String microbiologist_submit_by;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ID")
	private Long microbiologist_submit_id;

	@Column(name = "MICROBIOLOGIST_SIGN")
	private String microbiologist_sign;
	
	@Column(name = "MANAGER_STATUS")
	private String manager_status;
 
	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;
 
	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;
 
	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;
 
	@Column(name = "MANAGER_SIGN")
	private String manager_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "mediaGrowthPromotionTestReportF021")
    private List<MediaGrowthDetails> details;
	
}
