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
@Table(name = "DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE", schema = AppConstants.schema)
public class BMR03GoodsPackingMeterialIssue extends UserDateAudit {

	@Id
	@Column(name = "PACK_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pack_id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "FORM_NO")
	private String form_no;
	
	//NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "goodsPackDetails")
	private List<BMR03GoodsPackingMeterialIssueLine>pckdetails;

}
