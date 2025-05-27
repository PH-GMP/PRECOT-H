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
@Table(name = "SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE", schema = AppConstants.schema)
public class BMR14RP15ProductRelease {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "CHK_QA_NAME")
	private String chk_qa_name;

	@Column(name = "CHK_QA_DATE")
	private String chk_qa_date;

	@Column(name = "CHK_QA_TIME")
	private String chk_qa_time;

	@Column(name = "CHK_QA_SIGN")
	private String chk_qa_sign;

	@Column(name = "APR_QA_NAME")
	private String apr_qa_name;

	@Column(name = "APR_QA_DATE")
	private String apr_qa_date;

	@Column(name = "APR_QA_TIME")
	private String apr_qa_time;

	@Column(name = "APR_QA_SIGN")
	private String apr_qa_sign;
	
	
	@Column(name = "BATCH_NO")
	private String batchNo;

}
