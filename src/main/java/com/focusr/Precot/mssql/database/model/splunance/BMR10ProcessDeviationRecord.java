package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_10_DEVIATION_RECORD", schema = AppConstants.schema)
public class BMR10ProcessDeviationRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "DEVIATION_LOG_NO_01")
	private String deviation_log_no_01;

	@Column(name = "REMARKS_01")
	private String remarks_01;

	@Column(name = "QA1_DATE_01")
	private String qa1_date_01;

	@Column(name = "QA1_SIGN_01")
	private String qa1_sign_01;

	@Column(name = "QA1_DATE_02")
	private String qa1_date_02;

	@Column(name = "QA1_SIGN_02")
	private String qa1_sign_02;

	//

	@Column(name = "DEVIATION_LOG_NO_02")
	private String deviation_log_no_02;

	@Column(name = "REMARKS_02")
	private String remarks_02;

	@Column(name = "QA2_DATE_01")
	private String qa2_date_01;

	@Column(name = "QA2_SIGN_01")
	private String qa2_sign_01;

	@Column(name = "QA2_DATE_02")
	private String qa2_date_02;

	@Column(name = "QA2_SIGN_02")
	private String qa2_sign_02;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;
	
	@Column(name = "BATCH_NO")
	private String batchNo;

}
