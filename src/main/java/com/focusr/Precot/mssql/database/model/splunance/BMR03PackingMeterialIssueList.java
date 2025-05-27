package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_03_PACKING_METERIAL_ISSUE_LINES", schema = AppConstants.schema)
public class BMR03PackingMeterialIssueList extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "PCK_ID")
	private Long pck_id;

	@Column(name = "PARTICULARS")
	private String particulars;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "QUANTITY")
	private String quantity;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PCK_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR03PackingMeterialIssue bmrRecords03;

}
