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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "DRYGOODS_BMR_10_PROCESS_DELAY_EQUP_LINE", schema = AppConstants.schema)
public class BMR10GoodsProcessDelayEqupmentLine extends UserDateAudit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "PROCESS_ID")
	private Long process_id;

	@Column(name = "DATE")
	private String date;

	@Column(name = "FROM_HOUR")
	private String from_hour;

	@Column(name = "TO_HOUR")
	private String to_hour;

	@Column(name = "TOTAL_HOUR")
	private String total_hour;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "SIGN")
	private String sign;

	@Column(name = "SIGN_DATE")
	private String sign_date;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PROCESS_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR10GoodsProcessDelayEqupment delayDetails;

}
