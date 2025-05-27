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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_PLAN_PROD_DETAILS", schema = AppConstants.schema)
public class LogBookPlanProdDetails {

	@Id
	@Column(name = "PLN_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pln_id;

	@Column(name = "LOG_ID")
	private Long log_id;

	@Column(name = "MACINE_NAME")
	private String macine_name;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "PROD_NAME")
	private String prod_name;

	@Column(name = "ORDER_QTY")
	private String order_qty;

	@Column(name = "BAG")
	private String bag;

	@Column(name = "BOX")
	private String box;

	@Column(name = "PROD_BLNC_QTY")
	private String prod_blnc_qty;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LOG_ID", referencedColumnName = "LOG_ID", insertable = false, updatable = false)
	@JsonIgnore
	private LogBookHeader planProdDetails;

}
