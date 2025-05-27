package com.focusr.Precot.mssql.database.model.splunance;

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

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_RPB_10_PROCESS_DEV_RECORD", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "ORDER_NO", "FORM_NO", }) })
public class RPB10ProcessDevRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DEV_ID")
	private Long dev_id;

	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "STATUS")
	private String status;
	
	// NEW
	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrDetailRecords10")
	private List<RPB10ProcessDevReocrdLine> detailsRecords10;

}
