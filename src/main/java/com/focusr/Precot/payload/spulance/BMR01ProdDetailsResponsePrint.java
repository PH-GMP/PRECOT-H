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

import lombok.Data;

@Data
public class BMR01ProdDetailsResponsePrint {

	private List<BMR01RP01ProductionDetails> bmr01productiondetails;
	private List<Map<String, Object>> bmr01productiondetailsSap;
	private List<BMR03PackingMeterialIssue> bmr03packingmeterialissue;
	private List<BMR05AnnexureList> bmr05annexurelist;
	private List<BMR06RP07VerificationOfRecords> bmr06verificationofrecords;
	private List<BMR07ManufacturingSteps> bmr07manufacturingsteps;
	private List<BMR08RP09ProductionReconciliation> bmr08productionreconciliation;
	private List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmr09processdlyequpbrkdwnrecord;
	List<Map<String, Object>> stoppageList09;
	private List<BMR10ProcessDeviationRecord> bmr10processdeviationrecord;
	private List<BMR11ListsOfEnclosures> bmr11listsofenclosures;
	private List<BMR12RP13PostProdReview> bmr12postprodreview;
	private List<BMR13RP14QaRelease> bmr13qarelease;
	private List<BMR14RP15ProductRelease> bmr14productrelease;

	// constructor
	public BMR01ProdDetailsResponsePrint(List<BMR01RP01ProductionDetails> bmr01productiondetails,
			List<Map<String, Object>> bmr01productiondetailsSap,
			List<BMR03PackingMeterialIssue> bmr03packingmeterialissue, List<BMR05AnnexureList> bmr05annexurelist,
			List<BMR06RP07VerificationOfRecords> bmr06verificationofrecords,
			List<BMR07ManufacturingSteps> bmr07manufacturingsteps,
			List<BMR08RP09ProductionReconciliation> bmr08productionreconciliation,
			List<BMR09RP11ProcessDlyEqupBrkDwnRecord> bmr09processdlyequpbrkdwnrecord,
			List<Map<String, Object>> stoppageList09, List<BMR10ProcessDeviationRecord> bmr10processdeviationrecord,
			List<BMR11ListsOfEnclosures> bmr11listsofenclosures, List<BMR12RP13PostProdReview> bmr12postprodreview,
			List<BMR13RP14QaRelease> bmr13qarelease, List<BMR14RP15ProductRelease> bmr14productrelease) {
		super();
		this.bmr01productiondetails = bmr01productiondetails;
		this.bmr01productiondetailsSap = bmr01productiondetailsSap;
		this.bmr03packingmeterialissue = bmr03packingmeterialissue;
		this.bmr05annexurelist = bmr05annexurelist;
		this.bmr06verificationofrecords = bmr06verificationofrecords;
		this.bmr07manufacturingsteps = bmr07manufacturingsteps;
		this.bmr08productionreconciliation = bmr08productionreconciliation;
		this.bmr09processdlyequpbrkdwnrecord = bmr09processdlyequpbrkdwnrecord;
		this.stoppageList09 = stoppageList09;
		this.bmr10processdeviationrecord = bmr10processdeviationrecord;
		this.bmr11listsofenclosures = bmr11listsofenclosures;
		this.bmr12postprodreview = bmr12postprodreview;
		this.bmr13qarelease = bmr13qarelease;
		this.bmr14productrelease = bmr14productrelease;
	}

}
