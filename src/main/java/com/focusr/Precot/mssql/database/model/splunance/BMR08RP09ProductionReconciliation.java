package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_08_RP_09_PRODUCTION_RECONCILIATION", schema = AppConstants.schema)
public class BMR08RP09ProductionReconciliation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "INPUT_QUANTITY")
	private String input_quantity;

	@Column(name = "OUTPUT_QUANTITY")
	private String output_quantity;

	@Column(name = "CALCULATION")
	private String calculation;
	
	
	@Column(name = "BATCH_NO")
	private String batchNo;

}
