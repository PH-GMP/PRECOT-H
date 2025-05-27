package com.focusr.Precot.mssql.database.model.padpunching.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SaveSubmitSupervisorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PRODUCTION_DETAILS_LOG_BOOK_F01_HISTORY", schema = AppConstants.schema)

public class ProductionDetailsLogBookHistory01 extends SaveSubmitSupervisorHod {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROD_ID")
	private Long prod_id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	// CONTENT

	@Column(name = "MACHINE_NAME")
	private String machine_name;

	@Column(name = "MAN_POWER_ALLOCATION")
	private String man_power_allocation;

	@Column(name = "RUNNING_PRODUCT_NAME")
	private String running_product_name;

	@Column(name = "NEXT_PRODUCT_NAME")
	private String next_product_name;

	@Column(name = "RUNNING_ORDER_NO")
	private String running_order_no;

	@Column(name = "NEXT_ORDER_NO")
	private String next_order_no;

	@Column(name = "RUNNING_PO_NUMBER")
	private String running_po_number;

	@Column(name = "NEXT_PO_NUMBER")
	private String next_po_number;

	@Column(name = "RUNNING_OPENING_QTY")
	private Long running_opening_qty;

	@Column(name = "NEXT_OPENING_QTY")
	private Long next_opening_qty;

	@Column(name = "RUNNING_PACKED_QTY")
	private Long running_packed_qty;

	@Column(name = "NEXT_PACKED_QTY")
	private Long next_packed_qty;

	@Column(name = "RUNNING_BALANCR_QTY")
	private Long running_balancr_qty;

	@Column(name = "NEXT_BALANCE_QTY")
	private Long next_balance_qty;

	@Column(name = "RUNNING_STATUS")
	private String running_status;

	@Column(name = "NEXT_STATUS")
	private String next_status;

	@Column(name = "PH_MALE_EMP_REQ")
	private Long ph_male_emp_req;

	@Column(name = "PH_MALE_PRESENT")
	private Long ph_male_present;

	@Column(name = "PH_FEMALE_EMP_REQ")
	private Long ph_female_emp_req;

	@Column(name = "PH_FEMALE_PRESENT")
	private Long ph_female_present;

	@Column(name = "CONT_MALE_EMP_REQ")
	private Long cont_male_emp_req;

	@Column(name = "CON_MALE_PRESENT")
	private Long con_male_present;

	@Column(name = "CON_FEMALE_EMP_REQ")
	private Long con_female_emp_req;

	@Column(name = "CON_FEMALE_PRESENT")
	private Long con_female_present;

	@Column(name = "REMARKS")
	private String remarks;	
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
}
