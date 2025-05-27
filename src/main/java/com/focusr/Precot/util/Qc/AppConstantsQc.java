package com.focusr.Precot.util.Qc;

public interface AppConstantsQc {
	
//	String F26 = "COA FOR AB COTTON"; // 1  
	String F26NO = "PH-QCL01/F-26";
	
//	String F026A = "COA FOR COTTON PADS";  // 2
	String F026ANO = "PH-QCL01F-026A";
	
//	String F026B = "COA FOR COTTON BALLS"; // 3
	String F026BNO = "PH-QCL01F-026B";
	
//	String F026C = "COA FOR COTTON WOOL ROLL"; // 4
	String F026CNO = "PH-QCL01F-026C";
	
//	String F026D = "COA FOR COTTON WOOL PLEAT"; // 5
	String F026DNO = "PH-QCL01F-026D";
	
//	String F026E = "COA FOR COTTON ROLL GOODS"; // 6
	String F026ENO = "PH-QCL01F-026E";
	
//	String F026F = "COA FOR INFUSED COTTON PADS"; // 7
	String F026FNO = "PH-QCL01F-026F";
	
//	String F026G = "COA FOR MOISTURE CONTENT (%)"; // 8
	String F026GNO = "PH-QCL01F-026G";
	
//	String F016 = "STANDARDIZATION OF CHEMICAL SOLUTION" ; // 9
	String F016NO = "PH-QCL01F-016";
	
//	String F030 = "DIGITAL COLONY COUNTER CALIBRATION REPORT"; // 10
	String F030NO = "PH-QCL01/F-030";
	
//	String F007 = "WATER ANALYSIS REPORT" ; // 11
//	String F007NO = "PH-QCL01-AR-F-007";
	String DEFAULT_PAGE_NUMBER = "0";
	String DEFAULT_PAGE_SIZE = "30";

	int MAX_PAGE_SIZE = 50;
	
	String ISTtimeZone = "Asia/Kolkata";

	long ASN_ID = 1;

	String forgetPasswordSubject = "Password change Link";

	String forgetPasswordText = "To reset your password, click the link below.\n"
			+ "This change password link will become invalid after 7 days.\n\n";

	String forgetPasswordTemplate = "email/forgetpassword_template";

	String Success_Message = "Success";

	String CakingFormat = "Daily Production - Caking";

	String FR38 = "MIXING CHANGE OVER & MACHINE CLEANING CHECK LIST";

	String F04 = "APPLIED CONTAMINATION REPORT (RAW COTTON)";

	String F13 = "BLEACHING JOB CARD";

	String F41 = "BLEACHING HAND SANITIZATION REPORT";

	String FR05 = "CONTAMINATION CHECKING REPORT (RAW COTTON)";
	String FR18 = "CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)";

	String F33 = "EQUIPMENT USAGE LOG BOOK - WASTE BALE PRESS";

	String F42 = "LAY DOWN CHECK LIST";

	String FR11 = "EQUIPMENT USAGE LOGBOOK - HYDRO EXTRACTOR";
	String FR03 = "METAL DETECTOR CHECK LIST";
	
	// F16
	String machineCleaningSubjectF16 = "Machine Cleaning Record Approval Required";
	 
	String F16="MACHINE CLEANING RECORD (DAILY)";
	 

	String BleachingFormat = "Bleaching Job Card";

	String BrcFormat = "Breakdown Root Cause Analysis Report";

	String CleaningList = "Cleaning Check list";

	String Subject = "Job-Card-Details";

	String SignUpSubject = "Precot Registration Details";

//	String projectURL = "https://taskforce.focusrtech.com:8080/Precot/";
	String projectURL = "http://secure.focusrtech.com:9090/Precot";

	String WeighingBalance = "Weighing Balance";
	
	

//	String saveStatus = "DRAFT";
//	String submitStatus = "SUBMITTED";
//	String pendingStatus = "PENDING";
//	String waitingStatus = "WAITING FOR APPROVAL";
////	String saveStatus = "DRAFT";
////	String submitStatus = "SUBMITTED";
////	String pendingStatus = "PENDING";
////	String waitingStatus = "WAITING_FOR_APPROVAL";
//	String supervisiorStatus = "SUPERVISIOR_SUBMITTED";
//	String hodStatus = "HOD_SUBMITTED";

	
	String chemistSave="CHEMIST_SAVED";
	String chemistSubmitted="CHEMIST_APPROVED";
	String microBiologistSave="MICROBIOLOGIST_SAVED";
	String microBiologistSubmitted="MICROBIOLOGIST_APPROVED";
	String EtpSave="ETP_SAVED";
	String EtpSubmitted="ETP_APPROVED";
	String chemistRejected="CHEMIST_REJECTED";
	String microRejected="MICROBIOLOGIST_REJECTED";
	String QainspecterSAVED= "QA_INSPECTOR_SAVED";
	String QainspecterAPPROVED= "QA_INSPECTOR_APPROVED";
	String QainspecterRejected= "QA_INSPECTOR_REJECTED";
	String QAmanagerApproved= "QA_MANAGER_APPROVED";
	String QAmanagerRejected= "QA_MANAGER_REJECTED";
	String LABASSISTANTSaved = "LAB_ASSISTANT_SAVED";
	String LABASSISTANTApproved = "LAB_ASSISTANT_APPROVED";
	
	String operatorMailStatus = "WAITING_FOR_SUPERVISIOR_APPROVAL";
	String supervisiorMailStatus = "WAITING_FOR_HOD_APPROVAL";
	String developmentManagerApprove = "DEVELOPMENT_MANAGER_APPROVED";
	String hodApprove = "HOD_APPROVED";
	
	
	// QA EXEC
	
	String QAExeWaiting = "WAITING_FOR_APPROVAL"; 
	String QAExeApprove = "QA_EXE_APPROVED";
	String QAExeReject = "QA_EXE_REJECTED";
	String operatorSAVED = "OPERATOR_SAVED";
	String operatorApproved = "OPERATOR_APPROVED";
	
	// MANAGER (QA AND AC)
	
	String ManWaiting = "WAITING_FOR_APPROVAL";

	String QAApprove = "QA_APPROVED";
	String QAReject = "QA_REJECTED";

	String QCApprove = "QC_APPROVED";
	String QCRejected = "QC_REJECTED";
	
	String ChemistDesigneeApprove="CHEMIST_DESIGNEE_APPROVED";
	String MicroDesigneeApprove="MICRO_DESIGNEE_APPROVED";
	
	String ChemistDesigneeRejected="CHEMIST_DESIGNEE_REJECTED";
	String MicroDesigneeRejected="MICRO_DESIGNEE_REJECTED";
	
	String MicroDesigneeReject="MICRO_DESIGNEE_REJECTED";
	
	String waitingStatus = "WAITING_FOR_APPROVAL";

	String subARF001 = "Raw Cotton Analysis Report - Approval Required";
	
	String subARF003="Chemical Analysis Report - Approval Required";
	
	String subF001="Physical And Checmical Lab Sample Inward Book - Approval Required";
	
	String subF002="Microbiology Lab Sample Inward Book - Approval Required";
	
	String subF003="Etp Lab Sample Inward Book - Approval Required";
	
	String subARF008="FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT - Approval Required";
	
	String subARF009="HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT - Approval Required";
	
	String subARF010="MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT - Approval Required";
	
	String subARF012="DISTILLED WATER ANALYSIS REPORT - Approval Required";
	
	String subF008="TDS-METER CALIBRATION REPORT - Approval Required";
	
	String subF010="WIRA FIBER FINENESS TESTER CALIBRATION REPORT - Approval Required";
	
	String subF004="RAW COTTON CONSOLIDATED ANALYTICAL REPORT - Approval Required";
	
	String subF012="BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT - Approval Required";
	
	String subF014="VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR - Approval Required";
	
	String subF006="pH-METER CALIBRATION REPORT - Approval Required";
	
	String subF017="REAGENT PREPARATION RECORD - Approval Required";
	
	String subF026="SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA - Approval Required";

	String subF021="MEDIA GROWTH PROMOTION TEST REPORT - Approval Required";
	
	String subF019="MEDIA PREPARATION & CONSUMPTION RECORD - Approval Required";
	
	String fromMail = "Autoreports@precot.com";
	

	
	String schema = "precot";
	
	String pdfPath = "C://Users//Jawahar//Desktop//PRECOT//precotReport.pdf";
//---------------------------------------------------------------------------------------------------------
/*AUDIT VARIABLES*/	
	
	String departmentName = "QC";
	
	String ARF001 = "RAW COTTON ANALYSIS REPORT";
	String ARF001No = "PH-QCL01-AR-F-001";
	
	String F026 = "SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA";
	String F026No = "PH-QCL01/F-026";
	
	String ARF003 = "CHEMICAL ANALYSIS REPORT";
	String ARF003No="PH-QCL01-AR-F-003";
	
	String F001="PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK";
	String F001No="PH-QCL01/F-001";
	
	String F002="MICROBIOLOGY LAB SAMPLE INWARD BOOK";
	String F002No="PH-QCL01/F-002";
	
	String F003="ETP LAB SAMPLE INWARD BOOK";
	String F003No="PH-QCL01/F-003";

	String ARF008="FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT";
	String ARF008No="PH-QCL01-AR-F-008";
	
	String ARF009="HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT";
	String ARF009No="PH-QCL01-AR-F-009";
	
	String ARF010="MACHINE SWAB - MICROBIOLOGICAL ANALYSIS REPORT";
	String ARF010No="PH-QCL01-AR-F-010";
	
	String ARF012="DISTILLED WATER ANALYSIS REPORT";
	String ARF012No="PH-QCL01-AR-F-012";
	
	String F008="TDS-METER CALIBRATION REPORT";
//	String F010="WIRA FIBER FINENESS TESTER CALIBRATION REPORT";
	String F004="RAW COTTON CONSOLIDATED ANALYTICAL REPORT";
	String F004No="PH-QCL01/F-004";
	
	String F012="BACTERIAL INCUBATOR TEMPRATURE CALIBRATION REPORT";
	String F012No="PH-QCL01/F-012";
	
	String F014="VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR";
	String F014No="PH-QCL01/F-014";
	
	String F006="pH-METER CALIBRATION REPORT";
	String F006No="PH-QCL01/F-006";
	
	String F017="REAGENT PREPARATION RECORD";
	String F017No="PH-QCL01/F-017";
	
	String F021="MEDIA GROWTH PROMOTION TEST REPORT";
	String F019="MEDIA PREPARATION & CONSUMPTION RECORD";
	
//	String F008="TDS-METER CALIBRATION REPORT";
	
	String F010="WIRA FIBER FINENESS TESTER CALIBRATION REPORT";
	String F010No="PH-QCL01/F-010";
	
	String F26   = "COA FOR AB COTTON"; // 1  
	String F026A = "COA FOR COTTON PADS";  // 2
	String F026B = "COA FOR COTTON BALLS"; // 3
	String F026C = "COA FOR COTTON WOOL ROLL"; // 4
	String F026D = "COA FOR COTTON WOOL PLEAT"; // 5
	String F026E = "COA FOR COTTON ROLL GOODS"; // 6
	String F026F = "COA FOR INFUSED COTTON PADS"; // 7
	String F026G = "COA FOR MOISTURE CONTENT (%)"; // 8
	String F016  = "STANDARIZATION OF CHEMICAL SOLUTION" ; // 9
	String F030  = "DIGITAL COLONY COUNTER CALIBRATION REPORT"; // 10

	String F007 = "WATER ANALYSIS REPORT" ; // 11
	String F007NO = "PH-QCL01-AR-F-007";
	
	String ARF002 = "ABSORBENT BLEACHED COTTON ANALYSIS REPORT";
	
	String ARF004 = "EXFOLIATING FABRIC ANALYSIS REPORT";
	
	String ARF006 = "FINISHED PRODUCT ANALYSIS REPORT";
	
	String ARF011 = "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR";
	
	String ARF013 = "POTABLE WATER ANALYSIS REPORT";
	
	String CLF007 = "WEIGHING SCALE CALIBRATION REPORT";
	
	String ARF014 ="BRIQUETTES ANALYSIS REPORT";
	
	String ARF005 = "NON-WOVEN FLEECE ANALYSIS REPORT";
	
	String F005 = "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT";
	
	String F011 = "SPECTROPHOTOMETR CM-3600A Calibration Report";
	
	String F013 = "FUNGAL INCUBATOR TEMPERATURE VERIFICATION REPORT";
	
	String F022 = "MEDIA DISPOSAL RECORD";
	String F029 = "REQUISITION SAMPLE ANALYSIS REPORT";

	String ARF13No = "PH-QCL01-AR-F-013";

	String F07No = "PH-QCL01-AR-F-004";

	String F05No = "PH-QCL01F-005";

	String F009 = "TURBIDITY CALIBRATION REPORT";

	String F024 = "Disposal Record";

	String F015 = "VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR";

	String F015No = "PH-QCL01F-015";

	String F018 = "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB";

	String F027 = "DISTILLED WATER CONSUMPTION REPORT";

	String F020 = "MICROBIOLOGICAL ANALYSIS REPORT MISCELLANEOUS";

	String F020No = "PH-QCL01F-020";
	
	
	
	
	public static final String ARF02No = "PH-QCL01-AR-F-002";
    public static final String ARF04No = "PH-QCL01-AR-F-004";
    public static final String ARF05No = "PH-QCL01-AR-F-005";
    public static final String ARF06No = "PH-QCL01-AR-F-006";
    public static final String ARF11No = "PH-QCL01-AR-F-011";
    public static final String ARF013No = "PH-QCL01-AR-F-013";
    public static final String ARF014No = "PH-QCL01-AR-F-014";
    public static final String F005No = "PH-QCL01F-005";
    public static final String F007No = "PH-QCL01F-007";
    public static final String F009No = "PH-QCL01F-009";
    public static final String F011No = "PH-QCL01F-011";
    public static final String F013No = "PH-QCL01F-013";
    public static final String F018No = "PH-QCL01F-018";
    public static final String F022No = "PH-QCL01F-022";
    public static final String F024No = "PH-QCL01F-024";
    public static final String F027No = "PH-QCL01F-027";
    public static final String F029No = "PH-QCL01F-029";
	
	

	String F008No="PH-QCL01-D-04";
	
	
	String F021No="PH-QCL01/F-021";
	

	String F019No="PH-QCL01/F-019";
	
	String departmentNameA = "Quality Control";
	
	
}
	