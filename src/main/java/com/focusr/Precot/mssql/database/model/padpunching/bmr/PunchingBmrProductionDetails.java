package com.focusr.Precot.mssql.database.model.padpunching.bmr;

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
@Table(name = "PUNCHING_BMR_PROD_DETAILS", schema = AppConstants.schema)
public class PunchingBmrProductionDetails extends UserDateAudit {

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
	
	
	@Column(name = "MANUFACTURER_COMPLETION_DATE")
	private String manufactureCompletionDate;
	
	@Column(name = "MANUFACTURER_COMPLETION_TIME")
	private String manufactureCompletionTime;
	
	@Column(name = "MANUFACTURER_END_DATE")
	private String manufactureEndDate;
	
	@Column(name = "MANUFACTURER_END_TIME")
	private String manufactureEndTime;
	
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

	public Long getProductionId() {
		return productionId;
	}

	public void setProductionId(Long productionId) {
		this.productionId = productionId;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	

	public PunchingBmrProductionDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getLotNumber() {
		return lotNumber;
	}

	public void setLotNumber(String lotNumber) {
		this.lotNumber = lotNumber;
	}

	

	public String getManufactureStartDate() {
		return manufactureStartDate;
	}

	public void setManufactureStartDate(String manufactureStartDate) {
		this.manufactureStartDate = manufactureStartDate;
	}

	public String getManufactureStartTime() {
		return manufactureStartTime;
	}

	public void setManufactureStartTime(String manufactureStartTime) {
		this.manufactureStartTime = manufactureStartTime;
	}

	public String getManufactureEndDate() {
		return manufactureEndDate;
	}

	public void setManufactureEndDate(String manufactureEndDate) {
		this.manufactureEndDate = manufactureEndDate;
	}

	public String getManufactureEndTime() {
		return manufactureEndTime;
	}

	public void setManufactureEndTime(String manufactureEndTime) {
		this.manufactureEndTime = manufactureEndTime;
	}

	public String getSupervisiorName() {
		return supervisiorName;
	}

	public void setSupervisiorName(String supervisiorName) {
		this.supervisiorName = supervisiorName;
	}

	public String getSupervisiorStatus() {
		return supervisiorStatus;
	}

	public void setSupervisiorStatus(String supervisiorStatus) {
		this.supervisiorStatus = supervisiorStatus;
	}

	public Long getSupervisiorId() {
		return supervisiorId;
	}

	public void setSupervisiorId(Long supervisiorId) {
		this.supervisiorId = supervisiorId;
	}

	public Date getSupervisiorDate() {
		return supervisiorDate;
	}

	public void setSupervisiorDate(Date supervisiorDate) {
		this.supervisiorDate = supervisiorDate;
	}

	public String getQaStatus() {
		return qaStatus;
	}

	public void setQaStatus(String qaStatus) {
		this.qaStatus = qaStatus;
	}

	public Long getQaId() {
		return qaId;
	}

	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}

	public String getQaName() {
		return qaName;
	}

	public void setQaName(String qaName) {
		this.qaName = qaName;
	}

	public Date getQaDate() {
		return qaDate;
	}

	public void setQaDate(Date qaDate) {
		this.qaDate = qaDate;
	}

	public String getMachine() {
		return machine;
	}

	public void setMachine(String machine) {
		this.machine = machine;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public Integer getPoQuantityBags() {
		return poQuantityBags;
	}

	public void setPoQuantityBags(Integer poQuantityBags) {
		this.poQuantityBags = poQuantityBags;
	}

	public Integer getPoQuantityBoxes() {
		return poQuantityBoxes;
	}

	public void setPoQuantityBoxes(Integer poQuantityBoxes) {
		this.poQuantityBoxes = poQuantityBoxes;
	}

	public Integer getPackedQuantityBags() {
		return packedQuantityBags;
	}

	public void setPackedQuantityBags(Integer packedQuantityBags) {
		this.packedQuantityBags = packedQuantityBags;
	}

	public Integer getPackedQuantityBoxes() {
		return packedQuantityBoxes;
	}

	public void setPackedQuantityBoxes(Integer packedQuantityBoxes) {
		this.packedQuantityBoxes = packedQuantityBoxes;
	}

	public Integer getRemainingQuantityBags() {
		return remainingQuantityBags;
	}

	public void setRemainingQuantityBags(Integer remainingQuantityBags) {
		this.remainingQuantityBags = remainingQuantityBags;
	}

	public Integer getRemainingQuantityBoxes() {
		return remainingQuantityBoxes;
	}

	public void setRemainingQuantityBoxes(Integer remainingQuantityBoxes) {
		this.remainingQuantityBoxes = remainingQuantityBoxes;
	}

	public String getPackDateQtyBag() {
		return packDateQtyBag;
	}

	public void setPackDateQtyBag(String packDateQtyBag) {
		this.packDateQtyBag = packDateQtyBag;
	}

	public String getPackDateQtyBox() {
		return packDateQtyBox;
	}

	public void setPackDateQtyBox(String packDateQtyBox) {
		this.packDateQtyBox = packDateQtyBox;
	}

	public String getPoStatus() {
		return poStatus;
	}

	public void setPoStatus(String poStatus) {
		this.poStatus = poStatus;
	}

	public String getNextBatch() {
		return nextBatch;
	}

	public void setNextBatch(String nextBatch) {
		this.nextBatch = nextBatch;
	}
	
	
	
}
