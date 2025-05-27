package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR_09_PROCESS_DEV_RECORD_LINE", schema = AppConstants.schema)
public class BMR09GoodsProcessDevReocrdLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DEV_ID")
	private Long dev_id;
	
	@Column(name = "STEP_NO")
	private String step_no;

	@Column(name = "DEVIATION")
	private String deviation;

	@Column(name = "SIGNATURE")
	private String signature;

	@Column(name = "QA_REMARKS")
	private String qa_remarks;

	@Column(name = "SIG_DATE")
	private String sig_date;
	
	
	//
	
	@Column(name = "SIGNATURE2")
	private String signature2;

	@Column(name = "SIG_DATE2")
	private String sig_date2;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DEV_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR09GoodsProcessDevRecord bmrDevDetailRecords;

}
