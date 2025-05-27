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
@Table(name = "SPUNLACE_BMR_03_PACKING_METERIAL_ISSUE", schema = AppConstants.schema)
public class BMR03PackingMeterialIssue extends UserDateAudit {

	@Id
	@Column(name = "PCK_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pck_id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "SUB_BATCH_NO")
	private String subBatch_no;
	
	@Column(name = "BATCH_NO")
	private String batchNo;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrRecords03")
	private List<BMR03PackingMeterialIssueList> detailsRecords03;

}
