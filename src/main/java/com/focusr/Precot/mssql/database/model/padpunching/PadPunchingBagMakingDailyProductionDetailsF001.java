package com.focusr.Precot.mssql.database.model.padpunching;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SaveSubmitOperatorHod;
import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationListF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT" }) })
public class PadPunchingBagMakingDailyProductionDetailsF001 extends SaveSubmitOperatorHod{
	
	@Id
	@Column(name = "BAG_MAKING_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bagmakingId;
	
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
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "TOTAL_PRODUCTION_DETAILS_IN_BAG")
	private String totalProductionDetailsInBag;
	
	

}
