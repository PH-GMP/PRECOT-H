package com.focusr.Precot.Buds.Payload;

import java.util.List;


import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialHeader;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductionDetails;
import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;

import lombok.Data;

@Data
public class BudsTraceabilityRequest {

	private BudsBmrProductionDetails productionDetails;
	
	private List<BudsBmrPackingMaterialHeader> packingMaterial;
	
//	private List<BudsDailyProductionSliverLine> sliverLine;
//	
//	private List<SliverMakingLines> sliverMakingLine;
	
	private List<BudsTraceabilitySliverLineDTO> sliverLines;
	
	private List<QaOnlineInspectionReport> onlineInspection;
	
	private List<FinalInspectionReportF037> finalInspectionReport;
	
	private List<FinalInspectionReportF037> finalInspectionBudsReport;
	
	private List<BudsBaleRequest> baleRequest;
	
	private List<List<BmrSummary>> chemicalDetails;
	
}
