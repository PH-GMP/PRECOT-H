package com.focusr.Precot.mssql.database.model.drygoods.audit;

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
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookPlanProdDetails;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_PLAN_PROD_DETAILS_HISTORY", schema = AppConstants.schema)
public class LogBookPlanProdDetailsHistory {
	@Id
	@Column(name = "LINE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long line_id;

	@Column(name = "HISTORY_ID")
	private Long history_id;

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
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID", insertable = false, updatable = false)
	@JsonIgnore
	private LogBookHeaderHistory planProdDetails;
}
