package com.focusr.Precot.util;

public interface AppConstants {
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
	
//	String projectURL = "http://172.25.0.13:9090/Precot";
	
	String projectURL = "http://172.25.0.13:9090/Precot";

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

	String operatorSave = "OPERATOR_SAVED";
	String operatorApprove = "OPERATOR_APPROVED";
	
	String operatorMailStatus = "WAITING_FOR_SUPERVISIOR_APPROVAL";
	String supervisiorMailStatus = "WAITING_FOR_HOD_APPROVAL";
	
	String supervisorSave = "SUPERVISOR_SAVED";
	String hodSave = "HOD_SAVED";
	String qaSave = "QA_SAVED";

	String supervisorApprovedStatus = "SUPERVISOR_APPROVED";
	String supervisorRejectedStatus = "SUPERVISOR_REJECTED";
	String hodApprovedStatus = "HOD_APPROVED";
	
	String hodRejectedStatus = "HOD_REJECTED";
	String qaRejectedStatus = "QA_REJECTED";
	String qaApprovedStatus = "QA_APPROVED";
	String hrApprovedStatus = "HR_APPROVED";
	String hrRejectedStatus = "HR_REJECTED";

	String qcSave = "QC_SAVED";
	String qcApprove = "QC_APPROVED";
	String qcRejected = "QC_REJECTED";
	
	String waitingStatus = "WAITING_FOR_APPROVAL";

	String bmrCreation = "CREATED";
	String bmrOpen = "OPEN";
	String bmrClosed = "CLOSED";
	String bmrSummaryCompletion = "COMPLETED";

	// F42
	String laydownhodSubject = "Laydown Approval Required";
	String F42Approve = "http://172.25.0.13:9090/Precot/api/auth/approveLayDownCheckF42/";

	// F36
	String slbhodSubject = "Shift Log Approval Required";
	String F36Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF36/";

	// F01
	String sanitizationF01Sub = "Sanitization of machines and surfaces Approval Required";
	String F01Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF01/";

	// F09
	String EquipUsageCakePressF09 = "Equipment Usage Logbook Cake Press Approval Required";
	String F09Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF09/";

	// F34
	String EquipUsageBandcF34 = "Equipment Usage Logbook Blow room and Carding Approval Required";
	String F34Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF34/";

	// F41
	String handSanitizationF41 = "Hand Sanitization Approval Required";
	String F41Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF41/";

	// F33
	String EquipmentUsgaelogBookSubject = "Equipment Usage Log Book - Waste Bale Press Approval Required";
	String F33Approve = "http://172.25.0.13:9090/Precot/api/auth/approveEquimentUsageF33/";

	// F04
	String appliedrawF04 = "Applied Raw Cotton Contamination Report Approval Required";
	String F04Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF04/";

	// F08
	String appliedContAbF08 = "Applied Contamination Report Approval Required";
	String F08Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF08/";

	// F38
	String mixingF38 = "Mixing Changeover And Mechine Cleaning Approval Required";
	String F38Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF38/";

	// F13
	String bleachJobCardF13 = "Bleaching Job Card Approval Required";
	String F13hodApprove = "http://172.25.0.13:9090/Precot/api/auth/approveHodF13/";
	String F13qaApprove = "http://172.25.0.13:9090/Precot/api/auth/approveQaF13/";

	// F2A
	String housekeepingF2A = "House Keeping Cleaning Checking -Blow room & Carding, Waste Bale Press Approval Required";
	String F02AHrApprove = "http://172.25.0.13:9090/Precot/api/auth/approveHrF02A/";
	String F02AHodApprove = "http://172.25.0.13:9090/Precot/api/auth/approveHodF02A/";

	// F2
	String housekeepingF2 = "House Keeping Cleaning Checking -Bleaching & AB Cotton Godown Approval Required";
	String F02HrApprove = "http://172.25.0.13:9090/Precot/api/auth/approveHrF02/";
	String F02HodApprove = "http://172.25.0.13:9090/Precot/api/auth/approveHodF02/";

	// F18
	String ContChcekingReportSubject = "Contamination Checking Report - Absorbent Bleached Cotton Approval Required";
	String F18Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF18/";

	// F05
	String ContRawCottonSubject = "Contamination Checking Report - Raw Cotton Approval Required";
	String F05Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF05/";

	// F11
	String EquipLogHydroExtractorSubject = "Equipment Usage Logbook - Hydro Extractor Approval Required";
	String F11Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF11/";

	// F03
	String MetalDetectorSubjectF03 = "Metal Detector Check List Approval Required";
	String F03Approve = "http://172.25.0.13:9090/Precot/api/auth/approveF03/";

	String fromMail = "Autoreports@precot.com";
	
	//Form Name
	String F42a = "Laydown Checklist";
	String F01 = "Sanitization of machines and surfaces";
	String F02 ="House Keeping Cleaning Checklist (Bleaching and AB Cotton Godown)";
	String F02A = "House Keeping Cleaning Checklist (Blow room, Carding & Waste Bale Press)";
	String F03 =  "Metal Detector Checklist";
	String F04a = "Applied Contamination Report (Raw Cotton)";
	String F05 = "Contamination Checking Report (Raw Cotton)";
	String F08 = "Applied Contamination Report";
	String F09 = "Equipment Usage Log Book Cake Press";
	String F11 = "Equipment Usage Log Book Hydro Extractor";
	String F36 = "Shift Log Book";
	String F34 = "Equipment Usage Log Book Blow room and Carding";	
	String F18 = "Contamination Checking Report";
	String F41a = "Bleaching Hand Sanitization Report";
	String F13a = "Bleaching Job Card";
	String F38 = "Mixing Change Over and Machine Cleaning Checklist";
	String F33a = "Equipment Usage Log Book Waste Bale Press";
	
	String schema = "precot";
	
	String pdfPath = "C://Users//Jawahar//Desktop//PRECOT//precotReport.pdf";
	
// QA Online inspection

	String qaInsSave = "QAINSPECTOR_SAVED";
	String qaInsApprovedStatus = "QA_INS_APPROVED";
	String qaInsSubmitStatus="QA_INS_SUBMITTED";
	String qaInsRejectStatus = "QA_INS_REJECTED";
	String qaMrRejectedStatus = "QA_MR_REJECTED";
	String qMrApprovedStatus = "QA_MR_APPROVED";	
	
	
	// APPROVE RESPONSE
	
	String approvalStatus = "Approve";

	String rejectedStatus = "Reject";

	// ROLES

	String supervisor = "ROLE_SUPERVISOR";

	String hod = "ROLE_HOD";

	String qa = "ROLE_QA";

	String designee = "ROLE_DESIGNEE";

//	String qaInspector = "QA_INSPECTOR";

	String operator = "ROLE_OPERATOR";
	
	
		// DEPARTMENT 
	
	public static final String BLEACHING = "BLEACHING";
    public static final String SPUNLACE = "SPUNLACE";
    public static final String PAD_PUNCHING = "PAD_PUNCHING";
    public static final String DRY_GOODS = "DRY_GOODS";
    public static final String QUALITY_CONTROL = "QUALITY_CONTROL";
    public static final String QUALITY_ASSURANCE = "QUALITY_ASSURANCE";
    public static final String PPC = "PPC";
    public static final String STORE = "STORE";
    public static final String DISPATCH = "DISPATCH";
    public static final String PRODUCT_DEVELOPMENT = "PRODUCT_DEVELOPMENT";
    public static final String ENGINEERING = "ENGINEERING";
    public static final String COTTON_BUDS = "COTTON_BUDS";
    public static final String MARKETING = "MARKETING";
	
	
    public static final String laydownFormNumber = "PRD01/F01";
    public static final String metalDetectorFormNumber = "PRD01/F02";
    public static final String appliedRawCottonFormNumber = "PRD01/F03";
    public static final String contaminationFormNumber = "PRD01/F04";
    public static final String cardingFormNumber = "PRD01/F05";
    public static final String cakepressFormNumber = "PRD01/F06";
    public static final String jobcardFormNumber = "PRD01/F07";
    public static final String hydroFormNumber = "PRD01/F08";
    public static final String machineSanitationFormNumber = "PRD01/F09";
    public static final String handSanitationFormNumber = "PRD01/F10";
    public static final String logbookFormNumber = "PRD01/F11";
    public static final String changeOverFormNumber = "PRD01/F12";
    public static final String wasteBaleFormNumber = "PRD01/F13";
    public static final String housekeeping2FormNumber = "PRD01/F14";
    public static final String housekeeping2AFormNumber = "PRD01/F15";
    public static final String appliedContaminationFormNumber = "PRD01/F16";
    public static final String contaminationCheckFormNumber = "PRD01/F17";
    
    
}
