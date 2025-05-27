package com.focusr.Precot.payload.padpunching;

import java.util.List;
import java.util.Map;

import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEnclosureList;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrPostProductionReview;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductRelease;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrVerificationOfRecords;

import lombok.Data;

@Data
public class PadPunchingBmrRequest {

	private List<PunchingBmrProductionDetails> productionDetails;
	
	private List<PunchingBmrProductRelease> productRelease;
	
	private List<PunchingBmrVerificationOfRecords> verificationOfRecords;
	
	private List<PunchingBmrPostProductionReview> postProductionReview;
	
	private List<PunchingBmrEquipmentDetails> equipmentDetails;
	
	private List<PunchingBmrEnclosureList> enclosureList;
	
	private List<PunchingBmrProcessDeviationRecordHeader> deviationRecord;
	
	private List<PunchingBmrStoppageHeader> stoppage;
	
	private List<PunchingBmrManufacturingSteps> manufactureSteps;
	
	private List<PunchingBmrQualityReleaseHeader> qualityRelease;
	
	private List<DailyProductionDetailsBmrResponse> dailyProductionDetailsBmrResponses;
	
	private Map<String, String> reconillation;
	
	private List<BMR03GoodsPackingMeterialIssue> packingMaterial;
	
	private List<BudsBmrRework> reworkList;
}
