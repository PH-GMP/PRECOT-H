package com.focusr.Precot.util.Qc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
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

import com.focusr.Precot.mssql.database.model.QcAudit.CoaAbCottonF26History;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonBallsF26BHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonPadsF26AHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonRollGoodsF26EHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolPleatF26DHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolRollF26CHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaInfusedCottonPadsF26FHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaMoistureF26GHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.DigitalColonyCounterF030History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QAqcObservationsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.StandarizationOfChemicalReportF016History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportChemistF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportMicroF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportCLF005Parenthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportHistoryCLF005;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.fumigationARF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalTestHistoryF002;
import com.focusr.Precot.mssql.database.model.QcAudit.obervationHistoryCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.observationArF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationsF006history;
import com.focusr.Precot.mssql.database.model.QcAudit.spectrophotometerReportHistoryClF011;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;

public class QcExcel {

	// F026

	public static ByteArrayResource generateF026Excel(List<CoaAbCottonF26History> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("RAW_MATERIAL");
		list.add("INVOICE_NO");
		list.add("LOT_NO");
		list.add("PRODUCTION_DATE");
		list.add("BALE_NO");

		list.add("BALE_ACTUAL");
		list.add("BALE_REMARKS");
		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");
		list.add("MICRONAIRE_ACTUAL");
		list.add("MICRONAIRE_REMARKS");
		list.add("UQL_ACTUAL");
		list.add("UQL_REMARKS");
		list.add("L_ACTUAL");
		list.add("L_REMARKS");
		list.add("REASON");

		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026Values(Sheet sheet, Workbook workbook,

			List<CoaAbCottonF26History> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaAbCottonF26History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);

			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getRaw_material(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduction_date(), cellStyle);
			createCell(valueRow, columnCount++, history.getBale_no(), cellStyle);

			// NEW

			createCell(valueRow, columnCount++, history.getBale_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getBale_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicronaire_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicronaire_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getUql_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getUql_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getL_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getL_remarks(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);
			
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// F026A COA FOR COTTON PADS

	public static ByteArrayResource generateF026AExcel(List<CoaCottonPadsF26AHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026ATitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026AValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026ATitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");
		list.add("PRODUCT_DIMENSION");
		list.add("PATTERN");
		list.add("EDGE");

		// NEW
		list.add("GSM_STANDARD");
		list.add("GSM_ACTUAL");
		list.add("GSM_REMARKS");
		list.add("NO_OF_PAD_ACTUAL");
		list.add("NO_OF_PAD_REMARKS");
		list.add("GROSS_WEIGHT_ACTUAL");
		list.add("GROSS_WEIGHT_REMARKS");
		list.add("PACKING_MATERIAL");

		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");

		// STATUS FOR ALL ROLES
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026AValues(Sheet sheet, Workbook workbook,

			List<CoaCottonPadsF26AHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaCottonPadsF26AHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct_dimension(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdge(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getGsm_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_pad_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_pad_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPacking_material(), cellStyle);

			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);

			// STATUS FOR ALL ROLES
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);

			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// F026B COA FOR COTTON BALLS

	public static ByteArrayResource generateF026BExcel(List<CoaCottonBallsF26BHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026BTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026BValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026BTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");

		// NEW
		list.add("WEIGHT_STANDARD");
		list.add("WEIGHT_ACTUAL");
		list.add("WEIGHT_REMARKS");
		list.add("NO_OF_BALLS_STANDARD");
		list.add("NO_OF_BALLS_ACTUAL");
		list.add("NO_OF_BALLS_REMARKS");
		list.add("GROSS_WEIGHT_STANDARD");
		list.add("GROSS_WEIGHT_ACTUAL");
		list.add("GROSS_WEIGHT_REMARKS");
		list.add("PACKING_MATERIAL");
		list.add("FIBRE_SPECIFICATION");

		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");

		// STATUS FOR ALL ROLES
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026BValues(Sheet sheet, Workbook workbook,

			List<CoaCottonBallsF26BHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaCottonBallsF26BHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getWeight_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_balls_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_balls_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_balls_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPacking_material(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_specification(), cellStyle);

			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);

			// STATUS FOR ALL ROLES
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);
			

			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// F026B COA FOR COTTON BALLS

	public static ByteArrayResource generateF026CExcel(List<CoaCottonWoolRollF26CHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026CTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026CValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026CTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");

		// NEW
		list.add("WIDTH_STANDARD");
		list.add("WIDTH_ACTUAL");
		list.add("WIDTH_REMARKS");
		list.add("GROSS_WEIGHT_STANDARD");
		list.add("GROSS_WEIGHT_ACTUAL");
		list.add("GROSS_WEIGHT_REMARKS");
		list.add("PACKING_MATERIAL");

		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");

		// STATUS FOR ALL ROLES
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026CValues(Sheet sheet, Workbook workbook,

			List<CoaCottonWoolRollF26CHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaCottonWoolRollF26CHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getWidth_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getWidth_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWidth_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPacking_material(), cellStyle);

			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);

			// STATUS FOR ALL ROLES
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// F026B COA FOR COTTON BALLS

	public static ByteArrayResource generateF026DExcel(List<CoaCottonWoolPleatF26DHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026DTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026DValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026DTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");

		// NEW
		list.add("WIDTH_STANDARD");
		list.add("WIDTH_ACTUAL");
		list.add("WIDTH_REMARKS");
		list.add("GROSS_WEIGHT_STANDARD");
		list.add("GROSS_WEIGHT_ACTUAL");
		list.add("GROSS_WEIGHT_REMARKS");
		list.add("NO_OF_FOLDS_STANDARD");
		list.add("NO_OF_FOLDS_ACTUAL");
		list.add("NO_OF_FOLDS_REMARKS");
		list.add("PACKING_MATERIAL");

		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");

		// STATUS FOR ALL ROLES
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026DValues(Sheet sheet, Workbook workbook,

			List<CoaCottonWoolPleatF26DHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaCottonWoolPleatF26DHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getWidth_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getWidth_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWidth_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_folds_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_folds_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_folds_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPacking_material(), cellStyle);

			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);

			// STATUS FOR ALL ROLES
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// COA FOR COTTON ROLL GOODS

	public static ByteArrayResource generateF026EExcel(List<CoaCottonRollGoodsF26EHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026ETitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026EValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026ETitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");
		list.add("REFERENCE_NO");
		list.add("PATTERN");

		// NEW
		list.add("GSM_STANDARD");
		list.add("GSM_ACTUAL");
		list.add("GSM_REMARKS");
		list.add("THICKNESS_STANDARD");
		list.add("THICKNESS_ACTUAL");
		list.add("THICKNESS_REMARKS");
		list.add("SLIT_STANDARD");
		list.add("SLIT_ACTUAL");
		list.add("SLIT_REMARKS");
		list.add("MACHINE_SPEC");
		list.add("MACHINE_ACTUAL");
		list.add("MACHINE_REMARKS");
		list.add("CROSS_DIRECTION_SPEC");
		list.add("CROSS_DIRECTION_ACTUAL");
		list.add("CROSS_DIRECTION_REMARKS");

		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_ACTUAL");
		list.add("PATHOGEN_REMARKS");
		list.add("ODOR_ACTUAL");
		list.add("ODOR_REMARKS");

		// STATUS FOR ALL ROLES
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026EValues(Sheet sheet, Workbook workbook,

			List<CoaCottonRollGoodsF26EHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaCottonRollGoodsF26EHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getReference_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getGsm_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getThickness_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getThickness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getThickness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSlit_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getSlit_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSlit_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachine_spec(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachine_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getMachine_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getCross_direction_spec(), cellStyle);
			createCell(valueRow, columnCount++, history.getCross_direction_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getCross_direction_remarks(), cellStyle);

			// COMMON

			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getOdor_remarks(), cellStyle);

			// STATUS FOR ALL ROLES
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// COA FOR COTTON ROLL GOODS
	
    public static List<String> getColumnNames() {
        List<String> columnNames = new ArrayList<>();
        
        columnNames.add("UNIT");
        columnNames.add("FORMAT_NO");
        columnNames.add("REF_SOP_NO");
        columnNames.add("REVISION_NO");
        columnNames.add("EQ_ID_NO");
        columnNames.add("MONTH");
        columnNames.add("YEAR");
        columnNames.add("REMARK");
        columnNames.add("DATE");
        columnNames.add("UV_ADJUST");
        columnNames.add("UV_ADJUST_METHODS");
        columnNames.add("DEGREE");
        columnNames.add("TINT_VALUE");
        columnNames.add("WI_VALUE");
        columnNames.add("LOW");
        columnNames.add("LARGE");
        columnNames.add("STATUS");
        columnNames.add("CAL_DUE_DATE");
        columnNames.add("CAL_time");
        columnNames.add("CHECKED_BY");
        columnNames.add("VERIFIED_BY");
        columnNames.add("REASON");
        columnNames.add("VERSION");

        
        return columnNames;
    }

	public static ByteArrayResource generateF026FExcel(List<CoaInfusedCottonPadsF26FHistory> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026FTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026FValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026FTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("INVOICE_NO");
		list.add("LOT_NO");
		list.add("REFERENCE_NO");
		list.add("PATTERN");
		list.add("EDGE");

		// NEW
		list.add("GSM_STANDARD");
		list.add("GSM_ACTUAL");
		list.add("GSM_REMARKS");
		list.add("NO_OF_PADS_STANDARD");
		list.add("NO_OF_PADS_ACTUAL");
		list.add("NO_OF_PADS_REMARKS");
		list.add("GROSS_WEIGHT_STANDARD");
		list.add("GROSS_WEIGHT_ACTUAL");
		list.add("GROSS_WEIGHT_REMARKS");
		list.add("PACKING_MATERIAL");

		// COMMON
		list.add("FIBRE_ACTUAL");
		list.add("FIBRE_REMARKS");
		list.add("SURFACE_ACTUAL");
		list.add("SURFACE_REMARKS");
		list.add("SINKING_ACTUAL");
		list.add("SINKING_REMARKS");
		list.add("ABSORPTION_ACTUAL");
		list.add("ABSORPTION_REMARKS");
		list.add("WHITENESS_ACTUAL");
		list.add("WHITENESS_REMARKS");
		list.add("PH_ACTUAL");
		list.add("PH_REMARKS");
		list.add("LOSS_ACTUAL");
		list.add("LOSS_REMARKS");
		list.add("FLUORESCENCE_ACTUAL");
		list.add("FLUORESCENCE_REMARKS");
		list.add("WATER_ACTUAL");
		list.add("WATER_REMARKS");
		list.add("ETHER_ACTUAL");
		list.add("ETHER_REMARKS");
		list.add("SULPHATED_ACTUAL");
		list.add("SULPHATED_REMARKS");

		// NEW
		list.add("FOREIGN_FIBRES_ACTUAL");
		list.add("FOREIGN_FIBRES_REMARKS");
		list.add("NEPS_ACTUAL");
		list.add("NEPS_REMARKS");
		list.add("AVERAGE_ACTUAL");
		list.add("AVERAGE_REMARKS");
		list.add("EXTRACTABLE_ACTUAL");
		list.add("EXTRACTABLE_REMARKS");
		list.add("TOTAL_VIABLE_STANDARD");
		list.add("TOTAL_VIABLE_ACTUAL");
		list.add("TOTAL_VIABLE_REMARKS");
		list.add("TOTAL_FUNGAL_STANDARD");
		list.add("TOTAL_VFUNGAL_ACTUAL");
		list.add("TOTAL_FUNGAL_REMARKS");
		list.add("PATHOGEN_STANDARD");
		list.add("PATHOGEN_SPEC");

		// 22
		list.add("BILE_ACTUAL");
		list.add("BILE_REMARKS");
		list.add("ESCHERICHIA_ACTUAL");
		list.add("ESCHERICHIA_REMARKS");
		list.add("STAPHYLOCOCCUS_ACTUAL");
		list.add("STAPHYLOCOCCUS_REMARKS");
		list.add("PSEUDOMONAS_ACTUAL");
		list.add("PSEUDOMONAS_REMARKS");
		list.add("SALMONELLA_ACTUAL");
		list.add("SALMONELLA_REMARKS");
		list.add("BURKHOLDERIA_ACTUAL");
		list.add("BURKHOLDERIA_REMARKS");

		// STATUS FOR ALL ROLES
		// CHEMIST
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		// QA EXECUTIVE
		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		// QC
		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026FValues(Sheet sheet, Workbook workbook,

			List<CoaInfusedCottonPadsF26FHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaInfusedCottonPadsF26FHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getReference_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdge(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getGsm_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGsm_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_pads_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_pads_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_of_pads_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getGross_weight_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPacking_material(), cellStyle);

			// COMMON
			createCell(valueRow, columnCount++, history.getFibre_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFibre_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSurface_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSinking_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAbsorption_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWhiteness_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPh_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getLoss_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getFluorescence_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getWater_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEther_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSulphated_remarks(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getForeign_fibres_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getForeign_fibres_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getNeps_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getNeps_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getAverage_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getAverage_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getExtractable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getExtractable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_viable_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_vfungal_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_fungal_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_standard(), cellStyle);
			createCell(valueRow, columnCount++, history.getPathogen_spec(), cellStyle);

			// 22
			createCell(valueRow, columnCount++, history.getBile_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getBile_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getEscherichia_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getEscherichia_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getStaphylococcus_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getStaphylococcus_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getPseudomonas_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getPseudomonas_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getSalmonella_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getSalmonella_remarks(), cellStyle);
			createCell(valueRow, columnCount++, history.getBurkholderia_actual(), cellStyle);
			createCell(valueRow, columnCount++, history.getBurkholderia_remarks(), cellStyle);

			// STATUS FOR ALL ROLES

			// CHEMIST
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			// QA EXECUTIVE
			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			// QC
			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// COA FOR MOISTURE CONTENT F26G

	public static ByteArrayResource generateF026GExcel(List<CoaMoistureF26GHistory> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF026GTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF026GValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF026GTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("PRODUCT");
		list.add("CUSTOMER");
		list.add("BATCH_NO");
		list.add("LOT_NO");
		list.add("PO_NO");
		list.add("QUANTITY");

		// NEW
		list.add("TESTING_DATE");
//		list.add("INITIAL_WEIGHT");
//		list.add("FINAL_WEIGHT");
//		list.add("RESULT");

		// CHEMIST
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		// QA EXECUTIVE
		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		// QC
		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REMARKS
//		list.add("REMARKS");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF026GValues(Sheet sheet, Workbook workbook,

			List<CoaMoistureF26GHistory> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (CoaMoistureF26GHistory history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer(), cellStyle);
			createCell(valueRow, columnCount++, history.getBatch_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getPo_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getQuantity(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getTesting_date(), cellStyle);
//			createCell(valueRow, columnCount++, history.getInitial_weight(), cellStyle);
//			createCell(valueRow, columnCount++, history.getFinal_weight(), cellStyle);
//			createCell(valueRow, columnCount++, history.getResult(), cellStyle);

			// STATUS FOR ALL ROLES

			// CHEMIST
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			// QA EXECUTIVE
			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			// QC
			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REMARKS

//			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// COA FOR MOISTURE CONTENT F26G

	public static ByteArrayResource generateF016Excel(List<StandarizationOfChemicalReportF016History> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF016TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF016Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF016TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("SHIFT");

		list.add("NAME_OF_SOLUTION");
		list.add("STANDARD_LOT_NUMBER");
		list.add("VOLUME_OF_SOLUTION");
		list.add("NORMALITY");

		// NEW
		list.add("TO_BE_NAME_OF_SOLUTION");
		list.add("TO_BE_WEIGHT_OF_CHEMICAL");
		list.add("TO_BE_VOLUME_OF_SOLUTION");
//		list.add("VOLUME_OF_SAMPLE_SOLUTION");
		list.add("TRAIL_01");
		list.add("TRAIL_02");
		list.add("TRAIL_03");
		list.add("AVERAGE");
		list.add("NORMAL_OF_REQ_SOLUTION");
		list.add("LOT_NO");
		list.add("EXPIRY_DATE");

		// CHEMIST
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		// QC
		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF016Values(Sheet sheet, Workbook workbook,

			List<StandarizationOfChemicalReportF016History> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (StandarizationOfChemicalReportF016History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getName_of_solution(), cellStyle);
			createCell(valueRow, columnCount++, history.getStandardized_lot_number(), cellStyle);
			createCell(valueRow, columnCount++, history.getVolume_of_solution(), cellStyle);
			createCell(valueRow, columnCount++, history.getNormality(), cellStyle);
			createCell(valueRow, columnCount++, history.getTo_be_name_of_solution(), cellStyle);
			createCell(valueRow, columnCount++, history.getTo_be_weight_of_chemical(), cellStyle);
			createCell(valueRow, columnCount++, history.getTo_be_volume_of_solution(), cellStyle);
			
//			createCell(valueRow, columnCount++, history.getVolume_of_sample_solution(), cellStyle);
			
			
			createCell(valueRow, columnCount++, history.getTrail_01(), cellStyle);
			createCell(valueRow, columnCount++, history.getTrail_02(), cellStyle);
			createCell(valueRow, columnCount++, history.getTrail_03(), cellStyle);

			createCell(valueRow, columnCount++, history.getAverage(), cellStyle);
			createCell(valueRow, columnCount++, history.getNormal_of_req_solution(), cellStyle);
			createCell(valueRow, columnCount++, history.getLot_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getExpiry_date(), cellStyle);

			// STATUS FOR ALL ROLES

			// CHEMIST
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			// QC
			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// DIGITAL_COLONY_COUNTER_CALIBRATION_REPORT_F030

	public static ByteArrayResource generateF030Excel(List<DigitalColonyCounterF030History> details)
			throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF030TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF030Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF030TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
		list.add("EQUIP_ID");

		list.add("CENTERING_STATUS");
		list.add("ADJUSTING_STATUS");

		list.add("CALIBRATION_TIME");
		list.add("ACTIVITY_STATUS");
		list.add("CALIBRATION_NEXT_DUE_DATE");

		// CHEMIST
		list.add("MICRO_STATUS");
		list.add("MICRO_SAVED_ON");
		list.add("MICRO_SAVED_BY");
		list.add("MICRO_SUBMIT_ON");
		list.add("MICRO_SUBMIT_BY");
		list.add("MICRO_SIGN");

		// QA EXECUTIVE
		list.add("MICRO_DESIGNEE_STATUS");
		list.add("MICRO_DESIGNEE_SUBMIT_ON");
		list.add("MICRO_DESIGNEE_SUBMIT_BY");
		list.add("MICRO_DESIGNEE_SIGN");

		// REMARKS
		list.add("REMARKS");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		return list;
	}

	private static String createLogBookF030Values(Sheet sheet, Workbook workbook,

			List<DigitalColonyCounterF030History> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DigitalColonyCounterF030History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			createCell(valueRow, columnCount++, history.getEquip_id(), cellStyle);

			// NEW
			createCell(valueRow, columnCount++, history.getCentering_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getAdjusting_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getCalibration_time(), cellStyle);
			createCell(valueRow, columnCount++, history.getActivity_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getCalibration_next_due_date(), cellStyle);

			// STATUS FOR ALL ROLES

			// CHEMIST
			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getMicro_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getMicro_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getMicro_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);

			// QC
			createCell(valueRow, columnCount++, history.getMicro_designee_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getMicro_designee_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getMicro_designee_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_designee_sign(), cellStyle);

			// REMARKS
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

	// WATER ANALYSIS REPORT F007

	public static ByteArrayResource generateF007Excel(List<WaterAnalysisReportF007History> details) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getLogBookF007TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createLogBookF007Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getLogBookF007TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NO");
		list.add("FORMAT_NAME");
		list.add("REF_SOP_NO");
		list.add("AR_NO");
		list.add("DATE");

		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SAVED_ON");
		list.add("CHEMIST_SAVED_BY");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SIGN");

		// QA EXECUTIVE
		list.add("QA_EXE_STATUS");
		list.add("QA_EXE_SUBMIT_ON");
		list.add("QA_EXE_SUBMIT_BY");
		list.add("QA_EXE_SIGN");

		// CHEMIST
		list.add("MICRO_STATUS");
		list.add("MICRO_SAVED_ON");
		list.add("MICRO_SAVED_BY");
		list.add("MICRO_SUBMIT_ON");
		list.add("MICRO_SUBMIT_BY");
		list.add("MICRO_SIGN");

		// QC
		list.add("MANAGER_STATUS");
		list.add("MANAGER_SUBMIT_ON");
		list.add("MANAGER_SUBMIT_BY");
		list.add("MANAGER_SIGN");

		// REASON
		list.add("REASON");

		// VERSION
		list.add("VERSION");

		// MANY CHEMIST

		// Equalization Fields
		list.add("EQUALIZATION_PH_ACT");
		list.add("EQUALIZATION_HARDNESS_ACT");
		list.add("EQUALIZATION_TDS_ACT");
		list.add("EQUALIZATION_TURBIDITY_ACT");
		list.add("EQUALIZATION_FRC_ACT");
		list.add("EQUALIZATION_TSS_ACT");
		list.add("EQUALIZATION_DO_ACT");
		list.add("EQUALIZATION_COD_ACT");
		list.add("EQUALIZATION_BOD_ACT");
		list.add("EQUALIZATION_MLSS_ACT");
		list.add("EQUALIZATION_MLVSS_ACT");
		list.add("EQUALIZATION_SV_ACT");

		// Primary Clarifier I/L Fields
		list.add("PRIMARY_IL_PH_ACT");
		list.add("PRIMARY_IL_HARDNESS_ACT");
		list.add("PRIMARY_IL_TDS_ACT");
		list.add("PRIMARY_IL_TURBIDITY_ACT");
		list.add("PRIMARY_IL_FRC_ACT");
		list.add("PRIMARY_IL_TSS_ACT");
		list.add("PRIMARY_IL_DO_ACT");
		list.add("PRIMARY_IL_COD_ACT");
		list.add("PRIMARY_IL_BOD_ACT");
		list.add("PRIMARY_IL_MLSS_ACT");
		list.add("PRIMARY_IL_MLVSS_ACT");
		list.add("PRIMARY_IL_SV_ACT");

		// Primary Clarifier O/L Fields
		list.add("PRIMARY_OL_PH_ACT");
		list.add("PRIMARY_OL_HARDNESS_ACT");
		list.add("PRIMARY_OL_TDS_ACT");
		list.add("PRIMARY_OL_TURBIDITY_ACT");
		list.add("PRIMARY_OL_FRC_ACT");
		list.add("PRIMARY_OL_TSS_ACT");
		list.add("PRIMARY_OL_DO_ACT");
		list.add("PRIMARY_OL_COD_ACT");
		list.add("PRIMARY_OL_BOD_ACT");
		list.add("PRIMARY_OL_MLSS_ACT");
		list.add("PRIMARY_OL_MLVSS_ACT");
		list.add("PRIMARY_OL_SV_ACT");

		// Aeration Tank 1 Fields
		list.add("AERATION_TANT_1_PH_ACT");
		list.add("AERATION_TANT_1_HARDNESS_ACT");
		list.add("AERATION_TANT_1_TDS_ACT");
		list.add("AERATION_TANT_1_TURBIDITY_ACT");
		list.add("AERATION_TANT_1_FRC_ACT");
		list.add("AERATION_TANT_1_TSS_ACT");
		list.add("AERATION_TANT_1_DO_ACT");
		list.add("AERATION_TANT_1_COD_ACT");
		list.add("AERATION_TANT_1_BOD_ACT");
		list.add("AERATION_TANT_1_MLSS_ACT");
		list.add("AERATION_TANT_1_MLVSS_ACT");
		list.add("AERATION_TANT_1_SV_ACT");

		// Aeration Tank 6 Fields
		list.add("AERATION_TANT_6_PH_ACT");
		list.add("AERATION_TANT_6_HARDNESS_ACT");
		list.add("AERATION_TANT_6_TDS_ACT");
		list.add("AERATION_TANT_6_TURBIDITY_ACT");
		list.add("AERATION_TANT_6_FRC_ACT");
		list.add("AERATION_TANT_6_TSS_ACT");
		list.add("AERATION_TANT_6_DO_ACT");
		list.add("AERATION_TANT_6_COD_ACT");
		list.add("AERATION_TANT_6_BOD_ACT");
		list.add("AERATION_TANT_6_MLSS_ACT");
		list.add("AERATION_TANT_6_MLVSS_ACT");
		list.add("AERATION_TANT_6_SV_ACT");

		// Secondary Clarifier O/L Fields
		list.add("SECONDARY_OL_PH_ACT");
		list.add("SECONDARY_OL_HARDNESS_ACT");
		list.add("SECONDARY_OL_TDS_ACT");
		list.add("SECONDARY_OL_TURBIDITY_ACT");
		list.add("SECONDARY_OL_FRC_ACT");
		list.add("SECONDARY_OL_TSS_ACT");
		list.add("SECONDARY_OL_DO_ACT");
		list.add("SECONDARY_OL_COD_ACT");
		list.add("SECONDARY_OL_BOD_ACT");
		list.add("SECONDARY_OL_MLSS_ACT");
		list.add("SECONDARY_OL_MLVSS_ACT");
		list.add("SECONDARY_OL_SV_ACT");

		// UF Feed Fields
		list.add("UF_FEED_PH_ACT");
		list.add("UF_FEED_HARDNESS_ACT");
		list.add("UF_FEED_TDS_ACT");
		list.add("UF_FEED_TURBIDITY_ACT");
		list.add("UF_FEED_FRC_ACT");
		list.add("UF_FEED_TSS_ACT");
		list.add("UF_FEED_DO_ACT");
		list.add("UF_FEED_COD_ACT");
		list.add("UF_FEED_BOD_ACT");
		list.add("UF_FEED_MLSS_ACT");
		list.add("UF_FEED_MLVSS_ACT");
		list.add("UF_FEED_SV_ACT");

		// RO 01 Feed Fields
		list.add("RO_01_FEED_PH_ACT");
		list.add("RO_01_FEED_HARDNESS_ACT");
		list.add("RO_01_FEED_TDS_ACT");
		list.add("RO_01_FEED_TURBIDITY_ACT");
		list.add("RO_01_FEED_FRC_ACT");
		list.add("RO_01_FEED_TSS_ACT");
		list.add("RO_01_FEED_DO_ACT");
		list.add("RO_01_FEED_COD_ACT");
		list.add("RO_01_FEED_BOD_ACT");
		list.add("RO_01_FEED_MLSS_ACT");
		list.add("RO_01_FEED_MLVSS_ACT");
		list.add("RO_01_FEED_SV_ACT");

		// RO 01 Permeate Fields
		list.add("RO_01_PERMEATE_PH_ACT");
		list.add("RO_01_PERMEATE_HARDNESS_ACT");
		list.add("RO_01_PERMEATE_TDS_ACT");
		list.add("RO_01_PERMEATE_TURBIDITY_ACT");
		list.add("RO_01_PERMEATE_FRC_ACT");
		list.add("RO_01_PERMEATE_TSS_ACT");
		list.add("RO_01_PERMEATE_DO_ACT");
		list.add("RO_01_PERMEATE_COD_ACT");
		list.add("RO_01_PERMEATE_BOD_ACT");
		list.add("RO_01_PERMEATE_MLSS_ACT");
		list.add("RO_01_PERMEATE_MLVSS_ACT");
		list.add("RO_01_PERMEATE_SV_ACT");

		// RO 02 Feed Fields
		list.add("RO_02_FEED_PH_ACT");
		list.add("RO_02_FEED_HARDNESS_ACT");
		list.add("RO_02_FEED_TDS_ACT");
		list.add("RO_02_FEED_TURBIDITY_ACT");
		list.add("RO_02_FEED_FRC_ACT");
		list.add("RO_02_FEED_TSS_ACT");
		list.add("RO_02_FEED_DO_ACT");
		list.add("RO_02_FEED_COD_ACT");
		list.add("RO_02_FEED_BOD_ACT");
		list.add("RO_02_FEED_MLSS_ACT");
		list.add("RO_02_FEED_MLVSS_ACT");
		list.add("RO_02_FEED_SV_ACT");

		// RO 02 Permeate Fields
		list.add("RO_02_PERMEATE_PH_ACT");
		list.add("RO_02_PERMEATE_HARDNESS_ACT");
		list.add("RO_02_PERMEATE_TDS_ACT");
		list.add("RO_02_PERMEATE_TURBIDITY_ACT");
		list.add("RO_02_PERMEATE_FRC_ACT");
		list.add("RO_02_PERMEATE_TSS_ACT");
		list.add("RO_02_PERMEATE_DO_ACT");
		list.add("RO_02_PERMEATE_COD_ACT");
		list.add("RO_02_PERMEATE_BOD_ACT");
		list.add("RO_02_PERMEATE_MLSS_ACT");
		list.add("RO_02_PERMEATE_MLVSS_ACT");
		list.add("RO_02_PERMEATE_SV_ACT");

		list.add("RO_03_FEED_PH_ACT");
		list.add("RO_03_FEED_HARDNESS_ACT");
		list.add("RO_03_FEED_TDS_ACT");
		list.add("RO_03_FEED_TURBIDITY_ACT");
		list.add("RO_03_FEED_FRC_ACT");
		list.add("RO_03_FEED_TSS_ACT");
		list.add("RO_03_FEED_DO_ACT");
		list.add("RO_03_FEED_COD_ACT");
		list.add("RO_03_FEED_BOD_ACT");
		list.add("RO_03_FEED_MLSS_ACT");
		list.add("RO_03_FEED_MLVSS_ACT");
		list.add("RO_03_FEED_SV_ACT");

		list.add("RO_03_PERMEATE_PH_ACT");
		list.add("RO_03_PERMEATE_HARDNESS_ACT");
		list.add("RO_03_PERMEATE_TDS_ACT");
		list.add("RO_03_PERMEATE_TURBIDITY_ACT");
		list.add("RO_03_PERMEATE_FRC_ACT");
		list.add("RO_03_PERMEATE_TSS_ACT");
		list.add("RO_03_PERMEATE_DO_ACT");
		list.add("RO_03_PERMEATE_COD_ACT");
		list.add("RO_03_PERMEATE_BOD_ACT");
		list.add("RO_03_PERMEATE_MLSS_ACT");
		list.add("RO_03_PERMEATE_MLVSS_ACT");
		list.add("RO_03_PERMEATE_SV_ACT");

		list.add("RO_04_FEED_PH_ACT");
		list.add("RO_04_FEED_HARDNESS_ACT");
		list.add("RO_04_FEED_TDS_ACT");
		list.add("RO_04_FEED_TURBIDITY_ACT");
		list.add("RO_04_FEED_FRC_ACT");
		list.add("RO_04_FEED_TSS_ACT");
		list.add("RO_04_FEED_DO_ACT");
		list.add("RO_04_FEED_COD_ACT");
		list.add("RO_04_FEED_BOD_ACT");
		list.add("RO_04_FEED_MLSS_ACT");
		list.add("RO_04_FEED_MLVSS_ACT");
		list.add("RO_04_FEED_SV_ACT");

		list.add("RO_04_PERMEATE_PH_ACT");
		list.add("RO_04_PERMEATE_HARDNESS_ACT");
		list.add("RO_04_PERMEATE_TDS_ACT");
		list.add("RO_04_PERMEATE_TURBIDITY_ACT");
		list.add("RO_04_PERMEATE_FRC_ACT");
		list.add("RO_04_PERMEATE_TSS_ACT");
		list.add("RO_04_PERMEATE_DO_ACT");
		list.add("RO_04_PERMEATE_COD_ACT");
		list.add("RO_04_PERMEATE_BOD_ACT");
		list.add("RO_04_PERMEATE_MLSS_ACT");
		list.add("RO_04_PERMEATE_MLVSS_ACT");
		list.add("RO_04_PERMEATE_SV_ACT");

		list.add("MEE_FEED_PH_ACT");
		list.add("MEE_FEED_HARDNESS_ACT");
		list.add("MEE_FEED_TDS_ACT");
		list.add("MEE_FEED_TURBIDITY_ACT");
		list.add("MEE_FEED_FRC_ACT");
		list.add("MEE_FEED_TSS_ACT");
		list.add("MEE_FEED_DO_ACT");
		list.add("MEE_FEED_COD_ACT");
		list.add("MEE_FEED_BOD_ACT");
		list.add("MEE_FEED_MLSS_ACT");
		list.add("MEE_FEED_MLVSS_ACT");
		list.add("MEE_FEED_SV_ACT");

		list.add("MEE_CONDENSATE_PH_ACT");
		list.add("MEE_CONDENSATE_HARDNESS_ACT");
		list.add("MEE_CONDENSATE_TDS_ACT");
		list.add("MEE_CONDENSATE_TURBIDITY_ACT");
		list.add("MEE_CONDENSATE_FRC_ACT");
		list.add("MEE_CONDENSATE_TSS_ACT");
		list.add("MEE_CONDENSATE_DO_ACT");
		list.add("MEE_CONDENSATE_COD_ACT");
		list.add("MEE_CONDENSATE_BOD_ACT");
		list.add("MEE_CONDENSATE_MLSS_ACT");
		list.add("MEE_CONDENSATE_MLVSS_ACT");
		list.add("MEE_CONDENSATE_SV_ACT");

		list.add("MEE_CONCENTRATE_PH_ACT");
		list.add("MEE_CONCENTRATE_HARDNESS_ACT");
		list.add("MEE_CONCENTRATE_TDS_ACT");
		list.add("MEE_CONCENTRATE_TURBIDITY_ACT");
		list.add("MEE_CONCENTRATE_FRC_ACT");
		list.add("MEE_CONCENTRATE_TSS_ACT");
		list.add("MEE_CONCENTRATE_DO_ACT");
		list.add("MEE_CONCENTRATE_COD_ACT");
		list.add("MEE_CONCENTRATE_BOD_ACT");
		list.add("MEE_CONCENTRATE_MLSS_ACT");
		list.add("MEE_CONCENTRATE_MLVSS_ACT");
		list.add("MEE_CONCENTRATE_SV_ACT");

		list.add("RO_TANK_PH_ACT");
		list.add("RO_TANK_HARDNESS_ACT");
		list.add("RO_TANK_TDS_ACT");
		list.add("RO_TANK_TURBIDITY_ACT");
		list.add("RO_TANK_FRC_ACT");
		list.add("RO_TANK_TSS_ACT");
		list.add("RO_TANK_DO_ACT");
		list.add("RO_TANK_COD_ACT");
		list.add("RO_TANK_BOD_ACT");
		list.add("RO_TANK_MLSS_ACT");
		list.add("RO_TANK_MLVSS_ACT");
		list.add("RO_TANK_SV_ACT");

		list.add("SOFT_WATER_PH_ACT");
		list.add("SOFT_WATER_HARDNESS_ACT");
		list.add("SOFT_WATER_TDS_ACT");
		list.add("SOFT_WATER_TURBIDITY_ACT");
		list.add("SOFT_WATER_FRC_ACT");
		list.add("SOFT_WATER_TSS_ACT");
		list.add("SOFT_WATER_DO_ACT");
		list.add("SOFT_WATER_COD_ACT");
		list.add("SOFT_WATER_BOD_ACT");
		list.add("SOFT_WATER_MLSS_ACT");
		list.add("SOFT_WATER_MLVSS_ACT");
		list.add("SOFT_WATER_SV_ACT");

		list.add("KIADB_PH_ACT");
		list.add("KIADB_HARDNESS_ACT");
		list.add("KIADB_TDS_ACT");
		list.add("KIADB_TURBIDITY_ACT");
		list.add("KIADB_FRC_ACT");
		list.add("KIADB_TSS_ACT");
		list.add("KIADB_DO_ACT");
		list.add("KIADB_COD_ACT");
		list.add("KIADB_BOD_ACT");
		list.add("KIADB_MLSS_ACT");
		list.add("KIADB_MLVSS_ACT");
		list.add("KIADB_SV_ACT");

		list.add("SOFTNER_PH_ACT");
		list.add("SOFTNER_HARDNESS_ACT");
		list.add("SOFTNER_TDS_ACT");
		list.add("SOFTNER_TURBIDITY_ACT");
		list.add("SOFTNER_FRC_ACT");
		list.add("SOFTNER_TSS_ACT");
		list.add("SOFTNER_DO_ACT");
		list.add("SOFTNER_COD_ACT");
		list.add("SOFTNER_BOD_ACT");
		list.add("SOFTNER_MLSS_ACT");
		list.add("SOFTNER_MLVSS_ACT");
		list.add("SOFTNER_SV_ACT");

		list.add("STP_TREATED_PH_ACT");
		list.add("STP_TREATED_HARDNESS_ACT");
		list.add("STP_TREATED_TDS_ACT");
		list.add("STP_TREATED_TURBIDITY_ACT");
		list.add("STP_TREATED_FRC_ACT");
		list.add("STP_TREATED_TSS_ACT");
		list.add("STP_TREATED_DO_ACT");
		list.add("STP_TREATED_COD_ACT");
		list.add("STP_TREATED_BOD_ACT");
		list.add("STP_TREATED_MLSS_ACT");
		list.add("STP_TREATED_MLVSS_ACT");
		list.add("STP_TREATED_SV_ACT");

		list.add("BAG_FILTER_PH_ACT");
		list.add("BAG_FILTER_HARDNESS_ACT");
		list.add("BAG_FILTER_TDS_ACT");
		list.add("BAG_FILTER_TURBIDITY_ACT");
		list.add("BAG_FILTER_FRC_ACT");
		list.add("BAG_FILTER_TSS_ACT");
		list.add("BAG_FILTER_DO_ACT");
		list.add("BAG_FILTER_COD_ACT");
		list.add("BAG_FILTER_BOD_ACT");
		list.add("BAG_FILTER_MLSS_ACT");
		list.add("BAG_FILTER_MLVSS_ACT");
		list.add("BAG_FILTER_SV_ACT");

		list.add("STORAGE_TANK_PH_ACT");
		list.add("STORAGE_TANK_HARDNESS_ACT");
		list.add("STORAGE_TANK_TDS_ACT");
		list.add("STORAGE_TANK_TURBIDITY_ACT");
		list.add("STORAGE_TANK_FRC_ACT");
		list.add("STORAGE_TANK_TSS_ACT");
		list.add("STORAGE_TANK_DO_ACT");
		list.add("STORAGE_TANK_COD_ACT");
		list.add("STORAGE_TANK_BOD_ACT");
		list.add("STORAGE_TANK_MLSS_ACT");
		list.add("STORAGE_TANK_MLVSS_ACT");
		list.add("STORAGE_TANK_SV_ACT");
		
		list.add("REMARKS");
		
		// MANY
	    // 2ND TABLE 
		
		list.add("EQUALIZATION_SAMPLED");
		list.add("EQUALIZATION_INCUBATION");
		list.add("EQUALIZATION_TEST_COMPLETION");

		list.add("RO_TANK_TOTAL_VAIBLE");
		list.add("RO_TANK_TOTAL_FUNGAL");
		list.add("RO_TANK_GRAM");
		list.add("RO_TANK_ESCHERECHIA");
		list.add("RO_TANK_STAPHYLOCOCCOS");
		list.add("RO_TANK_PSEUDOMONAS");
		list.add("RO_TANK_SALMONELLA");

		list.add("SOFT_WATER_TOTAL_VAIBLE");
		list.add("SOFT_WATER_TOTAL_FUNGAL");
		list.add("SOFT_WATER_GRAM");
		list.add("SOFT_WATER_ESCHERECHIA");
		list.add("SOFT_WATER_STAPHYLOCOCCOS");
		list.add("SOFT_WATER_PSEUDOMONAS");
		list.add("SOFT_WATER_SALMONELLA");

		list.add("BAG_FILTER_TOTAL_VAIBLE");
		list.add("BAG_FILTER_TOTAL_FUNGAL");
		list.add("BAG_FILTER_GRAM");
		list.add("BAG_FILTER_ESCHERECHIA");
		list.add("BAG_FILTER_STAPHYLOCOCCOS");
		list.add("BAG_FILTER_PSEUDOMONAS");
		list.add("BAG_FILTER_SALMONELLA");

		list.add("STORAGE_TANK_TOTAL_VAIBLE");
		list.add("STORAGE_TANK_TOTAL_FUNGAL");
		list.add("STORAGE_TANK_GRAM");
		list.add("STORAGE_TANK_ESCHERECHIA");
		list.add("STORAGE_TANK_STAPHYLOCOCCOS");
		list.add("STORAGE_TANK_PSEUDOMONAS");
		list.add("STORAGE_TANK_SALMONELLA");

		list.add("WATER_BLEACHING_TOTAL_VAIBLE");
		list.add("WATER_BLEACHING_TOTAL_FUNGAL");
		list.add("WATER_BLEACHING_GRAM");
		list.add("WATER_BLEACHING_ESCHERECHIA");
		list.add("WATER_BLEACHING_STAPHYLOCOCCOS");
		list.add("WATER_BLEACHING_PSEUDOMONAS");
		list.add("WATER_BLEACHING_SALMONELLA");

		list.add("PPD_AHU_INLET_TOTAL_VAIBLE");
		list.add("PPD_AHU_INLET_TOTAL_FUNGAL");
		list.add("PPD_AHU_INLET_GRAM");
		list.add("PPD_AHU_INLET_ESCHERECHIA");
		list.add("PPD_AHU_INLET_STAPHYLOCOCCOS");
		list.add("PPD_AHU_INLET_PSEUDOMONAS");
		list.add("PPD_AHU_INLET_SALMONELLA");

		list.add("PPD_AHU_FOG_TOTAL_VAIBLE");
		list.add("PPD_AHU_FOG_TOTAL_FUNGAL");
		list.add("PPD_AHU_FOG_GRAM");
		list.add("PPD_AHU_FOG_ESCHERECHIA");
		list.add("PPD_AHU_FOG_STAPHYLOCOCCOS");
		list.add("PPD_AHU_FOG_PSEUDOMONAS");
		list.add("PPD_AHU_FOG_SALMONELLA");

		list.add("UV_INLET_TOTAL_VAIBLE");
		list.add("UV_INLET_TOTAL_FUNGAL");
		list.add("UV_INLET_GRAM");
		list.add("UV_INLET_ESCHERECHIA");
		list.add("UV_INLET_STAPHYLOCOCCOS");
		list.add("UV_INLET_PSEUDOMONAS");
		list.add("UV_INLET_SALMONELLA");

		list.add("UV_OUTLET_TOTAL_VAIBLE");
		list.add("UV_OUTLET_TOTAL_FUNGAL");
		list.add("UV_OUTLET_GRAM");
		list.add("UV_OUTLET_ESCHERECHIA");
		list.add("UV_OUTLET_STAPHYLOCOCCOS");
		list.add("UV_OUTLET_PSEUDOMONAS");
		list.add("UV_OUTLET_SALMONELLA");
		
		list.add("REMARKS");

		
		

		return list;
	}

	private static String createLogBookF007Values(Sheet sheet, Workbook workbook,

			List<WaterAnalysisReportF007History> splunancebaleconsumptionhistoryf01) {

		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (WaterAnalysisReportF007History history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getAr_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);

			// CHEMIST
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

			// QA EXECUTIVE
			createCell(valueRow, columnCount++, history.getQa_exe_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_exe_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_exe_sign(), cellStyle);

			// MICRO
			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getMicro_saved_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getMicro_saved_by(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getMicro_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);

			// QC
			createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

			// REASON
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);

			// VERSION
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			// MANY

			int machineDetailsStartColumn = columnCount;
			int rollConsumptionStartColumn = machineDetailsStartColumn + 301;

			if (history.getChemistDetails() != null && !history.getChemistDetails().isEmpty()) {
				for (WaterAnalysisReportChemistF007History details : history.getChemistDetails()) {

					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = machineDetailsStartColumn;

					createCell(nestedRow, nestedColumnCount++, details.getEqualization_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_sv_act(), cellStyle);

					// PRIMARY CLARIFIER I/L
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_il_sv_act(), cellStyle);

					// PRIMARY CLARIFIER O/L
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPrimary_ol_sv_act(), cellStyle);

					// AERATION TANK 1
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_1_sv_act(), cellStyle);








					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAeration_tant_6_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSecondary_ol_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUf_feed_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_feed_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_01_permeate_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_feed_sv_act(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_02_permeate_sv_act(), cellStyle);




					// RO 03 FEED
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_feed_sv_act(), cellStyle);

					// RO 03 PERMEATE
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_03_permeate_sv_act(), cellStyle);

					// RO 04 FEED
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_feed_sv_act(), cellStyle);

					// RO 04 PERMEATE
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_04_permeate_sv_act(), cellStyle);

					// MEE FEED
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_feed_sv_act(), cellStyle);

					// MEE CONDENSATE
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_condensate_sv_act(), cellStyle);

					// MEE CONCENTRATE
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMee_concentrate_sv_act(), cellStyle);

					// RO TANK 19
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_sv_act(), cellStyle);


					// SOFT WATER 20
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_sv_act(), cellStyle);

					// KIADB 21
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getKiadb_sv_act(), cellStyle);

					// SOFTNER 22
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftner_sv_act(), cellStyle);

					// STP TREATED 23
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStp_treated_sv_act(), cellStyle);

					// BAG FILTER 24
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_sv_act(), cellStyle);

					// STORAGE TANK 25
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_ph_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_hardness_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_tds_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_turbidity_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_frc_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_tss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_do_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_cod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_bod_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_mlss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_mlvss_act(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_sv_act(), cellStyle);

					
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
					


				}
			}
			else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 8; i++) {
					createCell(valueRow, machineDetailsStartColumn + i, "", cellStyle);
				}
			}
			
			if(history.getMicroDetails()!= null && !history.getMicroDetails().isEmpty())
			{
				for(WaterAnalysisReportMicroF007History details : history.getMicroDetails())
				{
					
					
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = rollConsumptionStartColumn;
					
					
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_sampled(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_incubation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEqualization_test_completion(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRo_tank_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoft_water_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBag_filter_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStorage_tank_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_bleaching_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_inlet_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPpd_ahu_fog_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_inlet_salmonella(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_total_vaible(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_total_fungal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_gram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_escherechia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_staphylococcos(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_pseudomonas(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUv_outlet_salmonella(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);

				}
			}

		}

		return "";
	}
	
	
	// Gayathri
	
	public static ByteArrayResource generatePhysicalAndChemicalExcel(List<PHYSICALANDCHEMICALTESTHistory> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getPhysicalAndChemicalTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createPhysicalAndChemicalValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	public static ByteArrayResource generateSpectroExcel(List<spectrophotometerReportHistoryClF011> invoices) throws IOException {

		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getColumnNames();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createspectroValues(sheet, workbook, invoices);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static void createspectroValues(Sheet sheet, Workbook workbook,
	        List<spectrophotometerReportHistoryClF011> invoices) {
	    int rowCount = 1; // Start from row 1, leaving row 0 for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (spectrophotometerReportHistoryClF011 invoice : invoices) {
	        int columnCount = 0;

	        // Create a new row for each record
	        Row valueRow = sheet.createRow(rowCount++);

	        // Populate cells with data from spectrophotometerReportHistoryClF011
	        
	        createCell(valueRow, columnCount++, invoice.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getRevision_no(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getEq_id_no(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getUv_adjust(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getUv_adjust_methods(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getDegree(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getTint_value(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getWi_value(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getLow(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getLarge(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getStatus(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getCal_due_date(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getCal_time(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getChemist_sign(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getQc_sign(), cellStyle);
	        createCell(valueRow, columnCount++, invoice.getReason(), cellStyle);
	       createCell(valueRow, columnCount++,String.valueOf(invoice.getVersion()), cellStyle);

	    }
	}

	private static List<String> getPhysicalAndChemicalTitleLables() {
		List<String> list = new ArrayList<>();
 
		list.add("FORMAT_NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		
		list.add("AR_NO");
		list.add("SAMPLING_DATE");
		list.add("TESTED_DATE");
		list.add("SUB_BATCH_NO");
		list.add("INTERNAL_EXPORT");
		
		list.add("FINISHING");
		list.add("MIXING");
		list.add("REMARKS");
		list.add("BMR_NO");
		list.add("RESULT");
		
//		list.add("PRODUCT");
////		list.add("QC_SIGN");
//		list.add("MATERIAL_PASSES");
		
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SUBMIT_ID");
		list.add("CHEMIST_SIGN");
		
		list.add("MICRO_STATUS");
		list.add("MICRO_SUBMIT_ON");
		list.add("MICRO_SUBMIT_BY");
		list.add("MICRO_SUBMIT_ID");
		list.add("MICRO_SIGN");
		
		list.add("QC_STATUS");
		list.add("QC_SUBMIT_ON");
		list.add("QC_SUBMIT_BY");
		list.add("QC_SUBMIT_ID");
		
//		list.add("PREPARED_BY");
//		
//		list.add("QC_STATUS_MICRO");
//		list.add("QC_SUBMIT_BY_MICRO");
//		list.add("QC_SUBMIT_ID_MICRO");
//		list.add("QC_SUBMIT_ON_MICRO");
//		list.add("QC_SIGN_MICRO");
 
		list.add("REASON");
		list.add("VERSION");
 
		// MANY
		// QAqcObservationsHistory
		list.add("OBSERVATION");
		list.add("DESCRIPTION_REMARK");
		list.add("IDENTIFICATION_OBR");
		list.add("IDENTIFICATION_RMK");
		list.add("FIBRE_OBS");
		list.add("FIBRE_RMK");
		list.add("ACID_OBS");
		list.add("ACID_RMK");
		
		list.add("SURFACE_OBS");
		list.add("SURFACE_RMK");
		list.add("FOREIGN_OBS");
		list.add("FOREIGN_RMK");
		list.add("FLUORESCENCE_OBS");
		list.add("FLUORESCENCE_RMK");
		list.add("NEPS_OBS");
		list.add("NEPS_RMK");
		
		list.add("NEPS_COUNT_OBS");
		list.add("NEPS_COUNT_RMK");
		list.add("UQL_W_OBS");
		list.add("UQL_W_RMK");
		list.add("LN_OBS");
		list.add("LN_RMK");
		list.add("LW_OBS");
		list.add("LW_RMK");
		
		list.add("SFC_N_OBS");
		list.add("SFC_N_RMK");
		list.add("SFC_W_OBS");
		list.add("SFC_W_RMK");
		list.add("MICRONAIRE_OBS");
		list.add("MICRONAIRE_RMK");
		list.add("WHITENESS_OBS");
		list.add("WHITENESS_RMK");
		
		list.add("EXTRACTABLE_OBS");
		list.add("EXTRACTABLE_RMK");
		list.add("ABS_1");
		list.add("ABS_2");
		list.add("ABS_3");
		list.add("ABS_4");
		list.add("ABS_5");
		list.add("ABS_6");
		
		list.add("ABS_AVG");
		list.add("ABS_AVG_2");
		list.add("REMARK");
		list.add("SULPHATED_OBS");
		list.add("SULPHATED_RMK");
		list.add("SULPHATED_AVG");
		list.add("SULPHATED_RES");
		list.add("WATER_SOLUBLE_OBS");
		
		list.add("WATER_SOLUBLE_RMK");
		list.add("WATER_SOLUBLE_AVG");
		list.add("WATER_SOLUBLE_RES");
		list.add("ETHER_SOLUBLE_OBS");
		
		list.add("ETHER_SOLUBLE_RMK");
		list.add("ETHER_SOLUBLE_AVG");
		list.add("ETHER_SOLUBLE_RES");
		list.add("LOSS_ON_DRYING_OBS");
		
		list.add("LOSS_ON_DRYING_RMK");
		list.add("LOSS_ON_DRYING_AVG");
		list.add("LOSS_ON_DRYING_RES");
		list.add("FINAL_REMARK");
		
		list.add("SUB_BATCH_NO");
		list.add("PRODUCT");
		list.add("MATERILA_PASSES");
		
 
		// microbiologicalTestHistoryF002
		list.add("SAMPLED_ON");
		list.add("TESTED");
		list.add("TF_COUNT");
		list.add("P_FIELD_A");
		list.add("P_FIELD_B");
		list.add("P_FIELD_C");
		list.add("P_FIELD_D");
		list.add("P_FIELD_E");
		list.add("MOISTURE");
		list.add("SUB_BATCH_NO");
		list.add("COMPLETION_DATE");
		list.add("REMARKS");
		list.add("PRODUCT");
 
		return list;
	}
	
	private static List<String> getFieldNames() {
	    List<String> list = new ArrayList<>();

	    list.add("lab_id");
	    list.add("DATE");
	    list.add("FORMAT");
	    list.add("UNIT_H");
	    list.add("UNIT");
	    list.add("FORMAT_NO");
	    list.add("REF_SOP_NO");
	    list.add("REVISION_NO");
	    list.add("FREQUENCY");
	    list.add("EQ_ID_NO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("TOLERANCE");
	    list.add("TEXT");
	    list.add("NUMBER");
	    list.add("NUMBER_B");
	    list.add("BALANCEMAXWEIGHT");
	    list.add("BALANCEMINWEIGHT");
	    list.add("REMARK");
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_BY");
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SIGN");
	    list.add("REASON");
	    list.add("QC_SIGN");
	    list.add("VERSION");
	    list.add("ID");
	    list.add("S_NO");
	    list.add("STANDARD_WEIGHT");
	    list.add("TEST_LOV");
	    list.add("NUMBER_A");
	    list.add("NUMBER_B");
	    list.add("REMARK");
	    list.add("STATUS");
	    list.add("CALIBRATED_BY");
	    list.add("VERIFIED_BY");

	    return list;
	}



	private static void createPhysicalAndChemicalValues(Sheet sheet, Workbook workbook,
			List<PHYSICALANDCHEMICALTESTHistory> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);
 
		for (PHYSICALANDCHEMICALTESTHistory history : reportHistory) {
			int columnCount = 0;
 
			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);
 
			// Main record fields
			createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevision_no()), cellStyle);
			createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getAr_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getSamplingDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getTested_Date(), cellStyle);
			createCell(valueRow, columnCount++, history.getSub_batch_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getInternal_export(), cellStyle);
 
			createCell(valueRow, columnCount++, history.getFinishing(), cellStyle);
			createCell(valueRow, columnCount++, history.getMixing(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getReason() != null ? history.getReason() : "", cellStyle);
 
			createCell(valueRow, columnCount++, history.getBmr_no(), cellStyle);
 
			createCell(valueRow, columnCount++, history.getResult(), cellStyle);
//			createCell(valueRow, columnCount++, history.getProduct(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getMaterial_passes(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
//			createCell(valueRow, columnCount++, history.getChemist_submit_on().toString(),cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_on() != null ? history.getChemist_submit_on().toString() : "",cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getChemist_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_on()!= null ?history.getMicro_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getMicro_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);
 
			createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getQc_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_on()!= null ? history.getQc_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id()), cellStyle);
//			createCell(valueRow, columnCount++, history.getPrepared_by(), cellStyle);
 
//			createCell(valueRow, columnCount++, history.getQc_status_micro(), cellStyle);
//			createCell(valueRow, columnCount++, history.getQc_submit_by_micro(), cellStyle);
//			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id_micro()), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getQc_submit_on_micro(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getQc_sign_micro(), dateCellStyle);
 
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
 
			// Separate starting column indexes for nested data
			int mainColumn = columnCount;
			int childColumn = mainColumn + 63; // Number of columns for QAqcObservationsHistory
 
			// Fill QAqcObservationsHistory data
			if (history.getQAqcObservations() != null && !history.getQAqcObservations().isEmpty()) {
				for (QAqcObservationsHistory details : history.getQAqcObservations()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = mainColumn;
					
					createCell(nestedRow, nestedColumnCount++, details.getDescriptionObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getDescriptionremark(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getDescriptionObr(), cellStyle);
 
					createCell(nestedRow, nestedColumnCount++, details.getIdentificationObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIdentificationrmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFibre_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFibre_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAcid_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAcid_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSurface_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSurface_rmk(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getForeign_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getForeign_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_count_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_count_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUQL_w_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUQL_w_rmk(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getLn_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLn_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLw_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLw_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSFC_n_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSFC_n_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSFC_w_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSFC_w_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMicronaire_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMicronaire_rmk(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getExtractable_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getExtractable_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_6(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getAbs_avg(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_avg_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedBaObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleNmObr(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleYxObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLossondryingFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLossondryingIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLossondryingKlObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLossondryingResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFinal_remark(), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getSub_batch_no(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMaterila_passes(), cellStyle);
 
				}
			} else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 63; i++) {
					createCell(valueRow, mainColumn + i, "", cellStyle);
				}
			}
 
			// Fill RollConsumptionDetailsHistoryF002 data
			if (history.getMicrobiologicalTest() != null && !history.getMicrobiologicalTest().isEmpty()) {
				for (microbiologicalTestHistoryF002 details : history.getMicrobiologicalTest()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = childColumn;
 
					
					createCell(nestedRow, nestedColumnCount++, details.getSampled_on(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTested(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getTf_count()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getP_field_a(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getP_field_b(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getP_field_c(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getP_field_d(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getP_field_e(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getMoisture()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSub_batch_no()), cellStyle);
					
					createCell(nestedRow, nestedColumnCount++, details.getCompletion_date()!= null ?details.getCompletion_date().toString() : "", cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct(), cellStyle);
 
				}
			} else {
				// Add empty cells for RollConsumptionDetails if none exist
				for (int i = 0; i < 13; i++) {
					createCell(valueRow, childColumn + i, "", cellStyle);
				}
			}
 
		}
	}

	// doubt reason version
	public static ByteArrayResource generateCLF005Excel(List<absorbentbleachedcottonreportCLF005Parenthistory> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getCLF005TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createCLF005Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getCLF005TitleLables() {
		List<String> list = new ArrayList<>();
		
		list.add("BMR");
		list.add("REGULAR_TRIAL_BATCH");
		list.add("BATCH_NO");
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SUBMIT_ID");
		list.add("CHEMIST_SIGN");
		list.add("TESTED_DATE");
		list.add("QC_STATUS");
		list.add("QC_SUBMIT_ON");
		list.add("QC_SUBMIT_BY");
		list.add("QC_SUBMIT_ID");
		list.add("QC_SIGN");
		list.add("REMARKS");
 
		list.add("REASON");
		list.add("VERSION");
 
		// MANY
		list.add("FORM_NAME");
		list.add("FORMAT_NO");
		list.add("REF_SOP_NO");
//		list.add("UNIT");
		list.add("TESTED_DATE");
		list.add("REGULAR_TRIAL_BATCH");
		list.add("BATCH_NO");
		list.add("MIXING");
		list.add("SOFTENER");
		list.add("LOCAL_EXPORT");
		list.add("PHYSICAL_APPEARANCE");
		list.add("ODOR");
		list.add("FIBER_IDENTIFICATION");
		list.add("FOREIGN_FIBERS");
		list.add("PH");
		list.add("SURFACE_ACTIVITY");
		list.add("ACIDITY_ALKALINITY");
		list.add("SINKING_TIME");
		list.add("ABSORBENCY_WH_C");
		list.add("SULPHATE_ASH");
		list.add("WATER_SOLUBLE_SUBSTANCES");
		list.add("ETHER_SOLUBLE_SUBSTANCES");
		list.add("DRYING_LOSS");
		list.add("FLUORESCENCE");
		list.add("BMR");
		list.add("EXTRACTABLE_COLOURING_MATTER");
		list.add("NEPS_COUNT_G");
		list.add("UQL_MM");
		list.add("L_N_MM");
		list.add("L_W_MM");
		list.add("FIBER_AVERAGE_LENGTH");
		list.add("SFC_N");
		list.add("SFC_W");
		list.add("MICRONAIRE_VALUE");
		list.add("WHITENESS_INDEX");
		list.add("TOTAL_VIABLE_COUNT_TVC_CFU_G");
		list.add("TOTAL_FUNGAL_COUNT_TFC_CFU_G");
		list.add("REMARKS");
		list.add("ACCEPTED");
		list.add("SPECIFICATION_PASSED");
		list.add("REPORTED_BY");
		list.add("APPROVED_BY");
		list.add("REVISION_NO");
//		list.add("CHEMIST_STATUS");
//		list.add("CHEMIST_SUBMIT_ON");
//		list.add("CHEMIST_SUBMIT_BY");
//		list.add("CHEMIST_SUBMIT_ID");
//		list.add("CHEMIST_SIGN");
//		list.add("MICRO_STATUS");
//		list.add("MICRO_SUBMIT_ON");
//		list.add("MICRO_SUBMIT_BY");
//		list.add("MICRO_SUBMIT_ID");
//		list.add("MICRO_SIGN");
//		list.add("QC_STATUS");
//		list.add("QC_SUBMIT_ON");
//		list.add("QC_SUBMIT_BY");
//		list.add("QC_SUBMIT_ID");
//		list.add("QC_SIGN");
		list.add("REPORT_DATE");
		list.add("FUMIGATION_DATE");
		list.add("CHEMICAL_NAME");
//		list.add("QC_STATUS_MICRO");
 
 
		return list;
	}
	private static void createCLF005Values(Sheet sheet, Workbook workbook,
			List<absorbentbleachedcottonreportCLF005Parenthistory> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);
 
		for (absorbentbleachedcottonreportCLF005Parenthistory history : reportHistory) {
			int columnCount = 0;
 
			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);
 
			// Main record fields
			createCell(valueRow, columnCount++, history.getBmr(), cellStyle);
			createCell(valueRow, columnCount++, history.getRegularOrTrialBatch(), cellStyle);
			createCell(valueRow, columnCount++, history.getBatchNo(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_on()!= null ?history.getChemist_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getChemist_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
			createCell(valueRow, columnCount++, history.getTestedDate(), cellStyle);
			
//			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
//			createCell(valueRow, columnCount++, history.getMicro_submit_on()!= null ?history.getMicro_submit_on().toString() : "", cellStyle);
//			createCell(valueRow, columnCount++, history.getMicro_sign(), dateCellStyle);
//			createCell(valueRow, columnCount++, String.valueOf(history.getMicro_submit_id()), cellStyle);
//			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);
//
			createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_on()!= null ?history.getQc_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getQc_sign(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
//			
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
 
			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
 
			// Separate starting column indexes for nested data
			int mainColumn = columnCount;
			int childColumn = mainColumn + 62; // Number of columns for QAqcObservationsHistory
 
			// Fill QAqcObservationsHistory data
			if (history.getAbsorb() != null && !history.getAbsorb().isEmpty()) {
				for (absorbentbleachedcottonreportHistoryCLF005 details : history.getAbsorb()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = mainColumn;
 
					createCell(nestedRow, nestedColumnCount++, details.getFormat(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFormat_no(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRef_sop_no(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getUnit(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTestedDate(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRegularOrTrialBatch(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBatchNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMixing(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSoftener(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLocalOrExport(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPhysicalAppearance(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getOdor(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFiberIdentification(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getForeignFibers(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getPh()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSurfaceActivity(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAcidityOrAlkalinity(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSinkingTime()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getAbsorbencyWhC()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSulphateAsh()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getWaterSolubleSubstances()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getEtherSolubleSubstances()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getDryingLoss()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBmr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getExtractableColouringMatter(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNepsCountPerG()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getUqlMm()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getLNmm()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getLWmm()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf( details.getFiberAverageLength()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSfcN()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSfcW()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getMicronaireValue()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getWhitenessIndex()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getTotalViableCountTvc()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getTotalFungalCountTfc()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAccepted(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSpecificationPassed(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getChemist_sign(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getQc_sign(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRevision_no(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getChemist_status(), cellStyle);
//					createDateCell(nestedRow, nestedColumnCount++, details.getChemist_submit_on(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getChemist_submit_by(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getChemist_submit_id()), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getChemist_sign(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getMicro_status(), cellStyle);
//					createDateCell(nestedRow, nestedColumnCount++, details.getMicro_submit_on(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getMicro_submit_by(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getMicro_submit_id()), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getMicro_sign(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getQc_status(), cellStyle);
//					createDateCell(nestedRow, nestedColumnCount++, details.getQc_submit_on(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getQc_submit_by(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getQc_submit_id()), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getQc_sign(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getReport_date(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFumigation_date(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getChemical_name(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, details.getQc_status_micro(), cellStyle);
 
				}
			} else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 62; i++) {
					createCell(valueRow, mainColumn + i, "", cellStyle);
				}
			}
 
		}
	}
	
	
	public static ByteArrayResource generateExfoloatingFabricReportExcel(List<exfoliatingfabricanalysisreportHistory> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getExfoloatingFabricReportTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createExfoloatingFabricReportValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getExfoloatingFabricReportTitleLables() {
		List<String> list = new ArrayList<>();

		
		list.add("INVOICE_NO");
		list.add("PO_NO");
		list.add("DESCRIPTION");
		list.add("SUPPLIER");
		list.add("NO_ROLLS");
		list.add("QUANTITY");
		list.add("TESTED_ON");
		list.add("SAMPLE_SIZE");
		
		list.add("FORM_NAME");
		list.add("FORMAT_NO");
		list.add("REF_SOP_NO");
		list.add("REVISION_NO");
		
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SUBMIT_ID");
		list.add("CHEMIST_SIGN");
		
		list.add("MICRO_STATUS");
		list.add("MICRO_SUBMIT_ON");
		list.add("MICRO_SUBMIT_BY");
		list.add("MICRO_SUBMIT_ID");
		list.add("MICRO_SIGN");
//		
		list.add("QC_STATUS");
		list.add("QC_SUBMIT_ON");
		list.add("QC_SUBMIT_BY");
		list.add("QC_SUBMIT_ID");
		list.add("PREPARED_BY");
//		
		list.add("QC_SIGN");
		
		list.add("ACCEPTED_QUANTITY");
	
		
		list.add("REASON");
		list.add("VERSION");

		// MANY
		// observationF004History
		list.add("REMARKS");
		list.add("IDE_TEST_1");
		list.add("IDE_TEST_2");
		list.add("IDE_TEST_3");
		list.add("IDE_TEST_4");
		list.add("IDE_TEST_5");
		list.add("IDE_TEST_6");
		list.add("IDE_TEST_7");
		list.add("IDE_TEST_8");
		list.add("IDE_TEST_9");
		list.add("IDE_TEST_10");
		list.add("IDE_TEST_RMK");
		list.add("WID_FAB_1");
		list.add("WID_FAB_2");
		list.add("WID_FAB_3");
		list.add("WID_FAB_4");
		list.add("WID_FAB_5");
		list.add("WID_FAB_6");
		list.add("WID_FAB_7");
		list.add("WID_FAB_8");
		list.add("WID_FAB_9");
		list.add("WID_FAB_10");
		list.add("WID_CAL");
		list.add("WID_RMK");
		list.add("GSM_1");
		list.add("GSM_2");
		list.add("GSM_3");
		list.add("GSM_4");
		list.add("GSM_5");
		list.add("GSM_6");
		list.add("GSM_7");
		list.add("GSM_8");
		list.add("GSM_9");
		list.add("GSM_10");
		list.add("GSM_CAL");
		list.add("GSM_RMK");
		list.add("THK_MM_1");
		list.add("THK_MM_2");
		list.add("THK_MM_3");
		list.add("THK_MM_4");
		list.add("THK_MM_5");
		list.add("THK_MM_6");
		list.add("THK_MM_7");
		list.add("THK_MM_8");
		list.add("THK_MM_9");
		list.add("THK_MM_10");
		list.add("THK_CAL");
		list.add("THK_RMK");
		list.add("PLY_OBS");
		list.add("PLY_REMARK");
		list.add("WHITENESS_OBS");
		list.add("WHITENESS_REMARK");
		list.add("FLUORESCENCE_OBS");
		list.add("FLUORESCENCE_REMARK");
		list.add("PH_OBS");
		list.add("PH_REMARK");
		list.add("STARCH_OBS");
		list.add("STARCH_REMARK");
		list.add("ABSORBENCY_OBS");
		list.add("ABSORBENCY_REMARK");
		list.add("SINKING_TIME_OBS");
		list.add("SINKING_TIME_REMARK");
		list.add("SULPHATED_OBS");
		list.add("SULPHATED_WT");
		list.add("SULPHATED_AVG");
		list.add("SULPHATED_RES");
		list.add("SULPHATE_RMK");
		list.add("WATER_SOLUBLE_OBS");
		list.add("WATER_SOLUBLE_WT");
		list.add("WATER_SOLUBLE_AVG");
		list.add("WATER_SOLUBLE_RES");
		list.add("WATER_SOLUBLE_RMK");
		list.add("ETHER_SOLUBLE_OBS");
		list.add("ETHER_SOLUBLE_WT");
		list.add("ETHER_SOLUBLE_AVG");
		list.add("ETHER_SOLUBLE_RES");
		list.add("ETHER_SOLUBLE_RMK");
		list.add("MOISTURE_FINALWT");
		list.add("MOISTURE_INITIALWT");
		list.add("MOISTURE_K_L");
		list.add("MOISTURE_RESULTS");
		list.add("MOISTURE_RMK");
		list.add("FINAL_REMARK");
		list.add("ACCEPTED_DEVIATION_QUANTITY");
		list.add("REJECT_QUANTITY");
		
		// MicrobilogyTestF004History
		list.add("SAMPLED_ON");
		list.add("TESTED_ON");
		list.add("TOTAL_VIABLE_COUNT");
		list.add("TOTAL_FUNGAL_COUNT");
		list.add("GRAM");
		list.add("STAPYLOCOCCUS");
		list.add("ESCHERECHIA_COLI");
		list.add("PSEUDONYMOUS_AEROGENOSA");
		list.add("SALMONELLA");
		list.add("TEST_COMPLETION_DATE");
		list.add("REMARK");
		list.add("PRODUCT");


		return list;
	}


	private static void createExfoloatingFabricReportValues(Sheet sheet, Workbook workbook,
			List<exfoliatingfabricanalysisreportHistory> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (exfoliatingfabricanalysisreportHistory history : reportHistory) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getInvoice_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getPo_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getDescription(), cellStyle);
			createCell(valueRow, columnCount++, history.getSupplier(), cellStyle);
			createCell(valueRow, columnCount++, history.getNo_rolls(), cellStyle);
			createCell(valueRow, columnCount++, history.getQuantity(), cellStyle);
			createCell(valueRow, columnCount++, history.getTested_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getSample_size(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevision_no()), cellStyle);
			createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createCell(valueRow, columnCount++,history.getChemist_submit_on() != null ? history.getChemist_submit_on().toString() : "" , cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getChemist_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_on() != null ? history.getMicro_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getMicro_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_on() != null ? history.getQc_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getQc_sign(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
//
			
			createCell(valueRow, columnCount++, history.getAccepted_quantity(), cellStyle);
//			createCell(valueRow, columnCount++, history.getAccepted_deviation_quantity(), cellStyle);
//			createCell(valueRow, columnCount++, history.getReject_quantity(), cellStyle);
			


			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

			// Separate starting column indexes for nested data
			int mainColumn = columnCount;
			int childColumn = mainColumn + 85; // Number of columns for QAqcObservationsHistory

			// Fill QAqcObservationsHistory data
			if (history.getObservations() != null && !history.getObservations().isEmpty()) {
				for (observationF004History details : history.getObservations()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = mainColumn;

					
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_8(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_9(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_10(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIde_test_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_8(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_9(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_10(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_fab_cal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWid_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_8(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_9(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_10(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_cal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGsm_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_7(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_8(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_9(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_mm_10(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_cal(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getThk_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPly_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPly_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPh_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPh_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStarch_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStarch_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbsorbency_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbsorbency_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSinking_time_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSinking_time_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedBaObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphate_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleNmObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_soluble_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleYxObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEther_soluble_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureKlObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureResultsObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoisture_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFinal_remark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAccept_qty(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRej_qty(), cellStyle);


				}
			} else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 84; i++) {
					createCell(valueRow, mainColumn + i, "", cellStyle);
				}
			}

			// Fill RollConsumptionDetailsHistoryF002 data
			if (history.getMicrobilogytestf004() != null && !history.getMicrobilogytestf004().isEmpty()) {
				for (MicrobilogyTestF004History details : history.getMicrobilogytestf004()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = childColumn;

					createCell(nestedRow, nestedColumnCount++, details.getSampled_on(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTested_on(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTotal_viable_count(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTotal_fungal_count(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStapylococcus(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEscherechia_coli(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPseudonymous_aerogenosa(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSalmonella(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTest_completion_date(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct(), cellStyle);


				}
			} else {
				// Add empty cells for RollConsumptionDetails if none exist
				for (int i = 0; i < 11; i++) {
					createCell(valueRow, childColumn + i, "", cellStyle);
				}
			}

		}
	}
	
	public static ByteArrayResource generateFinishedProductReportExcel(List<finishedproductanalysisreporthistory> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getFinishedProductReportTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createFinishedProductReportValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getFinishedProductReportTitleLables() {
		List<String> list = new ArrayList<>();

		
		list.add("BMR_NO");
		list.add("QUANTITY");
		list.add("TESTED_ON");
		list.add("EDGE_PATTERN");
		list.add("AR_NO");
		list.add("FG_NO");
		list.add("SAMPLE_DATE");
		
		list.add("FORMAT");
		list.add("FORMAT_NO");
		list.add("REF_SOP_NO");
		list.add("REVISION_NO");
		
		list.add("CHEMIST_STATUS");
		list.add("CHEMIST_SUBMIT_ON");
		list.add("CHEMIST_SUBMIT_BY");
		list.add("CHEMIST_SUBMIT_ID");
		list.add("CHEMIST_SIGN");
//		
		list.add("MICRO_STATUS");
		list.add("MICRO_SUBMIT_ON");
		list.add("MICRO_SUBMIT_BY");
		list.add("MICRO_SUBMIT_ID");
		list.add("MICRO_SIGN");
		
		list.add("QC_STATUS");
		list.add("QC_SUBMIT_ON");
		list.add("QC_SUBMIT_BY");
		list.add("QC_SUBMIT_ID");
		list.add("PREPARED_BY");
		list.add("QC_SIGN");
//		
		
		list.add("REASON");
		list.add("VERSION");

		// MANY
		// observationsF006history
		list.add("OBSERVATION");
		list.add("REMARKS");
		list.add("IDENTIFICATION_OBS");
		list.add("IDENTIFICATION_RMK");
		list.add("FIBRE_AVERAGE_LENGTH_OBS");
		list.add("FIBRE_AVERAGE_LENGTH_RMK");
		list.add("ACIDITY_PH_OBS");
		list.add("ACIDITY_PH_RMK");
		list.add("SURFACE_ACTIV_SUB_OBS");
		list.add("SURFACE_ACTIV_SUB_RMK");
		list.add("FOREIGN_FIBERS_OBS");
		list.add("FOREIGN_FIBERS_RMK");
		list.add("FLUORESCENCE_OBS");
		list.add("FLUORESCENCE_RMK");
		list.add("NEPS_OBS");
		list.add("NEPS_RMK");
		list.add("NEPS_COUNT_OBS");
		list.add("NEPS_COUNT_RMK");
		list.add("UQL_W_OBS");
		list.add("UQL_W_RMK");
		list.add("LN_OBS");
		list.add("LN_RMK");
		list.add("LW_OBS");
		list.add("LW_RMK");
		list.add("SFC_N_OBS");
		list.add("SFC_N_RMK");
		list.add("SFC_W_OBS");
		list.add("SFC_W_RMK");
		list.add("MICRONAIRE_OBS");
		list.add("MICRONAIRE_RMK");
		list.add("WHITENESS_OBS");
		list.add("WHITENESS_RMK");
		list.add("EXTRACTABLE_OBS");
		list.add("EXTRACTABLE_RMK");
		list.add("SULPHATED_OBS");
		list.add("SULPHATED_WT");
		list.add("SULPHATED_AVG");
		list.add("SULPHATED_RES");
		list.add("SULPHATE_RMK");
		list.add("WATER_SOLUBLE_OBS");
		list.add("WATER_SOLUBLE_WT");
		list.add("WATER_SOLUBLE_AVG");
		list.add("WATER_SOLUBLE_RES");
		list.add("WATER_SOLUBLE_RMK");
		list.add("ETHER_SOLUBLE_OBS");
		list.add("ETHER_SOLUBLE_WT");
		list.add("ETHER_SOLUBLE_AVG");
		list.add("ETHER_SOLUBLE_RES");
		list.add("ETHER_SOLUBLE_RMK");
		list.add("ABS_1");
		list.add("ABS_2");
		list.add("ABS_3");
		list.add("ABS_4");
		list.add("ABS_5");
		list.add("ABS_6");
		list.add("ABS_AVG");
		list.add("ABS_AVG_2");
		list.add("ABS_RMK");
		list.add("ABS2_RMK");
		list.add("MOISTURE_FINALWT");
		list.add("MOISTURE_INITIALWT");
		list.add("MOISTURE_K_L");
		list.add("MOISTURE_RESULTS");
		list.add("MOISTURE_RMK");
		list.add("PRODUCT_DESCRIPTION");

		
		
		// MicrobilogyTestF006History
		list.add("SAMPLED_ON");
		list.add("TESTED_ON");
		list.add("TOTAL_VIABLE_COUNT");
		list.add("TOTAL_FUNGAL_COUNT");
		list.add("GRAM");
		list.add("STAPYLOCOCCUS");
		list.add("ESCHERECHIA_COLI");
		list.add("PSEUDONYMOUS_AEROGENOSA");
		list.add("SALMONELLA");
		list.add("TEST_COMPLETION_DATE");
		list.add("REMARK");
		list.add("PRODUCT");



		return list;
	}

	private static void createFinishedProductReportValues(Sheet sheet, Workbook workbook,
			List<finishedproductanalysisreporthistory> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (finishedproductanalysisreporthistory history : reportHistory) {
			String produc = history.getProduct_description();
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			
			createCell(valueRow, columnCount++, history.getBmr_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getQuantity(), cellStyle);
			createCell(valueRow, columnCount++, history.getTested_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdge_pattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getAr_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getFg_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getSample_date(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevision_no()), cellStyle);
			createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
			
			createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
			createCell(valueRow, columnCount++,history.getChemist_submit_on() != null ? history.getChemist_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getChemist_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
//			
			createCell(valueRow, columnCount++, history.getMicro_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_on() != null ? history.getMicro_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getMicro_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getMicro_sign(), cellStyle);

			createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_on() != null ? history.getQc_submit_on().toString() : "", cellStyle);
			createCell(valueRow, columnCount++, history.getQc_submit_by(), dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, history.getPrepared_by(), cellStyle);
			createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
			
//
//			createCell(valueRow, columnCount++, history.getQc_sign_micro(), dateCellStyle);
//			createCell(valueRow, columnCount++, history.getQc_status_micro(), cellStyle);
//			
//			createCell(valueRow, columnCount++, history.getQc_submit_by_micro(), cellStyle);
//			createCell(valueRow, columnCount++, String.valueOf(history.getQc_submit_id_micro()), cellStyle);
//			createDateCell(valueRow, columnCount++, history.getQc_submit_on_micro(), dateCellStyle);

			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
			

			// Separate starting column indexes for nested data
			int mainColumn = columnCount;
			int childColumn = mainColumn + 65; // Number of columns for observationsF006history

			// Fill observationsF006history data
			if (history.getObservations() != null && !history.getObservations().isEmpty()) {
				for (observationsF006history details : history.getObservations()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = mainColumn;

					createCell(nestedRow, nestedColumnCount++, details.getObservation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIdentification_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getIdentification_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFibre_average_length_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFibre_average_length_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAcidity_ph_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAcidity_ph_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSurface_activ_sub_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSurface_activ_sub_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getForeign_fibers_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getForeign_fibers_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getFluorescence_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_count_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNeps_count_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUql_w_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getUql_w_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLn_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLn_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLw_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLw_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSfc_n_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSfc_n_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSfc_w_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSfc_w_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMicronaire_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMicronaire_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWhiteness_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getExtractable_obs(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getExtractable_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedBaObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphatedResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSulphate_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleNmObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWatersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWater_soluble_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleYxObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEthersolubleResObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEther_soluble_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_4(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_5(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_6(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_avg(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_avg_2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getAbs2_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureFlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureIlWtObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureKlObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoistureResultsObr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoisture_rmk(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, produc, cellStyle);

					
				}
			} else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 65; i++) {
					createCell(valueRow, mainColumn + i, "", cellStyle);
				}
			}

			// Fill MicrobilogyTestF006History data
			if (history.getMicrobilogytestf006() != null && !history.getMicrobilogytestf006().isEmpty()) {
				for (MicrobilogyTestF006History details : history.getMicrobilogytestf006()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = childColumn;

					createCell(nestedRow, nestedColumnCount++, details.getSampled_on(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTested_on(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTotal_viable_count(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTotal_fungal_count(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGram(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStapylococcus(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEscherechia_coli(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getPseudonymous_aerogenosa(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getSalmonella(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getTest_completion_date(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemark(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct(), cellStyle);


				}
			} else {
				// Add empty cells for RollConsumptionDetails if none exist
				for (int i = 0; i < 11; i++) {
					createCell(valueRow, childColumn + i, "", cellStyle);
				}
			}

		}
	}
	
	//----------------------------------------------------------------------------------
	
	//fumigation
	static String[] skipValues = {
		    "test_id", "micro_id", "obs_id", "qAqcObservations", "microbiologicalTest", "lab_id",
		    "physicalandchemicaltest", "MICROBIOLOGICAL TEST", "QAQC OBSERVATIONS", "observations",
		    "microbilogytestf004", "exfoliatingfabricanalysisreporthistory", "microbilogytestf006",
		    "finishedproductanalysisreportF006", "obser", "weighingscalecalibrationreportCLF007", "createdAt",
		    "updatedAt", "createdBy", "updatedBy", "qc_", "chemist_", "micro_", "fumigationARF011", "CREATED BY",
		    "UPDATED BY", "UPDATED AT", "CREATED AT", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id",
		    "chemist_submit_on", "chemist_submit_id", "chemist_sign", "microbiologist_saved_on", "microbiologist_saved_by",
		    "microbiologist_saved_id", "micro_submit_on", "micro_submit_id", "micro_sign", "qc_submit_on", "qc_submit_id",
		    "qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_inspector_submit_on", 
		    "qa_inspector_submit_id", "qa_inspector_sign", "qa_mng_submit_on", "qa_mng_submit_id", "qa_mng_sign", 
		    "ins_saved_on", "ins_saved_by", "ins_saved_id", "hod_submit_on", "hod_sign", "hod_id", 
		    "develop_submit_on", "develop_id", "develop_sign", "qc_submit_on_b", "qc_submit_id_b", "qc_sign_b", 
		    "ins_sign", "ins_submit_on", "ins_submit_id", "potableWaterARF013Report"
		};

	public static List<String> getFieldNames(Class<?> clazz) {
	    List<String> fieldNames = new ArrayList<>();
	    Field[] fields = clazz.getDeclaredFields(); // Get all declared fields
	    
	    // Create a skip list from the skipValues array
	    List<String> skipList = Arrays.asList(skipValues);

	    // Loop through each field in the class
	    for (Field field : fields) {
	        String fieldName = field.getName();

	        // Check if the fieldName is in the skip list
	        boolean shouldSkip = skipList.stream().anyMatch(skip -> fieldName.toLowerCase().contains(skip.toLowerCase()));

	        // If the fieldName is not in the skip list, add it to fieldNames
	        if (!shouldSkip) {
	            fieldNames.add(fieldName);
	        }
	    }

	    return fieldNames;
	}

	private static List<String> getFieldLabels() {
	    List<String> list = new ArrayList<>();
 
//	    list.add("TEST ID");
	    list.add("FORMAT_NAME");
	    list.add("FORMAT NO");
	    list.add("REF SOP NO");
//	    list.add("BMR NO");
//	    list.add("MONTH");
//	    list.add("YEAR");
	    list.add("REVISION NO");
	    list.add("CHEMIST STATUS");
	    list.add("CHEMIST SUBMIT BY");
	    list.add("CHEMIST SUBMIT ON");
	    list.add("CHEMIST SIGN");
	    list.add("MICRO STATUS");
	    list.add("MICRO SUBMIT BY");
	    list.add("MICRO SUBMIT ON");
	    list.add("MICRO SIGN");
	    list.add("QC STATUS");
	    list.add("QC SUBMIT BY");
	    list.add("QC SUBMIT ON");
	    list.add("QC SUBMIT ID");
	    list.add("QC SIGN");
	
	    list.add("REASON");
	    list.add("REPORT DATE");
	    list.add("FUMIGATION DATE");
	    list.add("CHEMICAL NAME");
	    list.add("DILUTION");
	    list.add("VERSION");
	    list.add("SOLUTION PREPARED BY");
	    list.add("NO MC USED");
	    list.add("RAILWAY TIME FROM");
	    list.add("RAILWAY TIME TO");
	    list.add("TOTAL");
	    list.add("BEFORE FUMIGATION");
	    list.add("AFTER FUMIGATION");
	    list.add("ANALYTICAL REQUEST NUMBER");
	    list.add("TOTAL VIABLE BEFORE");
	    list.add("TOTAL VIABLE AFTER");
	    list.add("VIABLE REDUCTION");
	    list.add("TOTAL FUNGAL BEFORE");
	    list.add("TOTAL FUNGAL AFTER");
	    list.add("FUNGAL REDUCTION");
	    list.add("REMARK");
	    list.add("BL NO MC USED");
	    list.add("BL RAILWAY TIME FROM");
	    list.add("BL RAILWAY TIME TO");
	    list.add("BL TOTAL");
//	    list.add("BL BEFORE FUMIGATION");
//	    list.add("BL AFTER FUMIGATION");
	    list.add("BL ANALYTICAL REQUEST NUMBER");
	    list.add("BL TOTAL VIABLE BEFORE");
	    list.add("BL TOTAL VIABLE AFTER");
	    list.add("BL VIABLE REDUCTION");
	    list.add("BL TOTAL FUNGAL BEFORE");
	    list.add("BL TOTAL FUNGAL AFTER");
	    list.add("BL FUNGAL REDUCTION");
	    list.add("BL REMARK");
	    list.add("BL BLRC NO MC USED");
	    list.add("BL BLRC RAILWAY TIME FROM");
	    list.add("BL BLRC RAILWAY TIME TO");
	    list.add("BL BLRC TOTAL");
//	    list.add("BL BLRC BEFORE FUMIGATION");
//	    list.add("BL BLRC AFTER FUMIGATION");
	    list.add("BL BLRC ANALYTICAL REQUEST NUMBER");
	    list.add("BL BLRC TOTAL VIABLE BEFORE");
	    list.add("BL BLRC TOTAL VIABLE AFTER");
	    list.add("BL BLRC VIABLE REDUCTION");
	    list.add("BL BLRC TOTAL FUNGAL BEFORE");
	    list.add("BL BLRC TOTAL FUNGAL AFTER");
	    list.add("BL BLRC FUNGAL REDUCTION");
	    list.add("BL BLRC REMARK");
	    list.add("BL WBP NO MC USED");
	    list.add("BL WBP RAILWAY TIME FROM");
	    list.add("BL WBP RAILWAY TIME TO");
	    list.add("BL WBP TOTAL");
//	    list.add("BL WBP BEFORE FUMIGATION");
//	    list.add("BL WBP AFTER FUMIGATION");
	    list.add("BL WBP ANALYTICAL REQUEST NUMBER");
	    list.add("BL WBP TOTAL VIABLE BEFORE");
	    list.add("BL WBP TOTAL VIABLE AFTER");
	    list.add("BL WBP VIABLE REDUCTION");
	    list.add("BL WBP TOTAL FUNGAL BEFORE");
	    list.add("BL WBP TOTAL FUNGAL AFTER");
	    list.add("BL WBP FUNGAL REDUCTION");
	    list.add("BL WBP REMARK");
	    list.add("BL BA NO MC USED");
	    list.add("BL BA RAILWAY TIME FROM");
	    list.add("BL BA RAILWAY TIME TO");
	    list.add("BL BA TOTAL");
//	    list.add("BL BA BEFORE FUMIGATION");
//	    list.add("BL BA AFTER FUMIGATION");
	    list.add("BL BA ANALYTICAL REQUEST NUMBER");
	    list.add("BL BA TOTAL VIABLE BEFORE");
	    list.add("BL BA TOTAL VIABLE AFTER");
	    list.add("BL BA VIABLE REDUCTION");
	    list.add("BL BA TOTAL FUNGAL BEFORE");
	    list.add("BL BA TOTAL FUNGAL AFTER");
	    list.add("BL BA FUNGAL REDUCTION");
	    list.add("BL BA REMARK");
	    list.add("FG NO MC USED");
	    list.add("FG RAILWAY TIME FROM");
	    list.add("FG RAILWAY TIME TO");
	    list.add("FG TOTAL");
//	    list.add("FG BEFORE FUMIGATION");
//	    list.add("FG AFTER FUMIGATION");
	    list.add("FG ANALYTICAL REQUEST NUMBER");
	    list.add("FG TOTAL VIABLE BEFORE");
	    list.add("FG TOTAL VIABLE AFTER");
	    list.add("FG VIABLE REDUCTION");
	    list.add("FG TOTAL FUNGAL BEFORE");
	    list.add("FG TOTAL FUNGAL AFTER");
	    list.add("FG FUNGAL REDUCTION");
	    list.add("FG REMARK");
	    list.add("VMI NO MC USED");
	    list.add("VMI RAILWAY TIME FROM");
	    list.add("VMI RAILWAY TIME TO");
	    list.add("VMI TOTAL");
//	    list.add("VMI BEFORE FUMIGATION");
//	    list.add("VMI AFTER FUMIGATION");
	    list.add("VMI ANALYTICAL REQUEST NUMBER");
	    list.add("VMI TOTAL VIABLE BEFORE");
	    list.add("VMI TOTAL VIABLE AFTER");
	    list.add("VMI VIABLE REDUCTION");
	    list.add("VMI TOTAL FUNGAL BEFORE");
	    list.add("VMI TOTAL FUNGAL AFTER");
	    list.add("VMI FUNGAL REDUCTION");
 
	 list.add("VMI Remark");
	    list.add("VMI BMOP No MC Used");
	    list.add("VMI BMOP Railway Time From");
	    list.add("VMI BMOP Railway Time To");
	    list.add("VMI BMOP Total");
//	    list.add("VMI BMOP Before Fumigation");
//	    list.add("VMI BMOP After Fumigation");
	    list.add("VMI BMOP Analytical Request Number");
	    list.add("VMI BMOP Total Viable Before");
	    list.add("VMI BMOP Total Viable After");
	    list.add("VMI BMOP Viable Reduction");
	    list.add("VMI BMOP Total Fungal Before");
	    list.add("VMI BMOP Total Fungal After");
	    list.add("VMI BMOP Fungal Reduction");
	    list.add("VMI BMOP Remark");
	    
	    list.add("VMI ACE2PA No MC Used");
	    list.add("VMI ACE2PA Railway Time From");
	    list.add("VMI ACE2PA Railway Time To");
	    list.add("VMI ACE2PA Total");
//	    list.add("VMI ACE2PA Before Fumigation");
//	    list.add("VMI ACE2PA After Fumigation");
	    list.add("VMI ACE2PA Analytical Request Number");
	    list.add("VMI ACE2PA Total Viable Before");
	    list.add("VMI ACE2PA Total Viable After");
	    list.add("VMI ACE2PA Viable Reduction");
	    list.add("VMI ACE2PA Total Fungal Before");
	    list.add("VMI ACE2PA Total Fungal After");
	    list.add("VMI ACE2PA Fungal Reduction");
	    list.add("VMI ACE2PA Remark");
 
	    // JET fields
	    list.add("JET No MC Used");
	    list.add("JET Railway Time From");
	    list.add("JET Railway Time To");
	    list.add("JET Total");
//	    list.add("JET Before Fumigation");
//	    list.add("JET After Fumigation");
	    list.add("JET Analytical Request Number");
	    list.add("JET Total Viable Before");
	    list.add("JET Total Viable After");
	    list.add("JET Viable Reduction");
	    list.add("JET Total Fungal Before");
	    list.add("JET Total Fungal After");
	    list.add("JET Fungal Reduction");
	    list.add("JET Remark");
	    
	    list.add("JET RW No MC Used");
	    list.add("JET RW Railway Time From");
	    list.add("JET RW Railway Time To");
	    list.add("JET RW Total");
//	    list.add("JET RW Before Fumigation");
//	    list.add("JET RW After Fumigation");
	    list.add("JET RW Analytical Request Number");
	    list.add("JET RW Total Viable Before");
	    list.add("JET RW Total Viable After");
	    list.add("JET RW Viable Reduction");
	    list.add("JET RW Total Fungal Before");
	    list.add("JET RW Total Fungal After");
	    list.add("JET RW Fungal Reduction");
	    list.add("JET RW Remark");
	    
	    list.add("JET BMA No MC Used");
	    list.add("JET BMA Railway Time From");
	    list.add("JET BMA Railway Time To");
	    list.add("JET BMA Total");
//	    list.add("JET BMA Before Fumigation");
//	    list.add("JET BMA After Fumigation");
	    list.add("JET BMA Analytical Request Number");
	    list.add("JET BMA Total Viable Before");
	    list.add("JET BMA Total Viable After");
	    list.add("JET BMA Viable Reduction");
	    list.add("JET BMA Total Fungal Before");
	    list.add("JET BMA Total Fungal After");
	    list.add("JET BMA Fungal Reduction");
	    list.add("JET BMA Remark");
 
	    // SPUN fields
	    list.add("SPUN No MC Used");
	    list.add("SPUN Railway Time From");
	    list.add("SPUN Railway Time To");
	    list.add("SPUN Total");
//	    list.add("SPUN Before Fumigation");
//	    list.add("SPUN After Fumigation");
	    list.add("SPUN Analytical Request Number");
	    list.add("SPUN Total Viable Before");
	    list.add("SPUN Total Viable After");
	    list.add("SPUN Viable Reduction");
	    list.add("SPUN Total Fungal Before");
	    list.add("SPUN Total Fungal After");
	    list.add("SPUN Fungal Reduction");
	    list.add("SPUN Remark");
 
	    // SPL fields
	    list.add("SPL RB No MC Used");
	    list.add("SPL RB Railway Time From");
	    list.add("SPL RB Railway Time To");
	    list.add("SPL RB Total");
//	    list.add("SPL RB Before Fumigation");
//	    list.add("SPL RB After Fumigation");
	    list.add("SPL RB Analytical Request Number");
	    list.add("SPL RB Total Viable Before");
	    list.add("SPL RB Total Viable After");
	    list.add("SPL RB Viable Reduction");
	    list.add("SPL RB Total Fungal Before");
	    list.add("SPL RB Total Fungal After");
	    list.add("SPL RB Fungal Reduction");
	    list.add("SPL RB Remark");
 
	    // LAB fields
	    list.add("LAB No MC Used");
	    list.add("LAB Railway Time From");
	    list.add("LAB Railway Time To");
	    list.add("LAB Total");
//	    list.add("LAB Before Fumigation");
//	    list.add("LAB After Fumigation");
	    list.add("LAB Analytical Request Number");
	    list.add("LAB Total Viable Before");
	    list.add("LAB Total Viable After");
	    list.add("LAB Viable Reduction");
	    list.add("LAB Total Fungal Before");
	    list.add("LAB Total Fungal After");
	    list.add("LAB Fungal Reduction");
	    list.add("LAB Remark");
 
	    // CHAN fields
	    list.add("CHAN No MC Used");
	    list.add("CHAN Railway Time From");
	    list.add("CHAN Railway Time To");
	    list.add("CHAN Total");
//	    list.add("CHAN Before Fumigation");
//	    list.add("CHAN After Fumigation");
	    list.add("CHAN Analytical Request Number");
	    list.add("CHAN Total Viable Before");
	    list.add("CHAN Total Viable After");
	    list.add("CHAN Viable Reduction");
	    list.add("CHAN Total Fungal Before");
	    list.add("CHAN Total Fungal After");
	    list.add("CHAN Fungal Reduction");
	    list.add("CHAN Remark");
 
	    // CHN LCR fields
	    list.add("CHN LCR No MC Used");
	    list.add("CHN LCR Railway Time From");
	    list.add("CHN LCR Railway Time To");
	    list.add("CHN LCR Total");
//	    list.add("CHN LCR Before Fumigation");
//	    list.add("CHN LCR After Fumigation");
	    list.add("CHN LCR Analytical Request Number");
	    list.add("CHN LCR Total Viable Before");
	    list.add("CHN LCR Total Viable After");
	    list.add("CHN LCR Viable Reduction");
	    list.add("CHN LCR Total Fungal Before");
	    list.add("CHN LCR Total Fungal After");
	    list.add("CHN LCR Fungal Reduction");
		list.add("CHN_LCR_REMARK");
		list.add("RESULT");
//		list.add("ISEFFECTIVE");
		list.add("ACTION_DECIDED");
 
	    return list;
	    
	}
 
	public static ByteArrayResource generateFumigationARF011ReportValues (List<fumigationARF011History> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers =getFieldLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createFumigationARF011ReportValues(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	

	    public static List<String> getColumnNamesWei() {
	        List<String> columnNames = new ArrayList<>();
	        
	        // Columns from weighingscalecalibrationreportHistoryCLF007
	        columnNames.add("DATE");
	        columnNames.add("FORMAT_NAME");
	        columnNames.add("FORMAT_NO");
	        columnNames.add("REF_SOP_NO");
	        columnNames.add("REVISION_NO");
	        columnNames.add("FREQUENCY");
	        columnNames.add("EQ_ID_NO");
	        columnNames.add("MONTH");
	        columnNames.add("YEAR");
	        columnNames.add("TOLERANCE");
	        columnNames.add("TEST_LOV");
	        columnNames.add("NUMBER_A");
	        columnNames.add("NUMBER_B");
	        columnNames.add("BALANCEMAXWEIGHT");
	        columnNames.add("BALANCEMINWEIGHT");
	        columnNames.add("CHEMIST_SUBMIT_ON");
	        columnNames.add("CHEMIST_SUBMIT_BY");
	        columnNames.add("CHEMIST_SUBMIT_ID");
	        columnNames.add("CHEMIST_STATUS");
	        columnNames.add("CHEMIST_SIGN");
	        columnNames.add("QC_SUBMIT_ON");
	        columnNames.add("QC_SUBMIT_BY");
	        columnNames.add("QC_SUBMIT_ID");
	        columnNames.add("QC_STATUS");
	        columnNames.add("QC_SIGN");
	        columnNames.add("REASON");
	        columnNames.add("VERSION");

	        // Columns from obervationHistoryCLF007
	        
	        
	        columnNames.add("REMARKS");
	        columnNames.add("STATUS");
	   
	        return columnNames;
	    }
	

	public static ByteArrayResource generateCalibration(List<weighingscalecalibrationreportHistoryCLF007> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);

			List<String>  finalfie = getColumnNamesWei();
			
			int headerColumnIndex = 0;
			for (String header : finalfie) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createCalibrationReportValuesb(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	
	private static void createFumigationARF011ReportValues(Sheet sheet, Workbook workbook, List<fumigationARF011History> fumigationReports) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);
 
		for (fumigationARF011History report : fumigationReports) {
			int columnCount = 0;
 
			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);
 
			// Main record fields
			createCell(valueRow, columnCount++, report.getFormat(), cellStyle);
			createCell(valueRow, columnCount++, report.getFormat_no(), cellStyle);
			createCell(valueRow, columnCount++, report.getRef_sop_no(), cellStyle);
 
//			createCell(valueRow, columnCount++, report.getBmr_no(), cellStyle);
//			createCell(valueRow, columnCount++, report.getMonth(), cellStyle);
//			createCell(valueRow, columnCount++, report.getYear(), cellStyle);
 
 
			createCell(valueRow, columnCount++, report.getRevision_no(), cellStyle);
			createCell(valueRow, columnCount++, report.getChemist_status(), cellStyle);
			createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
			createCell(valueRow, columnCount++, report.getChemist_submit_on()!= null ?report.getChemist_submit_on().toString() : "", dateCellStyle);
			createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
			//	        createCell(valueRow, columnCount++, String.valueOf(report.getChemist_submit_id()), cellStyle);
			//	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
			//
			createCell(valueRow, columnCount++, report.getMicro_status(), cellStyle);
			createCell(valueRow, columnCount++, report.getMicro_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, report.getMicro_submit_on()!= null ?report.getMicro_submit_on().toString() : "", dateCellStyle);
			createCell(valueRow, columnCount++, report.getMicro_sign(), cellStyle);
			//	        createCell(valueRow, columnCount++, String.valueOf(report.getMicro_submit_id()), cellStyle);
			//	        createCell(valueRow, columnCount++, report.getMicro_sign(), cellStyle);
 
			createCell(valueRow, columnCount++, report.getQc_status(), cellStyle);
			createCell(valueRow, columnCount++, report.getQc_submit_by(), cellStyle);
			createCell(valueRow, columnCount++, report.getQc_submit_on()!= null ?report.getQc_submit_on().toString() : "", dateCellStyle);
			createCell(valueRow, columnCount++, String.valueOf(report.getQc_submit_id()), cellStyle);
			createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
 
			createCell(valueRow, columnCount++, report.getReason(), cellStyle);
			createCell(valueRow, columnCount++, report.getReport_date(), cellStyle);
			createCell(valueRow, columnCount++, report.getFumigation_date(), cellStyle);
			createCell(valueRow, columnCount++, report.getChemical_name(), cellStyle);
			createCell(valueRow, columnCount++, report.getDilution(), cellStyle);
 
			createCell(valueRow, columnCount++, String.valueOf(report.getVersion()), cellStyle);
			createCell(valueRow, columnCount++, report.getSolution_prepared_by(), cellStyle);	        
 
 
			// Nested Observation Records (Child block)
			if (report.getObservationArF011() != null && !report.getObservationArF011().isEmpty()) {
				for (observationArF011History observation : report.getObservationArF011()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = columnCount;
 
					createCell(nestedRow, nestedColumnCount++, observation.getNo_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getRailway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getRailway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getTotal(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBefore_fumigation() ,cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getAfter_fumigation() ,cellStyle);
 
					createCell(nestedRow, nestedColumnCount++, observation.getAnalytical_request_number(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getTotal_viable_before(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getTotal_fungal_after(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getViable_reduction(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getTotal_fungal_before() ,cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getTotal_fungal_after() ,cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFungal_reduction(),cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getRemark(),cellStyle);
//					// New fields for Jet
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_analytical_request_number(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_viable_before(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_viable_after(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_viable_reduction(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_fungal_before(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_fungal_after(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_fungal_reduction(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_remark(), cellStyle);
					//bl
					createCell(nestedRow, nestedColumnCount++, observation.getBl_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_remark(), cellStyle);
 
					//	        ----
					//bl_blrc
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_blrc_remark(), cellStyle);
 
					//BL_WBP
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_wbp_remark(), cellStyle);
 
					//bl_ba
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getBl_ba_remark(), cellStyle);
					//fg
					createCell(nestedRow, nestedColumnCount++, observation.getFg_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getFg_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getFg_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getFg_remark(), cellStyle);
 
					//vmi
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_remark(), cellStyle);
 
					//vmi_bop
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_bmop_remark(), cellStyle);
 
					//vmi_ace2pa
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getVmi_ace2pa_remark(), cellStyle);
 
					//jet
					createCell(nestedRow, nestedColumnCount++, observation.getJet_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_remark(), cellStyle);
 
					//jet rw
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_rw_remark(), cellStyle);
 
	
 
				createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getJet_bma_remark(), cellStyle);
 
					// New fields for Spun
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getSpun_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getSpun_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpun_remark(), cellStyle);
 
					// New fields for SPL RB
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getSpl_rb_remark(), cellStyle);
 
					// New fields for Lab
					createCell(nestedRow, nestedColumnCount++, observation.getLab_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getLab_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getLab_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getLab_remark(), cellStyle);
 
					createCell(nestedRow, nestedColumnCount++, observation.getChan_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getChan_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getChan_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChan_remark(), cellStyle);
 
 
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_no_mc_used(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_railway_time_from(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_railway_time_to(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_total(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_before_fumigation(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_after_fumigation(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_analytical_request_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_total_viable_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_total_viable_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_viable_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_total_fungal_before(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_total_fungal_after(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_fungal_reduction(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getChn_lcr_remark(), cellStyle);
 
					createCell(nestedRow, nestedColumnCount++, observation.getResult(), cellStyle);
//					createCell(nestedRow, nestedColumnCount++, observation.getIsEffective(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, observation.getAction_decided(), cellStyle);
 
 
 
 
				}
			}
 
 
			else {
				// Add empty cells for observations if none exist
				for (int i = 0; i < 14; i++) { // Adjust number of empty columns based on observations
					createCell(valueRow, columnCount + i, "", cellStyle);
				}
			}
		}
	}
 

	// wiegh 
	
//	private static void createCalibrationReportValues(Sheet sheet, Workbook workbook, List<weighingscalecalibrationreportHistoryCLF007> calibrationReports) {
//	    int rowCount = 1;
//	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
//	    CellStyle dateCellStyle = createDateCellStyle(workbook);
//
//	    for (weighingscalecalibrationreportHistoryCLF007 report : calibrationReports) {
//	        int columnCount = 0;
//
//	        // Create main record row
//	        Row valueRow = sheet.createRow(rowCount++);
//
//	        // Main record fields
//	        createCell(valueRow, columnCount++, report.getLab_id() != null ? String.valueOf(report.getLab_id()) : "", cellStyle);
//	        createCell(valueRow, columnCount++, report.getDate(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFormat(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getUnit_h(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getUnit(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFormat_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRef_sop_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRevision_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFrequency(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getEq_id_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getMonth(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getYear(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getTolerance(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getText(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getNumber(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getNumber_b(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getBalancemaxweight(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getBalanceminweight(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRemark(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getQc_status(), cellStyle);
////	        createDateCell(valueRow, columnCount++, report.getQc_submit_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, report.getQc_submit_by(), cellStyle);
////	        createCell(valueRow, columnCount++, report.getQc_submit_id() != null ? String.valueOf(report.getQc_submit_id()) : "", cellStyle);
//	        createCell(valueRow, columnCount++, report.getChemist_status(), cellStyle);
////	        createDateCell(valueRow, columnCount++, report.getChemist_saved_on(), dateCellStyle);
////	        createCell(valueRow, columnCount++, report.getChemist_saved_by(), cellStyle);
////	        createCell(valueRow, columnCount++, report.getChemist_saved_id() != null ? String.valueOf(report.getChemist_saved_id()) : "", cellStyle);
////	        createDateCell(valueRow, columnCount++, report.getChemist_submit_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, report.getChemist_submit_by(), cellStyle);
////	        createCell(valueRow, columnCount++, report.getChemist_submit_id() != null ? String.valueOf(report.getChemist_submit_id()) : "", cellStyle);
////	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
////	        createCell(valueRow, columnCount++, report.getReason(), cellStyle);
////	        createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
//	        createCell(valueRow, columnCount++,String.valueOf( report.getVersion()), cellStyle);
//
//	        // Nested Observation Records (Child block)
//	        if (report.getObser() != null && !report.getObser().isEmpty()) {
//	            for (obervationHistoryCLF007 observation : report.getObser()) {
//	                Row nestedRow = sheet.createRow(rowCount++);
//	                int nestedColumnCount = columnCount;
//
//	                // Add the observation fields
//	                createCell(nestedRow, nestedColumnCount++, observation.getS_no(), cellStyle); // Serial Number
//	                createCell(nestedRow, nestedColumnCount++, observation.getStandard_weight(), cellStyle); // Standard Weight
//	                createCell(nestedRow, nestedColumnCount++, observation.getTest_lov(), cellStyle); // Test LOV
//	                createCell(nestedRow, nestedColumnCount++, observation.getNumber_a(), cellStyle); // Number A
//	                createCell(nestedRow, nestedColumnCount++, observation.getNumber_b(), cellStyle); // Number B
//	                createCell(nestedRow, nestedColumnCount++, observation.getRemark(), cellStyle); // Remark
//	                createCell(nestedRow, nestedColumnCount++, observation.getStatus(), cellStyle); // Status
//	                createCell(nestedRow, nestedColumnCount++, observation.getCalibrated_by(), cellStyle); // Calibrated By
//	                createCell(nestedRow, nestedColumnCount++, observation.getVerified_by(), cellStyle); // Verified By
//	                createCell(nestedRow, nestedColumnCount++, observation.getLab_id() != null ? String.valueOf(observation.getLab_id()) : "", cellStyle); // Lab ID
//	            }
//	        } else {
//	            // Add empty cells for observations if none exist
//	            for (int i = 0; i < 9; i++) { // Adjust number of empty columns based on the number of observation fields
//	                createCell(valueRow, columnCount + i, "", cellStyle);
//	            }
//	        }
//	    }
//	}

//	private static void createCalibrationReportValues(Sheet sheet, Workbook workbook, List<weighingscalecalibrationreportHistoryCLF007> calibrationReports) {
//	    int rowCount = 1;
//	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
//	    CellStyle dateCellStyle = createDateCellStyle(workbook);
//
//	    for (weighingscalecalibrationreportHistoryCLF007 report : calibrationReports) {
//	        int columnCount = 0;
//
//	        // Create main record row
//	        Row valueRow = sheet.createRow(rowCount++);
//
//	        // Main record fields (Ensure the order is as desired)
//	        createCell(valueRow, columnCount++, report.getLab_id() != null ? String.valueOf(report.getLab_id()) : "", cellStyle);
//	        createCell(valueRow, columnCount++, report.getDate(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFormat(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getUnit_h(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getUnit(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFormat_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRef_sop_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRevision_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getFrequency(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getEq_id_no(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getMonth(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getYear(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getTolerance(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getText(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getNumber(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getNumber_b(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getBalancemaxweight(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getBalanceminweight(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getRemark(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getQc_status(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getQc_submit_by(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getChemist_status(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getChemist_submit_by(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getReason(), cellStyle);
//	        createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
//	        createCell(valueRow, columnCount++, String.valueOf(report.getVersion()), cellStyle);
//
//	        // Nested Observation Records (Child block)
//	        if (report.getObser() != null && !report.getObser().isEmpty()) {
//	            for (obervationHistoryCLF007 observation : report.getObser()) {
//	                Row nestedRow = sheet.createRow(rowCount++);
//	                int nestedColumnCount = 0; // Ensure the child rows are written to the beginning columns
//
//	                // Add the observation fields in the correct order
//	                createCell(nestedRow, nestedColumnCount++, observation.getS_no(), cellStyle); // Serial Number
//	                createCell(nestedRow, nestedColumnCount++, observation.getStandard_weight(), cellStyle); // Standard Weight
//	                createCell(nestedRow, nestedColumnCount++, observation.getTest_lov(), cellStyle); // Test LOV
//	                createCell(nestedRow, nestedColumnCount++, observation.getNumber_a(), cellStyle); // Number A
//	                createCell(nestedRow, nestedColumnCount++, observation.getNumber_b(), cellStyle); // Number B
//	                createCell(nestedRow, nestedColumnCount++, observation.getRemark(), cellStyle); // Remark
//	                createCell(nestedRow, nestedColumnCount++, observation.getStatus(), cellStyle); // Status
//	                createCell(nestedRow, nestedColumnCount++, observation.getCalibrated_by(), cellStyle); // Calibrated By
//	                createCell(nestedRow, nestedColumnCount++, observation.getVerified_by(), cellStyle); // Verified By
//	                createCell(nestedRow, nestedColumnCount++, observation.getLab_id() != null ? String.valueOf(observation.getLab_id()) : "", cellStyle); // Lab ID
//	            }
//	        } else {
//	            // Add empty cells for observations if none exist
//	            for (int i = 0; i < 10; i++) { // Adjust number of empty columns based on the number of observation fields
//	                createCell(valueRow, columnCount + i, "", cellStyle);
//	            }
//	        }
//	    }
//	}
	
	private static void createCalibrationReportValuesb(Sheet sheet, Workbook workbook, List<weighingscalecalibrationreportHistoryCLF007> calibrationReports) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (weighingscalecalibrationreportHistoryCLF007 report : calibrationReports) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (Ensure the order is as desired)
//	        createCell(valueRow, columnCount++, report.getLab_id() != null ? String.valueOf(report.getLab_id()) : "", cellStyle);
	        createCell(valueRow, columnCount++, report.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFormat(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getRevision_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, report.getEq_id_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, report.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, report.getTolerance(), cellStyle);
	        createCell(valueRow, columnCount++, report.getText(), cellStyle);
	        createCell(valueRow, columnCount++, report.getNumber(), cellStyle);
	        createCell(valueRow, columnCount++, report.getNumber_b(), cellStyle);
	        createCell(valueRow, columnCount++, report.getBalancemaxweight(), cellStyle);
	        createCell(valueRow, columnCount++, report.getBalanceminweight(), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_submit_on()!= null ? report.getChemist_submit_on().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
	        createCell(valueRow, columnCount++, String .valueOf(report.getChemist_submit_id()), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_status(), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_submit_on()!= null ? report.getQc_submit_on().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
	        createCell(valueRow, columnCount++, String .valueOf(report.getQc_submit_id()), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_status(), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
//
	        createCell(valueRow, columnCount++, report.getReason(), cellStyle);
	        
	        createCell(valueRow, columnCount++, String.valueOf(report.getVersion()), cellStyle);
	        
	        
	    	int mainColumn = columnCount;
			int childColumn = mainColumn + 4; // Number of columns for QAqcObservationsHistory
	        // Nested Observation Records (Child block)
	        if (report.getObser() != null && !report.getObser().isEmpty()) {
	            for (obervationHistoryCLF007 observation : report.getObser()) {
	                Row nestedRow = sheet.createRow(rowCount++); // Create a new row for each observation
	                int nestedColumnCount = columnCount; // Start after main record fields

	                
	                
	                createCell(nestedRow, nestedColumnCount++, observation.getRemark(), cellStyle); // Remark
	                createCell(nestedRow, nestedColumnCount++, observation.getStatus(), cellStyle); // Status

	            }
	        } else {
				// Add empty cells for MachineDetails if none exist
				for (int i = 0; i < 4; i++) {
					createCell(valueRow, mainColumn + i, "", cellStyle);
				}
			}
	    }
	}

	
	private static void createCalibrationReportValues(Sheet sheet, Workbook workbook, List<weighingscalecalibrationreportHistoryCLF007> calibrationReports) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (weighingscalecalibrationreportHistoryCLF007 report : calibrationReports) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (Ensure the order is as desired)
	        createCell(valueRow, columnCount++, report.getLab_id() != null ? String.valueOf(report.getLab_id()) : "", cellStyle);
	        createCell(valueRow, columnCount++, report.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFormat(), cellStyle);
	        createCell(valueRow, columnCount++, report.getUnit_h(), cellStyle);
	        createCell(valueRow, columnCount++, report.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getRevision_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, report.getEq_id_no(), cellStyle);
	        createCell(valueRow, columnCount++, report.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, report.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, report.getTolerance(), cellStyle);
	        createCell(valueRow, columnCount++, report.getText(), cellStyle);
	        createCell(valueRow, columnCount++, report.getNumber(), cellStyle);
	        createCell(valueRow, columnCount++, report.getNumber_b(), cellStyle);
	        createCell(valueRow, columnCount++, report.getBalancemaxweight(), cellStyle);
	        createCell(valueRow, columnCount++, report.getBalanceminweight(), cellStyle);
	        createCell(valueRow, columnCount++, report.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_status(), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_status(), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, report.getChemist_sign(), cellStyle);
	        createCell(valueRow, columnCount++, report.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, report.getQc_sign(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(report.getVersion()), cellStyle);

			int mainColumn = columnCount;
			
	        // Nested Observation Records (Child block) - in the same row
	        if (report.getObser() != null && !report.getObser().isEmpty()) {
	            for (obervationHistoryCLF007 observation : report.getObser()) {
	      
	    					
	    					int nestedColumnCount = mainColumn;
	                // Add the observation fields in the correct order within the same row
	                createCell(valueRow, nestedColumnCount++, observation.getS_no(), cellStyle); // Serial Number
	                createCell(valueRow, nestedColumnCount++, observation.getStandard_weight(), cellStyle); // Standard Weight
	                createCell(valueRow, nestedColumnCount++, observation.getTest_lov(), cellStyle); // Test LOV
	                createCell(valueRow, nestedColumnCount++, observation.getNumber_a(), cellStyle); // Number A
	                createCell(valueRow, nestedColumnCount++, observation.getNumber_b(), cellStyle); // Number B
	                createCell(valueRow, nestedColumnCount++, observation.getRemark(), cellStyle); // Remark
	                createCell(valueRow, nestedColumnCount++, observation.getStatus(), cellStyle); // Status
	                createCell(valueRow, nestedColumnCount++, observation.getCalibrated_by(), cellStyle); // Calibrated By
	                createCell(valueRow, nestedColumnCount++, observation.getVerified_by(), cellStyle); // Verified By
	                createCell(valueRow, nestedColumnCount++, observation.getLab_id() != null ? String.valueOf(observation.getLab_id()) : "", cellStyle); // Lab ID
	            }
	        } else {
	            // Add empty cells for observations if none exist
	            for (int i = 0; i < 10; i++) { // Adjust number of empty columns based on the number of observation fields
	                createCell(valueRow, columnCount++, "", cellStyle);
	            }
	        }
	    }
	}


	
	// =============================================================================================================================================

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
