package com.focusr.Precot.Buds.model.bmr;

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
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_BMR_MATERIAL_LINE", schema = AppConstants.schema)
public class BudsBmrPackingMaterialLine extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long Id;

	@Column(name = "PACK_ID")
	private Long pack_id;

	@Column(name = "S_NO")
	private String s_no;

	@Column(name = "DATE")
	private String date;

	@Column(name = "PACKING_BATCH_NO")
	private String packing_batch_no;

	@Column(name = "NAME_OF_THE_METERIAL")
	private String name_of_the_meterial;

	@Column(name = "QTY")
	private String qty;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PACK_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BudsBmrPackingMaterialHeader goodsPackDetails;
	
}
