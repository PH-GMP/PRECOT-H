package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.dom4j.util.UserDataAttribute;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_DRYGOODS_01_PRODUCTION_DETAILS", schema = AppConstants.schema)
public class BMR001GoodsProductionDetails extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROD_ID")
	private Long prod_id;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "MACHINE_NO")
	private String machine_no;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "START_DATE")
	private String start_date;

	@Column(name = "START_TIME")
	private String start_time;

	@Column(name = "END_DATE")
	private String end_date;

	@Column(name = "END_TIME")
	private String end_time;
	
	
	@Column(name = "MANUFACTURER_COMPLETION_DATE")
	private String manufactureCompletionDate;
	
	@Column(name = "MANUFACTURER_COMPLETION_TIME")
	private String manufactureCompletionTime;
	

	@Column(name = "ISSUED_BY")
	private String issued_by;

	@Column(name = "ISSUED_ON")
	private String issued_on;

	@Column(name = "ISSUED_NAME")
	private String issued_name;

	@Column(name = "RECEIVED_BY")
	private String received_by;

	@Column(name = "RECEIVED_ON")
	private String received_on;

	@Column(name = "RECEIVED_NAME")
	private String received_name;

	// new

	@Column(name = "PO_NO")
	private String po_no;

	@Column(name = "PROD_DESC")
	private String prod_desc;

	@Column(name = "PROD_CODE")
	private String prod_code;

	@Column(name = "PO_QTY_BAG")
	private String po_qty_bag;

	@Column(name = "FAR_QTY_BAG")
	private String far_qty_bag;

	@Column(name = "REM_QTY_BAG")
	private String rem_qty_bag;

	@Column(name = "ON_DATE_PACK")
	private String on_date_pack;

	@Column(name = "PO_COMP_STATUS")
	private String po_comp_status;

	//

	@Column(name = "PO_QTY_BOX")
	private String po_qty_box;

	@Column(name = "FAR_QTY_BOX")
	private String far_qty_box;

	@Column(name = "REM_QTY_BOX")
	private String rem_qty_box;

	@Column(name = "ON_DATE_BOX")
	private String on_date_box;

	@Column(name = "PO_COMP_BOX")
	private String po_comp_box;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;
	
	@Column(name = "NEXT_BATCH")
	private String nextBatch;
}
