package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.focusr.Precot.mssql.database.model.SpulanceApprovalOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPL_BALE_CONSUMPTION_HISTORY_F01", schema = AppConstants.schema)
public class SplunanceBaleConsumptionHistoryF01 extends SpulanceApprovalOperator {

	@Id
	@Column(name = "SB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sb_id;

	@JsonProperty("form_name")
	@Column(name = "FORM_NAME")
	private String formName;

	@JsonProperty("format_no")
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@JsonProperty("revision_no")
	@Column(name = "REVISION_NO")
	private String revisionNo;

	@JsonProperty("sop_number")
	@Column(name = "SOP_NUMBER")
	private String sopNumber;

	@JsonProperty("date")
	@Column(name = "DATE")
	private String date;

	@JsonProperty("shift")
	@Column(name = "SHIFT")
	private String shift;

	@JsonProperty("order_number")
	@Column(name = "ORDER_NO")
	private String orderNumber;
	
	@Column(name = "TOTAL_AB_WEIGHT")
	private String totalABWeight;
	
	@Column(name = "TOTAL_RP_WEIGHT")
	private String totalRpWeight;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
}
