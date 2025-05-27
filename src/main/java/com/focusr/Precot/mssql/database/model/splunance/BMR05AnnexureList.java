package com.focusr.Precot.mssql.database.model.splunance;

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
import com.focusr.Precot.util.AppConstants;
import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_05_ANNEXURE", schema = AppConstants.schema)
public class BMR05AnnexureList extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "SUBMITTED_DATE")
	private String submittedDate;

	@Column(name = "VERIFIED_BY")
	private String verifiedBy;

	@Column(name = "BATCH_NO")
	private String batchNo;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrAnnexurRecords05")
	private List<BMR05AnnexureListLine> detailsAnnexureRecords05;

}
