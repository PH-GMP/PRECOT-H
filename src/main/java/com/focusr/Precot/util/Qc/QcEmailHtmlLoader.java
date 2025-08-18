package com.focusr.Precot.util.Qc;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.CoaAbCottonF26;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonPadsF26A;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolPleatF26D;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;
import com.focusr.Precot.mssql.database.model.Qc.CoaInfusedCottonPadsF26F;
import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;
import com.focusr.Precot.mssql.database.model.Qc.DigitalColonyCounterF030;
import com.focusr.Precot.mssql.database.model.Qc.DisposalRecord;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcPhMeterCalibrationReportF006;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017;
import com.focusr.Precot.mssql.database.model.Qc.QcShelfLifePeriodPhysicChemMicroF026;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaGrowthPromotionTestReportF021;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaPreparationAndConsumptionRecordF019;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;
import com.focusr.Precot.mssql.database.model.Qc.Qc_ValidationForAutoclaveByChemicalIndicatorF014;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;
import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.Qc.RequistionF029;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.StandarizationOfChemicalReportF016;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005Parent;
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;
import com.focusr.Precot.mssql.database.model.Qc.exfoliatingfabricanalysisreport;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.fumigationARF011;
import com.focusr.Precot.mssql.database.model.Qc.fungalIncubatorReportCLF013;
import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalCLF022;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalAnalyisisReportF20;
import com.focusr.Precot.mssql.database.model.Qc.non_woven_F005;
import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;
import com.focusr.Precot.mssql.database.model.Qc.potableWaterARF013Report;
import com.focusr.Precot.mssql.database.model.Qc.spectrophotometerReportClF011;
import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;
import com.focusr.Precot.mssql.database.model.Qc.turbiditycalibrationreportCLF009;
import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;
import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;
import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.padpunching.AppConstantsPadPunching;

@Component
public class QcEmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(QcEmailHtmlLoader.class);

	
	
	// VIJAY
	
	
	// F26
//	public String coaAbCottonF26(CoaAbCottonF26 details) {
//
//		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
//				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsQc.F26 + "</p>"
//				+ "<p>Format No : " + AppConstantsQc.F26NO + "</p>" + "<p>Date : " + details.getDate()
//				+ "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>"
//				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
//				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
//				+ "<p>Team-Precot</p>" + "</body></html>";
//		return body;
//	}
	
	
	// QA_EXECUTIVE MAIL
	
	public String coaAbCottonF26(CoaAbCottonF26 details) {

	    String body = "<html><body>" + 
	                  "<p>Dear,</p>" + 
	                  "<p>Greetings for the day,</p>" +
	                  "<p><b>Kindly Find the Form Details:</b></p>" + 
	                  "<p>Format Name: " + AppConstantsQc.F26 + "</p>" +
	                  "<p>Format No : " + AppConstantsQc.F26NO + "</p>" + 
	                  "<p>Date : " + details.getDate() + "</p>" + 
	                  "<p>Product: " + details.getProduct() + "</p>" + 
	                  "<p>Customer: " + details.getCustomer() + "</p>" + 
	                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
	                  "<p>For Further Details Click below link to Login to the Application </p>" + 
	                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                  "<p>Regards,</p>" + 
	                  "<p>Team-Precot</p>" + 
	                  "</body></html>";

	    return body;
	}
	
	public String coaAbCottonF26Man(CoaAbCottonF26 details) {

	    String body = "<html><body>" + 
	                  "<p>Dear,</p>" + 
	                  "<p>Greetings for the day,</p>" +
	                  "<p><b>Kindly Find the Form Details:</b></p>" + 
	                  "<p>Format Name: " + AppConstantsQc.F26 + "</p>" +
	                  "<p>Format No : " + AppConstantsQc.F26NO + "</p>" + 
	                  "<p>Date : " + details.getDate() + "</p>" + 
	                  "<p>Product: " + details.getProduct() + "</p>" + 
	                  "<p>Customer: " + details.getCustomer() + "</p>" + 
	                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
	                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" + 
	                  "<p>For Further Details Click below link to Login to the Application </p>" + 
	                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                  "<p>Regards,</p>" + 
	                  "<p>Team-Precot</p>" + 
	                  "</body></html>";

	    return body;
	}

	
	// F26A
	
	public String coaCottonPadsF26A(CoaCottonPadsF26A details) {

	    String body = "<html><body>" + 
	                  "<p>Dear,</p>" + 
	                  "<p>Greetings for the day,</p>" +
	                  "<p><b>Kindly Find the Form Details:</b></p>" + 
	                  "<p>Format Name: " + AppConstantsQc.F026A + "</p>" +
	                  "<p>Format No : " + AppConstantsQc.F026ANO + "</p>" + 
	                  "<p>Date : " + details.getDate() + "</p>" + 
	                  "<p>Product: " + details.getProduct() + "</p>" + 
	                  "<p>Customer: " + details.getCustomer() + "</p>" + 
	                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
	                  "<p>For Further Details Click below link to Login to the Application </p>" + 
	                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                  "<p>Regards,</p>" + 
	                  "<p>Team-Precot</p>" + 
	                  "</body></html>";

	    return body;
	}
	
	// F26A MANAGER
	
	public String coaCottonPadsF26AManager(CoaCottonPadsF26A details) {

	    String body = "<html><body>" + 
	                  "<p>Dear,</p>" + 
	                  "<p>Greetings for the day,</p>" +
	                  "<p><b>Kindly Find the Form Details:</b></p>" + 
	                  "<p>Format Name: " + AppConstantsQc.F026A + "</p>" +
	                  "<p>Format No : " + AppConstantsQc.F026ANO + "</p>" + 
	                  "<p>Date : " + details.getDate() + "</p>" + 
	                  "<p>Product: " + details.getProduct() + "</p>" + 
	                  "<p>Customer: " + details.getCustomer() + "</p>" + 
	                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
	                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" + 
	                  "<p>For Further Details Click below link to Login to the Application </p>" + 
	                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                  "<p>Regards,</p>" + 
	                  "<p>Team-Precot</p>" + 
	                  "</body></html>";

	    return body;
	}
	
	// F26B
	
		public String coaCottonBallsF26B(CoaCottonBallsF26B details) {

		    String body = "<html><body>" + 
		                  "<p>Dear,</p>" + 
		                  "<p>Greetings for the day,</p>" +
		                  "<p><b>Kindly Find the Form Details:</b></p>" + 
		                  "<p>Format Name: " + AppConstantsQc.F026B + "</p>" +
		                  "<p>Format No : " + AppConstantsQc.F026BNO + "</p>" + 
		                  "<p>Date : " + details.getDate() + "</p>" + 
		                  "<p>Product: " + details.getProduct() + "</p>" + 
		                  "<p>Customer: " + details.getCustomer() + "</p>" + 
		                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
		                  "<p>For Further Details Click below link to Login to the Application </p>" + 
		                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
		                  "<p>Regards,</p>" + 
		                  "<p>Team-Precot</p>" + 
		                  "</body></html>";

		    return body;
		}
		
		public String coaCottonBallsF26BManager(CoaCottonBallsF26B details) {

		    String body = "<html><body>" + 
		                  "<p>Dear,</p>" + 
		                  "<p>Greetings for the day,</p>" +
		                  "<p><b>Kindly Find the Form Details:</b></p>" + 
		                  "<p>Format Name: " + AppConstantsQc.F026B + "</p>" +
		                  "<p>Format No : " + AppConstantsQc.F026BNO + "</p>" + 
		                  "<p>Date : " + details.getDate() + "</p>" + 
		                  "<p>Product: " + details.getProduct() + "</p>" + 
		                  "<p>Customer: " + details.getCustomer() + "</p>" + 
		                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
		                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" + 
		                  "<p>For Further Details Click below link to Login to the Application </p>" + 
		                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
		                  "<p>Regards,</p>" + 
		                  "<p>Team-Precot</p>" + 
		                  "</body></html>";

		    return body;
		}
		
		// F26C
		
			public String coaCottonWoolRollF26C(CoaCottonWoolRollF26C details) {

			    String body = "<html><body>" + 
			                  "<p>Dear,</p>" + 
			                  "<p>Greetings for the day,</p>" +
			                  "<p><b>Kindly Find the Form Details:</b></p>" + 
			                  "<p>Format Name: " + AppConstantsQc.F026C + "</p>" +
			                  "<p>Format No : " + AppConstantsQc.F026CNO + "</p>" + 
			                  "<p>Date : " + details.getDate() + "</p>" + 
			                  "<p>Product: " + details.getProduct() + "</p>" + 
			                  "<p>Customer: " + details.getCustomer() + "</p>" + 
			                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
			                  "<p>For Further Details Click below link to Login to the Application </p>" + 
			                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
			                  "<p>Regards,</p>" + 
			                  "<p>Team-Precot</p>" + 
			                  "</body></html>";

			    return body;
			}
			
			public String coaCottonWoolRollF26CManager(CoaCottonWoolRollF26C details) {

			    String body = "<html><body>" + 
			                  "<p>Dear,</p>" + 
			                  "<p>Greetings for the day,</p>" +
			                  "<p><b>Kindly Find the Form Details:</b></p>" + 
			                  "<p>Format Name: " + AppConstantsQc.F026C + "</p>" +
			                  "<p>Format No : " + AppConstantsQc.F026CNO + "</p>" + 
			                  "<p>Date : " + details.getDate() + "</p>" + 
			                  "<p>Product: " + details.getProduct() + "</p>" + 
			                  "<p>Customer: " + details.getCustomer() + "</p>" + 
			                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
			                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" + 
			                  "<p>For Further Details Click below link to Login to the Application </p>" + 
			                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
			                  "<p>Regards,</p>" + 
			                  "<p>Team-Precot</p>" + 
			                  "</body></html>";

			    return body;
			}
			
			// F26D
			
				public String coaCottonWoolPleatF26D(CoaCottonWoolPleatF26D details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026D + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026DNO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				// MANAGER
				
				public String coaCottonWoolPleatF26DManager(CoaCottonWoolPleatF26D details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026D + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026DNO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}

				
				// F26E
				
				public String coaCottonRollGoodsF26E(CoaCottonRollGoodsF26E details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026E + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026ENO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				// MANAGER
				
				public String coaCottonRollGoodsF26EManager(CoaCottonRollGoodsF26E details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026E + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026ENO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" +
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}


				// F26F
				
				public String coaInfusedCottonPadsF26F(CoaInfusedCottonPadsF26F details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026F + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026FNO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				// MANAGER
				
				public String coaInfusedCottonPadsF26FManager(CoaInfusedCottonPadsF26F details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026F + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026FNO + "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" +
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
// F26G
				
				public String coaMoistureF26G(CoaMoistureF26G details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				// MANAGER
				
				public String coaMoistureF26GManager(CoaMoistureF26G details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Product: " + details.getProduct() + "</p>" + 
				                  "<p>Customer: " + details.getCustomer() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" +
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				
				// F016
				
				public String standarizationOfChemicalReportF016(StandarizationOfChemicalReportF016 details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Shift: " + details.getShift() + "</p>" + 
				                  "<p>NameOfTheSolution: " + details.getName_of_solution() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
// F030
				
				public String digitalColonyCounterF030(DigitalColonyCounterF030 details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>Month: " + details.getMonth() + "</p>" + 
				                  "<p>Year: " + details.getYear() + "</p>" + 
				                  "<p>EquipmentId: " + details.getEquip_id() + "</p>" + 
				                  "<p>Submitted by (Micro): " + details.getMicro_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				// F007
				
				public String waterAnalysisReportF007(WaterAnalysisReportF007 details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>AR_NO: " + details.getAr_no() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				
				// MICRO TO QA OR QC MANAGER
				
				public String waterAnalysisReportF007MicroToManager(WaterAnalysisReportF007 details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>AR_NO: " + details.getAr_no() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>Approved by (QaExecutive): " + details.getQa_exe_submit_by() + "</p>" + 
				                  "<p>Submitted by (Micro): " + details.getMicro_submit_by() + "</p>" + 
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
				
					// QA EXECUTIVE TO QA OR QC MANAGER
				
				public String waterAnalysisReportF007QaExeToManager(WaterAnalysisReportF007 details) {

				    String body = "<html><body>" + 
				                  "<p>Dear,</p>" + 
				                  "<p>Greetings for the day,</p>" +
				                  "<p><b>Kindly Find the Form Details:</b></p>" + 
				                  "<p>Format Name: " + AppConstantsQc.F026G + "</p>" +
				                  "<p>Format No : " + AppConstantsQc.F026GNO+ "</p>" + 
				                  "<p>Date : " + details.getDate() + "</p>" + 
				                  "<p>AR_NO: " + details.getAr_no() + "</p>" + 
				                  "<p>Submitted by (Chemist): " + details.getChemist_submit_by() + "</p>" + 
				                  "<p>ApprovedBy by (QaExecutive): " + details.getQa_exe_status() + "</p>" +
				                  "<p>Submitted by (MicroBiologist): " + details.getMicro_status() + "</p>" +
				                  "<p>For Further Details Click below link to Login to the Application </p>" + 
				                  "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
				                  "<p>Regards,</p>" + 
				                  "<p>Team-Precot</p>" + 
				                  "</body></html>";

				    return body;
				}
				
		
	// ARF001

	public String rollConsumptionF002Hod(DailyRollConsumptionReportF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F002
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F002No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>" + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003
	public String punchingProductChangeOverF03Hod(PunchingProductChangeOverF03 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F003
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F003No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String punchingProductChangeOverF03QA(PunchingProductChangeOverF03 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F003
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F003No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HOD): " + details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F004
	public String dailyProdPackingDetailsF004Hod(DailyProdPackingDetailsF004 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F004
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F004No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005
	public String machineCleaningCheckListF005Hod(MachineCleaningCheckListF005 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F005
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F005No + "</p>" + "<p>Date : " + details.getDate()
				+ "</p>"  + "<p>Machine Name : " + details.getMachineName()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006
	public String punchingHandSanitationF006Hod(PunchingHandSanitationF24 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F006
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F006No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F007
	public String metalDetectorCheckList007Hod(MetalDetectorCheckList007 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F007
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F007No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F008
	public String padPunchingSanitizationOfMachinesAndSurfacesF21Hod(
			PadPunchingSanitizationOfMachinesAndSurfacesF21 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F008
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F008No + "</p>" + "<p>Month : " + details.getMonth()
				+ "</p>" + "<p>Year : " + details.getYear() + "</p>" + "<p>Week : " + details.getWeekNo() + "</p>"
				+ "<p>Date : " + details.getDate() + "</p>" + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009
	public String padPunchingHouseKeepingCheckListF26HR(PadPunchingHouseKeepingCheckListF26 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F009
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F009No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009
	public String padPunchingHouseKeepingCheckListF26Hod(PadPunchingHouseKeepingCheckListF26 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F009
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F009No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HR): " + details.getHr_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F012
	public String padPunchingLogBookBagMakingF003Hod(PadPunchingLogBookBagMakingF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F012
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F012No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F013
	public String padPunchingBagMakingDailyProductionDetailsF001Hod(
			PadPunchingBagMakingDailyProductionDetailsF001 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F013
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F013No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F014
	public String bagMakingSpecificationDetailsF014Hod(BagMakingSpecificationDetailsF014 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F014
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F014No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Product Name : " + details.getProductName() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F015
	public String padPunchingHouseKeepingCheckListF010HR(PadPunchingHouseKeepingCheckListF010 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F015
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F015No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String padPunchingHouseKeepingCheckListF010Hod(PadPunchingHouseKeepingCheckListF010 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F015
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F015No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HR): " + details.getHr_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	
	// QC 8
	
	
	public String physicalandchemicaltestARF002(physicalandchemicaltest physical) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF002 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF02No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
                "<p>Product: " + physical.getProduct() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by (Chemist): " + physical.getChemist_submit_by() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + physical.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String physicalandchemicaltestARF002Approve(physicalandchemicaltest physical) {

	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF002 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF02No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
                "<p>Product: " + physical.getProduct() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by (Chemist): " + physical.getChemist_submit_by() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + physical.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testARF005(non_woven_F005 nonwoven) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF005 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF05No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + nonwoven.getProduct_name() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + nonwoven.getQa_inspector_submit_by() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + nonwoven.getQa_mng_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testARF011(@Valid fumigationARF011 fumigation) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF011 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF11No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
                "<p>Product: " + fumigation.getFormat() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + fumigation.getMicro_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + fumigation.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testARF013(@Valid potableWaterARF013Report potableWaterARF013Report) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF013 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF13No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
                "<p>Product: " + potableWaterARF013Report.getFormat() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + potableWaterARF013Report.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + potableWaterARF013Report.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
		
	}
	
	public String testARF06(@Valid finishedproductanalysisreportF006 finished) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF006 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF06No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
                "<p>Product: " + finished.getFormat() + "</p>" + 
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + finished.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + finished	.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testARF05(@Valid exfoliatingfabricanalysisreport exfo) {

	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF004 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF04No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + exfo.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + exfo.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF07(@Valid weighingscalecalibrationreportCLF007 wigClf007) {

	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F007 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F07No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + wigClf007.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + wigClf007.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF05(absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005) {

	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F005 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F05No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + absorbentbleachedcottonreportCLF005.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + absorbentbleachedcottonreportCLF005.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF014(@Valid briquettesanalysisreportARF014 physical) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.ARF014 + "</p>" +
                "<p>Format No : " + AppConstantsQc.ARF014No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + physical.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + physical.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF09(@Valid turbiditycalibrationreportCLF009 turbidity) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F009 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F009No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + turbidity.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + turbidity.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF011(@Valid spectrophotometerReportClF011 spectrometer) {
	    String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F011 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F011No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + spectrometer.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + spectrometer.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF013(@Valid fungalIncubatorReportCLF013 fungalIncubator) {
		  String body = "<html><body>" + 
	                "<p>Dear,</p>" + 
	                "<p>Greetings for the day,</p>" +
	                "<p><b>Kindly Find the Form Details:</b></p>" + 
	                "<p>Format Name: " + AppConstantsQc.F024 + "</p>" +
	                "<p>Format No : " + AppConstantsQc.F024No + "</p>" + 
//	                "<p>Date : " + physical.getDate() + "</p>" + 
//	                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//	                "<p>Customer: " + physical.getCustomer() + "</p>" + 
	                "<p>Submitted by : " + fungalIncubator.getMicro_status() + "</p>" + 
	                "<p>ApprovedBy by (Executive): " + fungalIncubator.getQc_status() + "</p>" + 
	                "<p>For Further Details Click below link to Login to the Application </p>" + 
	                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                "<p>Regards,</p>" + 
	                "<p>Team-Precot</p>" + 
	                "</body></html>";
			return body;
	}

	public String testF024(@Valid DisposalRecord disposalRecord) {
		  String body = "<html><body>" + 
	                "<p>Dear,</p>" + 
	                "<p>Greetings for the day,</p>" +
	                "<p><b>Kindly Find the Form Details:</b></p>" + 
	                "<p>Format Name: " + AppConstantsQc.F013 + "</p>" +
	                "<p>Format No : " + AppConstantsQc.F013No + "</p>" + 
//	                "<p>Date : " + physical.getDate() + "</p>" + 
//	                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//	                "<p>Customer: " + physical.getCustomer() + "</p>" + 
	                "<p>Submitted by : " + disposalRecord.getChemist_status() + "</p>" + 
	                "<p>ApprovedBy by (Executive): " + disposalRecord.getQc_status() + "</p>" + 
	                "<p>For Further Details Click below link to Login to the Application </p>" + 
	                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                "<p>Regards,</p>" + 
	                "<p>Team-Precot</p>" + 
	                "</body></html>";
			return body;
	}

	public String testF015(@Valid validationAutoclave validation) {

		  String body = "<html><body>" + 
	                "<p>Dear,</p>" + 
	                "<p>Greetings for the day,</p>" +
	                "<p><b>Kindly Find the Form Details:</b></p>" + 
	                "<p>Format Name: " + AppConstantsQc.F015 + "</p>" +
	                "<p>Format No : " + AppConstantsQc.F015No + "</p>" + 
//	                "<p>Date : " + physical.getDate() + "</p>" + 
//	                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//	                "<p>Customer: " + physical.getCustomer() + "</p>" + 
	                "<p>Submitted by : " + validation.getMicro_status() + "</p>" + 
	                "<p>ApprovedBy by (Executive): " + validation.getQc_status() + "</p>" + 
	                "<p>For Further Details Click below link to Login to the Application </p>" + 
	                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
	                "<p>Regards,</p>" + 
	                "<p>Team-Precot</p>" + 
	                "</body></html>";
			return body;
	}

	public String testF018(@Valid temperatureRelativeF018 temperatureRelat) {
		String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F018 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F018No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + temperatureRelat.getMicro_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + temperatureRelat.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF022(@Valid mediaDisposalCLF022 mediaDis) {
		String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F022 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F022No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + mediaDis.getMicro_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + mediaDis.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF027(@Valid distillwaterconsumF27 distillwat) {
		String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F027 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F027No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + distillwat.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + distillwat.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF020(@Valid microbiologicalAnalyisisReportF20 microbipReportF20) {
		String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F020 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F020No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + microbipReportF20.getMicro_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + microbipReportF20.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	public String testF029(@Valid RequistionF029 requis) {
		String body = "<html><body>" + 
                "<p>Dear,</p>" + 
                "<p>Greetings for the day,</p>" +
                "<p><b>Kindly Find the Form Details:</b></p>" + 
                "<p>Format Name: " + AppConstantsQc.F029 + "</p>" +
                "<p>Format No : " + AppConstantsQc.F029No + "</p>" + 
//                "<p>Date : " + physical.getDate() + "</p>" + 
//                "<p>Product: " + exfo.getFormat() + "</p>" + 	
//                "<p>Customer: " + physical.getCustomer() + "</p>" + 
                "<p>Submitted by : " + requis.getChemist_status() + "</p>" + 
                "<p>ApprovedBy by (Executive): " + requis.getQc_status() + "</p>" + 
                "<p>For Further Details Click below link to Login to the Application </p>" + 
                "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + 
                "<p>Regards,</p>" + 
                "<p>Team-Precot</p>" + 
                "</body></html>";
		return body;
	}

	// ARF001
		public String rawCottonAnalysisARF001Hod(RawCottenAnalysisReportARF001 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsQc.ARF001
					+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF001No + "<p>Date : " + details.getDate()
					+ "</p>" + "<p>Submitted by (Chemist/Microbiologist): " + details.getChemist_submit_by()+"/"+details.getMicrobiologist_submit_by()
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// ARF003
		public String chemicalAnalysisARF003Hod(ChemicalAnalysisReportARF003 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.ARF003
					+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF003No
					+ "<p>Date : " + details.getDate()
					+ "</p>" +"<p>MaterialDocNo :"+details.getMaterialDocNo()+"</p>"+ "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F001_02_03
		public String sampleInwardF001_02_03Hod(SampleInwardBookF001_F002_F003 details) {
	 
			String body=null;
			if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-001")){
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.F001
						+ "</p>" + "<p>Format No : " + AppConstantsQc.F001No
						+ "<p>Date : " + details.getDateF001()
						+ "</p>" + "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-002")) {
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.F002
						+ "</p>" + "<p>Format No : " + AppConstantsQc.F002No
						+ "<p>Date : " + details.getDateF002()
						+ "</p>" +"</p>"+ "<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-003")) {
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.F003
						+ "</p>" + "<p>Format No : " + AppConstantsQc.F003No
						+ "<p>Date : " + details.getDateF003()
						+ "</p>" +"</p>"+ "<p>Submitted by ETP: " + details.getEtp_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}	
	 
	 
			return body;
		}		
	 
		// ARF008_09_10
		public String swabMicrobiologicalARF008_09_10Hod(SwabMicrobiologicalAnalysisARF008_009_010 details) {
	 
			String body=null;
			if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-008")){
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.ARF008
						+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF008No
						+ "<p>Date : " + details.getSampledDateF008()
						+ "</p>" + "<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-009")) {
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.ARF009
						+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF009No
						+ "<p>Date : " + details.getSampledDateF009()
						+ "</p>" +"</p>"+ "<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-010")) {
				body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>"
						+ "<p>Format Name: " + AppConstantsQc.ARF010
						+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF010No
						+ "<p>Date : " + details.getSampledDateF010()
						+ "</p>" +"</p>"+ "<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
						+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
			}	
	 
	 
			return body;
		}		
	 
		// F008
		public String tdsCalibrationReportF008Hod(QcTdsMeterCalibrationReportF008 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F008
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F008No
					+ "<p>Date : " + details.getDate()
					+"</p>"+ "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// ARF012
		public String distilledWaterARF012Hod(DistilledWaterAnalysisReportARF012 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.ARF012
					+ "</p>" + "<p>Format No : " + AppConstantsQc.ARF012No
					+ "<p>Date : " + details.getDate()
					+"</p>"+ "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F010
		public String wiraFiberFinenessF010Hod(Qc_WiraFiberFinenessTesterReportF010 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F010
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F010No
					+ "<p>Month : " + details.getMonth()
					+"</p>"
					+ "<p>Year : " + details.getYear()
					+"</p>"+ "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F004
		public String rawCottonConsolidatedF004Hod(Qc_RawCottenConsolidatedAnalyticalReportF004 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F004
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F004No
					+ "<p>Month : " + details.getBleachingBmrNo()
					+"</p>"+ "<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F012
		public String bacterialIncubatorTempCalibrationF012Hod(Qc_BacterialIncubatorTempCalibrationF012 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F004
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F004No
					+ "<p>Date : " + details.getDate()
					+"</p>"+ "<p>EqIdNo : " + details.getEqIdNo()
					+"</p>"+"<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F014
		public String validationmForAutoClaveByChemicalF014Hod(Qc_ValidationForAutoclaveByChemicalIndicatorF014 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F014
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F014No
					+ "<p>Date : " + details.getDate()
					+"</p>"+ "<p>EqIdNo : " + details.getEqId()
					+"</p>"+"<p>Submitted by Microbiologist: " + details.getMicrobiologist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F006
		public String phMeterCalibrationReportF006Hod(QcPhMeterCalibrationReportF006 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F006
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F006No
					+ "<p>Date : " + details.getDate()
					+"</p>"+ "<p>EqIdNo : " + details.getEqIdNo()
					+"</p>"+"<p>Submitted by Chemist: " + details.getChemist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F017
		public String regantPreparationRecordF017Hod(QcReagentPreparationRecordF017 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F017
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F017No
					+ "<p>Month : " + details.getMonth()
					+"</p>"+ "<p>Year : " + details.getYear()
					+ "</p>" + "<p>Submitted by (Chemist/Microbiologist): " + details.getChemist_submit_by()+"/"+details.getMicrobiologist_submit_by()
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F026
		public String shelfLifePeriodPhysicChemMicroF026Hod(QcShelfLifePeriodPhysicChemMicroF026 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F026
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F026No
					+ "<p>Month : " + details.getMonth()
					+"</p>"+ "<p>Year : " + details.getYear()
					+ "</p>" + "<p>Submitted by (Chemist/Microbiologist): " + details.getChemist_submit_by()+"/"+details.getMicrobiologist_submit_by()
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F021
		public String mediaGrowthPromotionTestF021Hod(Qc_MediaGrowthPromotionTestReportF021 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F021
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F021No
					+ "<p>Month : " + details.getMonth()
					+"</p>"+ "<p>Year : " + details.getYear()
					+"</p>"+"<p>Submitted by Chemist: " + details.getMicrobiologist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	 
		// F019
		public String mediaPreparationAndConsumptionF019Hod(Qc_MediaPreparationAndConsumptionRecordF019 details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>"
					+ "<p>Format Name: " + AppConstantsQc.F019
					+ "</p>" + "<p>Format No : " + AppConstantsQc.F019No
					+ "<p>Month : " + details.getMonth()
					+"</p>"+ "<p>Year : " + details.getYear()
					+"</p>"+ "<p>PreparationDate : " + details.getPreparationDate()
					+"</p>"+ "<p>loadNo : " + details.getLoadNo()
					+"</p>"+"<p>Submitted by Chemist: " + details.getMicrobiologist_submit_by()+"/"
					+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}
	
		
				
				

	

}
