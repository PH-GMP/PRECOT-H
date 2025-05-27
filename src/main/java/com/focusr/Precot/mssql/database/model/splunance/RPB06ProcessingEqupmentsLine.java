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
@Table(name = "SPUNLACE_RPB_04_PACKING_DETAILS_LINE", schema = AppConstants.schema)
public class RPB06ProcessingEqupmentsLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "EQUP_ID")
	private Long equp_id;

	@Column(name = "EQUP_NAME")
	private String equp_name;

	@Column(name = "EQUP_CODE")
	private String equp_code;

	@Column(name = "DATE_CALIBRATION")
	private String date_calibration;

	@Column(name = "CALIBRATION_DUE_ON")
	private String calibration_due_on;

	@Column(name = "CHECKED_BY_DATE")
	private String checked_by_date;

	@Column(name = "CHECKED_BY_SIGN")
	private String checked_by_sign;

	@Column(name = "CHECKED_BY_NAME")
	private String checked_by_name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EQUP_ID", insertable = false, updatable = false)
	@JsonIgnore
	private RPB06ProcessingEqupments bmrDetailRecords06;

}
