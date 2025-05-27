package com.focusr.Precot.mssql.database.model.padpunching.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorHod;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY", schema = AppConstants.schema)
public class PadPunchingLogBookBagMakingHistoryF003 extends SaveSubmitOperatorHod{
	
	@Id
	@Column(name = "LOGBOOK_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long logBookId;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNo;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "MACHINE_ALLOCATION_PRODUCTION_DETAIL")
	private String machineAllocationAndProductionDetail;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "MACHINE_NO1")
	private String machineNo1;
	
	@Column(name = "MACHINE_NO2")
	private String machineNo2;
	
	@Column(name = "MANPOWER_ALLOCATION1")
	private String manpowerAllocation1;
	
	@Column(name = "MANPOWER_ALLOCATION2")
	private String manpowerAllocation2;
	
	@Column(name = "ORDER_NO1")
	private String orderNo1;
	
	@Column(name = "ORDER_NO2")
	private String orderNo2;
	
	@Column(name = "ORDER_NO3")
	private String orderNo3;
	
	@Column(name = "ORDER_NO4")
	private String orderNo4;
	
	@Column(name = "PRODUCT_NAME1")
	private String productName1;
	
	@Column(name = "PRODUCT_NAME2")
	private String productName2;
	
	@Column(name = "PRODUCT_NAME3")
	private String productName3;
	
	@Column(name = "PRODUCT_NAME4")
	private String productName4;
	
	@Column(name = "REASON")
	private String reason;

	@Column(name = "VERSION")
	private int version;

	@Column(name = "REMARKS")
	private String remarks;
	

}
