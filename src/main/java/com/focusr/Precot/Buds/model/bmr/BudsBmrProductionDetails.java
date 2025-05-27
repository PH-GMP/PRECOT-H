package com.focusr.Precot.Buds.model.bmr;

import java.util.Date;

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
@Table(name = "BUDS_BMR_PRODUCTION_DETAILS", schema = AppConstants.schema)
public class BudsBmrProductionDetails extends UserDateAudit{

	@Id
	@Column(name = "PRODUCTION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productionId;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "PRODUCT_DESCRIPTION")
	private String productDescription; 
	
	@Column(name = "MACHINE_NAME")
	private String machine;
	
	@Column(name = "PO_NUMBER")
	private String poNumber;
	
	@Column(name = "ORDER_NO")
	private String orderNumber;
	
	@Column(name = "PRODUCT_CODE")
	private String productCode;
	
	@Column(name = "PO_QUANTITY_BAGS")
	private Integer poQuantityBags;
	
	@Column(name = "PO_QUANTITY_BOXES")
	private Integer poQuantityBoxes;
	
	@Column(name = "BAGS_PACK_QTY")
	private Integer packedQuantityBags;
	
	@Column(name = "BOXES_PACK_QTY")
	private Integer packedQuantityBoxes;
	
	@Column(name = "REMAINING_QTY_BAGS")
	private Integer remainingQuantityBags;
	
	@Column(name = "REMAINING_QTY_BOXES")
	private Integer remainingQuantityBoxes;
	
	@Column(name = "ON_DATE_BAG_QTY")
	private String packDateQtyBag;
	
	@Column(name = "ON_DATE_BOX_QTY")
	private String packDateQtyBox;
	
	@Column(name = "PO_STATUS")
	private String poStatus;
//	
	@Column(name = "LOT_NUMBER")
	private String lotNumber;
	
	@Column(name = "MANUFACTURER_START_DATE")
	private String manufactureStartDate;
	
	@Column(name = "MANUFACTURER_START_TIME")
	private String manufactureStartTime;
	
	@Column(name = "MANUFACTURER_END_DATE")
	private String manufactureEndDate;
	
	@Column(name = "MANUFACTURER_END_TIME")
	private String manufactureEndTime;
	
	@Column(name = "MANUFACTURER_COMPLETION_DATE")
	private String manufactureCompletionDate;
	
	@Column(name = "MANUFACTURER_COMPLETION_TIME")
	private String manufactureCompletionTime;
	
	@Column(name = "SUPERVISIOR_NAME")
	private String supervisiorName;
	
	@Column(name = "SUPERVISIOR_STATUS")
	private String supervisiorStatus;
	
	@Column(name = "SUPERVISIOR_ID")
	private Long supervisiorId;
	
	@Column(name = "SUPERVISIOR_DATE")
	private Date supervisiorDate;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_ID")
	private Long qaId;
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "QA_DATE")
	private Date qaDate;
	
	@Column(name = "NEXT_BATCH")
	private String nextBatch;
	
}
