package com.focusr.Precot.util.bleaching;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonTypesHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContRawCottonHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContAbsBleachedCottonHistoryF18;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContRawCottonF05History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContaminationTypesHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookCakePressHistoryF09;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookHistoryF33;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02A;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMachineCleaningRecordHistoryF16;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMetalDetectorCheckListHistoryF03;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMixingChangeMachineCleaningHistoryF38;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationListHistoryF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationOfMechineAndSurfaceHistoryF01;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachShiftLogBookHistoryF36;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachingJobcard13History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.EquipLogBookHydroExtractorHistoryF11;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.ActivitiesF01RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.itextpdf.io.source.ByteArrayOutputStream;

public class BleachingExcelUtil {

	Logger logger = LoggerFactory.getLogger(BleachingExcelUtil.class);

	@Autowired
	private ActivitiesF01RepositoryHistory smsActivitiesRepo;

	public ResponseEntity<?> laydownCheckListAuditReport(List<BleachLayDownCheckListF42History> laydownHistories,
			String laydownNo) {

		String SHEET = "Laydown_Checklist" + "PRD01_F001";

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		Workbook workbook = new XSSFWorkbook();

		InputStreamResource file = null;

		String fileName = "Laydown_Check_List";
		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow(sheet, workbook);

			String nullValueStr = createPendingReportValues(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {

				return new ResponseEntity(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg), HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);

	}

	private void createPendingReportTitleRow(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private CellStyle setValueCellColor(Workbook workbook, HorizontalAlignment align, boolean isBold, short s) {

		XSSFFont font = (XSSFFont) workbook.createFont();

		if (isBold) {

			font.setBold(true);
		}

		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(align);

		if (s >= 0) {

			cellStyle.setFillForegroundColor(s);
			cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}

		cellStyle.setFont(font);
		cellStyle.setWrapText(true);
		return cellStyle;

	}

	private List<String> getPendingReportTitleLables() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");

		list.add("LAYDOWN NUMBER");
		list.add("BMR NUMBER");
		list.add("LAYDOWN START DATE");
		list.add("LAYDOWN START TIME");
		list.add("LAYDOWN END DATE");
		list.add("LAYDOWN END TIME");
		list.add("CHECKING BALE CONDIITONS");
		list.add("FORKLIT CLEANINGNESS");
		list.add("LAYDOWN PLACE CLEANINGNESS");
		list.add("SUPPLIED BALES TYPE");
		list.add("CUTTING STRAP TOOLS");
		list.add("PACKING MATERIAL COVER TYPE");
		list.add("WASTE BAG TYPE");
		list.add("CONTAMINATION INSPECTION");
		list.add("CONTAMINATION SAMPLES KEPT");
		list.add("SAMPLES CONTAINS DATE,SHIFT,BMR");

		list.add("REMARKS");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues(Sheet sheet, Workbook workbook,
			List<BleachLayDownCheckListF42History> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachLayDownCheckListF42History history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F001", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F42a, cellStyle);

			createCell(valueRow, columnCount++, history.getLayDownNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getLayDownStartdate(), cellStyle);
			createCell(valueRow, columnCount++, history.getLayDownStartTime(), cellStyle);
			createCell(valueRow, columnCount++, history.getLayDownEnddate(), cellStyle);
			createCell(valueRow, columnCount++, history.getLayDownEndTime(), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getCheckBaleCondition(), cellStyle);
			createCell(valueRow, columnCount++, history.getCheckForkliftClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getCheckCleanLayDown(), cellStyle);
			createCell(valueRow, columnCount++, history.getSuppliedBales(), cellStyle);
			createCell(valueRow, columnCount++, history.getToolsForCuttingStraps(), cellStyle);
			createCell(valueRow, columnCount++, history.getPackingMaterial(), cellStyle);
			createCell(valueRow, columnCount++, history.getTypeOfBags(), cellStyle);
			createCell(valueRow, columnCount++, history.getContaminationInspection(), cellStyle);
			createCell(valueRow, columnCount++, history.getLayDownWise(), cellStyle);
			createCell(valueRow, columnCount++, history.getReferenceSample(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	private void createCell(Row row, int columnCount, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnCount);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private void createDateCell(Row row, int columnCount, Date date, CellStyle cellStyle) {
		Cell cell = row.createCell(columnCount);
		if (date != null) {
			String formattedDate = new SimpleDateFormat("dd-MM-yyyy HH:mm").format(date);
			cell.setCellValue(formattedDate);
		} else {
			cell.setCellValue("");
		}
		cell.setCellStyle(cellStyle);
	}

	// EXCELL F11

	public ResponseEntity<?> laydownCheckListAuditReportF11(
			List<EquipLogBookHydroExtractorHistoryF11> laydownHistories) {
		String SHEET = "EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR" + "PRD01_F008";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow11(sheet, workbook);

			String nullValueStr = createPendingReportValues11(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow11(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables11();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables11() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");

		list.add("BMR NUMBER");
		list.add("SUB BATCH NO");
		list.add("MIXING");
		list.add("MC NO");
		list.add("TIMER SETTING");

		list.add("Remarks");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues11(Sheet sheet, Workbook workbook,
			List<EquipLogBookHydroExtractorHistoryF11> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (EquipLogBookHydroExtractorHistoryF11 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F008", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F11, cellStyle);

			createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getSubBatchNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getMcNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getTimerSetting(), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-18

	public ResponseEntity<?> laydownCheckListAuditReportF18(

			List<BleachContAbsBleachedCottonHistoryF18> laydownHistories) {

		String SHEET = "BLEACH_CONT_ABS_BLEACHED_COTTON" + "PRD01_F012";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_CONT_ABS_BLEACHED_COTTON_F012";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow18(sheet, workbook);

			String nullValueStr = createPendingReportValues18(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow18(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables18();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables18() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("BMR NO");
		list.add("BALE NO");
		list.add("BATCH NO");
		list.add("QUANTITY");
		list.add("REMARKS");

		// CONTENT

		list.add("NO OF HAIR");
		list.add("REF HAIR");
		list.add("NO OF JUTE");
		list.add("REF JUTE");
		list.add("NO OF COLOUR THREAD");
		list.add("REF COLOUR THREAD");
		list.add("NO OF WRAPPER");
		list.add("REF WRAPPER");
		list.add("NO OF METAL");
		list.add("REF METAL");
		list.add("NO OF RUST");
		list.add("REF RUST");
		list.add("NO OF PLASTIC");
		list.add("REF PLASTIC");
		list.add("NO OF BLACK COTTON");
		list.add("REF BLACK COTTON");
		list.add("NO OF UNBLEACHED COTTON");
		list.add("REF UNBLEACHED COTTON");
		list.add("NO OF OIL COTTON");
		list.add("REF OIL COTTON");
		list.add("NO OF SOIL");
		list.add("REF SOIL");
		list.add("NO OF YELLOW COTTON");
		list.add("REF YELLOW COTTON");
		list.add("NO OF PAPER");
		list.add("REF PAPER");
		list.add("NO OF STICK");
		list.add("REF STICK");
		list.add("NO OF FEATHER");
		list.add("REF FEATHER");
		list.add("NO OF CLOTH");
		list.add("REF CLOTH");
		list.add("NO OF WHITE POLY PROPYLENE");
		list.add("REF WHITE POLY PROPYLENE");
		list.add("NO OF COLOUR POLY PROPYLENE");
		list.add("REF COLOUR POLY PROPYLENE");
		list.add("NO OF RUBBER PIECE");
		list.add("REF RUBBER PIECE");
		list.add("TOTAL");
		list.add("REFTOTAL");
		list.add("UNIT");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues18(Sheet sheet, Workbook workbook,
			List<BleachContAbsBleachedCottonHistoryF18> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachContAbsBleachedCottonHistoryF18 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F012", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F18, cellStyle);

			createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getBaleNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getBatchNo()), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQuantity()), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle); // String

			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfHair()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefHair(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfJute()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefJute(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfColourThread()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefColourThread(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfWrapper()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefWrapper(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfMetal()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefMetal(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfRust()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefRust(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfPlastic()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefPlastic(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfBlackCotton()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefBlackCotton(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfUnBleachedCotton()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefUnBleachedCotton(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfOilCotton()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefOilCotton(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfSoil()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefSoil(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfYellowCotton()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefYellowCotton(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfPaper()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefPaper(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfStick()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefStick(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfFeather()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefFeather(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfCloth()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefCloth(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfwhitePolyPropylene()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefWhitePolyPropylene(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfColourPolyPropylene()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefColourPolyPropylene(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfRubberPiece()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefRubberPiece(), cellStyle); // String
			createCell(valueRow, columnCount++, String.valueOf(history.getTotal()), cellStyle); // Long
			createCell(valueRow, columnCount++, history.getRefTotal(), cellStyle); // String
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle); // String

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-05 EXCEL DOWNLOAD

	public ResponseEntity<?> RawCottonAuditReportF05(

			List<BleachContRawCottonF05History> laydownHistories) {

		String SHEET = "BLEACH_CONT_RAW_COTTON" + "PRD01_F004";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_CONT_RAW_COTTON_F004";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow05(sheet, workbook);

			String nullValueStr = createPendingReportValues05(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow05(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables05();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables05() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("PH NO");
		list.add("QUANTITY");
		list.add("SUPPLIER NAME");

		// CONTENT

		list.add("NO_OF_HAIR");
		list.add("REF_HAIR");
		list.add("NO_OF_JUTE");
		list.add("REF_JUTE");
		list.add("NO_OF_COLOUR_THREAD");
		list.add("REF_COLOUR_THREAD");
		list.add("NO_OF_WRAPPER");
		list.add("REF_WRAPPER");
		list.add("NO_OF_METAL");
		list.add("REF_METAL");
		list.add("NO_OF_RUST");
		list.add("REF_RUST");
		list.add("NO_OF_PLASTIC");
		list.add("REF_PLASTIC");
		list.add("NO_OF_BLACK_COTTON");
		list.add("REF_BLACK_COTTON");
		list.add("NO_OF_OIL_COTTON");
		list.add("REF_OIL_COTTON");
		list.add("NO_OF_SOIL");
		list.add("REF_SOIL");
		list.add("NO_OF_YELLOW_COTTON");
		list.add("REF_YELLOW_COTTON");
		list.add("NO_OF_PAPER");
		list.add("REF_PAPER");
		list.add("NO_OF_STICK");
		list.add("REF_STICK");
		list.add("NO_OF_FEATHER");
		list.add("REF_FEATHER");
		list.add("NO_OF_CLOTH");
		list.add("REF_CLOTH");
		list.add("NO_OF_WHITE_POLY_PROPYLENE");
		list.add("REF_WHITE_POLY_PROPYLENE");
		list.add("NO_OF_COLOUR_POLY_PROPYLENE");
		list.add("REF_COLOUR_POLY_PROPYLENE");
		list.add("NO_OF_RUBBER_PIECE");
		list.add("REF_RUBBER_PIECE");
		list.add("TOTAL");
		list.add("REF_TOTAL");
		list.add("UNIT");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues05(Sheet sheet, Workbook workbook,
			List<BleachContRawCottonF05History> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachContRawCottonF05History history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F004", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F05, cellStyle);

			createCell(valueRow, columnCount++, history.getPhNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQuantity()), cellStyle);
			createCell(valueRow, columnCount++, history.getSupplierName(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfHair()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefHair(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfJute()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefJute(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfColourThread()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefColourThread(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfWrapper()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefWrapper(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfMetal()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefMetal(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfRust()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefRust(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfPlastic()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefPlastic(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfBlackCotton()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefBlackCotton(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfOilCotton()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefOilCotton(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfSoil()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSoil(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfYellowCotton()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefYellowCotton(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfPaper()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefPaper(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfStick()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefStick(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfFeather()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefFeather(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfCloth()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefCloth(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfwhitePolyPropylene()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefWhitePolyPropylene(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfColourPolyPropylene()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefColourPolyPropylene(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getNoOfRubberPiece()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefRubberPiece(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getTotal()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefTotal(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-03 EXCEL DOWNLOAD

	public ResponseEntity<?> MetalDetectorReportF03(

			List<BleachMetalDetectorCheckListHistoryF03> laydownHistories) {

		String SHEET = "BLEACH_METAL_DETECTOR_CHECK_LIST" + "PRD01_F002";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_METAL_DETECTOR_CHECK_LIST_F002";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow03(sheet, workbook);

			String nullValueStr = createPendingReportValues03(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow03(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables03();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables03() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("SECTION");
		list.add("UNIT");
		list.add("REMARKS");

		// CONTENT

		list.add("EQUIPMENT NAME");
		list.add("FREQUENCY");
		list.add("DATE");
		list.add("METAL CONTAMINATED MATERIALS");
		list.add("NO OF METAL CONTAMINANTS");
		list.add("FUNCTION CHECK");
		list.add("CLEANED BY");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues03(Sheet sheet, Workbook workbook,
			List<BleachMetalDetectorCheckListHistoryF03> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachMetalDetectorCheckListHistoryF03 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F002", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F03, cellStyle);

			createCell(valueRow, columnCount++, history.getSection(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);

			// REMARKS

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, history.getEquipmentName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetalContaminatedMaterials(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfMetalContaminants(), cellStyle);
			createCell(valueRow, columnCount++, history.getFunctionCheck(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleanedBy(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-33 EXCEL DOWNLOAD

	public ResponseEntity<?> EquipmentUsageReportF33(

			List<BleachEquipmentUsageLogBookHistoryF33> laydownHistories) {

		String SHEET = "BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY" + "PRD01_F015";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F015";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow33(sheet, workbook);

			String nullValueStr = createPendingReportValues33(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow33(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables33();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables33() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("UNIT");
		list.add("BALE NO");
		list.add("DATE");
		list.add("REMARKS");

		// CONTENT

		list.add("WASTE CODE");
		list.add("GROSS WEIGHT");
		list.add("NET WEIGHT");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues33(Sheet sheet, Workbook workbook,
			List<BleachEquipmentUsageLogBookHistoryF33> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachEquipmentUsageLogBookHistoryF33 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F015", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F33a, cellStyle);

			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getBale_no(), cellStyle);
			
			DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	        String wo = history.getDate();

	        LocalDate date = LocalDate.parse(wo, inputFormatter);
	        String dateString = date.format(outputFormatter);
			
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);

			// REMARKS

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, history.getWaste_code(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight(), cellStyle);
			createCell(valueRow, columnCount++, history.getNet_weight(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-36 EXCEL DOWNLOAD

	public ResponseEntity<?> ShiftLogBookReportF36(

			List<BleachShiftLogBookHistoryF36> laydownHistories) {

		String SHEET = "BLEACH_SHIFT_LOGBOOK" + "PRD01_F013";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_SHIFT_LOGBOOK_F013";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow36(sheet, workbook);

			String nullValueStr = createPendingReportValues36(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow36(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables36();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables36() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("UNIT");
		list.add("BMR NO");
//		list.add("LAY DOWN NO");
		list.add("DATE");
		list.add("SHIFT");
		list.add("REMARKS");

		// CONTENT

		list.add("CAKE PRESS 1");
		list.add("CAKE PRESS 2");
		list.add("KIER 1");
		list.add("KIER 2");
		list.add("KIER 3");
		list.add("HYDRO 1");
		list.add("HYDRO 2");
		list.add("CAKEOPENER DRYER AB BALE PRESS");
		list.add("NO OF BALES");
		list.add("WEIGHT IN KG");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues36(Sheet sheet, Workbook workbook,
			List<BleachShiftLogBookHistoryF36> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachShiftLogBookHistoryF36 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F013", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F36, cellStyle);

			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
//			createCell(valueRow, columnCount++, history.getLaydownNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			// REMARKS

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, history.getCakePress1(), cellStyle);
			createCell(valueRow, columnCount++, history.getCakePress2(), cellStyle);
			createCell(valueRow, columnCount++, history.getKier1(), cellStyle);
			createCell(valueRow, columnCount++, history.getKier2(), cellStyle);
			createCell(valueRow, columnCount++, history.getKier3(), cellStyle);
			createCell(valueRow, columnCount++, history.getHydro1(), cellStyle);
			createCell(valueRow, columnCount++, history.getHydro2(), cellStyle);
			createCell(valueRow, columnCount++, history.getCakeopenerDryerAbBalePress(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfBales(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeightInKg(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-02 EXCEL DOWNLOAD

	public ResponseEntity<?> HouseKeepingReportF02(

			List<BleachHouseKeepingCheckListHistoryF02> laydownHistories) {

		String SHEET = "BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST" + "PRD01_F02";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow02(sheet, workbook);

			String nullValueStr = createPendingReportValues02(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow02(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables02();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables02() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("UNIT");
		list.add("FREQUENCY");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
		list.add("DEPARTMENT");

		list.add("Remarks");

		// CONTENT

		list.add("FLOOR CLEANING");
		list.add("REMOVAL UNWANTED METERIALS");
		list.add("SIDE WALL CORNERS");
		list.add("WINDOWS");
		list.add("DRINK WATER TANK");
		list.add("EMERGENCY DOOR");
		list.add("FIRE EXTINGUISHERS");
		list.add("FIRST AID BOX");
		list.add("RAPID DOORS");
		list.add("ROOF CLEANING");
		list.add("CLEANED_BY");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");

		list.add("HR STATUS");
		list.add("HR SUBMITTED DATE");
		list.add("HR NAME");

		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");

		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues02(Sheet sheet, Workbook workbook,
			List<BleachHouseKeepingCheckListHistoryF02> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachHouseKeepingCheckListHistoryF02 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PRD-01/F02", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F02, cellStyle);

			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

			// REMARKS

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, history.getFloor_cleaninh(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemovel_unwanted_meterials(), cellStyle);
			createCell(valueRow, columnCount++, history.getSide_wall_corners(), cellStyle);
			createCell(valueRow, columnCount++, history.getWindows(), cellStyle);
			createCell(valueRow, columnCount++, history.getDrink_water_tank(), cellStyle);
			createCell(valueRow, columnCount++, history.getEmergency_door(), cellStyle);
			createCell(valueRow, columnCount++, history.getFire_extinguishers(), cellStyle);
			createCell(valueRow, columnCount++, history.getFirst_aid_box(), cellStyle);
			createCell(valueRow, columnCount++, history.getRapid_doors(), cellStyle);
			createCell(valueRow, columnCount++, history.getRoof_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleaned_by(), cellStyle);
			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHr_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHr_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHr_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// FORM F-02A EXCEL DOWNLOAD

	public ResponseEntity<?> HouseKeepingReportF02A(List<BleachHouseKeepingCheckListHistoryF02A> laydownHistories) {

		String SHEET = "BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST" + "PRD01_F02A";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow02A(sheet, workbook);

			String nullValueStr = createPendingReportValues02A(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow02A(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables02A();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables02A() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("UNIT");
		
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
		list.add("DEPARTMENT");

		list.add("REMARKS");

		// CONTENT

		list.add("FLOOR CLEANING");
		list.add("REMOVAL UNWANTED METERIALS");
		list.add("SIDE WALL CORNERS");
		list.add("WINDOWS");
		list.add("DRINK WATER TANK");
		list.add("EMERGENCY DOOR");
		list.add("FIRE EXTINGUISHERS");
		list.add("FIRST AID BOX");
		list.add("RAPID DOORS");
		list.add("ROOF CLEANING");
		list.add("CLEANED_BY");
		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");

		list.add("HR STATUS");
		list.add("HR SUBMITTED DATE");
		list.add("HR NAME");

		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");

		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues02A(Sheet sheet, Workbook workbook,
			List<BleachHouseKeepingCheckListHistoryF02A> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachHouseKeepingCheckListHistoryF02A history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PRD-01/F02A", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F02A, cellStyle);

			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

			// REMARKS

			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Body of content

			createCell(valueRow, columnCount++, history.getFloor_cleaninh(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemovel_unwanted_meterials(), cellStyle);
			createCell(valueRow, columnCount++, history.getSide_wall_corners(), cellStyle);
			createCell(valueRow, columnCount++, history.getWindows(), cellStyle);
//			createCell(valueRow, columnCount++, history.getDrink_water_tank(), cellStyle);
			createCell(valueRow, columnCount++, history.getEmergency_door(), cellStyle);
			createCell(valueRow, columnCount++, history.getFire_extinguishers(), cellStyle);
			createCell(valueRow, columnCount++, history.getFirst_aid_box(), cellStyle);
			createCell(valueRow, columnCount++, history.getRapid_doors(), cellStyle);
			createCell(valueRow, columnCount++, history.getRoof_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getCleaned_by(), cellStyle);
			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHr_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHr_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHr_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// EXCEL DOWNLOAD F13

	public ResponseEntity<?> JobCardReportF13(List<BleachingJobcard13History> laydownHistories) {
		String SHEET = "BLEACH_JOB_CARD" + "PRD01_F007";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_JOB_CARD_F007";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow13(sheet, workbook);

			String nullValueStr = createPendingReportValues13(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow13(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables13();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables13() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");

		list.add("BMR NUMBER");
		list.add("SUB BATCH NO");
		list.add("DATE");
		list.add("SHIFT");

		list.add("REMARKS");

		// STATUS COLUMNS

		list.add("START TIME");
		list.add("END DATE");
		list.add("END TIME");

		list.add("WETTING");
		list.add("SCOURING");
		list.add("HOTWASH ONE");
		list.add("HOTWASH TWO");
		list.add("NEWTRALIZING");
		list.add("FINAL PROCESS");
		list.add("WETTING ACT TEMP");
		list.add("SCOURING ACT TEMP");
		list.add("HOTWASH ONE ACT TEMP");
		list.add("HOTWASH TWO ACT TEMP");
		list.add("NEWTRALIZING ACT TEMP");
		list.add("FINAL PROCESS PH TEMP");
		list.add("FINAL PROCESS ACT TEMP");
		list.add("CAUSTIC SODA FLAKES");
		list.add("HAIPOLENE");
		list.add("SAROFOM");
		list.add("HYDROGEN PEROXIDE");
		list.add("SETILON KN");
		list.add("PERSOFTAL");
		list.add("SETILON PERSOFTAL ACTUAL");
		list.add("CITRIC ACID");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");

		list.add("QA STATUS");
		list.add("QA SUBMITTED DATE");
		list.add("QA NAME");

		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");

		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues13(Sheet sheet, Workbook workbook,
			List<BleachingJobcard13History> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachingJobcard13History history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F007", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F13, cellStyle);

			createCell(valueRow, columnCount++, history.getBmr_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getSub_batch_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			createCell(valueRow, columnCount++, history.getStart_time(), cellStyle);
			createCell(valueRow, columnCount++, history.getEnd_date(), cellStyle);
			createCell(valueRow, columnCount++, history.getEnd_time(), cellStyle);

			createCell(valueRow, columnCount++, history.getWetting(), cellStyle);
			createCell(valueRow, columnCount++, history.getScouring(), cellStyle);
			createCell(valueRow, columnCount++, history.getHotwash_one(), cellStyle);
			createCell(valueRow, columnCount++, history.getHotwash_two(), cellStyle);
			createCell(valueRow, columnCount++, history.getNewtralizing(), cellStyle);
			createCell(valueRow, columnCount++, history.getFinal_process(), cellStyle);
			createCell(valueRow, columnCount++, history.getWetting_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getScouring_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getHotwash_one_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getHotwash_two_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getNewtralizing_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getFinal_process_ph_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getFinal_process_act_temp(), cellStyle);
			createCell(valueRow, columnCount++, history.getCaustic_soda_flakes(), cellStyle);
			createCell(valueRow, columnCount++, history.getHaipolene(), cellStyle);
			createCell(valueRow, columnCount++, history.getSarofom(), cellStyle);
			createCell(valueRow, columnCount++, history.getHydrogen_peroxide(), cellStyle);
			createCell(valueRow, columnCount++, history.getSetilon_kn(), cellStyle);
			createCell(valueRow, columnCount++, history.getPersoftal(), cellStyle);
			createCell(valueRow, columnCount++, history.getSetilon_persoftal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getCitric_acid(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// EXCEL DOWNLOAD F34

	public ResponseEntity<?> BlowroomAndCardingF34(
			List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> laydownHistories) {

		String SHEET = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING" + "PRD01_F005";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F005";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow34(sheet, workbook);

			String nullValueStr = createPendingReportValues34(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow34(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables34();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables34() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("BMR NUMBER");

		// CONTENT

		list.add("START DATE");
		list.add("START TIME");
		list.add("END DATE");
		list.add("END TIME");

		list.add("MIXING");
		list.add("NO OF BALES");
		list.add("TOTAL WEIGHT");
		list.add("WORKING AREA");

		list.add("REMARKS");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");

		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");

		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues34(Sheet sheet, Workbook workbook,
			List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F005", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F34, cellStyle);

			createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getStart_date(), cellStyle);
			createCell(valueRow, columnCount++, history.getStart_time(), cellStyle);
			createCell(valueRow, columnCount++, history.getEnd_date(), cellStyle);
			createCell(valueRow, columnCount++, history.getEnd_time(), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_bales(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_weight(), cellStyle);
			createCell(valueRow, columnCount++, history.getWorking_area(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}

	// EXCEL DOWNLOAD F38

	public ResponseEntity<?> machineCleaningF38(List<BleachMixingChangeMachineCleaningHistoryF38> laydownHistories) {

		String SHEET = "BLEACH_MIXCHANGE_MACHINE_CLEAN" + "PRD01_F014";

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		Workbook workbook = new XSSFWorkbook();
		InputStreamResource file = null;

		String fileName = "BLEACH_MIXCHANGE_MACHINE_CLEAN_F014";

		String extension = ".xlsx";

		fileName = fileName + extension;

		try {
			Sheet sheet = workbook.createSheet(SHEET);

			createPendingReportTitleRow38(sheet, workbook);

			String nullValueStr = createPendingReportValues38(sheet, workbook, laydownHistories);

			if (nullValueStr != null && nullValueStr.contains("Null")) {
				return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
			}

			workbook.write(out);

			file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Generate Excel Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	private void createPendingReportTitleRow38(Sheet sheet, Workbook workbook) {

		// title row
		Row titleRow = sheet.createRow(0);

		List<String> labelList = getPendingReportTitleLables38();

		int columnCount = 0;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

		for (String label : labelList) {

			Cell titleCell = titleRow.createCell(columnCount++);
			titleCell.setCellValue(label);
			titleCell.setCellStyle(cellStyle);

		}

	}

	private List<String> getPendingReportTitleLables38() {

		List<String> list = new ArrayList<String>();

		list.add("FORM NUMBER");
		list.add("FORM NAME");
		list.add("UNIT");
		list.add("DATE");
		list.add("BMR NO FROM");
		list.add("BMR NO TO");

		// CONTENT

		list.add("MIX CHANGEOVER FROM");
		list.add("MIX CHANGEOVER TO");
		list.add("LAYDOWN AREA CLEANING");
		list.add("BLENDOMAT CLEANING");
		list.add("BRF 425 CLEANING");
		list.add("FIRE DIVEROTOR CLEANING");
		list.add("METEL DETECTOR CLEANING");
		list.add("CLP UNIT CLEANING");
		list.add("BRF 425 UNIT");
		list.add("MPM UNIT CLEANING");
		list.add("APPLIED UNIT CLEANING ONE");
		list.add("ERM UNIT CLEANING");
		list.add("CCP UNIT CLEANING");
		list.add("DUSTEX UNIT CLEANING");
		list.add("HENNATEX CONDENSER UNIT");
		list.add("CAKEPRESS MACHINE CLEANING");
		list.add("KIER MACHINE CHEMICAL CLEAN");
		list.add("HYDRO MACHINE CLEANING");
		list.add("CAKE OPENER CLEAN");
		list.add("DRYER CLEANING");
		list.add("MTF UNIT CLEAN");
		list.add("RIETER CLEAN");
		list.add("APPLIED UNIT CLEANING TWO");
		list.add("METAL FIRE DETECTOR");
		list.add("BALEPRESS CONVEYOR CLEANING");
		list.add("BALEPRESS STAPPER MECHINE CLEANING");
		list.add("BALE EVACUATION WEIGHT MACHINE CLEANING");
		list.add("CARDING MACHINES CLEANING");
		list.add("CHEMICAL BUCKETS CHEMICAL WEIGHING BALANCE CLEANING");
		list.add("BAKE STORAGE FLOOR CLEANING");

		// STATUS COLUMNS
		list.add("SUPERVISIOR STATUS");
		list.add("SUPERVISIOR SUBMITTED DATE");
		list.add("SUPERVISIOR NAME");
		list.add("HOD STATUS");
		list.add("HOD APPROVED/REJECTED DATE");
		list.add("HOD NAME");
		list.add("REJECT REASON");
		list.add("VERSION");

		return list;
	}

	private String createPendingReportValues38(Sheet sheet, Workbook workbook,
			List<BleachMixingChangeMachineCleaningHistoryF38> layDownCheckListF42Histories) {

		int rowCount = 1;
		int serialCount = 1;

		short shortVal = -1;

		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		for (BleachMixingChangeMachineCleaningHistoryF38 history : layDownCheckListF42Histories) {

			int columnCount = 0;

			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, "PH-PRD-01/F14", cellStyle);
			createCell(valueRow, columnCount++, AppConstants.F38, cellStyle);

			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getBmr_no_from(), cellStyle);
			createCell(valueRow, columnCount++, history.getBmr_no_to(), cellStyle);

			// Body of content
			createCell(valueRow, columnCount++, history.getMix_changeover_from(), cellStyle);
			createCell(valueRow, columnCount++, history.getMix_changeover_to(), cellStyle);
			createCell(valueRow, columnCount++, history.getLaydown_area_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getBlendomat_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getBrf_425_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getFire_diverotor_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetel_detector_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getClp_unit_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getBrf_425_unit(), cellStyle);
			createCell(valueRow, columnCount++, history.getMpm_unit_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getApplied_unit_cleaning_one(), cellStyle);
			createCell(valueRow, columnCount++, history.getErm_unit_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getCcp_unit_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getDustex_unit_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getHennatex_condenser_unit(), cellStyle);
			createCell(valueRow, columnCount++, history.getCakepress_machine_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getKier_machine_chemical_clean(), cellStyle);
			createCell(valueRow, columnCount++, history.getHydro_machine_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getCake_opener_clean(), cellStyle);
			createCell(valueRow, columnCount++, history.getDryer_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getMtf_unit_clean(), cellStyle);
			createCell(valueRow, columnCount++, history.getRieter_clean(), cellStyle);
			createCell(valueRow, columnCount++, history.getApplied_unit_cleaning_two(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetal_fire_detector(), cellStyle);
			createCell(valueRow, columnCount++, history.getBalepress_conveyor_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getBalepress_stapper_mechine_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getBale_evacuation_weight_machine_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getCarding_machines_cleaning(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemical_buckets_chemical_weighing_balance_cleaning(),
					cellStyle);
			createCell(valueRow, columnCount++, history.getBake_storage_floor_cleaning(), cellStyle);

			// Status
			createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";

	}
	
	//
	
	
	
	
	// EXCELL F09

		public ResponseEntity<?> CakePressReportF09(List<BleachEquipmentUsageLogBookCakePressHistoryF09> laydownHistories) {

			String SHEET = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS" + "PRD01_F006";

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			Workbook workbook = new XSSFWorkbook();
			InputStreamResource file = null;

			String fileName = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F006";

			String extension = ".xlsx";

			fileName = fileName + extension;

			try {
				Sheet sheet = workbook.createSheet(SHEET);

				createPendingReportTitleRow09(sheet, workbook);

				String nullValueStr = createPendingReportValues09(sheet, workbook, laydownHistories);

				if (nullValueStr != null && nullValueStr.contains("Null")) {
					return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
				}

				workbook.write(out);

				file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Generate Excel Report *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		private void createPendingReportTitleRow09(Sheet sheet, Workbook workbook) {

			// title row
			Row titleRow = sheet.createRow(0);

			List<String> labelList = getPendingReportTitleLables09();

			int columnCount = 0;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

			for (String label : labelList) {

				Cell titleCell = titleRow.createCell(columnCount++);
				titleCell.setCellValue(label);
				titleCell.setCellStyle(cellStyle);

			}

		}

		private List<String> getPendingReportTitleLables09() {

			List<String> list = new ArrayList<String>();

			list.add("FORM NUMBER");
			list.add("FORM NAME");
			list.add("UNIT");
			list.add("BMR NUMBER");
			list.add("SUB BATCH NO");

			list.add("MIXING");
			list.add("MC NO");
			list.add("TEMPERATURE");
			list.add("START_DATE");
			list.add("START_TIME");
			list.add("END_DATE");
			list.add("END_TIME");

			list.add("REMARKS");

			// STATUS COLUMNS
			list.add("SUPERVISIOR STATUS");
			list.add("SUPERVISIOR SUBMITTED DATE");
			list.add("SUPERVISIOR NAME");
			list.add("HOD STATUS");
			list.add("HOD APPROVED/REJECTED DATE");
			list.add("HOD NAME");
			list.add("REJECT REASON");
			list.add("VERSION");

			return list;
		}

		private String createPendingReportValues09(Sheet sheet, Workbook workbook,
				List<BleachEquipmentUsageLogBookCakePressHistoryF09> layDownCheckListF42Histories) {

			int rowCount = 1;
			int serialCount = 1;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

			for (BleachEquipmentUsageLogBookCakePressHistoryF09 history : layDownCheckListF42Histories) {

				int columnCount = 0;

				Row valueRow = sheet.createRow(rowCount++);

				createCell(valueRow, columnCount++, "PH-PRD-01/F006", cellStyle);
				createCell(valueRow, columnCount++, AppConstants.F09, cellStyle);

				createCell(valueRow, columnCount++, "Unit H", cellStyle);
				createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
				createCell(valueRow, columnCount++, history.getSubbatch_no(), cellStyle);

				createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
				createCell(valueRow, columnCount++, history.getMc_no(), cellStyle);
				createCell(valueRow, columnCount++, history.getTemperature(), cellStyle);
				
				LocalDateTime startDateTime = LocalDateTime.parse(history.getStart_date());
				LocalDate startDate = startDateTime.toLocalDate();
				LocalTime startTime = startDateTime.toLocalTime();
				
				LocalDateTime endDateTime = LocalDateTime.parse(history.getStart_date());
				LocalDate endDate = endDateTime.toLocalDate();
				LocalTime endTime = endDateTime.toLocalTime();
				
				String formattedStartDate = startDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
				String formattedStartTime = startTime.format(DateTimeFormatter.ofPattern("HH:mm"));
				
				String formattedEndDate = endDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
				String formattedEndTime = endTime.format(DateTimeFormatter.ofPattern("HH:mm"));

				createCell(valueRow, columnCount++, formattedStartDate, cellStyle);
				createCell(valueRow, columnCount++, formattedStartTime, cellStyle);
				createCell(valueRow, columnCount++, formattedEndDate, cellStyle);
				createCell(valueRow, columnCount++, formattedEndTime, cellStyle);

				// Body of content
				createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

				// Status
				createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			}

			return "";

		}

		// EXCELL F04

		public ResponseEntity<?> ContRawCottonReportF04(List<BleachAppliedContRawCottonHistoryF04> laydownHistories) {

			String SHEET = "BLEACH_APPLIED_CONT_RAW_COTTON" + "PRD01_F003";

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			Workbook workbook = new XSSFWorkbook();
			InputStreamResource file = null;

			String fileName = "BLEACH_APPLIED_CONT_RAW_COTTON_F003";

			String extension = ".xlsx";

			fileName = fileName + extension;

			try {
				Sheet sheet = workbook.createSheet(SHEET);

				createPendingReportTitleRow04(sheet, workbook);

				String nullValueStr = createPendingReportValues04(sheet, workbook, laydownHistories);

				if (nullValueStr != null && nullValueStr.contains("Null")) {
					return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
				}

				workbook.write(out);

				file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Generate Excel Report *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		private void createPendingReportTitleRow04(Sheet sheet, Workbook workbook) {

			// title row
			Row titleRow = sheet.createRow(0);

			List<String> labelList = getPendingReportTitleLables04();

			int columnCount = 0;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

			for (String label : labelList) {

				Cell titleCell = titleRow.createCell(columnCount++);
				titleCell.setCellValue(label);
				titleCell.setCellStyle(cellStyle);

			}

		}

		private List<String> getPendingReportTitleLables04() {

			List<String> list = new ArrayList<String>();

			list.add("FORM NUMBER");
			list.add("FORM NAME");
			list.add("UNIT");
			list.add("BMR NUMBER");
			list.add("DATE");

			// CONTENT

			list.add("TOTAL ONE");
			list.add("TOTAL TWO");
			list.add("TOTAL_THREE");
			list.add("TOTAL_FOUR");

			// STATUS COLUMNS
			list.add("SUPERVISIOR STATUS");
			list.add("SUPERVISIOR SUBMITTED DATE");
			list.add("SUPERVISIOR NAME");
			list.add("HOD STATUS");
			list.add("HOD APPROVED/REJECTED DATE");
			list.add("HOD NAME");

			list.add("REJECT REASON");
			list.add("VERSION");
			
			// MANY
			list.add("TYPE");
		    list.add("BW1");
		    list.add("BW2");
		    list.add("BW3");
		    list.add("BW4");

			return list;
		}

		private String createPendingReportValues04(Sheet sheet, Workbook workbook,
				List<BleachAppliedContRawCottonHistoryF04> layDownCheckListF42Histories) {

			int rowCount = 1;
			int serialCount = 1;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

			for (BleachAppliedContRawCottonHistoryF04 history : layDownCheckListF42Histories) {

				int columnCount = 0;

				Row valueRow = sheet.createRow(rowCount++);

				createCell(valueRow, columnCount++, "PH-PRD-01/F003", cellStyle);
				createCell(valueRow, columnCount++, AppConstants.F04a, cellStyle);

				createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
				createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
				createCell(valueRow, columnCount++, history.getDate(), cellStyle);

				// Body of content

				createCell(valueRow, columnCount++, history.getTotal_0ne(), cellStyle);
				createCell(valueRow, columnCount++, history.getTotal_two(), cellStyle);
				createCell(valueRow, columnCount++, history.getTotal_three(), cellStyle);
				createCell(valueRow, columnCount++, history.getTotal_four(), cellStyle);

				// Status
				createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
				
					// HANDLE MANY 
				
				int startColumnForNestedData = columnCount;
		        if (history.getDetailsRawCottonF04() != null && !history.getDetailsRawCottonF04().isEmpty()) {
		            for (BleachContaminationTypesHistoryF04 sanitizationList : history.getDetailsRawCottonF04()) {
		                Row nestedRow = sheet.createRow(rowCount++);
		                int nestedColumnCount = startColumnForNestedData;

		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getType(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getBw1Contamination()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getBw2Contamination()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getBw3Contamination()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getBw4Contamination()), cellStyle);
		            }
		        } else {
		            
		            int numberOfNestedColumns = 5; 
		            for (int i = 0; i < numberOfNestedColumns; i++) {
		                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
		            }
		        }
				

			}

			return "";

		}

		// EXCELL F08

		public ResponseEntity<?> ContABCottonReportF08(List<BleachAppliedContAbCottonHistoryF08> laydownHistories) {

			String SHEET = "BLEACH_APPLIED_CONT_AB_COTTON" + "PRD01_F011";

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			Workbook workbook = new XSSFWorkbook();
			InputStreamResource file = null;

			String fileName = "BLEACH_APPLIED_CONT_AB_COTTON_F011";

			String extension = ".xlsx";

			fileName = fileName + extension;

			try {
				Sheet sheet = workbook.createSheet(SHEET);

				createPendingReportTitleRow08(sheet, workbook);

				String nullValueStr = createPendingReportValues08(sheet, workbook, laydownHistories);

				if (nullValueStr != null && nullValueStr.contains("Null")) {
					return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
				}

				workbook.write(out);

				file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Generate Excel Report *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		private void createPendingReportTitleRow08(Sheet sheet, Workbook workbook) {

			// title row
			Row titleRow = sheet.createRow(0);

			List<String> labelList = getPendingReportTitleLables08();

			int columnCount = 0;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

			for (String label : labelList) {

				Cell titleCell = titleRow.createCell(columnCount++);
				titleCell.setCellValue(label);
				titleCell.setCellStyle(cellStyle);

			}

		}

		private List<String> getPendingReportTitleLables08() {

			List<String> list = new ArrayList<String>();

			list.add("FORM NUMBER");
			list.add("FORM NAME");
			list.add("UNIT");
			list.add("BMR NUMBER");
			list.add("DATE");

			// CONTENT

			list.add("TOTAL 01");
			list.add("TOTAL 02");

			// STATUS COLUMNS
			list.add("SUPERVISIOR STATUS");
			list.add("SUPERVISIOR SUBMITTED DATE");
			list.add("SUPERVISIOR NAME");
			list.add("HOD STATUS");
			list.add("HOD APPROVED/REJECTED DATE");
			list.add("HOD NAME");

			list.add("REJECT REASON");
			list.add("VERSION");
			
			// MANY COLUMNS 
			list.add("Type");
			list.add("CC1");
			list.add("CC2");
			

			return list;
		}
		
//		private List<String> getPendingReportTitleLables08() {
//		    List<String> list = new ArrayList<>();
//		    list.add("FORM NUMBER");
//		    list.add("FORM NAME");
//		    list.add("UNIT");
//		    list.add("BMR NUMBER");
//		    list.add("DATE");
//
//		    // CONTENT
//		    list.add("TOTAL 01");
//		    list.add("TOTAL 02");
//
//		    // STATUS COLUMNS
//		    list.add("SUPERVISOR STATUS");
//		    list.add("SUPERVISOR SUBMITTED DATE");
//		    list.add("SUPERVISOR NAME");
//		    list.add("HOD STATUS");
//		    list.add("HOD APPROVED/REJECTED DATE");
//		    list.add("HOD NAME");
//
//		    list.add("REJECT REASON");
//		    list.add("VERSION");
//
//		    // MANY COLUMNS
//		    list.add("Type");
//		    list.add("CC1");
//		    list.add("CC2");
//
//		    // Types
//		    String[] types = {"Hair", "Jute", "Colour Thread", "Wrapper", "Metal", "Rust", "Plastic", "Black Cotton", 
//		                      "Oil Cotton", "Soil", "Yellow Cotton", "Paper", "Stick", "Feather", "Cloth", 
//		                      "White Poly Propylene", "Colour Poly Propylene", "Rubber piece", "Unbleached Cotton"};
//		    
//		    for (String type : types) {
//		        list.add(type + " CC1");
//		        list.add(type + " CC2");
//		    }
//
//		    return list;
//		}
//		
//		private String createPendingReportValues08(Sheet sheet, Workbook workbook,
//		        List<BleachAppliedContAbCottonHistoryF08> layDownCheckListF42Histories) {
//
//		    int rowCount = 1;
//		    int serialCount = 1;
//
//		    short shortVal = -1;
//		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);
//
//		    for (BleachAppliedContAbCottonHistoryF08 history : layDownCheckListF42Histories) {
//
//		        int columnCount = 0;
//		        Row valueRow = sheet.createRow(rowCount++);
//
//		        createCell(valueRow, columnCount++, "PRD-01/F011", cellStyle);
//		        createCell(valueRow, columnCount++, AppConstants.F08, cellStyle);
//		        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
//
//		        // Body of content
//		        createCell(valueRow, columnCount++, history.getTotal_01(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getTotal_02(), cellStyle);
//
//		        // Status
//		        createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
//		        createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
//		        createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
//		        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
//
//		        // Types and CC1/CC2
//		        Map<String, Map<String, Double>> typeCCMap = getTypeCCMap(history.getDetailsAbCottonF04()); // Assuming you have a map of types to CC1/CC2 values
//
//		        for (String type : getPendingReportTitleLables08()) {
//		            if (type.contains(" CC1") || type.contains(" CC2")) {
//		                String typeName = type.split(" ")[0];
//		                createCell(valueRow, columnCount++, String.valueOf(typeCCMap.getOrDefault(typeName, new HashMap<>()).get("CC1")), cellStyle);
//		                createCell(valueRow, columnCount++, String.valueOf(typeCCMap.getOrDefault(typeName, new HashMap<>()).get("CC2")), cellStyle);
//		            }
//		        }
//		    }
//
//		    return "";
//		}
		
		public Map<String, Map<String, Double>> getTypeCCMap(List<BleachAppliedContAbCottonTypesHistoryF08> detailsAbCottonF04) {
	        Map<String, Map<String, Double>> typeCCMap = new HashMap<>();
	        
	        
	        if (detailsAbCottonF04 != null) {
	            for (BleachAppliedContAbCottonTypesHistoryF08 typeDetail : detailsAbCottonF04) {
	                String type = typeDetail.getType();
	                Map<String, Double> ccMap = new HashMap<>();
	                
	                ccMap.put("CC1", (double) typeDetail.getBw1Contamination());
	                ccMap.put("CC2", (double) typeDetail.getBw2Contamination());

	                typeCCMap.put(type, ccMap);
	            }
	        }

	        return typeCCMap;
	    }

		private String createPendingReportValues08(Sheet sheet, Workbook workbook,
				List<BleachAppliedContAbCottonHistoryF08> layDownCheckListF42Histories) {

			int rowCount = 1;
			int serialCount = 1;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

			for (BleachAppliedContAbCottonHistoryF08 history : layDownCheckListF42Histories) {

				int columnCount = 0;

				Row valueRow = sheet.createRow(rowCount++);

				createCell(valueRow, columnCount++, "PH-PRD-01/F011", cellStyle);
				createCell(valueRow, columnCount++, AppConstants.F08, cellStyle);

				createCell(valueRow, columnCount++, "Unit H", cellStyle);
				createCell(valueRow, columnCount++, history.getBmrNumber(), cellStyle);
				createCell(valueRow, columnCount++, history.getDate(), cellStyle);

				// Body of content

				createCell(valueRow, columnCount++, history.getTotal_01(), cellStyle);
				createCell(valueRow, columnCount++, history.getTotal_02(), cellStyle);

				// Status
				createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

				
				int startColumn = columnCount;
				
				if(!history.getDetailsAbCottonF04().isEmpty() && history.getDetailsAbCottonF04() != null) {
					
					for(BleachAppliedContAbCottonTypesHistoryF08 activity : history.getDetailsAbCottonF04()){
						
						Row nestedRow = sheet.createRow(rowCount++);

		    
		                int nestedColumnCount = startColumn;
						
		                createCell(nestedRow, nestedColumnCount++, activity.getType(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, String.valueOf(activity.getBw1Contamination()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(activity.getBw2Contamination()), cellStyle);
		                
						
					}
					
				} else {
					int numberOfNestedColumns = 4;
		            for (int i = 0; i < numberOfNestedColumns; i++) {
		                createCell(valueRow, startColumn + i, "", cellStyle);
		            }
				}
				
				
			}

			return "";

		}

		// ONE TO MANY

		public ResponseEntity<?> SanitizationF01(

				List<BleachSanitizationOfMechineAndSurfaceHistoryF01> laydownHistories) {

			String SHEET = "BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F009" + "PRD01_F009";

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			Workbook workbook = new XSSFWorkbook();
			InputStreamResource file = null;

			String fileName = "BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F009";

			String extension = ".xlsx";

			fileName = fileName + extension;

			try {
				Sheet sheet = workbook.createSheet(SHEET);

				createPendingReportTitleRow01(sheet, workbook);

				String nullValueStr = createPendingReportValues01(sheet, workbook, laydownHistories);

				if (nullValueStr != null && nullValueStr.contains("Null")) {
					return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
				}

				workbook.write(out);

				file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Generate Excel Report *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		}

		private void createPendingReportTitleRow01(Sheet sheet, Workbook workbook) {

			// title row
			Row titleRow = sheet.createRow(0);

			List<String> labelList = getPendingReportTitleLables01();

			int columnCount = 0;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

			for (String label : labelList) {

				Cell titleCell = titleRow.createCell(columnCount++);
				titleCell.setCellValue(label);
				titleCell.setCellStyle(cellStyle);

			}

		}

		private List<String> getPendingReportTitleLables01() {

			List<String> list = new ArrayList<String>();

			list.add("Form Number");
			list.add("Form Name");
			list.add("Unit");
			list.add("Department");
			list.add("FREQUENCY");
			list.add("WEEK");
			list.add("MONTH");
			list.add("YEAR");
			list.add("Remarks");

			// CONTENT

			list.add("WEEK_AND_DATE");
			list.add("SANITIZED_BY");

			// STATUS COLUMNS
			list.add("Supervisior Status");
			list.add("Supervisior Submitted Date");
			list.add("Supervisior Name");
			list.add("Hod Status");
			list.add("Hod Approved/Rejected Date");
			list.add("Hod Name");
			list.add("Reject Reason");
			list.add("Version");

//			// Adding BleachSMSActivitiesHistoryF01 fields
//			list.add("Description");
//			list.add("Completed");
//			list.add("Not Applicable");
//			list.add("Not Completed");

			return list;
		}

		private String createPendingReportValues01(Sheet sheet, Workbook workbook,
				List<BleachSanitizationOfMechineAndSurfaceHistoryF01> layDownCheckListF42Histories) {

			int rowCount = 1;
			int serialCount = 1;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

			for (BleachSanitizationOfMechineAndSurfaceHistoryF01 history : layDownCheckListF42Histories) {
				
				int columnCount = 0;

		        Row valueRow = sheet.createRow(rowCount++);

		        createCell(valueRow, columnCount++, "PH-PRD-01/F009", cellStyle);
		        createCell(valueRow, columnCount++, AppConstants.F01, cellStyle);

		        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
		        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
		        createCell(valueRow, columnCount++, history.getWeek(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
		        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

		        // REMARKS
		        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

		        // Body of content
		        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		        String wo = history.getWeekAndDate();

		        LocalDate date = LocalDate.parse(wo, inputFormatter);
		        String dateString = date.format(outputFormatter);

		        createCell(valueRow, columnCount++, dateString, cellStyle);
		        createCell(valueRow, columnCount++, history.getSanitized_by(), cellStyle);

		        // Status
		        createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
		        createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
				
			}

			return "";

		}
		
		
			 // JAWAHAR
		
		// FORM - 41 -- HAND SANITATION REPORT
		
		public ResponseEntity<?> createHandSanitationReport(List<BleachHandSanitizationABPressHistoryF41> handSanitizationABPressHistoryList) {
			


			String SHEET = "BLEACH_HAND_SANITATION_REPORT";

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			Workbook workbook = new XSSFWorkbook();
			InputStreamResource file = null;

			String fileName = "BLEACH_HAND_SANITATION_REPORT";

			String extension = ".xlsx";

			fileName = fileName + extension;

			try {
				Sheet sheet = workbook.createSheet(SHEET);

				createPendingReportTitleRow41(sheet, workbook);

				String nullValueStr = createPendingReportValuesHandSanitation(sheet, workbook, handSanitizationABPressHistoryList);

				if (nullValueStr != null && nullValueStr.contains("Null")) {
					return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
				}

				workbook.write(out);

				file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Generate Excel Report *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
						HttpStatus.BAD_REQUEST);
			}

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
		
			
		}
		
//		private String createPendingReportValuesHandSanitation(Sheet sheet, Workbook workbook,
//				List<BleachHandSanitizationABPressHistoryF41> layDownCheckListF42Histories) {
//
//			int rowCount = 1;
//			int serialCount = 1;
//
//			short shortVal = -1;
//
//			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);
//
//			for (BleachHandSanitizationABPressHistoryF41 history : layDownCheckListF42Histories) {
//
//				int columnCount = 0;
//
//				Row valueRow = sheet.createRow(rowCount++);
//
//				createCell(valueRow, columnCount++, "PRD01/F10", cellStyle);
//				createCell(valueRow, columnCount++, AppConstants.F41a, cellStyle);
//
//				createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
//				createCell(valueRow, columnCount++, history.getDate(), cellStyle);
//				createCell(valueRow, columnCount++, history.getShift(), cellStyle);
//				createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
//				createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
//
//
//				// Status
//				createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
//				createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
//				createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
//				createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
//				createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
//				createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
//				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
//				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
//
//				// ADDING MAPPING DATAS
//				
////				for (BleachSanitizationListHistoryF41 sanitizationList : history.getSanitizationList()) {
////		            Row nestedRow = sheet.createRow(rowCount++);
////		            int nestedColumnCount = 1; // Skip the first column as it will be used for indicating nested entity
////
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getCreatedBy(),cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getIdNumber(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour1(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour2(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour3(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour4(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour5(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour6(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour7(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour8(), cellStyle);
////		            createCell(nestedRow, nestedColumnCount++, sanitizationList.getRemarks(), cellStyle);
////		        }
//				
////				if (history.getSanitizationList() != null && !history.getSanitizationList().isEmpty()) {
////		            for (BleachSanitizationListHistoryF41 sanitizationList : history.getSanitizationList()) {
////		                Row nestedRow = sheet.createRow(rowCount++);
////
////		                int nestedColumnCount = 0; // Reset column count for nested rows
////
////		                // Add main entity's ID to relate with nested records (optional)
////		                createCell(nestedRow, nestedColumnCount++, history.getHandSanitizationId().toString(), cellStyle);
////
////		                // Add nested entity fields
////		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getSerialNumber()), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getIdNumber(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour1(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour2(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour3(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour4(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour5(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour6(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour7(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour8(), cellStyle);
////		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getRemarks(), cellStyle);
////		            }
////		        }
//				
//				
//			}
//
//			return "";
//
//		}
		
		private String createPendingReportValuesHandSanitation(Sheet sheet, Workbook workbook,
		        List<BleachHandSanitizationABPressHistoryF41> layDownCheckListF42Histories) {

		    int rowCount = 1;
		    short shortVal = -1;

		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

		    for (BleachHandSanitizationABPressHistoryF41 history : layDownCheckListF42Histories) {
		        int columnCount = 0;

		        // Create main record row
		        Row valueRow = sheet.createRow(rowCount++);

		        // Main record fields
		        createCell(valueRow, columnCount++, "PH-PRD01/F10", cellStyle);
		        createCell(valueRow, columnCount++, AppConstants.F41a, cellStyle);
		        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
		        createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		        
		        int startColumnForNestedData = columnCount; 

		        
		        if (history.getSanitizationList() != null && !history.getSanitizationList().isEmpty()) {
		            for (BleachSanitizationListHistoryF41 sanitizationList : history.getSanitizationList()) {
		                Row nestedRow = sheet.createRow(rowCount++);

		                // Ensure alignment: adjust the starting column for nested data
		                int nestedColumnCount = startColumnForNestedData;

		                // Fill nested data
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitizationList.getSerialNumber()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getIdNumber(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour1(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour2(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour3(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour4(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour5(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour6(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour7(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getHour8(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitizationList.getRemarks(), cellStyle);
		            }
		        } else {
		            // Add empty cells for nested data if none exist
		            int numberOfNestedColumns = 11; // Adjust based on the number of nested columns
		            for (int i = 0; i < numberOfNestedColumns; i++) {
		                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
		            }
		        }
		    }

		    return "";
		}


		
		private void createPendingReportTitleRow41(Sheet sheet, Workbook workbook) {

			// title row
			Row titleRow = sheet.createRow(0);

			List<String> labelList = getPendingReportTitleLables41();

			int columnCount = 0;

			short shortVal = -1;

			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

			for (String label : labelList) {

				Cell titleCell = titleRow.createCell(columnCount++);
				titleCell.setCellValue(label);
				titleCell.setCellStyle(cellStyle);

			}

		}
		
		private List<String> getPendingReportTitleLables41() {

			List<String> list = new ArrayList<String>();

			list.add("Form Number");
			list.add("Form Name");
			list.add("Unit");
			list.add("Date");
			list.add("Shift");
			list.add("SOP Number");
			list.add("Revision No");
			

			// STATUS COLUMNS
			list.add("Supervisior Status");
			list.add("Supervisior Submitted Date");
			list.add("Supervisior Name");
			list.add("Hod Status");
			list.add("Hod Approved/Rejected Date");
			list.add("Hod Name");
			list.add("Reject Reason");
			list.add("Version");
			
			

//			// Adding BleachSMSActivitiesHistoryF01 fields
			list.add("Serial Number");
		    list.add("ID Number");
		    list.add("Hour 1");
		    list.add("Hour 2");
		    list.add("Hour 3");
		    list.add("Hour 4");
		    list.add("Hour 5");
		    list.add("Hour 6");
		    list.add("Hour 7");
		    list.add("Hour 8");
		    list.add("Remarks");

			return list;
		}
		
		
		//Siva
		
		public static <T> ByteArrayResource generateDynamicExcel(List<T> dataList, Map<String, String> fieldMapping)
		        throws IOException, IllegalAccessException {
		    
		    try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		         Workbook workbook = new SXSSFWorkbook()) { // Use SXSSFWorkbook for large data
		        Sheet sheet = workbook.createSheet("Data");

		        if (dataList != null && !dataList.isEmpty()) {
		            // Create header row
		            Row headerRow = sheet.createRow(0);
		            Field[] fields = dataList.get(0).getClass().getDeclaredFields();
		            
		            // Create header based on fieldMapping
		            int cellIndex = 0;
		            for (String fieldDisplayName : fieldMapping.keySet()) {
		                headerRow.createCell(cellIndex++).setCellValue(fieldDisplayName);
		            }

		            // Fill data
		            int rowNum = 1;
		            for (T data : dataList) {
		                Row row = sheet.createRow(rowNum++);
		                cellIndex = 0;
		                for (String fieldDisplayName : fieldMapping.keySet()) {
		                    String actualFieldName = fieldMapping.get(fieldDisplayName);
		                    if (actualFieldName != null) {
		                        Field field = Arrays.stream(fields)
		                                .filter(f -> f.getName().equals(actualFieldName))
		                                .findFirst()
		                                .orElse(null);
		                        if (field != null) {
		                            field.setAccessible(true);
		                            Object value = field.get(data);
		                            if (value != null) {
		                                row.createCell(cellIndex).setCellValue(value.toString());
		                            } else {
		                                row.createCell(cellIndex).setCellValue("");
		                            }
		                            cellIndex++;
		                        }
		                    }
		                }
		            }
		        }

		        workbook.write(outputStream);
		        return new ByteArrayResource(outputStream.toByteArray());
		    }
		}
		

		// Gayathri
		
				// EXCEL DOWNLOAD F16

				public ResponseEntity<?> MachineCleaningRecordF16(
						List<BleachMachineCleaningRecordHistoryF16> details) {

					String SHEET = "BLEACH_MACHINE_CLEANING_RECORD" + "PRD01_F016";

					ByteArrayOutputStream out = new ByteArrayOutputStream();
					Workbook workbook = new XSSFWorkbook();
					InputStreamResource file = null;

					String fileName = "BLEACH_MACHINE_CLEANING_RECORD";

					String extension = ".xlsx";

					fileName = fileName + extension;

					try {
						Sheet sheet = workbook.createSheet(SHEET);

						createPendingReportTitleRow16(sheet, workbook);

						String nullValueStr = createPendingReportValues16(sheet, workbook, details);

						if (nullValueStr != null && nullValueStr.contains("Null")) {
							return new ResponseEntity<>(new ApiResponse(false, nullValueStr), HttpStatus.BAD_REQUEST);
						}

						workbook.write(out);

						file = new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));

					} catch (Exception e) {
						SCAUtil sca = new SCAUtil();
						logger.error("*** Unable to Generate Excel Report *** " + e);
						String msg = sca.getErrorMessage(e);
						return new ResponseEntity<>(new ApiResponse(false, "Unable to Generate Excel" + msg),
								HttpStatus.BAD_REQUEST);
					}

					return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
							.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
				}

				private void createPendingReportTitleRow16(Sheet sheet, Workbook workbook) {

					// title row
					Row titleRow = sheet.createRow(0);

					List<String> labelList = getPendingReportTitleLables16();

					int columnCount = 0;

					short shortVal = -1;

					CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);

					for (String label : labelList) {

						Cell titleCell = titleRow.createCell(columnCount++);
						titleCell.setCellValue(label);
						titleCell.setCellStyle(cellStyle);

					}

				}

				private List<String> getPendingReportTitleLables16() {

					List<String> list = new ArrayList<String>();

					list.add("FORMAT NO");
					list.add("FORM NAME");
					
					list.add("REVISION NO");
					list.add("SOP NUMBER");
					list.add("UNIT");
					list.add("DATE");
					list.add("MONTH");
					list.add("YEAR");

					// CONTENT

					list.add("BLENDOMATE_CLEANING");
					list.add("METAL_DETECTOR_CLEANING_1");
					list.add("CLP_UNIT_CLEANING");
					list.add("MPM_FILLING_BOX_CLEANING");
					list.add("APPLIED_UNIT_FILTER_BAG_CLEANING_1");
					
					list.add("ERM_MACHINE_CLEANING");
					list.add("CCP_UNIT_CLEANING");
					list.add("DUSTEX_UNIT_CLEANING");
					list.add("HENNATEX_UNIT_CLEANING");
					list.add("CAKE_PRESS_CLEANING");
					
					list.add("KIER_MACHINE_CLEANING");
					list.add("HYDRO_MACHINE_CLEANING");
					list.add("OPENER_MACHINE_CLEANING");
					list.add("DRYER_MACHINE_CLEANING");
					list.add("METAL_DETECTOR_CLEANING_2");
					
					list.add("RIETER_MACHINE_CLEANING");
					list.add("APPLIED_UNIT_FILTER_BAG_CLEANING_2");
					list.add("BALE_PRESS_CLEANING");
					list.add("MTF_UNIT_CLEANING");

					list.add("REMARKS");

					// STATUS COLUMNS
					list.add("SUPERVISIOR STATUS");
					list.add("SUPERVISIOR SUBMITTED DATE");
					list.add("SUPERVISIOR NAME");

					list.add("HOD STATUS");
					list.add("HOD APPROVED/REJECTED DATE");
					list.add("HOD NAME");

					list.add("REJECT REASON");
					list.add("VERSION");

					return list;
				}

				private String createPendingReportValues16(Sheet sheet, Workbook workbook,
						List<BleachMachineCleaningRecordHistoryF16> details) {

					int rowCount = 1;
					int serialCount = 1;

					short shortVal = -1;

					CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, shortVal);

					for (BleachMachineCleaningRecordHistoryF16 history : details) {

						int columnCount = 0;

						Row valueRow = sheet.createRow(rowCount++);

						createCell(valueRow, columnCount++, "PH-PRD-01/F016", cellStyle);
						createCell(valueRow, columnCount++, AppConstants.F16, cellStyle);
						
						createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
						createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
						createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
						createCell(valueRow, columnCount++, history.getDate(), cellStyle);
						createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
						createCell(valueRow, columnCount++, history.getYear(), cellStyle);

						createCell(valueRow, columnCount++, history.getBlendomateCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getMetalDetectorCleaning1(), cellStyle);
						createCell(valueRow, columnCount++, history.getClPUnitCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getMpmFillingBoxCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getAppliedUnitFilterBagCleaning1(), cellStyle);

						createCell(valueRow, columnCount++, history.getErmMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getCcpUnitCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getDustexUnitCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getHennatexUnitCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getCakePressCleaning(), cellStyle);
						
						createCell(valueRow, columnCount++, history.getKierMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getHydroMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getOpenerMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getDryerMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getMetalDetectorCleaning2(), cellStyle);
						
						createCell(valueRow, columnCount++, history.getRieterMachineCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getAppliedUnitFilterBagCleaning2(), cellStyle);
						createCell(valueRow, columnCount++, history.getBalePressCleaning(), cellStyle);
						createCell(valueRow, columnCount++, history.getMtfUnitCleaning(), cellStyle);
						
						
						createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

						// Status
						createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
						createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), cellStyle);
						createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);

						createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
						createDateCell(valueRow, columnCount++, history.getHod_submit_on(), cellStyle);
						createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);

						createCell(valueRow, columnCount++, history.getReason(), cellStyle);
						createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

					}

					return "";

				}



}
