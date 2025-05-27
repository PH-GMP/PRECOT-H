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

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_RPB_08_MANUFACTURE_STEPS", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "ORDER_NO", "FORM_NO", }) })
public class RPB08ManufactureSteps  extends SpunlaceSummerySubmit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MFS_ID")
	private Long mfs_id;

	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "SDT1")
	private String sdt1;

	@Column(name = "SDT2")
	private String sdt2;

	@Column(name = "SDT3")
	private String sdt3;

	@Column(name = "OBSERVATION1")
	private String observation1;

	@Column(name = "OBSERVATION2")
	private String observation2;

	@Column(name = "OBSERVATION3")
	private String observation3;
	
	@Column(name = "OBSERVATION4")
	private String observation4;

	@Column(name = "DONE_BY_DATE")
	private String done_by_date;

	@Column(name = "DONE_BY_SIGN")
	private String done_by_sign;

	@Column(name = "DONE_BY_NAME")
	private String done_by_name;

	@Column(name = "CHECKED_BY_DATE")
	private String checked_by_date;

	@Column(name = "CHECKED_BY_SIGN")
	private String checked_by_sign;

	@Column(name = "CHECKED_BY_NAME")
	private String checked_by_name;

}
