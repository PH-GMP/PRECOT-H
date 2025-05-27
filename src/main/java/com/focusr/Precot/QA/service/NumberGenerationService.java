package com.focusr.Precot.QA.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.ManagementOfIncidence;
import com.focusr.Precot.QA.model.NumberGeneration;
import com.focusr.Precot.QA.model.QaBreakageReport;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaNonConformityReport;
import com.focusr.Precot.QA.repository.DeviationFormRepo;
import com.focusr.Precot.QA.repository.FinalInspectionReportRepositoryF037;
import com.focusr.Precot.QA.repository.InwardInspectionReportRepository;
import com.focusr.Precot.QA.repository.ManagementOfIncidenceRepository;
import com.focusr.Precot.QA.repository.NumberGenerationRepository;
import com.focusr.Precot.QA.repository.QaBreakageReportRepository;
import com.focusr.Precot.QA.repository.QaChangeControlFormRepository;
import com.focusr.Precot.QA.repository.QaContainerInspectionReportRepository;
import com.focusr.Precot.QA.repository.QaCustomerComplaintRegisterFormRepository;
import com.focusr.Precot.QA.repository.QaNonConformityReportRepository;
import com.focusr.Precot.QA.repository.QaTrainingSessionAllotmentRegisterLineRepository;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.payload.ApiResponse;

//Kaviya
@Service
public class NumberGenerationService {
	Logger log = LoggerFactory.getLogger(NumberGenerationService.class);
	@Autowired
	NumberGenerationRepository numbergenerationrepository;

	@Autowired
	InwardInspectionReportRepository inwardinspectionreportrepository;

	@Autowired
	ManagementOfIncidenceRepository managementofincidencerepository;

	@Autowired
	QaCustomerComplaintRegisterFormRepository qacustomercomplaintregisterformrepository;

	@Autowired
	QaContainerInspectionReportRepository qacontainerinspectionreportrepository;

	@Autowired
	FinalInspectionReportRepositoryF037 finalinspectionreportrepositoryf037;
	
	@Autowired
	QaNonConformityReportRepository qanonconformityreportrepository;

	
	@Autowired
	QaBreakageReportRepository qabreakagereportrepository;
	
	@Autowired
	private QaTrainingSessionAllotmentRegisterLineRepository qaTrainingSessionAllotmentRegisterLineRepository;
 
	@Autowired
	private QaChangeControlFormRepository qaChangeControlFormRepository;
	
	@Autowired
	private DeviationFormRepo deviationRepo;


	// --------------AllFORMS NUMBER GENERATION---------------------------------//
	public ResponseEntity<String> generateFormNumber(String formNumber) {
		// Determine the current financial year
		LocalDate currentDate = LocalDate.now();
		// Start year is the previous year if before April
		int startYear = currentDate.getMonthValue() < 4 ? currentDate.getYear() - 1 : currentDate.getYear();
		// End year is the next year
		int endYear = startYear + 1;
		String financialYear = String.format("%02d-%02d", startYear % 100, endYear % 100);

		String generatedNumber = "";

		int nextSequenceNumber = 1;

		String formatIdentifier = "";

		try {
			// Validate and fetch the format based on the form number
			if (QaAppConstants.inward_format_film.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "F";
			} else if (QaAppConstants.inward_format_jar.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "J";
			} else if (QaAppConstants.inward_format_stick.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "S";
			} else if (QaAppConstants.inward_format_ziplock.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "Z";
			} else if (QaAppConstants.inward_formt_carton.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "C";
			} else if (QaAppConstants.managementOfIncidence.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "";
			} else if (QaAppConstants.finalInspection.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "FIRC";
			} else if (QaAppConstants.finalInspectionCottonBuds.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "FIRCB";
			}
			else if (QaAppConstants.containerInspection.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "CIR";
			} else if (QaAppConstants.customerComplaint.equalsIgnoreCase(formNumber)) {
				formatIdentifier = "CCF";
			}
		     else if (QaAppConstants.nonConfirmityReport.equalsIgnoreCase(formNumber)) {
			formatIdentifier = "NCR";
		    }
			
		     else if (QaAppConstants.BREAKAGEREPORT.equalsIgnoreCase(formNumber)) {
					formatIdentifier = "BR";
				}
			else {
				throw new IllegalArgumentException("Unknown or invalid form number: " + formNumber);
			}

			// Use switch-case for handling multiple formats
			switch (formatIdentifier) {
			// Inward inspection flim
			case "F":
				InwardInspectionReport lastF = inwardinspectionreportrepository.fetchLastGeneratedNo(formNumber);
				if (lastF != null) {
					nextSequenceNumber = getNextSequenceNumber(lastF.getIir_no(), financialYear, "F");
				}
				generatedNumber = formatNumber(financialYear, "F", nextSequenceNumber, 4);
				break;
			// Inward inspection jar
			case "J":
				InwardInspectionReport lastJ = inwardinspectionreportrepository.fetchLastGeneratedNo(formNumber);
				if (lastJ != null) {
					nextSequenceNumber = getNextSequenceNumber(lastJ.getIir_no(), financialYear, "J");
				}
				generatedNumber = formatNumber(financialYear, "J", nextSequenceNumber, 4);
				break;
			// Inward inspection stick
			case "S":
				InwardInspectionReport lastS = inwardinspectionreportrepository.fetchLastGeneratedNo(formNumber);
				if (lastS != null) {
					nextSequenceNumber = getNextSequenceNumber(lastS.getIir_no(), financialYear, "S");
				}
				generatedNumber = formatNumber(financialYear, "S", nextSequenceNumber, 4);
				break;
			// Inward inspection ziplock
			case "Z":
				InwardInspectionReport lastZ = inwardinspectionreportrepository.fetchLastGeneratedNo(formNumber);
				if (lastZ != null) {
					nextSequenceNumber = getNextSequenceNumber(lastZ.getIir_no(), financialYear, "Z");
				}
				generatedNumber = formatNumber(financialYear, "Z", nextSequenceNumber, 4);
				break;
			// Inward inspection carton
			case "C":
				InwardInspectionReport lastC = inwardinspectionreportrepository.fetchLastGeneratedNo(formNumber);
				if (lastC != null) {
					nextSequenceNumber = getNextSequenceNumber(lastC.getIir_no(), financialYear, "C");
				}
				generatedNumber = formatNumber(financialYear, "C", nextSequenceNumber, 4);
				break;
			// Management of incidence
			case "":
				ManagementOfIncidence last = managementofincidencerepository.fetchLastGeneratedNo();
				if (last != null) {
					nextSequenceNumber = getNextSequenceNumber(last.getIncident_no(), financialYear, "");
				}
				generatedNumber = formatNumber(financialYear, "", nextSequenceNumber, 3);
				break;
			// Final Inspection
			case "FIRC":
				FinalInspectionReportF037 lastFIRC = finalinspectionreportrepositoryf037.fetchLastGeneratedNo();
				if (lastFIRC != null) {
					nextSequenceNumber = getNextSequenceNumber(lastFIRC.getFirNo(), financialYear, "FIRC");
				}
				generatedNumber = formatNumber(financialYear, "FIRC", nextSequenceNumber, 4);
				break;
				
			case "FIRCB" : 
				
				FinalInspectionReportF037 lastFIRCB = finalinspectionreportrepositoryf037.fetchLastGeneratedNoForBuds();
				if (lastFIRCB != null) {
					nextSequenceNumber = getNextSequenceNumber(lastFIRCB.getFirNo(), financialYear, "FIRCB");
				}
				generatedNumber = formatNumber(financialYear, "FIRCB", nextSequenceNumber, 4);
				break;
				
			// Container Inspection Report
			case "CIR":
				QaContainerInspectionReport lastBPR = qacontainerinspectionreportrepository.fetchLastGeneratedNo();
				if (lastBPR != null) {
					nextSequenceNumber = getNextSequenceNumber(lastBPR.getCirNo(), financialYear, "CIR");
				}
				generatedNumber = formatNumber(financialYear, "CIR", nextSequenceNumber, 5);
				break;
			// Customer Complaint Register Form
			case "CCF":
				QaCustomerComplaintRegisterForm lastCcf = qacustomercomplaintregisterformrepository
						.fetchLastGeneratedNo();
				if (lastCcf != null) {
					nextSequenceNumber = getNextSequenceNumber(lastCcf.getCcf_no(), financialYear, "CCF");
				}
				generatedNumber = formatNumber(financialYear, "CCF", nextSequenceNumber, 3);
				break;

			// Customer Complaint Register Form
			case "NCR":
				QaNonConformityReport lastNCR = qanonconformityreportrepository
						.fetchLastGeneratedNo();
				if (lastNCR != null) {
					nextSequenceNumber = getNextSequenceNumber(lastNCR.getNcrNumber(), financialYear, "NCR");
				}
				generatedNumber = formatNumber(financialYear, "NCR", nextSequenceNumber, 3);
				break;

			// Add more cases for other form formats here...
				
			case "BR":
				QaBreakageReport lastBR = qabreakagereportrepository.fetchLastGeneratedNo();
				if (lastBR != null) {
					nextSequenceNumber = getNextSequenceNumber(lastBR.getRep_seq_no(), financialYear, "BR");
				}
				generatedNumber = formatNumber(financialYear, "BR", nextSequenceNumber, 4);
				break;
 
			

			default:
				throw new IllegalArgumentException("Invalid format identifier");
			}

			// Save the generated number and format number in the database
			NumberGeneration numberGeneration = new NumberGeneration();
			numberGeneration.setFormatNo(formNumber);
			numberGeneration.setNumber(generatedNumber);

			numbergenerationrepository.save(numberGeneration);
		}catch(

	Exception ex)
	{
			String msg = "Error generating form number: " + ex.getMessage();
			log.error(msg, ex);
			return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
		}

	return new ResponseEntity<>(generatedNumber,HttpStatus.OK);
	}

	private int getNextSequenceNumber(String lastNumber, String financialYear, String formatIdentifier) {
		String[] parts = lastNumber.split("/");

		if (parts.length == 3 && parts[0].equals(financialYear) && parts[1].equals(formatIdentifier)) {

			return Integer.parseInt(parts[2]) + 1;
		}

		else if (parts.length == 2 && parts[0].equals(financialYear) && formatIdentifier.isEmpty()) {

			return Integer.parseInt(parts[1]) + 1;

		} else {

			return 1;
		}
	}

	private String formatNumber(String financialYear, String formatIdentifier, int sequenceNumber, int numDigits) {
		String formattedSequence = String.format("%0" + numDigits + "d", sequenceNumber);
		if (formatIdentifier.isEmpty()) {
			return financialYear + "/" + formattedSequence;
		} else {
			return financialYear + "/" + formatIdentifier + "/" + formattedSequence;
		}
	}
	
	public ResponseEntity<?> generateTrainingSessionNumber(String formNumber, String department) {
		// Map of department codes
		Map<String, String> departmentCodeMap = new HashMap<>();
		departmentCodeMap.put("QUALITY_ASSURANCE", "QAD01");
		departmentCodeMap.put("QUALITY_CONTROL", "QCL01");
		departmentCodeMap.put("BLEACHING", "PRD01");
		departmentCodeMap.put("SPUNLACE", "PRD02");
		departmentCodeMap.put("PAD_PUNCHING", "PRD03");
		departmentCodeMap.put("DRY_GOODS", "PRD04");
		departmentCodeMap.put("COTTON_BUDS", "PRD06");
		departmentCodeMap.put("STORE", "STR01");
		departmentCodeMap.put("ENGINEERING", "ENG01");
		departmentCodeMap.put("DISPATCH", "DIS01");
		departmentCodeMap.put("MARKETING", "MKT01");
		departmentCodeMap.put("PPC", "PPC01");
	    departmentCodeMap.put("BAG_MAKING", "PRD05");
	    departmentCodeMap.put("PURCHASE", "PUR01");
	    departmentCodeMap.put("HUMAN_RESOURCE", "HRD01");
	    departmentCodeMap.put("PACKAGING_DEVELOPMENT", "DVP01");

		String departmentCode = departmentCodeMap.get(department);

		if (departmentCode == null) {
			throw new IllegalArgumentException("Invalid department: " + department);
		}

		// Get the current year
		String year = String.valueOf(java.util.Calendar.getInstance().get(java.util.Calendar.YEAR)); // Last two digits

		String lastTwoDigitYear = year.substring(2);

		String lastSequenceNumber = "";

		Object result = null;

		int sequencePart = 0;

		String generationNumber = "";

		int sequenceNumber = 0;

		if (formNumber.equalsIgnoreCase("PH-QAD01-F-076")) {
			result = qaTrainingSessionAllotmentRegisterLineRepository.fetchLastGeneratedNo(department, year);
			sequencePart = 3; // sequence number is in 3rd part
		} else if (formNumber.equalsIgnoreCase("PH-QAD01-F-041")) {
			result = qaChangeControlFormRepository.fetchLastGeneratedNo(department, year);
			sequencePart = 2; // sequence number is in 2nd part
		} else if(formNumber.equalsIgnoreCase("PH- QAD01/F-048"))
		{
			result = deviationRepo.fetchLastGeneratedNo(department, year);
			sequencePart = 3; // sequence number is in 2nd part
		}
		

		if (result != null) {
			lastSequenceNumber = (String) result; // Cast to the correct type
		} else {
			if (formNumber.equalsIgnoreCase("PH-QAD01-F-076")) {
				return new ResponseEntity(new ApiResponse(false, "no data"), HttpStatus.OK);
			}

		}

		System.out.println(lastSequenceNumber);

		// Extract the last sequence number
		if (lastSequenceNumber != null && !lastSequenceNumber.isEmpty()) {

			String[] parts = lastSequenceNumber.split("/");
			if (parts.length >= 4) {
				String lastSeqPart = parts[sequencePart].trim();
				sequenceNumber = Integer.parseInt(lastSeqPart);
			}
		}

		if (formNumber.equalsIgnoreCase("PH-QAD01-F-076")) {
			generationNumber = String.format("TS/%s/%s/%04d", departmentCode, lastTwoDigitYear, sequenceNumber);
		} else if (formNumber.equalsIgnoreCase("PH-QAD01-F-041")) {
//			generationNumber = String.format("CCF/%s/%04d/%s", departmentCode, sequenceNumber + 1, year.trim());
			generationNumber = String.format("PCC/%s/%04d/%s", departmentCode, sequenceNumber + 1, year.trim());
		} else if(formNumber.equalsIgnoreCase("PH- QAD01/F-048")) 
		{   generationNumber = String.format("DEV/%s/%s/%04d", departmentCode,  year.trim().substring(year.length() - 2),sequenceNumber + 1);
		}

		System.out.println(generationNumber);

//		return ResponseEntity.ok(generationNumber);

		return new ResponseEntity(new ApiResponse(true, generationNumber), HttpStatus.OK);
	}
}
