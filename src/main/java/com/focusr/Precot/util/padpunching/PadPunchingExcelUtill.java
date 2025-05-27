package com.focusr.Precot.util.padpunching;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsLineF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsLineHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineCleaningCheckListHistoryF005;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MetalDetectorCheckList007History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryF001;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseCleaningCheckListF010History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseKeepingCleaningCheckListF26History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingLogBookBagMakingHistoryF003;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProcessProductControlDetailsLineHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookLinesHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailsLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingHandSanitationHistoryF24;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingSanitationListHistoryF24;
import com.focusr.Precot.mssql.database.model.padpunching.audit.RollConsumptionDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.StoppageDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;

public class PadPunchingExcelUtill {

	// F002

	public static ByteArrayResource generateF002Excel(List<DailyRollConsumptionReportHistoryF002> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get002TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF002Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get002TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");
		list.add("MACHINE_NAME");
		list.add("PRODUCTION_DETAILS_IN_BAGS");
		list.add("REMARKS");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED ON");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SIGN");

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		// MANY
		// MachineDetailsHistoryF002
		list.add("TYPE_OF_PAD");
		list.add("PRODUCT_NAME");
		list.add("BMR_NO");
		list.add("PATTERN");
		list.add("GSM");
		list.add("EDGE");
		list.add("NO_OF_PADS_STD");
		list.add("NO_OF_PADS_ACT");

		// RollConsumptionDetailsHistoryF002
		list.add("DATE");
		list.add("TIME");
		list.add("BMR_NO");
		list.add("ROLL_NO");
		list.add("SHAFT_NO");
		list.add("NET_WT");
		list.add("BALANCE_WT");

		// StoppageDetailsHistoryF002
		list.add("STOP_TIME");
		list.add("START_TIME");
		list.add("TOTAL_MIN");
		list.add("REASON");
		list.add("ATTEND_BY");
		list.add("REMARKS");

		return list;
	}

//	private static String createF002Values(Sheet sheet, Workbook workbook,
//			List<DailyRollConsumptionReportHistoryF002> reportHistory) {
//		int rowCount = 1;
//		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
//		CellStyle dateCellStyle = createDateCellStyle(workbook);
//
//		for (DailyRollConsumptionReportHistoryF002 history : reportHistory) {
//			int columnCount = 0;
//
//			// Create main record row
//			Row valueRow = sheet.createRow(rowCount++);
//
//			// Main record fields
//			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
//			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
//			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
//			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
//			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
//			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
//			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
//			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProdDetailsInBags(), cellStyle);
//			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
//
//			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getOperator_submitted_on(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getOperator_submitted_by(), cellStyle);
//			createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle);
//
//			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
//			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);
//
//			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
//			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);
//
//			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
//			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
//
//			int startColumnForNestedData = columnCount;
//
//			// Nested records
//			if (history.getMachineDetails() != null && !history.getMachineDetails().isEmpty()) {
//				for (MachineDetailsHistoryF002 details : history.getMachineDetails()) {
//					Row nestedRow = sheet.createRow(rowCount++);
//					int nestedColumnCount = startColumnForNestedData;
//
//					// Fill nested data
//					createCell(nestedRow, nestedColumnCount++, details.getTypeOfPad(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getProductName(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getBmrNo(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getPattern(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getGsm(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getEdge(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getNoOfPadsStd(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getNoOfPadsAct(), cellStyle);
//				}
//			} else {
//				// Add empty cells for nested data if none exist
//				int numberOfNestedColumns = 8;
//				for (int i = 0; i < numberOfNestedColumns; i++) {
//					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
//				}
//			}
//
//			if (history.getRollConsumptionDetails() != null && !history.getRollConsumptionDetails().isEmpty()) {
//				for (RollConsumptionDetailsHistoryF002 details : history.getRollConsumptionDetails()) {
//					Row nestedRow = sheet.createRow(rowCount++);
//					int nestedColumnCount = startColumnForNestedData;
//
//					// Fill nested data
//					createCell(nestedRow, nestedColumnCount++, details.getDate(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getTime(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getBmrNo(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getRollNo(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getShaftNo(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getNetWt(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getBalanceWt(), cellStyle);
//				}
//			} else {
//				// Add empty cells for nested data if none exist
//				int numberOfNestedColumns = 7;
//				for (int i = 0; i < numberOfNestedColumns; i++) {
//					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
//				}
//			}
//
//			if (history.getStoppageDetails() != null && !history.getStoppageDetails().isEmpty()) {
//				for (StoppageDetailsHistoryF002 details : history.getStoppageDetails()) {
//					Row nestedRow = sheet.createRow(rowCount++);
//					int nestedColumnCount = startColumnForNestedData;
//
//					// Fill nested data
//					createCell(nestedRow, nestedColumnCount++, details.getStopTime(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getStartTime(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getTotalMin(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getReason(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getAttendBy(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
//				}
//			} else {
//				// Add empty cells for nested data if none exist
//				int numberOfNestedColumns = 6;
//				for (int i = 0; i < numberOfNestedColumns; i++) {
//					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
//				}
//			}
//
//		}
//
//		return "";
//	}

	private static void createF002Values(Sheet sheet, Workbook workbook,
			List<DailyRollConsumptionReportHistoryF002> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DailyRollConsumptionReportHistoryF002 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
			createCell(valueRow, columnCount++, history.getProdDetailsInBags(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submitted_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submitted_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			// Separate starting column indexes for nested data
			int machineDetailsStartColumn = columnCount;
			int rollConsumptionStartColumn = machineDetailsStartColumn + 8; // Number of columns for MachineDetails
			int stoppageDetailsStartColumn = rollConsumptionStartColumn + 7; // Number of columns for
																				// RollConsumptionDetails

			// Fill MachineDetailsHistoryF002 data
			if (history.getMachineDetails() != null && !history.getMachineDetails().isEmpty()) {
				for (MachineDetailsHistoryF002 details : history.getMachineDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = machineDetailsStartColumn;

					createCell(nestedRow, nestedColumnCount++, details.getTypeOfPad(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProductName(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBmrNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPattern(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEdge(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNoOfPadsStd(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNoOfPadsAct(), cellStyle);
				}
			} else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 8; i++) {
					createCell(valueRow, machineDetailsStartColumn + i, "", cellStyle);
				}
			}

			// Fill RollConsumptionDetailsHistoryF002 data
			if (history.getRollConsumptionDetails() != null && !history.getRollConsumptionDetails().isEmpty()) {
				for (RollConsumptionDetailsHistoryF002 details : history.getRollConsumptionDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = rollConsumptionStartColumn;

					createCell(nestedRow, nestedColumnCount++, details.getDate(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTime(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBmrNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRollNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getShaftNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNetWt(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBalanceWt(), cellStyle);
				}
			} else {
				// Add empty cells for RollConsumptionDetails if none exist
				for (int i = 0; i < 7; i++) {
					createCell(valueRow, rollConsumptionStartColumn + i, "", cellStyle);
				}
			}

			// Fill StoppageDetailsHistoryF002 data
			if (history.getStoppageDetails() != null && !history.getStoppageDetails().isEmpty()) {
				for (StoppageDetailsHistoryF002 details : history.getStoppageDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = stoppageDetailsStartColumn;

					createCell(nestedRow, nestedColumnCount++, details.getStopTime(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStartTime(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTotalMin(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getReason(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAttendBy(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
				}
			} else {
				// Add empty cells for StoppageDetails if none exist
				for (int i = 0; i < 6; i++) {
					createCell(valueRow, stoppageDetailsStartColumn + i, "", cellStyle);
				}
			}
		}
	}

	// F003

	public static ByteArrayResource generateF003Excel(List<PunchingProductChangeOverHistoryF03> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get003TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF003Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get003TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("TIME");
		list.add("MACHINE_NAME");
		list.add("CCP_MAINTAINED_BY");
		list.add("CCP_MAINTAINED_DATE");

		list.add("PRODUCT_NAME_1");
		list.add("ORDER_NO_1");
		list.add("PO_NUMBER_1");
		list.add("LOT_NUMBER_1");
		list.add("FLEEZE_GSM_1");
		list.add("FLEEZE_PATTERN_1");
		list.add("PACK_SIZE_1");
		list.add("EDGE_CONDITION_1");
		list.add("PDS_NUMBER_1");

		list.add("PRODUCT_NAME_2");
		list.add("ORDER_NO_2");
		list.add("PO_NUMBER_2");
		list.add("LOT_NUMBER_2");
		list.add("FLEEZE_GSM_2");
		list.add("FLEEZE_PATTERN_2");
		list.add("PACK_SIZE_2");
		list.add("EDGE_CONDITION_2");
		list.add("PDS_NUMBER_2");

		list.add("INNER_BAG");
		list.add("OUTER_BAG");
		list.add("INNER_CARTON");
		list.add("OUTER_CARTON");
		list.add("FLEEZE_ROLL");

		list.add("INNER_BAG_REMARKS");
		list.add("OUTER_BAG_REMARKS");
		list.add("INNER_CARTON_REMARKS");
		list.add("OUTER_CARTON_REMARKS");
		list.add("FLEEZE_ROLL_REMARKS");

		list.add("TOOL_CHANGE_REQUIRED");
		list.add("TOOL_CHANGE_DONE");
		list.add("MACHINE_SETTING");

		list.add("TOOL_CHANGE_REQUIRED_REMARKS");
		list.add("TOOL_CHANGE_DONE_REMARKS");
		list.add("MACHINE_SETTING_REMARKS");

		list.add("METAL_DETECTOR_TEACH");
		list.add("METAL_DETECTOR_CHECK");

		list.add("METAL_DETECTOR_TEACH_REMARKS");
		list.add("METAL_DETECTOR_CHECK_REMARKS");

		list.add("PRODUCTION_CHECK");
		list.add("QUALITY_VERIFICATION");

		list.add("PRODUCTION_CHECK_REMARKS");
		list.add("QUALITY_VERIFICATION_REMARKS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("QA STATUS");
		list.add("QA SUBMITTED ON");
		list.add("QA SUBMITTED BY");
		list.add("QA SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF003Values(Sheet sheet, Workbook workbook,
			List<PunchingProductChangeOverHistoryF03> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PunchingProductChangeOverHistoryF03 history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNumber()), cellStyle);
			createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getTime(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
			createCell(valueRow, columnCount++, history.getCcpMaintainedBy(), cellStyle);
			createCell(valueRow, columnCount++, history.getCcpMaintainedDate(), cellStyle);

			createCell(valueRow, columnCount++, history.getProductName1(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo1(), cellStyle);
			createCell(valueRow, columnCount++, history.getPoNumber1(), cellStyle);
			createCell(valueRow, columnCount++, history.getLotNo1(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezeGSM1(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezePattern1(), cellStyle);
			createCell(valueRow, columnCount++, history.getPackSize1(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdgeCondition1(), cellStyle);
			createCell(valueRow, columnCount++, history.getPdsNumber1(), cellStyle);

			createCell(valueRow, columnCount++, history.getProductName2(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo2(), cellStyle);
			createCell(valueRow, columnCount++, history.getPoNumber2(), cellStyle);
			createCell(valueRow, columnCount++, history.getLotNo2(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezeGSM2(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezePattern2(), cellStyle);
			createCell(valueRow, columnCount++, history.getPackSize2(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdgeCondition2(), cellStyle);
			createCell(valueRow, columnCount++, history.getPdsNumber2(), cellStyle);

			createCell(valueRow, columnCount++, history.getInnerBag(), cellStyle);
			createCell(valueRow, columnCount++, history.getOuterBag(), cellStyle);
			createCell(valueRow, columnCount++, history.getInnerCarton(), cellStyle);
			createCell(valueRow, columnCount++, history.getOuterCarton(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezeRoll(), cellStyle);

			createCell(valueRow, columnCount++, history.getInnerBagRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOuterBagRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getInnerCartonRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOuterCartonRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFleezeRollRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getToolChangeRequired(), cellStyle);
			createCell(valueRow, columnCount++, history.getToolChangeDone(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineSetting(), cellStyle);

			createCell(valueRow, columnCount++, history.getToolChangeRequiredRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getToolChangeDoneRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineSettingRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getMetalDetectorTeach(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetalDetectorCheck(), cellStyle);

			createCell(valueRow, columnCount++, history.getMetalDetectorTeachRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetalDetectorCheckRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getProductionCheck(), cellStyle);
			createCell(valueRow, columnCount++, history.getQualityVerification(), cellStyle);

			createCell(valueRow, columnCount++, history.getProductionCheckRemarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getQualityVerificationRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F004

	public static ByteArrayResource generateF004Excel(List<DailyProdPackingDetailsHistoryF004> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get004TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF004Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get004TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");
		list.add("DEPARTMENT");
		list.add("NO_OF_CARTON_PACKED");
		list.add("NO_OF_BAGS_PACKED");
		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		// MANY
		list.add("JULIAN_CODE");
		list.add("MACHINE_NAME");
		list.add("PRODUCT_NAME");
		list.add("PO_NO");
		list.add("BMR_NO");
		list.add("NO_OF_BAGS_CARTON");
		list.add("NO_OF_CARTONS");
		list.add("NO_OF_BAGS");

		return list;
	}

	private static String createF004Values(Sheet sheet, Workbook workbook,
			List<DailyProdPackingDetailsHistoryF004> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DailyProdPackingDetailsHistoryF004 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfCartonPacked(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfBagsPacked(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			int startColumnForNestedData = columnCount;

			// Nested records
			if (history.getDetails() != null && !history.getDetails().isEmpty()) {
				for (DailyProdPackingDetailsLineHistoryF004 details : history.getDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, details.getJulianCode(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMachineName(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProductName(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPoNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBmrNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNoOfBagsCarton(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNoOfCartons(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNoOfBags(), cellStyle);
				}
			} else {
				// Add empty cells for nested data if none exist
				int numberOfNestedColumns = 8;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	// F005

	public static ByteArrayResource generateF005Excel(List<MachineCleaningCheckListHistoryF005> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get005TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF005Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get005TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
//		list.add("SHIFT");
		list.add("MACHINE_NAME");
		list.add("FREQUENCY");
		list.add("PUNCHING_UNIT_PARTS");
		list.add("PAD_PUSHER");
		list.add("PAD_EJECTOR");
		list.add("PAD_TRANSPORT_WAGON");
		list.add("CLEANING_OF_GREASE");
		list.add("CRITICAL_SENSORS");
		list.add("ROLL_UNWINDING_CONVEYOR");
		list.add("SEALING_BAG_OUT_FEED_CONVEYOR");
		list.add("TRIM_COLLECTION_TANK");
		list.add("CHILLER_UNIT_FILTER");
		list.add("CLEANING_CARRIER");
		list.add("BAG_MAGAZINE");
		list.add("CLEANED_BY");

		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF005Values(Sheet sheet, Workbook workbook,
			List<MachineCleaningCheckListHistoryF005> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (MachineCleaningCheckListHistoryF005 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
//			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			createCell(valueRow, columnCount++, history.getPunchingUnitParts(), cellStyle);

			createCell(valueRow, columnCount++, history.getPadPusher(), cellStyle);
			createCell(valueRow, columnCount++, history.getPadEjector(), cellStyle);
			createCell(valueRow, columnCount++, history.getPadTransportWagon(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleaningOfGrease(), cellStyle);
			createCell(valueRow, columnCount++, history.getCriticalSensors(), cellStyle);
			createCell(valueRow, columnCount++, history.getRollUnwindingConveyor(), cellStyle);
			createCell(valueRow, columnCount++, history.getSealingBagOutFeedConveyor(), cellStyle);

			createCell(valueRow, columnCount++, history.getTrimCollectionTank(), cellStyle);
			createCell(valueRow, columnCount++, history.getChillerUnitFilter(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleaningCarrier(), cellStyle);
			createCell(valueRow, columnCount++, history.getBagMagazine(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleanedBy(), cellStyle);

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// F006

	public static ByteArrayResource generateF006Excel(List<PunchingHandSanitationHistoryF24> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get006TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF006Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get006TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		// MANY
		list.add("SERIAL_NUMBER");
		list.add("NAME");
		list.add("ID_NUMBER");
		list.add("HOUR1");
		list.add("HOUR2");
		list.add("HOUR3");
		list.add("HOUR4");
		list.add("HOUR5");
		list.add("HOUR6");
		list.add("HOUR7");
		list.add("HOUR8");
		list.add("REMARKS");

		return list;
	}

	private static String createF006Values(Sheet sheet, Workbook workbook,
			List<PunchingHandSanitationHistoryF24> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PunchingHandSanitationHistoryF24 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			int startColumnForNestedData = columnCount;

			// Nested records
			if (history.getSanitizationList() != null && !history.getSanitizationList().isEmpty()) {
				for (PunchingSanitationListHistoryF24 details : history.getSanitizationList()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSerialNumber()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getName(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIdNumber(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getHour8(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
				}
			} else {
				// Add empty cells for nested data if none exist
				int numberOfNestedColumns = 12;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	// F007

	public static ByteArrayResource generateF007Excel(List<MetalDetectorCheckList007History> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get007TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF007Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get007TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
		list.add("EQUIPMENT_NAME");
		list.add("FREQUENCY");

		list.add("METAL_CONTAMINATED_MATERIALS");
		list.add("NO_OF_METAL_CONTAMINANTS");
		list.add("CLEANED_BY");
		list.add("FUNCTION_CHECK");
		list.add("REMARKS");

		// STATUS COLUMNS
		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF007Values(Sheet sheet, Workbook workbook,
			List<MetalDetectorCheckList007History> details) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (MetalDetectorCheckList007History history : details) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getEquipmentName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);

			createCell(valueRow, columnCount++, history.getMetalContaminatedMaterials(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfMetalContaminants(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleanedBy(), cellStyle);
			createCell(valueRow, columnCount++, history.getFunctionCheck(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F014

	public static ByteArrayResource generateF014Excel(List<BagMakingSpecificationDetailsHistoryF014> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get014TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF014Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get014TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");
		list.add("MACHINE_NAME");
		list.add("PRODUCT_NAME");
		list.add("REMARKS");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED ON");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		// MANY
		list.add("SIDE_SEAL_TEMP");
		list.add("THREAD_SEAL_TEMP");
		list.add("THREAD_SEAL_PRESSURE");
		list.add("MAIN_AIR_PRESSURE");

		list.add("LENGTH_SPECIFICATION");
		list.add("LENGTH_1");
		list.add("LENGTH_2");
		list.add("LENGTH_3");
		list.add("LENGTH_4");
		list.add("LENGTH_5");
		list.add("LENGTH_6");
		list.add("LENGTH_7");
		list.add("LENGTH_8");

		list.add("WIDTH_SPECIFICATION");
		list.add("WIDTH_1");
		list.add("WIDTH_2");
		list.add("WIDTH_3");
		list.add("WIDTH_4");
		list.add("WIDTH_5");
		list.add("WIDTH_6");
		list.add("WIDTH_7");
		list.add("WIDTH_8");

		list.add("BOTTOM_GUSSET_SPECIFICATION");
		list.add("BOTTOM_GUSSET_1");
		list.add("BOTTOM_GUSSET_2");
		list.add("BOTTOM_GUSSET_3");
		list.add("BOTTOM_GUSSET_4");
		list.add("BOTTOM_GUSSET_5");
		list.add("BOTTOM_GUSSET_6");
		list.add("BOTTOM_GUSSET_7");
		list.add("BOTTOM_GUSSET_8");

		list.add("TOP_GUSSET_SPECIFICATION");
		list.add("TOP_GUSSET_1");
		list.add("TOP_GUSSET_2");
		list.add("TOP_GUSSET_3");
		list.add("TOP_GUSSET_4");
		list.add("TOP_GUSSET_5");
		list.add("TOP_GUSSET_6");
		list.add("TOP_GUSSET_7");
		list.add("TOP_GUSSET_8");

		list.add("FILM_THICKNESS_SPECIFICATION");
		list.add("FILM_THICKNESS_1");
		list.add("FILM_THICKNESS_2");
		list.add("FILM_THICKNESS_3");
		list.add("FILM_THICKNESS_4");
		list.add("FILM_THICKNESS_5");
		list.add("FILM_THICKNESS_6");
		list.add("FILM_THICKNESS_7");
		list.add("FILM_THICKNESS_8");

		list.add("EMPTY_BAG_WEIGHT_SPECIFICATION");
		list.add("EMPTY_BAG_WEIGHT_1");
		list.add("EMPTY_BAG_WEIGHT_2");
		list.add("EMPTY_BAG_WEIGHT_3");
		list.add("EMPTY_BAG_WEIGHT_4");
		list.add("EMPTY_BAG_WEIGHT_5");
		list.add("EMPTY_BAG_WEIGHT_6");
		list.add("EMPTY_BAG_WEIGHT_7");
		list.add("EMPTY_BAG_WEIGHT_8");

		return list;
	}

	private static String createF014Values(Sheet sheet, Workbook workbook,
			List<BagMakingSpecificationDetailsHistoryF014> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (BagMakingSpecificationDetailsHistoryF014 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submitted_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submitted_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			int startColumnForNestedData = columnCount;

			// Nested records
			if (history.getDetails() != null && !history.getDetails().isEmpty()) {
				for (ProcessProductControlDetailsLineHistoryF014 details : history.getDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSideSealTemp()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getThreadSealTemp()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getThreadSealPressure()),
							cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getMainAirPressure()), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getLenSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength8(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getWidthSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidht8(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getBottomGussetSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBottomGusset8(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getTopGussetSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTopGusset8(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getFilmThicknessSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFilmThickness8(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWtSpecification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEmptyBagWt8(), cellStyle);
				}
			} else {
				// Add empty cells for nested data if none exist
				int numberOfNestedColumns = 58;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	// F001

	public static ByteArrayResource generateF001Excel(List<ProductionDetailLogBookHistory01> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get001TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF001Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get001TitleLables() {
		List<String> list = new ArrayList<>();

		// one
		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");

		list.add("PH_MALE_EMP_REQ");
		list.add("PH_MALE_PRESENT");

		list.add("PH_FEMALE_EMP_REQ");
		list.add("PH_FEMALE_PRESENT");

		list.add("CONT_MALE_EMP_REQ");
		list.add("CON_MALE_PRESENT");

		list.add("CON_FEMALE_EMP_REQ");
		list.add("CON_FEMALE_PRESENT");

		list.add("REMARKS");
		
		// STATUS COLUMNS
		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");
		
		list.add("REASON");
		list.add("VERSION");

		// many
		list.add("MACHINE_NAME");
		list.add("MAN_POWER_ALLOCATION");

		list.add("RUNNING_PRODUCT_NAME");
		list.add("NEXT_PRODUCT_NAME");

		list.add("RUNNING_ORDER_NO");
		list.add("NEXT_ORDER_NO");

		list.add("RUNNING_PO_NUMBER");
		list.add("NEXT_PO_NUMBER");

		list.add("RUNNING_OPENING_QTY");
		list.add("NEXT_OPENING_QTY");

		list.add("RUNNING_PACKED_QTY");
		list.add("NEXT_PACKED_QTY");

		list.add("RUNNING_BALANCR_QTY");
		list.add("NEXT_BALANCE_QTY");

		list.add("RUNNING_STATUS");
		list.add("NEXT_STATUS");

		

		return list;
	}

	private static String createF001Values(Sheet sheet, Workbook workbook,
			List<ProductionDetailLogBookHistory01> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (ProductionDetailLogBookHistory01 history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			createCell(valueRow, columnCount++, String.valueOf(history.getPh_male_emp_req()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getPh_male_present()), cellStyle);

			createCell(valueRow, columnCount++, String.valueOf(history.getPh_female_emp_req()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getPh_female_present()), cellStyle);

			createCell(valueRow, columnCount++, String.valueOf(history.getCont_male_emp_req()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getCon_male_present()), cellStyle);

			createCell(valueRow, columnCount++, String.valueOf(history.getCon_female_emp_req()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getCon_female_present()), cellStyle);

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			int startColumnForNestedData = columnCount;

			// Nested records
			if (history.getDetails() != null && !history.getDetails().isEmpty()) {
				for (ProductionDetailLogBookLinesHistory01 details : history.getDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, details.getMachine_name(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMan_power_allocation(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRunning_product_name(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNext_product_name(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRunning_order_no(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNext_order_no(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRunning_po_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNext_po_number(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getRunning_opening_qty()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNext_opening_qty()), cellStyle);

					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getRunning_packed_qty()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNext_packed_qty()), cellStyle);

					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getRunning_balancr_qty()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNext_balance_qty()), cellStyle);

					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getRunning_status()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNext_status()), cellStyle);
				}
			} else {
				// Add empty cells for nested data if none exist
				int numberOfNestedColumns = 16;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	
	
	// F26(CODE) - F15 (APP_CONSTANT)

	public static ByteArrayResource generateF26Excel(List<PadPunchingHouseKeepingCleaningCheckListF26History> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get026TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF026Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get026TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("FREQUENCY");

		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");

		list.add("FLOOR_CLEANING");
		list.add("REMOVEL_UNWANTED_METERIALS");
		list.add("SIDE_WALL_CORNERS");
		list.add("WINDOWS");
		list.add("FLOOR_CLEANING_WET");
		list.add("EMERGENCY_DOOR");
		list.add("FIRE_EXTINGUISHERS");
		list.add("FIRST_AID_BOX");
		list.add("RAPID_DOORS");
		list.add("CLIMATE_CONTROLLER");
		list.add("FALSE_CEILING");
		list.add("TRAINED_PERSON");

		list.add("REMARKS");
//		list.add("MAIL_STATUS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HR STATUS");
		list.add("HR SUBMITTED BY");
		list.add("HR SUBMITTED ON");
		list.add("HR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF026Values(Sheet sheet, Workbook workbook,
			List<PadPunchingHouseKeepingCleaningCheckListF26History> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PadPunchingHouseKeepingCleaningCheckListF26History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRefSopNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);

			createCell(valueRow, columnCount++, history.getFloor_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemovel_unwanted_meterials(), cellStyle);

			createCell(valueRow, columnCount++, history.getSide_wall_corners(), cellStyle);
			createCell(valueRow, columnCount++, history.getWindows(), cellStyle);
			createCell(valueRow, columnCount++, history.getFloor_cleaning_wet(), cellStyle);
			createCell(valueRow, columnCount++, history.getEmergency_door(), cellStyle);
			createCell(valueRow, columnCount++, history.getFire_extinguishers(), cellStyle);
			createCell(valueRow, columnCount++, history.getFirst_aid_box(), cellStyle);
			createCell(valueRow, columnCount++, history.getRapid_doors(), cellStyle);
			createCell(valueRow, columnCount++, history.getClimate_controller(), cellStyle);
			createCell(valueRow, columnCount++, history.getFalse_ceiling(), cellStyle);
			createCell(valueRow, columnCount++, history.getTrained_person(), cellStyle);

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
//			createCell(valueRow, columnCount++, history.getMail_status(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHr_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHr_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHr_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHr_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F009(APP_CONSTAT) - F10(CODE)

	public static ByteArrayResource generateF10Excel(List<PadPunchingHouseCleaningCheckListF010History> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get010TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF010Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get010TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("FREQUENCY");

		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");

		list.add("DEPARTMENT");

		list.add("FLOOR_CLEANING");
		list.add("REMOVEL_UNWANTED_METERIALS");
		list.add("SIDE_WALL_CORNERS");
		list.add("FLOOR_CLEANING_WET");
		list.add("EMERGENCY_DOOR");
		list.add("FIRE_EXTINGUISHERS");
		list.add("FIRST_AID_BOX");

		list.add("FALSE_CEILING");
		list.add("TRAINED_PERSON");

		list.add("REMARKS");
//		list.add("MAIL_STATUS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HR STATUS");
		list.add("HR SUBMITTED BY");
		list.add("HR SUBMITTED ON");
		list.add("HR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF010Values(Sheet sheet, Workbook workbook,
			List<PadPunchingHouseCleaningCheckListF010History> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PadPunchingHouseCleaningCheckListF010History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRefSopNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

			createCell(valueRow, columnCount++, history.getFloor_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemovel_unwanted_meterials(), cellStyle);

			createCell(valueRow, columnCount++, history.getSide_wall_corners(), cellStyle);
			createCell(valueRow, columnCount++, history.getFloor_cleaning_wet(), cellStyle);
			createCell(valueRow, columnCount++, history.getEmergency_door(), cellStyle);
			createCell(valueRow, columnCount++, history.getFire_extinguishers(), cellStyle);
			createCell(valueRow, columnCount++, history.getFirst_aid_box(), cellStyle);
			createCell(valueRow, columnCount++, history.getFalse_ceiling(), cellStyle);
			createCell(valueRow, columnCount++, history.getTrained_person(), cellStyle);

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
//			createCell(valueRow, columnCount++, history.getMail_status(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHr_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHr_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHr_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHr_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F013(APP_CONSTAT) - F001(CODE)

	public static ByteArrayResource generateBagMakingF001Excel(
			List<PadPunchingBagMakingDailyProductionDetailsHistoryF001> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getBagMaking001TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createBagMakingF001Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getBagMaking001TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");

		list.add("DATE");
		list.add("SHIFT");

		list.add("TOTAL_PRODUCTION_DETAILS_IN_BAG");

		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED ON");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createBagMakingF001Values(Sheet sheet, Workbook workbook,
			List<PadPunchingBagMakingDailyProductionDetailsHistoryF001> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PadPunchingBagMakingDailyProductionDetailsHistoryF001 history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getSopNumber()), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotalProductionDetailsInBag(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submitted_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submitted_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F012(APP_CONSTAT) - F003(CODE)

	public static ByteArrayResource generateExcelLogBookF003(List<PadPunchingLogBookBagMakingHistoryF003> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBook003TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF003Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBook003TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");

		list.add("MACHINE_ALLOCATION_PRODUCTION_DETAIL");
		list.add("MACHINE_NO1");
		list.add("MACHINE_NO2");

		list.add("MANPOWER_ALLOCATION1");
		list.add("MANPOWER_ALLOCATION2");
//		list.add("MANPOWER_ALLOCATION3");
//		list.add("MANPOWER_ALLOCATION4");

		list.add("ORDER_NO1");
		list.add("ORDER_NO2");
		list.add("ORDER_NO3");
		list.add("ORDER_NO4");
//		list.add("ORDER_NO5");
//		list.add("ORDER_NO6");
//		list.add("ORDER_NO7");
//		list.add("ORDER_NO8");

		list.add("PRODUCT_NAME1");
		list.add("PRODUCT_NAME2");
		list.add("PRODUCT_NAME3");
		list.add("PRODUCT_NAME4");
//		list.add("PRODUCT_NAME5");
//		list.add("PRODUCT_NAME6");
//		list.add("PRODUCT_NAME7");
//		list.add("PRODUCT_NAME8");
		
		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED ON");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF003Values(Sheet sheet, Workbook workbook,
			List<PadPunchingLogBookBagMakingHistoryF003> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PadPunchingLogBookBagMakingHistoryF003 history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getSopNumber()), cellStyle);

			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			createCell(valueRow, columnCount++, history.getMachineAllocationAndProductionDetail(), cellStyle);

			createCell(valueRow, columnCount++, history.getMachineNo1(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineNo2(), cellStyle);

			createCell(valueRow, columnCount++, history.getManpowerAllocation1(), cellStyle);
			createCell(valueRow, columnCount++, history.getManpowerAllocation2(), cellStyle);
//			createCell(valueRow, columnCount++, history.getManpowerAllocation3(), cellStyle);
//			createCell(valueRow, columnCount++, history.getManpowerAllocation4(), cellStyle);

			createCell(valueRow, columnCount++, history.getOrderNo1(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo2(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo3(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo4(), cellStyle);
//			createCell(valueRow, columnCount++, history.getOrderNo5(), cellStyle);
//			createCell(valueRow, columnCount++, history.getOrderNo6(), cellStyle);
//			createCell(valueRow, columnCount++, history.getOrderNo7(), cellStyle);
//			createCell(valueRow, columnCount++, history.getOrderNo8(), cellStyle);

			createCell(valueRow, columnCount++, history.getProductName1(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductName2(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductName3(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductName4(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProductName5(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProductName6(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProductName7(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProductName8(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submitted_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submitted_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

	// F008(APP_CONSTAT) - F21(CODE) - Sanitization Of Machines & Surfaces

	public static ByteArrayResource generateF21Excel(
			List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF21TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF21Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getF21TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");

		list.add("MACHINE_NAME");
		list.add("DATE");
		list.add("WEEK_NO");
		list.add("MONTH");
		list.add("YEAR");

		list.add("NAME_OF_CHEMICAL");
		list.add("CHEMICAL_BATCH_NUMBER");
		list.add("EXP_DATE");
		list.add("ROLL_FEEDING_AREA_CONVEYOR");
		list.add("PUNCHING_TOOLS");
		list.add("TOOLS_DIES_SURFACES");
		list.add("TRAVEL_ROLLERS");
		list.add("CARRIERS_WAGON_MAGAZINE");
		list.add("PUSHERS");
		list.add("CHUTE_FOR_FALU");
		list.add("CUTTING_TABLE");
		list.add("CUTTING_BLADES");
		list.add("ALL_PACKING_TABLES");
		list.add("SANITIZED_BY");

		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("SUPERVISOR STATUS");
		list.add("SUPERVISOR SUBMITTED ON");
		list.add("SUPERVISOR SUBMITTED BY");
		list.add("SUPERVISOR SIGN");

		list.add("HOD STATUS");
		list.add("HOD SUBMITTED ON");
		list.add("HOD SUBMITTED BY");
		list.add("HOD SIGN");

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createF21Values(Sheet sheet, Workbook workbook,
			List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21 history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getSopNumber()), cellStyle);
			createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeekNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);

			createCell(valueRow, columnCount++, history.getNameOfChemical(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemicalBatchNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getExpDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getRollFeedingAreaConveyor(), cellStyle);
			createCell(valueRow, columnCount++, history.getPunchingTools(), cellStyle);
			createCell(valueRow, columnCount++, history.getToolsDiesSurfaces(), cellStyle);
			createCell(valueRow, columnCount++, history.getTravelRollers(), cellStyle);
			createCell(valueRow, columnCount++, history.getCarriersWagonMagazine(), cellStyle);
			createCell(valueRow, columnCount++, history.getPushers(), cellStyle);
			createCell(valueRow, columnCount++, history.getChuteForFalu(), cellStyle);
			createCell(valueRow, columnCount++, history.getCuttingTable(), cellStyle);
			createCell(valueRow, columnCount++, history.getCuttingBlades(), cellStyle);
			createCell(valueRow, columnCount++, history.getAllPackingTables(), cellStyle);
			createCell(valueRow, columnCount++, history.getSanitizedBy(), cellStyle);

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		}

		return "";
	}

//		=============================================================================================================================================

	// common
	private static void createCell(Row row, int columnIndex, String value, Workbook workbook) {
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createDateCell(Row row, int columnIndex, Date value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		if (value != null) {
			cell.setCellValue(value);
		} else {
			cell.setCellValue("");
		}
		cell.setCellStyle(cellStyle);
	}

	private static CellStyle setValueCellColor(Workbook workbook, HorizontalAlignment alignment, boolean wrapText,
			short color) {
		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(alignment);
		cellStyle.setWrapText(wrapText);
		// Set additional styling here, if needed
		return cellStyle;
	}

	private static CellStyle createDateCellStyle(Workbook workbook) {
		CellStyle cellStyle = workbook.createCellStyle();
		DataFormat format = workbook.createDataFormat();
		cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
		return cellStyle;
	}

}
