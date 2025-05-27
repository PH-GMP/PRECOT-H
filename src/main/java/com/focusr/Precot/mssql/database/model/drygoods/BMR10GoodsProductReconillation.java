package com.focusr.Precot.mssql.database.model.drygoods;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR_10_RECONILLATION", schema = AppConstants.schema)
public class BMR10GoodsProductReconillation extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;
	
	@Column(name = "INPUT_QUANTITY")
	private String input_quantity;

	@Column(name = "OUTPUT_QUANTITY")
	private String output_quantity;

	@Column(name = "YIELD_QUANTITY")
	private String yield_quantity;
	
}
