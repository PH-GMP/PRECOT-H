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
import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
import com.focusr.Precot.mssql.database.model.drygoods.FinishedGoodsTransferRecordLineF011;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_FINISHED_GOODS_TRANSFER_RECORD_LINE_F011_HISTORY", schema = AppConstants.schema
	)
public class FinishedGoodsTransferRecordLineHistoryF011 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_GOODS_ID")
	private Long line_goods_id;
	
	@Column(name = "PO_NO")
	private String po_no;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "MATERIAL_CODE_NO")
	private String material_code_no;

	@Column(name = "NO_OF_BOX_IN_PALLET")
	private String no_of_boxes_in_pallet;

	@Column(name = "NO_OF_PALLET")
	private String no_of_pallet;

	@Column(name = "TOTAL_BOX")
	private String total_box;

	@Column(name = "FG_NAME")
	private String fg_name;
	
	@Column(name = "FINISHED_GOODS_ID")
	private Long finished_goods_id;
	
	  @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "FINISHED_GOODS_ID", insertable = false, updatable = false)
	    @JsonIgnore
	    private BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 ballPleateAndWoolRollFinishedhistory;
}
