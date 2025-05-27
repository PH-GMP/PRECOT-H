package com.focusr.Precot.payload.spulance;

import java.util.List;
import java.util.Map;

import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.BMR03PackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureList;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.BMR07ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;
import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR10ProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR11ListsOfEnclosures;
import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.model.splunance.RP02AnnexerInputDetailsProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB04PackingMeterialDetails;
import com.focusr.Precot.mssql.database.model.splunance.RPB06ProcessingEqupments;
import com.focusr.Precot.mssql.database.model.splunance.RPB08ManufactureSteps;
import com.focusr.Precot.mssql.database.model.splunance.RPB10ProcessDevRecord;
import com.focusr.Precot.mssql.database.model.splunance.RPB12ListOfEnclouser;

import lombok.Data;

@Data
public class RPB02ProdDetailsResponsePrint {

	private List<BMR01RP01ProductionDetails> rpb01productiondetails;
	private List<Map<String, Object>> rpb01productiondetailsSap;
	private	List<RP02AnnexerInputDetailsProductionDetails> rp02annexerinputdetailsproductiondetails;
	private List<RPB04PackingMeterialDetails> rpb04packingmeterialdetails;
	private List<RPB06ProcessingEqupments> rpb06processingequpments;
	private List<BMR06RP07VerificationOfRecords>rpb07verificationofrecords;
	private List<RPB08ManufactureSteps> rpb08manufacturesteps;
	private List<BMR08RP09ProductionReconciliation>rpb09productionreconciliation;
	private List<RPB10ProcessDevRecord> rpb10processdevrecord;
	private List<BMR09RP11ProcessDlyEqupBrkDwnRecord>rpb11processdlyequpbrkdwnrecord;
	private List<Map<String, Object>> stoppageList11;
	private List<RPB12ListOfEnclouser> rpb12listofenclouser;
	private List<BMR12RP13PostProdReview>rpb13postprodreview;
	private List<BMR13RP14QaRelease>rpb14qarelease;
	private List<BMR14RP15ProductRelease>rpb15productrelease;
	
	//Constructor
	public RPB02ProdDetailsResponsePrint(List<BMR01RP01ProductionDetails> rpb01productiondetails,
			List<Map<String, Object>> rpb01productiondetailsSap,
			List<RP02AnnexerInputDetailsProductionDetails> rp02annexerinputdetailsproductiondetails,
			List<RPB04PackingMeterialDetails> rpb04packingmeterialdetails,
			List<RPB06ProcessingEqupments> rpb06processingequpments,
			List<BMR06RP07VerificationOfRecords> rpb07verificationofrecords,
			List<RPB08ManufactureSteps> rpb08manufacturesteps,
			List<BMR08RP09ProductionReconciliation> rpb09productionreconciliation,
			List<RPB10ProcessDevRecord> rpb10processdevrecord,
			List<BMR09RP11ProcessDlyEqupBrkDwnRecord> rpb11processdlyequpbrkdwnrecord,
			List<Map<String, Object>> stoppageList11, List<RPB12ListOfEnclouser> rpb12listofenclouser,
			List<BMR12RP13PostProdReview> rpb13postprodreview, List<BMR13RP14QaRelease> rpb14qarelease,
			List<BMR14RP15ProductRelease> rpb15productrelease) {
		super();
		this.rpb01productiondetails = rpb01productiondetails;
		this.rpb01productiondetailsSap = rpb01productiondetailsSap;
		this.rp02annexerinputdetailsproductiondetails = rp02annexerinputdetailsproductiondetails;
		this.rpb04packingmeterialdetails = rpb04packingmeterialdetails;
		this.rpb06processingequpments = rpb06processingequpments;
		this.rpb07verificationofrecords = rpb07verificationofrecords;
		this.rpb08manufacturesteps = rpb08manufacturesteps;
		this.rpb09productionreconciliation = rpb09productionreconciliation;
		this.rpb10processdevrecord = rpb10processdevrecord;
		this.rpb11processdlyequpbrkdwnrecord = rpb11processdlyequpbrkdwnrecord;
		this.stoppageList11 = stoppageList11;
		this.rpb12listofenclouser = rpb12listofenclouser;
		this.rpb13postprodreview = rpb13postprodreview;
		this.rpb14qarelease = rpb14qarelease;
		this.rpb15productrelease = rpb15productrelease;
	}
	
	
	
	
	
	
	

	

}
