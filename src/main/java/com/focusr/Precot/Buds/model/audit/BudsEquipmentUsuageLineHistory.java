package com.focusr.Precot.Buds.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.Buds.util.AppConstantsBuds;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_EQUIPMENT_USUAGE_LINE_HISTORY", schema = AppConstants.schema)
public class BudsEquipmentUsuageLineHistory extends UserDateAudit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "OPEN_QUANTITY")
	private String openQuantity;
	
	@Column(name = "PROD_QUANTITY")
	private String prodQuantity;
	
	@Column(name = "BALANCE_QUANTITY")
	private String balanceQuantity;
	
	@Column(name = "START_OPERATION")
	private String startOperation;
	
	@Column(name = "END_OPERATION")
	private String endOperation;
	
	@Column(name = "START_CLEANING")
	private String startCleaning;
	
	@Column(name = "END_CLEANING")
	private String endCleaning;
	
	
	@Column(name = "START_BREAKDOWN")
	private String startBreakdown;
	
	@Column(name = "END_BREAKDOWN")
	private String endBreakdown;
	
	@Column(name = "PRODUCTION_ORDER")
	private String productionOrder;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
		// MAPPINGS 
	
	@Column(name = "EQUIPMENT_ID")
	private Long equipmentId;
	
}
