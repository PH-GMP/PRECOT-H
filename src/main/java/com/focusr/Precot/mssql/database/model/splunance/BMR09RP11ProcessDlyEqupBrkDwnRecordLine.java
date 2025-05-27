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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_09_RP_11_EQUP_BREAK_DOWN_RECORD_LINE", schema = AppConstants.schema)
public class BMR09RP11ProcessDlyEqupBrkDwnRecordLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	
	@Column(name = "ID")
	private Long id;

	@Column(name = "PROD_DATE")
	private String prod_date;

	@Column(name = "PROD_TIME")
	private String prod_time;

	@Column(name = "PROD_NAME")
	private String prod_name;

	@Column(name = "PROD_SIGN")
	private String prod_sign;

	//
	@Column(name = "PDE_DATE")
	private String pde_date;

	@Column(name = "PDE_FROM_HR")
	private String pde_from_hr;

	@Column(name = "PDE_TO_HR")
	private String pde_to_hr;

	@Column(name = "PDE_TOTAL_HR")
	private String pde_total_hr;

	@Column(name = "REMARKS")
	private String remarks;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR09RP11ProcessDlyEqupBrkDwnRecord bmrstoppagedetails;

}
