package com.focusr.Precot.Buds.Payload;

import java.util.List;
import java.util.Map;

import com.focusr.Precot.Buds.model.bmr.BudsBmrEnclosureListHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrEquipmentAnnexureHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrManufacturerStepsHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPostProductionReview;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProcessDeviationRecordHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductRelease;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductionDetails;
import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrRework;
import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrVerificationOfRecordsHeader;

import lombok.Data;

@Data
public class BudsBmrPrintRequest {

	private List<BudsBmrProductionDetails> productionDetails;
	
	private List<BudsBmrPackingMaterialHeader> packingMaterialHeaders;
	
	private List<BudsBmrEquipmentAnnexureHeader> equipmentDetails;
	
	private List<BudsBmrVerificationOfRecordsHeader> verificationRecords;
	
	private List<BudsBmrManufacturerStepsHeader> manufactureSteps;
	
	private List<BudsBmrStoppageHeader> stoppageList;
	
	private List<BudsBmrPostProductionReview> postProductionReview;
	
	private List<BudsBmrProcessDeviationRecordHeader> processDeviation;
	
	private List<BudsBmrEnclosureListHeader> enclosureList;
	
	private List<BudsBmrQualityReleaseHeader> qualityRelease;
	
	private List<BudsBmrProductRelease> productRelease;
	
	private List<BudsBmrRework> reworkList;
	
	private Map<String, Object> reconillation;
	
}
