package com.focusr.Precot.mssql.database.model.drygoods;

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
@Table(name = "DRYGOODS_BMR_13_QA_RELEASE", schema = AppConstants.schema)
public class BMR13GoodsQaRelease extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RLS_ID")
	private Long rls_id;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "QA_ID")
	private Long qa_id;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrdetails")
	private List<BMR13GoodsQaReleaseLine> details;

}
