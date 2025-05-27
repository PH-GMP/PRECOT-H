package com.focusr.Precot.mssql.database.model.drygoods;

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
@Table(name = "DRYGOODS_BMR_12_POST_PROD_REVIEW", schema = AppConstants.schema)
public class BMR12GoodsPostProdReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "SUP_SIGN")
	private String sup_sign;

	@Column(name = "SUP_DATE")
	private String sup_date;

	@Column(name = "SUP_TIME")
	private String sup_time;

	@Column(name = "DESIGNEE_SIGN")
	private String designee_sign;

	@Column(name = "DESIGNEE_DATE")
	private String designee_date;

	@Column(name = "DESIGNEE_TIME")
	private String designee_time;

	@Column(name = "QA_SIGN")
	private String qa_sign;

	@Column(name = "QA_DATE")
	private String qa_date;

	@Column(name = "QA_TIME")
	private String qa_time;
	
	//NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;
	
	@Column(name = "HOD_ID")
	private Long hod_id;

}
