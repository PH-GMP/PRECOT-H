package com.focusr.Precot.mssql.database.model.drygoods.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
import com.focusr.Precot.mssql.database.model.drygoods.SliverReceiptDetailsF003;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY", schema = AppConstants.schema
	)
public class BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "FINISHED_GOODS_ID")
		private Long finished_goods_id;
		@Column(name = "UNIT")
		private String unit;

		@Column(name = "FORMAT_NO")
		private String formatNo;

		@Column(name = "FORMAT_NAME")
		private String formatName;

		@Column(name = "SOP_NO")
		private String sopNumber;

		@Column(name = "REVISION_NO")
		private String revisionNo;


		@Column(name = "DATE")
		private String date;

		@Column(name = "SHIFT")
		private String shift;

//		@Column(name = "PO_NO")
//		private String po_no;
//
//		@Column(name = "PRODUCT_NAME")
//		private String product_name;
//
//		@Column(name = "MATERIAL_CODE_NO")
//		private String material_code_no;
//
//		@Column(name = "NO_OF_BOX_IN_PALLET")
//		private String no_of_boxes_in_pallet;
//
//		@Column(name = "NO_OF_PALLET")
//		private String no_of_pallet;
//
//		@Column(name = "TOTAL_BOX")
//		private String total_box;
//
//		@Column(name = "FG_NAME")
//		private String fg_name;
		
		
		@Column(name = "VERSION")
		private int version;

		// SUPERVISOR
		@Column(name = "SUPERVISOR_STATUS")
		private String supervisor_status;

		@Column(name = "SUPERVISOR_SAVE_ON")
		private Date supervisor_save_on;

		@Column(name = "SUPERVISOR_SAVE_BY")
		private String supervisor_save_by;

		@Column(name = "SUPERVISOR_SAVE_ID")
		private Long supervisor_save_id;

		@Column(name = "SUPERVISOR_SUBMIT_ON")
		private Date supervisor_submit_on;

		@Column(name = "SUPERVISOR_SUBMIT_BY")
		private String supervisor_submit_by;

		@Column(name = "SUPERVISOR_SUBMIT_ID")
		private Long supervisor_submit_id;

		@Column(name = "SUPERVISOR_SIGN")
		private String supervisor_sign;
		
		@OneToMany(mappedBy = "ballPleateAndWoolRollFinishedhistory", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	    private List<FinishedGoodsTransferRecordLineHistoryF011> finishedLineshistory;
}
