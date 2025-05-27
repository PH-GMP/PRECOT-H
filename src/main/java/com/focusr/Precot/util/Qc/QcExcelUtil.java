package com.focusr.Precot.util.Qc;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017ChemTable;
import com.focusr.Precot.mssql.database.model.QcAudit.ChemicalAnalysisReportARF003History;
import com.focusr.Precot.mssql.database.model.QcAudit.DistilledWaterAnalysisReportARF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.MediaGrowthDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.PhysicalAndChemcalTestARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.PhysicalAndChemicalPropTestF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcPhMeterCalibrationReportF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017ChemTableHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcTdsMeterCalibrationReportF008History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_BacterialIncubatorTempCalibrationF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaGrowthPromotionTestReportF021History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaPreparationAndConsumptionRecordF019History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedAnalyticalReportF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_ValidationForAutoclaveByChemicalIndicatorF014History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_WiraFiberFinenessTesterReportF010History;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookDetailHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalAnalysisARF008_009_010History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.WiraFiberDetailsHistory;
import com.itextpdf.io.IOException;

public class QcExcelUtil {

//ARF001

	public static ByteArrayResource generateARF001Excel(List<RawCottenAnalysisReportARF001History> historyList)
			throws IOException, java.io.IOException {
 
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Raw Cotton Analysis Report");
 
		int rowIndex = 0;
 
		Row headerRow = sheet.createRow(rowIndex++);
		createHeaderCell(headerRow, 0,"MILL_BATCH_NO");
		createHeaderCell(headerRow, 1,"FORMAT_NAME");
		createHeaderCell(headerRow, 2,"FORMAT_NO");
		createHeaderCell(headerRow, 3,"REVISION NO");	
		createHeaderCell(headerRow, 4,"REF_SOP_NUMBER");
		createHeaderCell(headerRow, 5,"DATE");
		createHeaderCell(headerRow, 6,"CHEMIST_SUBMIT_ON");
		createHeaderCell(headerRow, 7,"CHEMIST_SUBMIT_BY");
		createHeaderCell(headerRow, 8,"CHEMIST_SUBMIT_ID");
		createHeaderCell(headerRow, 9,"CHEMIST_SIGN");
 
		createHeaderCell(headerRow, 10, "MICROBIOLOGIST_STATUS");
		createHeaderCell(headerRow, 11, "MICROBIOLOGIST_SUBMIT_ON");
		createHeaderCell(headerRow, 12, "MICROBIOLOGIST_SUBMIT_BY");
		createHeaderCell(headerRow, 13, "MICROBIOLOGIST_SUBMIT_ID");
		createHeaderCell(headerRow, 14, "MICROBIOLOGIST_SIGN");
 
		createHeaderCell(headerRow, 15, "QC_STATUS");
		createHeaderCell(headerRow, 16, "QC_SUBMIT_ON");
		createHeaderCell(headerRow, 17, "QC_SUBMIT_BY");
		createHeaderCell(headerRow, 18, "QC_SUBMIT_ID");
		createHeaderCell(headerRow, 19, "QC_SIGN");
 
		createHeaderCell(headerRow, 20, "REASON");
		createHeaderCell(headerRow, 21, "VERSION");
 
		createHeaderCell(headerRow, 22, "SUPPLIER");
		createHeaderCell(headerRow, 23, "STATION");
		createHeaderCell(headerRow, 24, "BILL_OR_INVOICE_NO");
		createHeaderCell(headerRow, 25, "DATE_OF_RECEIPT");
		createHeaderCell(headerRow, 26, "TESTED_DATE");
		createHeaderCell(headerRow, 27, "AR_NO");
		createHeaderCell(headerRow, 28, "COTTON_VARITEY");
		createHeaderCell(headerRow, 29, "NO_OF_BALE");
		createHeaderCell(headerRow, 30, "QUANTITY");
		createHeaderCell(headerRow, 31, "SAMPLE_SIZE");
		createHeaderCell(headerRow, 32, "IDENTIFICATION_TEST_OBSR");
		createHeaderCell(headerRow, 33, "IDENTIFICATION_TEST_RMRK");
		createHeaderCell(headerRow, 34, "MICRONAIRE_VALUE_OBSR");
		createHeaderCell(headerRow, 35, "MICRONAIRE_VALUE_RMRK");
		createHeaderCell(headerRow, 36, "AVARAGE_LENGTH_OBSR");
		createHeaderCell(headerRow, 37, "AVARAGE_LENGTH_RMRK");
		createHeaderCell(headerRow, 38, "NEPS_OBSR");
		createHeaderCell(headerRow, 39, "NEPS_RMRK");
		createHeaderCell(headerRow, 40, "UPPER_QUARTILE_LENGTH_OBSR");
		createHeaderCell(headerRow, 41, "UPPER_QUARTILE_LENGTH_RMRK");
		createHeaderCell(headerRow, 42, "LENGTH_BY_WEIGHT_OBSR");
		createHeaderCell(headerRow, 43, "LENGTH_BY_WEIGHT_RMRK");
		createHeaderCell(headerRow, 44, "LENGTH_BY_NO_OBSR");
		createHeaderCell(headerRow, 45, "LENGTH_BY_NO_RMRK");
		createHeaderCell(headerRow, 46, "SHORT_FIBER_CNT_BY_WT_OBSR");
		createHeaderCell(headerRow, 47, "SHORT_FIBER_CONTENT_BY_WT_RMRK");
		createHeaderCell(headerRow, 48, "SHORT_FIBER_CONTENT_BY_NO_OBSR");
		createHeaderCell(headerRow, 49, "SHORT_FIBER_CONTENT_BY_NO_RMRK");
		createHeaderCell(headerRow, 50, "WHITENESS_INDICES_OBSR");
		createHeaderCell(headerRow, 51, "WHITENESS_INDICES_RMRK");
		createHeaderCell(headerRow, 52, "FLOURESCENCE_OBSR");
		createHeaderCell(headerRow, 53, "FLOURESCENCE_RMRK");
		createHeaderCell(headerRow, 54, "ASH_CONTENT_FL_WT_OBSR");
		createHeaderCell(headerRow, 55, "ASH_CONTENT_IL_WT_OBSR");
		createHeaderCell(headerRow, 56, "ASH_CONTENT_FR_BA_OBSR");
		createHeaderCell(headerRow, 57, "ASH_CONTENT_FR_RES_OBSR");
		createHeaderCell(headerRow, 58, "ASH_CONTENT_RMRK");
		createHeaderCell(headerRow, 59, "EITHER_SOL_SUB_FL_WT_OBSR");
		createHeaderCell(headerRow, 60, "EITHER_SOL_SUB_FR_YX_OBSR");
		createHeaderCell(headerRow, 61, "EITHER_SOL_SUB_FR_RES_OBSR");
		createHeaderCell(headerRow, 62, "EITHER_SOL_SUB_RMRK");
		createHeaderCell(headerRow, 63, "MOISTURE_CONTENT_IL_WT_OBSR");
		createHeaderCell(headerRow, 64, "MOISTURE_CONTENT_FL_WT_OBSR");
		createHeaderCell(headerRow, 65, "MOISTURE_CONTENT_FR_KL_OBSR");
		createHeaderCell(headerRow, 66, "MOISTURE_CONTENT_FR_RES_OBSR");
		createHeaderCell(headerRow, 67, "MOISTURE_CONTENT_RMRK");
		createHeaderCell(headerRow, 68, "TRASH_COTTON_WT_M_OBSR");
		createHeaderCell(headerRow, 69, "TRASH_TRASH_WT_N_OBSR");
		createHeaderCell(headerRow, 70, "TRASH_RES_OBSR");
		createHeaderCell(headerRow, 71, "TRASH_RMRK");
		createHeaderCell(headerRow, 72, "FINAL_REMARK");
		createHeaderCell(headerRow, 73, "LOT_STATUS_ACCEPTED");
		createHeaderCell(headerRow, 74, "LOT_STATUS_ACCEPTED_UNDERDEVIATION");
		createHeaderCell(headerRow, 75, "LOT_STATUS_REJECTED");
 
		createHeaderCell(headerRow, 76, "SAMPLED_ON");
		createHeaderCell(headerRow, 77, "TESTED_OR_INCUBATION_STARTON");
		createHeaderCell(headerRow, 78, "TOTAL_VIABLE_COUNT");
		createHeaderCell(headerRow, 79, "TOTAL_FUNGAL_COUNT");
		createHeaderCell(headerRow, 80, "COLIFORM");
		createHeaderCell(headerRow, 81, "E_COLI");
		createHeaderCell(headerRow, 82, "S_AUR");
		createHeaderCell(headerRow, 83, "P_AER");
		createHeaderCell(headerRow, 84, "SAL");
		createHeaderCell(headerRow, 85, "NOTE");
		createHeaderCell(headerRow, 86, "REMARK");
		createHeaderCell(headerRow, 87, "PRODUCT");
 
		for (RawCottenAnalysisReportARF001History history : historyList) {
			Row dataRow = sheet.createRow(rowIndex++);
 
			// Parent entity data
			dataRow.createCell(0).setCellValue(history.getMillBatchNo() != null ? history.getMillBatchNo() : "");
			dataRow.createCell(1).setCellValue(history.getFormatName() != null ? history.getFormatName() : "");
			dataRow.createCell(2).setCellValue(history.getFormatNo() != null ? history.getFormatNo() : "");
			dataRow.createCell(3).setCellValue(history.getRevisionNo() != null ? history.getRevisionNo() : "");
			dataRow.createCell(4).setCellValue(history.getRefSopNo() != null ? history.getRefSopNo() : "");
			dataRow.createCell(5).setCellValue(history.getDate() != null ? history.getDate() : "");
			dataRow.createCell(6).setCellValue(history.getChemist_submit_on() != null ? history.getChemist_submit_on().toString() : "");
			dataRow.createCell(7).setCellValue(history.getChemist_submit_by() != null ? history.getChemist_submit_by() : "");
			dataRow.createCell(8).setCellValue(history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "");
			dataRow.createCell(9).setCellValue(history.getChemist_sign() != null ? history.getChemist_sign() : "");
 
			dataRow.createCell(10).setCellValue(history.getMicrobiologist_status() != null ? history.getMicrobiologist_status() : "");
			dataRow.createCell(11).setCellValue(history.getMicrobiologist_submit_on() != null ? history.getMicrobiologist_submit_on().toString() : "");
			dataRow.createCell(12).setCellValue(history.getMicrobiologist_submit_by() != null ? history.getMicrobiologist_submit_by() : "");
			dataRow.createCell(13).setCellValue(history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : "");
			dataRow.createCell(14).setCellValue(history.getMicrobiologist_sign() != null ? history.getMicrobiologist_sign() : "");
 
			dataRow.createCell(15).setCellValue(history.getQc_status() != null ? history.getQc_status() : "");
			dataRow.createCell(16).setCellValue(history.getQc_submit_on() != null ? history.getQc_submit_on().toString() : "");
			dataRow.createCell(17).setCellValue(history.getQc_submit_by() != null ? history.getQc_submit_by() : "");
			dataRow.createCell(18).setCellValue(history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : "");
			dataRow.createCell(19).setCellValue(history.getQc_sign() != null ? history.getQc_sign() : "");
 
			dataRow.createCell(20).setCellValue(history.getReason() != null ? history.getReason() : "");
			dataRow.createCell(21).setCellValue(String.valueOf(history.getVersion()));
 
 
			// Child data for Physical and Chemical Tests
			if (history.getPhysicalAndChemicalTestsHistory() != null) {
				for (PhysicalAndChemcalTestARF001History physicalTest : history.getPhysicalAndChemicalTestsHistory()) {
					dataRow.createCell(22).setCellValue(physicalTest.getSupplier() != null ? physicalTest.getSupplier() : "");
					dataRow.createCell(23).setCellValue(physicalTest.getStation() != null ? physicalTest.getStation() : "");
					dataRow.createCell(24).setCellValue(physicalTest.getBillOrInvoiceNo() != null ? physicalTest.getBillOrInvoiceNo() : "");
					dataRow.createCell(25).setCellValue(physicalTest.getDateOfReceipt() != null ? physicalTest.getDateOfReceipt() : "");
					dataRow.createCell(26).setCellValue(physicalTest.getTestedDate() != null ? physicalTest.getTestedDate() : "");
					dataRow.createCell(27).setCellValue(physicalTest.getArNo() != null ? physicalTest.getArNo().toString() : "");
					dataRow.createCell(28).setCellValue(physicalTest.getCottonVaritey() != null ? physicalTest.getCottonVaritey() : "");
					dataRow.createCell(29).setCellValue(physicalTest.getNoOfBale() != null ? physicalTest.getNoOfBale() : "");
					dataRow.createCell(30).setCellValue(physicalTest.getQuantity() != null ? physicalTest.getQuantity() : "");
					dataRow.createCell(31).setCellValue(physicalTest.getSampleSize() != null ? physicalTest.getSampleSize().toString() : "");
					dataRow.createCell(32).setCellValue(physicalTest.getIdentificationTestObsr() != null ? physicalTest.getIdentificationTestObsr() : "");
					dataRow.createCell(33).setCellValue(physicalTest.getIdentificationTestRmrk() != null ? physicalTest.getIdentificationTestRmrk() : "");
					dataRow.createCell(34).setCellValue(physicalTest.getMicronaireValueObsr() != null ? physicalTest.getMicronaireValueObsr() : 0.0);
					dataRow.createCell(35).setCellValue(physicalTest.getMicronaireValueRmrk() != null ? physicalTest.getMicronaireValueRmrk() : "");
					dataRow.createCell(36).setCellValue(physicalTest.getAvarageLengthObsr() != null ? physicalTest.getAvarageLengthObsr() : "");
					dataRow.createCell(37).setCellValue(physicalTest.getAvarageLengthRmrk() != null ? physicalTest.getAvarageLengthRmrk() : "");
					dataRow.createCell(38).setCellValue(physicalTest.getNepsObsr() != null ? physicalTest.getNepsObsr() : 0.0);
					dataRow.createCell(39).setCellValue(physicalTest.getNepsRmrk() != null ? physicalTest.getNepsRmrk() : "");
					dataRow.createCell(40).setCellValue(physicalTest.getUpperQuartileLengthObsr() != null ? physicalTest.getUpperQuartileLengthObsr() : 0.0);
					dataRow.createCell(41).setCellValue(physicalTest.getUpperQuartileLengthRmrk() != null ? physicalTest.getUpperQuartileLengthRmrk() : "");
					dataRow.createCell(42).setCellValue(physicalTest.getLengthByWeightObsr() != null ? physicalTest.getLengthByWeightObsr() : 0.0);
					dataRow.createCell(43).setCellValue(physicalTest.getLengthByWeightRmrk() != null ? physicalTest.getLengthByWeightRmrk() : "");
					dataRow.createCell(44).setCellValue(physicalTest.getLengthByNoObsr() != null ? physicalTest.getLengthByNoObsr() : 0.0);
					dataRow.createCell(45).setCellValue(physicalTest.getLengthByNoRmrk() != null ? physicalTest.getLengthByNoRmrk() : "");
					dataRow.createCell(46).setCellValue(physicalTest.getShortFiberCntByWtObsr() != null ? physicalTest.getShortFiberCntByWtObsr() : 0.0);
					dataRow.createCell(47).setCellValue(physicalTest.getShortFiberContentByWtRmrk() != null ? physicalTest.getShortFiberContentByWtRmrk() : "");
					dataRow.createCell(48).setCellValue(physicalTest.getShortFiberContentByNoObsr() != null ? physicalTest.getShortFiberContentByNoObsr() : 0.0);
					dataRow.createCell(49).setCellValue(physicalTest.getShortFiberContentByNoRmrk() != null ? physicalTest.getShortFiberContentByNoRmrk() : "");
					dataRow.createCell(50).setCellValue(physicalTest.getWhitenessIndicesObsr() != null ? physicalTest.getWhitenessIndicesObsr() : 0.0);
					dataRow.createCell(51).setCellValue(physicalTest.getWhitenessIndicesRmrk() != null ? physicalTest.getWhitenessIndicesRmrk() : "");
					dataRow.createCell(52).setCellValue(physicalTest.getFlourescenceObsr() != null ? physicalTest.getFlourescenceObsr() : "");
					dataRow.createCell(53).setCellValue(physicalTest.getFlourescenceRmrk() != null ? physicalTest.getFlourescenceRmrk() : "");
					dataRow.createCell(54).setCellValue(physicalTest.getAshContentFlWtObsr() != null ? physicalTest.getAshContentFlWtObsr() : 0.0);
					dataRow.createCell(55).setCellValue(physicalTest.getAshContentIlWtObsr() != null ? physicalTest.getAshContentIlWtObsr() : 0.0);
					dataRow.createCell(56).setCellValue(physicalTest.getAshContentFrBAObsr() != null ? physicalTest.getAshContentFrBAObsr() : 0.0);
					dataRow.createCell(57).setCellValue(physicalTest.getAshContentFrResObsr() != null ? physicalTest.getAshContentFrResObsr() : 0.0);
					dataRow.createCell(58).setCellValue(physicalTest.getAshContentRmrk() != null ? physicalTest.getAshContentRmrk() : "");
					dataRow.createCell(59).setCellValue(physicalTest.getEitherSolSubFlWtObsr() != null ? physicalTest.getEitherSolSubFlWtObsr() : 0.0);
					dataRow.createCell(60).setCellValue(physicalTest.getEitherSolSubFrYXObsr() != null ? physicalTest.getEitherSolSubFrYXObsr() : 0.0);
					dataRow.createCell(61).setCellValue(physicalTest.getEitherSolSubFrResObsr() != null ? physicalTest.getEitherSolSubFrResObsr() : 0.0);
					dataRow.createCell(62).setCellValue(physicalTest.getEitherSolSubRmrk() != null ? physicalTest.getEitherSolSubRmrk() : "");
					dataRow.createCell(63).setCellValue(physicalTest.getMoistureContentIlWtObsr() != null ? physicalTest.getMoistureContentIlWtObsr() : 0.0);
					dataRow.createCell(64).setCellValue(physicalTest.getMoistureContentFlWtObsr() != null ? physicalTest.getMoistureContentFlWtObsr() : 0.0);
					dataRow.createCell(65).setCellValue(physicalTest.getMoistureContentFrKlObsr() != null ? physicalTest.getMoistureContentFrKlObsr() : 0.0);
					dataRow.createCell(66).setCellValue(physicalTest.getMoistureContentFrResObsr() != null ? physicalTest.getMoistureContentFrResObsr() : 0.0);
					dataRow.createCell(67).setCellValue(physicalTest.getMoistureContentRmrk() != null ? physicalTest.getMoistureContentRmrk() : "");
					dataRow.createCell(68).setCellValue(physicalTest.getTrashCottonWtMObsr() != null ? physicalTest.getTrashCottonWtMObsr() : 0.0);
					dataRow.createCell(69).setCellValue(physicalTest.getTrashTrashWtNObsr() != null ? physicalTest.getTrashTrashWtNObsr() : 0.0);
					dataRow.createCell(70).setCellValue(physicalTest.getTrashResObsr() != null ? physicalTest.getTrashResObsr() : 0.0);
					dataRow.createCell(71).setCellValue(physicalTest.getTrashRemark() != null ? physicalTest.getTrashRemark() : "");
					dataRow.createCell(72).setCellValue(physicalTest.getFinalRemark() != null ? physicalTest.getFinalRemark() : "");
					dataRow.createCell(73).setCellValue(physicalTest.getLotStatusAccepted() != null ? physicalTest.getLotStatusAccepted() : 0.0);
					dataRow.createCell(74).setCellValue(physicalTest.getLotStatusAcceptedUnderDeviation() != null ? physicalTest.getLotStatusAcceptedUnderDeviation() : 0.0);
					dataRow.createCell(75).setCellValue(physicalTest.getLotStatusRejected() != null ? physicalTest.getLotStatusRejected() : 0.0);
				}
			}else {
				// If no Physical and Chemical Tests data, set empty cells
				for (int i = 22; i <= 75; i++) {
					dataRow.createCell(i).setCellValue("");
				}
			}
 
			// Child data for Microbiological Tests
			if (history.getMicrobiologicalTestsHistory() != null) {
				for (MicrobiologicalTestARF001History microbiologicalTest : history.getMicrobiologicalTestsHistory()) {
					dataRow.createCell(76).setCellValue(microbiologicalTest.getSampledOn() != null ? microbiologicalTest.getSampledOn() : "");
					dataRow.createCell(77).setCellValue(microbiologicalTest.getTestedOrIncubationStartOn() != null ? microbiologicalTest.getTestedOrIncubationStartOn() : "");
					dataRow.createCell(78).setCellValue(microbiologicalTest.getTotalViableCount() != null ? microbiologicalTest.getTotalViableCount() : 0L);
					dataRow.createCell(79).setCellValue(microbiologicalTest.getTotalFungalCount() != null ? microbiologicalTest.getTotalFungalCount() : 0L);
					dataRow.createCell(80).setCellValue(microbiologicalTest.getColiform() != null ? microbiologicalTest.getColiform() : "");
					dataRow.createCell(81).setCellValue(microbiologicalTest.getEcoli() != null ? microbiologicalTest.getEcoli() : "");
					dataRow.createCell(82).setCellValue(microbiologicalTest.getSaur() != null ? microbiologicalTest.getSaur() : "");
					dataRow.createCell(83).setCellValue(microbiologicalTest.getPaer() != null ? microbiologicalTest.getPaer() : "");
					dataRow.createCell(84).setCellValue(microbiologicalTest.getSal() != null ? microbiologicalTest.getSal() : "");
					dataRow.createCell(85).setCellValue(microbiologicalTest.getNote() != null ? microbiologicalTest.getNote() : "");
					dataRow.createCell(86).setCellValue(microbiologicalTest.getRemark() != null ? microbiologicalTest.getRemark() : "");
					dataRow.createCell(87).setCellValue(microbiologicalTest.getProduct() != null ? microbiologicalTest.getProduct() : "");
				}
			}else {
				// If no Microbiological Tests data, set empty cells
				for (int i = 76; i <= 88; i++) {
					dataRow.createCell(i).setCellValue("");
				}
			}
		}
		for (int i = 0; i <= 89; i++) {
			sheet.autoSizeColumn(i);
		}
		// Write the workbook to a ByteArrayOutputStream
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		workbook.write(bos);
		workbook.close();
 
		// Convert to ByteArrayResource and return
		return new ByteArrayResource(bos.toByteArray());
	}
	
	
//F026
	public static ByteArrayResource generateF026Excel(List<QcShelfLifePeriodPhysicChemMicroF026History> historyList)
	        throws IOException, java.io.IOException { // Removed duplicate 'java.io.IOException'

	    Workbook workbook = new XSSFWorkbook();
	    Sheet sheet = workbook.createSheet("Shelf Life Period, Chemical & Microbiological Testing Report Data");

	    int rowIndex = 0;

	    // Create header for parent table
	    Row headerRow = sheet.createRow(rowIndex++);
	    createHeaderCell(headerRow, 0,"FORMAT_NAME");
	    createHeaderCell(headerRow, 1,"FORMAT_NO");
	    createHeaderCell(headerRow, 2,"REVISION_NO");	
	    createHeaderCell(headerRow, 3,"REF_SOP_NUMBER");
	    createHeaderCell(headerRow, 4,"YEAR");
	    createHeaderCell(headerRow, 5,"MONTH");
	    createHeaderCell(headerRow, 6,"CUSTOMER");
	    createHeaderCell(headerRow, 7,"BRAND");
	    createHeaderCell(headerRow, 8,"PRODUCTION_DESCRIPTION");

	    createHeaderCell(headerRow, 9,"SHAPE");
	    createHeaderCell(headerRow, 10,"LOT_NUMBER");
	    createHeaderCell(headerRow, 11,"PRODUCTION_DATE");
	    createHeaderCell(headerRow, 12,"TESTING_DATE");
	    createHeaderCell(headerRow, 13,"DIMENSION_STD");

	    createHeaderCell(headerRow, 14,"DIMENSION_T1_ACTUAL");
	    createHeaderCell(headerRow, 15,"DIMENSION_T1_STATUS");
	    createHeaderCell(headerRow, 16,"DIMENSION_T2_ACTUAL");
	    createHeaderCell(headerRow, 17,"DIMENSION_T2_STATUS");
	    createHeaderCell(headerRow, 18,"DIMENSION_T3_ACTUAL");

	    createHeaderCell(headerRow, 19,"DIMENSION_T3_STATUS");
	    createHeaderCell(headerRow, 20,"DIMENSION_T4_ACTUAL");
	    createHeaderCell(headerRow, 21,"DIMENSION_T4_STATUS");
	    createHeaderCell(headerRow, 22,"DIMENSION_T5_ACTUAL");
	    createHeaderCell(headerRow, 23,"DIMENSION_T5_STATUS");
	    createHeaderCell(headerRow, 24,"DIMENSION_AVG_ACTUAL");
	    createHeaderCell(headerRow, 25,"DIMENSION_AVG_STATUS");
	    createHeaderCell(headerRow, 26,"WEIGHT_STD");
	    createHeaderCell(headerRow, 27,"WEIGHT_T1_ACTUAL");
	    createHeaderCell(headerRow, 28,"WEIGHT_T1_STATUS");
	    createHeaderCell(headerRow, 29,"WEIGHT_T2_ACTUAL");
	    createHeaderCell(headerRow, 30,"WEIGHT_T2_STATUS");
	    createHeaderCell(headerRow, 31,"WEIGHT_T3_ACTUAL");
	    createHeaderCell(headerRow, 32,"WEIGHT_T3_STATUS");
	    createHeaderCell(headerRow, 33,"WEIGHT_T4_ACTUAL");
	    createHeaderCell(headerRow, 34,"WEIGHT_T4_STATUS");
	    createHeaderCell(headerRow, 35,"WEIGHT_T5_ACTUAL");
	    createHeaderCell(headerRow, 36,"WEIGHT_T5_STATUS");
	    createHeaderCell(headerRow, 37,"WEIGHT_AVG_ACTUAL");
	    createHeaderCell(headerRow, 38,"THICKNESS_STD");
	    createHeaderCell(headerRow, 39,"THICKNESS_T1_ACTUAL");
	    createHeaderCell(headerRow, 40,"THICKNESS_T1_STATUS");
	    createHeaderCell(headerRow, 41,"THICKNESS_T2_ACTUAL");
	    createHeaderCell(headerRow, 42,"THICKNESS_T2_STATUS");
	    createHeaderCell(headerRow, 43,"THICKNESS_T3_ACTUAL");
	    createHeaderCell(headerRow, 44,"THICKNESS_T3_STATUS");
	    createHeaderCell(headerRow, 45,"THICKNESS_T4_ACTUAL");
	    createHeaderCell(headerRow, 46,"THICKNESS_T4_STATUS");
	    createHeaderCell(headerRow, 47,"THICKNESS_T5_ACTUAL");
	    createHeaderCell(headerRow, 48,"THICKNESS_T5_STATUS");
	    createHeaderCell(headerRow, 49,"THICKNESS_AVG_ACTUAL");
	    createHeaderCell(headerRow, 50,"THICKNESS_AVG_STATUS");
	    createHeaderCell(headerRow, 51,"CHEMIST_STATUS");
	    createHeaderCell(headerRow, 52,"CHEMIST_SAVED_ON");
	    createHeaderCell(headerRow, 53,"CHEMIST_SAVED_BY");
	    createHeaderCell(headerRow, 54,"CHEMIST_SAVED_ID");
	    createHeaderCell(headerRow, 55,"CHEMIST_SUBMIT_ON");
	    createHeaderCell(headerRow, 56,"CHEMIST_SUBMIT_BY");
	    createHeaderCell(headerRow, 57,"CHEMIST_SUBMIT_ID");
	    createHeaderCell(headerRow, 58,"CHEMIST_SIGN");
	    createHeaderCell(headerRow, 59,"MICROBIOLOGIST_STATUS");
	    createHeaderCell(headerRow, 60,"MICROBIOLOGIST_SAVED_ON");
	    createHeaderCell(headerRow, 61,"MICROBIOLOGIST_SAVED_BY");
	    createHeaderCell(headerRow, 62,"MICROBIOLOGIST_SAVED_ID");
	    createHeaderCell(headerRow, 63,"MICROBIOLOGIST_SUBMIT_ON");
	    createHeaderCell(headerRow, 64,"MICROBIOLOGIST_SUBMIT_BY");
	    createHeaderCell(headerRow, 65,"MICROBIOLOGIST_SUBMIT_ID");
	    createHeaderCell(headerRow, 66,"MICROBIOLOGIST_SIGN");
	    createHeaderCell(headerRow, 67,"QC_STATUS");
	    createHeaderCell(headerRow, 68,"QC_SUBMIT_ON");
	    createHeaderCell(headerRow, 69,"QC_SUBMIT_BY");
	    createHeaderCell(headerRow, 70,"QC_SUBMIT_ID");
	    createHeaderCell(headerRow, 71,"QC_SIGN");
	    createHeaderCell(headerRow, 72,"REASON");
	    createHeaderCell(headerRow, 73,"VERSION");

	    createHeaderCell(headerRow, 74, "FIBER_IDENTIFICATION_RESULT");
	    createHeaderCell(headerRow, 75, "FIBER_IDENTIFICATION_REMARK");
	    createHeaderCell(headerRow, 76, "ODUR_RESULT");
	    createHeaderCell(headerRow, 77, "ODUR_REMARK");
	    createHeaderCell(headerRow, 78, "FOREIGN_FIBERS_RESULT");
	    createHeaderCell(headerRow, 79, "FOREIGN_FIBERS_REMARKS");
	    createHeaderCell(headerRow, 80, "FLOURESCENCE_RESULT");
	    createHeaderCell(headerRow, 81, "FLOURESCENCE_REMARK");
	    createHeaderCell(headerRow, 82, "SINKING_TIME_RESULT");
	    createHeaderCell(headerRow, 83, "SINKING_TIME_REMARK"); // Changed to 83
	    createHeaderCell(headerRow, 84, "ABSORBANCY_RESULT");
	    createHeaderCell(headerRow, 85, "ABSORBANCY_REMARK");
	    createHeaderCell(headerRow, 86, "PH_RESULT");
	    createHeaderCell(headerRow, 87, "PH_REMARK");
	    createHeaderCell(headerRow, 88, "SURFACE_ACTIVITY_RESULT");
	    createHeaderCell(headerRow, 89, "SURFACE_ACTIVITY_REMARK");
	    createHeaderCell(headerRow, 90, "WHITENESS_INDICES_RESULT");
	    createHeaderCell(headerRow, 91, "WHITENESS_INDICES_REMARK");
	    createHeaderCell(headerRow, 92, "ASH_CONTENT_RESULT");
	    createHeaderCell(headerRow, 93, "ASH_CONTENT_REMARK");
	    createHeaderCell(headerRow, 94, "WATER_SOLUABLE_RESULT"); // Ensure consistency with data population
	    createHeaderCell(headerRow, 95, "WATER_SOLUABLE_REMARK");
	    createHeaderCell(headerRow, 96, "ETHER_SOLUABLE_RESULT");
	    createHeaderCell(headerRow, 97, "ETHER_SOLUABLE_REMARK"); // Corrected typo
	    createHeaderCell(headerRow, 98, "MICRONAIRE_VALUE_RESULT");
	    createHeaderCell(headerRow, 99, "MICRONAIRE_VALUE_REMARK");

	    createHeaderCell(headerRow, 100, "SAMPLE_TESTED_ON");
	    createHeaderCell(headerRow, 101, "TEST_COMPLETED_ON");
	    createHeaderCell(headerRow, 102, "SAMPLE_DESCRIPTION");
	    createHeaderCell(headerRow, 103, "TVC_RESULT");
	    createHeaderCell(headerRow, 104, "TVC_STATUS");
	    createHeaderCell(headerRow, 105, "TFC_RESULT");
	    createHeaderCell(headerRow, 106, "TFC_STATUS");
	    createHeaderCell(headerRow, 107, "COLOFORMS_RESULT");
	    createHeaderCell(headerRow, 108, "COLOFORMS_STATUS");
	    createHeaderCell(headerRow, 109, "ECOLI_RESULT");
	    createHeaderCell(headerRow, 110, "ECOLI_STATUS");
	    createHeaderCell(headerRow, 111, "SAUR_RESULT");
	    createHeaderCell(headerRow, 112, "SAUR_STATUS");
	    createHeaderCell(headerRow, 113, "PAUR_RESULT");
	    createHeaderCell(headerRow, 114, "PAUR_STATUS");
	    createHeaderCell(headerRow, 115, "SALMONELLA_RESULT");
	    createHeaderCell(headerRow, 116, "SALMONELLA_STATUS");


	    // Populate data
	    for (QcShelfLifePeriodPhysicChemMicroF026History history : historyList) {
	        Row dataRow = sheet.createRow(rowIndex++);

	        // Parent entity data (Cells 0-76)
	        dataRow.createCell(0).setCellValue(history.getFormatName() != null ? history.getFormatName() : "");
	        dataRow.createCell(1).setCellValue(history.getFormatNo() != null ? history.getFormatNo() : "");
	        dataRow.createCell(2).setCellValue(history.getRevisionNo() != null ? history.getRevisionNo() : "");
	        dataRow.createCell(3).setCellValue(history.getRefSopNo() != null ? history.getRefSopNo() : "");
	        dataRow.createCell(4).setCellValue(history.getYear() != null ? history.getYear() : "");
	        dataRow.createCell(5).setCellValue(history.getMonth() != null ? history.getMonth() : "");
	        dataRow.createCell(6).setCellValue(history.getCustomer() != null ? history.getCustomer() : "");
	        dataRow.createCell(7).setCellValue(history.getBrand() != null ? history.getBrand() : "");
	        dataRow.createCell(8).setCellValue(history.getProductDescription() != null ? history.getProductDescription() : "");
	        dataRow.createCell(9).setCellValue(history.getShape() != null ? history.getShape() : "");
	        dataRow.createCell(10).setCellValue(history.getLotNumber() != null ? history.getLotNumber() : "");
	        dataRow.createCell(11).setCellValue(history.getProductionDate() != null ? history.getProductionDate().toString() : "");
	        dataRow.createCell(12).setCellValue(history.getTestingDate() != null ? history.getTestingDate().toString() : "");
	        dataRow.createCell(13).setCellValue(history.getDimensionStd() != null ? history.getDimensionStd() : "");
	        dataRow.createCell(14).setCellValue(history.getDimensionT1Actual() != null ? history.getDimensionT1Actual() : "");
	        dataRow.createCell(15).setCellValue(history.getDimensionT1Status() != null ? history.getDimensionT1Status() : "");
	        dataRow.createCell(16).setCellValue(history.getDimensionT2Actual() != null ? history.getDimensionT2Actual() : "");
	        dataRow.createCell(17).setCellValue(history.getDimensionT2Status() != null ? history.getDimensionT2Status() : "");
	        dataRow.createCell(18).setCellValue(history.getDimensionT3Actual() != null ? history.getDimensionT3Actual() : "");
	        dataRow.createCell(19).setCellValue(history.getDimensionT3Status() != null ? history.getDimensionT3Status() : "");
	        dataRow.createCell(20).setCellValue(history.getDimensionT4Actual() != null ? history.getDimensionT4Actual() : "");
	        dataRow.createCell(21).setCellValue(history.getDimensionT4Status() != null ? history.getDimensionT4Status() : "");
	        dataRow.createCell(22).setCellValue(history.getDimensionT5Actual() != null ? history.getDimensionT5Actual() : "");
	        dataRow.createCell(23).setCellValue(history.getDimensionT5Status() != null ? history.getDimensionT5Status() : "");
	        dataRow.createCell(24).setCellValue(history.getDimensionAvgActual() != null ? history.getDimensionAvgActual() : "");
	        dataRow.createCell(25).setCellValue(history.getDimensionAvgStatus() != null ? history.getDimensionAvgStatus() : "");
	        dataRow.createCell(26).setCellValue(history.getWeightStd() != null ? history.getWeightStd() : "");
	        dataRow.createCell(27).setCellValue(history.getWeightT1Actual() != null ? history.getWeightT1Actual() : "");
	        dataRow.createCell(28).setCellValue(history.getWeightT1Status() != null ? history.getWeightT1Status() : "");
	        dataRow.createCell(29).setCellValue(history.getWeightT2Actual() != null ? history.getWeightT2Actual() : "");
	        dataRow.createCell(30).setCellValue(history.getWeightT2Status() != null ? history.getWeightT2Status() : "");
	        dataRow.createCell(31).setCellValue(history.getWeightT3Actual() != null ? history.getWeightT3Actual() : "");
	        dataRow.createCell(32).setCellValue(history.getWeightT3Status() != null ? history.getWeightT3Status() : "");
	        dataRow.createCell(33).setCellValue(history.getWeightT4Actual() != null ? history.getWeightT4Actual() : "");
	        dataRow.createCell(34).setCellValue(history.getWeightT4Status() != null ? history.getWeightT4Status() : "");
	        dataRow.createCell(35).setCellValue(history.getWeightT5Actual() != null ? history.getWeightT5Actual() : "");
	        dataRow.createCell(36).setCellValue(history.getWeightT5Status() != null ? history.getWeightT5Status() : "");
	        dataRow.createCell(37).setCellValue(history.getWeightAvgActual() != null ? history.getWeightAvgActual() : "");
	        dataRow.createCell(38).setCellValue(history.getThicknessStd() != null ? history.getThicknessStd() : "");
	        dataRow.createCell(39).setCellValue(history.getThicknessT1Actual() != null ? history.getThicknessT1Actual() : "");
	        dataRow.createCell(40).setCellValue(history.getThicknessT1Status() != null ? history.getThicknessT1Status() : "");
	        dataRow.createCell(41).setCellValue(history.getThicknessT2Actual() != null ? history.getThicknessT2Actual() : "");
	        dataRow.createCell(42).setCellValue(history.getThicknessT2Status() != null ? history.getThicknessT2Status() : "");
	        dataRow.createCell(43).setCellValue(history.getThicknessT3Actual() != null ? history.getThicknessT3Actual() : "");
	        dataRow.createCell(44).setCellValue(history.getThicknessT3Status() != null ? history.getThicknessT3Status() : "");
	        dataRow.createCell(45).setCellValue(history.getThicknessT4Actual() != null ? history.getThicknessT4Actual() : "");
	        dataRow.createCell(46).setCellValue(history.getThicknessT4Status() != null ? history.getThicknessT4Status() : "");
	        dataRow.createCell(47).setCellValue(history.getThicknessT5Actual() != null ? history.getThicknessT5Actual() : "");
	        dataRow.createCell(48).setCellValue(history.getThicknessT5Status() != null ? history.getThicknessT5Status() : "");
	        dataRow.createCell(49).setCellValue(history.getThicknessAvgActual() != null ? history.getThicknessAvgActual() : "");
	        dataRow.createCell(50).setCellValue(history.getThicknessAvgStatus() != null ? history.getThicknessAvgStatus() : "");
	        dataRow.createCell(51).setCellValue(history.getChemist_status() != null ? history.getChemist_status() : "");
	        dataRow.createCell(52).setCellValue(history.getChemist_saved_on() != null ? history.getChemist_saved_on().toString() : "");
	        dataRow.createCell(53).setCellValue(history.getChemist_saved_by() != null ? history.getChemist_saved_by() : "");
	        dataRow.createCell(54).setCellValue(history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "");
	        dataRow.createCell(55).setCellValue(history.getChemist_submit_on() != null ? history.getChemist_submit_on().toString() : "");
	        dataRow.createCell(56).setCellValue(history.getChemist_submit_by() != null ? history.getChemist_submit_by() : "");
	        dataRow.createCell(57).setCellValue(history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "");
	        dataRow.createCell(58).setCellValue(history.getChemist_sign() != null ? history.getChemist_sign() : "");
	        dataRow.createCell(59).setCellValue(history.getMicrobiologist_status() != null ? history.getMicrobiologist_status() : "");
	        dataRow.createCell(60).setCellValue(history.getMicrobiologist_saved_on() != null ? history.getMicrobiologist_saved_on().toString() : "");
	        dataRow.createCell(61).setCellValue(history.getMicrobiologist_saved_by() != null ? history.getMicrobiologist_saved_by() : "");
	        dataRow.createCell(62).setCellValue(history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : ""); // Changed to handle Long
	        dataRow.createCell(63).setCellValue(history.getMicrobiologist_submit_on() != null ? history.getMicrobiologist_submit_on().toString() : "");
	        dataRow.createCell(64).setCellValue(history.getMicrobiologist_submit_by() != null ? history.getMicrobiologist_submit_by() : "");
	        dataRow.createCell(65).setCellValue(history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString(): ""); // Changed to handle Long
	        dataRow.createCell(66).setCellValue(history.getMicrobiologist_sign() != null ? history.getMicrobiologist_sign() : "");
	        dataRow.createCell(67).setCellValue(history.getQc_status() != null ? history.getQc_status() : "");
	        
	        dataRow.createCell(68).setCellValue(history.getQc_submit_on() != null ? history.getQc_submit_on().toString() : "");
	        dataRow.createCell(69).setCellValue(history.getQc_submit_by() != null ? history.getQc_submit_by() : "");
	        dataRow.createCell(70).setCellValue(history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : "");
	        dataRow.createCell(71).setCellValue(history.getQc_sign() != null ? history.getQc_sign() : "");
	        dataRow.createCell(72).setCellValue(history.getReason() != null ? history.getReason() : "");
	        dataRow.createCell(73).setCellValue(String.valueOf(history.getVersion()));

	        // Physical and Chemical Test Data (Cells 74-99)
	        if (history.getPhysicalAndChemicalTests() != null && !history.getPhysicalAndChemicalTests().isEmpty()) {
	            PhysicalAndChemicalPropTestF026History physicalTest = history.getPhysicalAndChemicalTests().get(0);
	            if (physicalTest != null) {

	            	dataRow.createCell(74).setCellValue(physicalTest.getFiberIdentificationResult() != null ? physicalTest.getFiberIdentificationResult() : ""); // Changed from 77 to 74
	            	dataRow.createCell(75).setCellValue(physicalTest.getFiberIdentificationRemarks() != null ? physicalTest.getFiberIdentificationRemarks() : ""); // Changed method name
	            	dataRow.createCell(76).setCellValue(physicalTest.getOdurResult() != null ? physicalTest.getOdurResult() : "");
	            	dataRow.createCell(77).setCellValue(physicalTest.getOdurRemarks() != null ? physicalTest.getOdurRemarks() : "");
	            	dataRow.createCell(78).setCellValue(physicalTest.getForeignFibersResult() != null ? physicalTest.getForeignFibersResult() : "");
	            	dataRow.createCell(79).setCellValue(physicalTest.getForeignFibersRemarks() != null ? physicalTest.getForeignFibersRemarks() : "");
	            	dataRow.createCell(80).setCellValue(physicalTest.getFlourescenceResult() != null ? physicalTest.getFlourescenceResult() : "");
	            	dataRow.createCell(81).setCellValue(physicalTest.getFlourescenceRemark() != null ? physicalTest.getFlourescenceRemark() : "");
	            	dataRow.createCell(82).setCellValue(physicalTest.getSinkingTimeResult() != null ? physicalTest.getSinkingTimeResult() : "");
	            	dataRow.createCell(83).setCellValue(physicalTest.getSinkingTimeRemark() != null ? physicalTest.getSinkingTimeRemark() : "");
	            	dataRow.createCell(84).setCellValue(physicalTest.getAbsorbancyResult() != null ? physicalTest.getAbsorbancyResult() : "");
	            	dataRow.createCell(85).setCellValue(physicalTest.getAbsorbancyRemark() != null ? physicalTest.getAbsorbancyRemark() : "");
	            	dataRow.createCell(86).setCellValue(physicalTest.getPhResult() != null ? physicalTest.getPhResult() : "");
	            	dataRow.createCell(87).setCellValue(physicalTest.getPhRemark() != null ? physicalTest.getPhRemark() : "");
	            	dataRow.createCell(88).setCellValue(physicalTest.getSurfaceActivityResult() != null ? physicalTest.getSurfaceActivityResult() : "");
	            	dataRow.createCell(89).setCellValue(physicalTest.getSurfaceActivityRemark() != null ? physicalTest.getSurfaceActivityRemark() : "");
	            	dataRow.createCell(90).setCellValue(physicalTest.getWhitenessIndicesResult() != null ? physicalTest.getWhitenessIndicesResult() : "");
	            	dataRow.createCell(91).setCellValue(physicalTest.getWhitenessIndicesRemark() != null ? physicalTest.getWhitenessIndicesRemark() : "");
	            	dataRow.createCell(92).setCellValue(physicalTest.getAshContentResult() != null ? physicalTest.getAshContentResult() : "");
	            	dataRow.createCell(93).setCellValue(physicalTest.getAshContentRemark() != null ? physicalTest.getAshContentRemark() : "");
	            	dataRow.createCell(94).setCellValue(physicalTest.getWaterSolubleResult() != null ? physicalTest.getWaterSolubleResult() : "");
	            	dataRow.createCell(95).setCellValue(physicalTest.getWaterSolubleRemark() != null ? physicalTest.getWaterSolubleRemark() : ""); // Changed method name
	            	dataRow.createCell(96).setCellValue(physicalTest.getEtherSoluableResult() != null ? physicalTest.getEtherSoluableResult() : "");
	            	dataRow.createCell(97).setCellValue(physicalTest.getEtherSouluableRemark() != null ? physicalTest.getEtherSouluableRemark() : ""); // Corrected typo
	            	dataRow.createCell(98).setCellValue(physicalTest.getMicronaireValueResult() != null ? physicalTest.getMicronaireValueResult() : "");
	            	dataRow.createCell(99).setCellValue(physicalTest.getMicronaireValueRemark() != null ? physicalTest.getMicronaireValueRemark() : ""); // Ensure correct field

	            }
	        } else {
	            // If no Physical and Chemical Tests data, set empty cells
	            for (int i = 74; i <= 99; i++) {
	                dataRow.createCell(i).setCellValue("");
	            }
	        }

	        // Microbiological Test Data (Cells 106-122)
	        if (history.getMicrobiologicalTests() != null && !history.getMicrobiologicalTests().isEmpty()) {
	            MicrobiologicalTestF026History microbiologicalTest = history.getMicrobiologicalTests().get(0);
	            if (microbiologicalTest != null) {
	            	dataRow.createCell(100).setCellValue(microbiologicalTest.getSampleTestedOn() != null ? microbiologicalTest.getSampleTestedOn() : "");
	            	dataRow.createCell(101).setCellValue(microbiologicalTest.getTestCompletedOn() != null ? microbiologicalTest.getTestCompletedOn() : "");
	            	dataRow.createCell(102).setCellValue(microbiologicalTest.getSampleDescription() != null ? microbiologicalTest.getSampleDescription() : "");
	            	dataRow.createCell(103).setCellValue(microbiologicalTest.getTvcResult() != null ? microbiologicalTest.getTvcResult() : "");
	            	dataRow.createCell(104).setCellValue(microbiologicalTest.getTvcStatus() != null ? microbiologicalTest.getTvcStatus() : "");
	            	dataRow.createCell(105).setCellValue(microbiologicalTest.getTfcResult() != null ? microbiologicalTest.getTfcResult() : "");
	            	dataRow.createCell(106).setCellValue(microbiologicalTest.getTfcStatus() != null ? microbiologicalTest.getTfcStatus() : "");
	            	dataRow.createCell(107).setCellValue(microbiologicalTest.getColoformsResult() != null ? microbiologicalTest.getColoformsResult() : "");
	            	dataRow.createCell(108).setCellValue(microbiologicalTest.getColoformsStatus() != null ? microbiologicalTest.getColoformsStatus() : "");
	            	dataRow.createCell(109).setCellValue(microbiologicalTest.getEcoliResult() != null ? microbiologicalTest.getEcoliResult() : "");
	            	dataRow.createCell(110).setCellValue(microbiologicalTest.getEcoliStatus() != null ? microbiologicalTest.getEcoliStatus() : "");
	            	dataRow.createCell(111).setCellValue(microbiologicalTest.getSaurResult() != null ? microbiologicalTest.getSaurResult() : "");
	            	dataRow.createCell(112).setCellValue(microbiologicalTest.getSaurStatus() != null ? microbiologicalTest.getSaurStatus() : "");
	            	dataRow.createCell(113).setCellValue(microbiologicalTest.getPaurResult() != null ? microbiologicalTest.getPaurResult() : "");
	            	dataRow.createCell(114).setCellValue(microbiologicalTest.getPaurStatus() != null ? microbiologicalTest.getPaurStatus() : "");
	            	dataRow.createCell(115).setCellValue(microbiologicalTest.getSalmonellaResult() != null ? microbiologicalTest.getSalmonellaResult() : "");
	            	dataRow.createCell(116).setCellValue(microbiologicalTest.getSalmonellaStatus() != null ? microbiologicalTest.getSalmonellaStatus() : "");

	            }
	        } else {
	            // If no Microbiological Tests data, set empty cells
	            for (int i = 100; i <= 116; i++) {
	                dataRow.createCell(i).setCellValue("");
	            }
	        }
	    }

	    // Auto-size columns for better readability (changed upper limit to 122)
	    for (int i = 0; i <= 116; i++) { // Changed from 123 to 122
	        sheet.autoSizeColumn(i);
	    }

	    // Write to output stream
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	    workbook.write(outputStream);
	    workbook.close(); // Added to close the workbook
	    return new ByteArrayResource(outputStream.toByteArray());
	    
	    
	}

//ARF003
	
	public static ByteArrayResource generateARF003Excel(List<ChemicalAnalysisReportARF003History> details)
			throws IOException, java.io.IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getARF003TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createARF003Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	
//F001
	
		public static ByteArrayResource generateF001Excel(List<SampleInwardBookF001_F002_F003History> details)
				throws IOException, java.io.IOException {
			try (Workbook workbook = new SXSSFWorkbook()) {
				Sheet sheet = workbook.createSheet("Report");

				// Create header row
				Row headerRow = sheet.createRow(0);
				List<String> headers = getF001TitleLables();
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
		
//F002
		public static ByteArrayResource generateF002Excel(List<SampleInwardBookF001_F002_F003History> details)
				throws IOException, java.io.IOException {
			try (Workbook workbook = new SXSSFWorkbook()) {
				Sheet sheet = workbook.createSheet("Report");

				// Create header row
				Row headerRow = sheet.createRow(0);
				List<String> headers = getF002TitleLables();
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
		
//F003
				public static ByteArrayResource generateF003Excel(List<SampleInwardBookF001_F002_F003History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF003TitleLables();
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
//F021				
				public static ByteArrayResource generateF021Excel(List<Qc_MediaGrowthPromotionTestReportF021History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF021TitleLables();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createF021Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}
				
//ARF008
				public static ByteArrayResource generateARF008Excel(List<SwabMicrobiologicalAnalysisARF008_009_010History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getARF008TitleLables();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createARF008Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}		
				
//ARF009
				public static ByteArrayResource generateARF009Excel(List<SwabMicrobiologicalAnalysisARF008_009_010History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getARF009TitleLables();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createARF009Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}			
				
//ARF010
				public static ByteArrayResource generateARF010Excel(List<SwabMicrobiologicalAnalysisARF008_009_010History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getARF010TitleLables();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createARF010Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}			
				
				public static ByteArrayResource generateARF012Excel(List<DistilledWaterAnalysisReportARF012History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getARF012TitleLabels();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createARF012Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}
				
				public static ByteArrayResource generateF008Excel(List<QcTdsMeterCalibrationReportF008History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF008TitleLabels();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createF008Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}
				
//F010
				public static ByteArrayResource generateF010Excel(List<Qc_WiraFiberFinenessTesterReportF010History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF010TitleLables();
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
				
//F004
				
				public static ByteArrayResource generateF004Excel(List<Qc_RawCottenConsolidatedAnalyticalReportF004History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF004TitleLabels();
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
				
//F012
				
				public static ByteArrayResource generateF012Excel(List<Qc_BacterialIncubatorTempCalibrationF012History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF012TitleLabels();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createF012Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}
				
//F014
				public static ByteArrayResource generateF014Excel(List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF014TitleLabels();
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
	
//F006
				public static ByteArrayResource generateF006Excel(List<QcPhMeterCalibrationReportF006History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF006TitleLabels();
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
				
//F017
				public static ByteArrayResource generateF017Excel(List<QcReagentPreparationRecordF017History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF017TitleLabels();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createF017Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}

//F019
				public static ByteArrayResource generateF019Excel(List<Qc_MediaPreparationAndConsumptionRecordF019History> details)
						throws IOException, java.io.IOException {
					try (Workbook workbook = new SXSSFWorkbook()) {
						Sheet sheet = workbook.createSheet("Report");

						// Create header row
						Row headerRow = sheet.createRow(0);
						List<String> headers = getF019TitleLabels();
						int headerColumnIndex = 0;
						for (String header : headers) {
							createCell(headerRow, headerColumnIndex++, header, workbook);
						}

						// Populate data
						createF019Values(sheet, workbook, details);

						// Write the workbook to a byte array
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						workbook.write(baos);
						return new ByteArrayResource(baos.toByteArray());
					}
				}

				
	
	private static String createARF003Values(Sheet sheet, Workbook workbook,
	        List<ChemicalAnalysisReportARF003History> chemicalAnalysisReportARF003History) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (ChemicalAnalysisReportARF003History history : chemicalAnalysisReportARF003History) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Primary Key
	        createCell(valueRow, columnCount++, history.getId() != null ? history.getId().toString() : "", cellStyle);

	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getMaterialDocNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSupplier(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemicalName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemicalBatchNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAnalyticalRequestNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTestedDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSampleDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAppearanceSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAppearanceObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getColorSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getColorObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getOdourSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getOdourObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSolubilityInWaterSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSolubilityInWaterObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVisibleSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVisibleObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPhSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPhObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPuritySpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPurityObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRelativeDensitySpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRelativeDensityObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpecificGravitySpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpecificGravityObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotalSolidsSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotalSolidsObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMoistureSpec(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMoistureObsr(), cellStyle);
	        createCell(valueRow, columnCount++, history.getStandardizedChemicalLotNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCalculation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDisposalMethod(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQtyAcceptedInKg(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQtyRejectedInKg(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQtyAcceptedUnderDeviation(), cellStyle);

	        // Chemist Status Fields
	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        if (history.getChemist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "", cellStyle);
	        if (history.getChemist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        // QC Status Fields
	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        if (history.getQc_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);

	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }

	    return "";
	}
	
	private static String createF004Values(Sheet sheet, Workbook workbook,
	        List<Qc_RawCottenConsolidatedAnalyticalReportF004History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_RawCottenConsolidatedAnalyticalReportF004History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (parent columns)
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBleachingBmrNo(), cellStyle);

	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : null, cellStyle);

	        createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : null, cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : null, cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records (child entity: Qc_RawCottenConsolidatedDetailsHistory)
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (Qc_RawCottenConsolidatedDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    // Use the same row as the parent for the first child
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    // Create new row for subsequent child entries
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
	                createCell(rowForChild, nestedColumnCount++, details.getDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getArNo()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getDateOfReceipt(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestedDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getMbNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSupplier(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getStation(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getVerity(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getInvoiceNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getNoOfBale(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getQuantity(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getFlourescence(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getWhiteness()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getMicronaire()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getNepsCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getUql()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getLengthByWeightMm()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getLengthByNoMm()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSfc_w(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSfc_n(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getAsh()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getEss_ext()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getMoisture()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTrash()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	            }
	        } else {
	            // Add empty cells for nested data if none exist
	            int numberOfNestedColumns = 25; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}


	private static String createF012Values(Sheet sheet, Workbook workbook,
	        List<Qc_BacterialIncubatorTempCalibrationF012History> incubatorReportHistoryList) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_BacterialIncubatorTempCalibrationF012History history : incubatorReportHistoryList) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEqIdNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSno() != null ? history.getSno().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSetTemperature(), cellStyle);
	        createCell(valueRow, columnCount++, history.getObserevedTemperature(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCheckedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVerifiedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getStatus(), cellStyle);

	        // Microbiologist Status Fields
	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        if (history.getMicrobiologist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : "", cellStyle);
	        if (history.getMicrobiologist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        // Manager Status Fields
	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        if (history.getManager_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }

	    return "";
	}
	
	private static String createF014Values(Sheet sheet, Workbook workbook,
	        List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> autoclaveReportHistoryList) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_ValidationForAutoclaveByChemicalIndicatorF014History history : autoclaveReportHistoryList) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEqId(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLoadNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemicalIndicatorStrip(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCheckedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVerifiedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getStatus(), cellStyle);

	        // Microbiologist Status Fields
	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        if (history.getMicrobiologist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : "", cellStyle);
	        if (history.getMicrobiologist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        // Manager Status Fields
	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        if (history.getManager_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	    }

	    return "";
	}

	private static String createF006Values(Sheet sheet, Workbook workbook,
	        List<QcPhMeterCalibrationReportF006History> phMeterReportHistoryList) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QcPhMeterCalibrationReportF006History history : phMeterReportHistoryList) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEqIdNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

	        // Observations
	        createCell(valueRow, columnCount++, history.getObsr1() != null ? history.getObsr1().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getObsr2() != null ? history.getObsr2().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getObsr3() != null ? history.getObsr3().toString() : "", cellStyle);

	        // Checked and Verified
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);

	        // Chemist Status Fields
	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        if (history.getChemist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "", cellStyle);
	        if (history.getChemist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        // Manager Status Fields
	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        if (history.getManager_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	    }

	    return "";
	}

	private static String createF017Values(Sheet sheet, Workbook workbook,
	        List<QcReagentPreparationRecordF017History> reagentPrepHistoryList) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);
 
	    for (QcReagentPreparationRecordF017History history : reagentPrepHistoryList) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);
 
	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getPreparationDate) 
                    .findFirst() 
                    .orElse(null), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
 
	        // Chemical Details
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getChemicalName) 
                    .findFirst() 
                    .orElse(null), cellStyle);
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getChemicalQuantityUsed) 
                    .findFirst() 
                    .orElse(null), cellStyle);
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getPreparedSolutionQuantity) 
                    .findFirst() 
                    .orElse(null), cellStyle);
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getDilution_normality_morality) 
                    .findFirst() 
                    .orElse(null), cellStyle);
	        createCell(valueRow, columnCount++, history.getQcReagentPreparationRecordF017ChemTableHistory().stream()
                    .map(QcReagentPreparationRecordF017ChemTableHistory::getExpiryDate) 
                    .findFirst() 
                    .orElse(null), cellStyle);
 
	        // Prepared and Verified
	        createCell(valueRow, columnCount++, history.getPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
 
	        // Chemist Status Fields
	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        if (history.getChemist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "", cellStyle);
	        if (history.getChemist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
 
	        // Microbiologist Status Fields
	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        if (history.getMicrobiologist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : "", cellStyle);
	        if (history.getMicrobiologist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);
 
	        // Manager Status Fields
	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        if (history.getManager_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);
 
	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }
 
	    return "";
	}
 
	private static String createF019Values(Sheet sheet, Workbook workbook,
	        List<Qc_MediaPreparationAndConsumptionRecordF019History> mediaPrepHistoryList) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_MediaPreparationAndConsumptionRecordF019History history : mediaPrepHistoryList) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main Attributes
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPreparationDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLoadNo(), cellStyle);

	        // SCDA Media Details
	        createCell(valueRow, columnCount++, history.getScdaMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaPhMediaObserved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getScdaVerifiedBy(), cellStyle);

	        // SDA Media Details
	        createCell(valueRow, columnCount++, history.getSdaMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSdaVerifiedBy(), cellStyle);

	        // VRBA Media Details
	        createCell(valueRow, columnCount++, history.getVrbaMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVrbaVerifiedBy(), cellStyle);

	        // MacConkey Media Details
	        createCell(valueRow, columnCount++, history.getMaccOnMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMaccOnVerifiedBy(), cellStyle);

	        // Citric Media Details
	        createCell(valueRow, columnCount++, history.getCitricMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCitricVerifiedBy(), cellStyle);

	        // VJ Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getVjMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVjVerifiedBy(), cellStyle);
	        
	        // BGA Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getBgaMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaMediaQuantity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaPhOfMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBgaVerifiedBy(), cellStyle);
	        
	        // NACL Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getNaclMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNaclDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNaclMediaQuantity(), cellStyle);
	        
	        // KH2PO Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getKh2po4MediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getKh2po4DistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getKh2po4MediaQuantity(), cellStyle);
	        
	     // PEPTONE Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getPeptoneWaterMediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPeptoneWaterDistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPeptoneWaterMediaQuantity(), cellStyle);
	        
	     // TWEEN80 Media Details (if applicable)
	        createCell(valueRow, columnCount++, history.getTween80MediaWeight(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTween80DistilledWater(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTween80MediaQuantity(), cellStyle);
	        
	     //BUFFER SOLUTION VARIABLES 
	        createCell(valueRow, columnCount++, history.getBufferSolPhMediaRequired(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolPhMediaObsereved(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolNoOfPlates(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolMediaPoured(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolQuantityUsed(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolRemainingQuantiy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolRemarks(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolPreparedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBufferSolVerifiedBy(), cellStyle);
	        
	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        if (history.getMicrobiologist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : "", cellStyle);
	        if (history.getMicrobiologist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);
	        
	        // Manager Status Fields
	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        if (history.getManager_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        // Additional Attributes
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	    }

	    return "";
	}




	private static String createF001Values(Sheet sheet, Workbook workbook,
	        List<SampleInwardBookF001_F002_F003History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SampleInwardBookF001_F002_F003History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	  
	        createCell(valueRow, columnCount++, history.getDateF001(), cellStyle); // Assuming you use dateF001 for date
	        
	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_by() != null ? history.getChemist_submit_by().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);


	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SampleInwardBookDetailHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    // Use the same row as the parent for the first child
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    // Create new row for subsequent child entries
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
	                
	                createCell(rowForChild, nestedColumnCount++, details.getShift().toString(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getDescriptionOfMaterial(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getQuantity()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getBmrNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getUom(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleGivenBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleReceivedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	            }
	        } else {
	            // Add empty cells for nested data if none exist
	            int numberOfNestedColumns = 8; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}
	
	private static String createF002Values(Sheet sheet, Workbook workbook,
	        List<SampleInwardBookF001_F002_F003History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SampleInwardBookF001_F002_F003History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (parent columns)
	        
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDateF002(), cellStyle); // Assuming you use dateF001 for date
	        
	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id().toString(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SampleInwardBookDetailHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    // Use the same row as the parent for the first child
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    // Create new row for subsequent child entries
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
	                
	                createCell(rowForChild, nestedColumnCount++, details.getShift().toString(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getDescriptionOfMaterial(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getQuantity()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getBmrNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getUom(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleGivenBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleReceivedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	            }
	        } else {
	            // Add empty cells for nested data if none exist
	            int numberOfNestedColumns = 8; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}

	
	private static String createF003Values(Sheet sheet, Workbook workbook,
	        List<SampleInwardBookF001_F002_F003History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SampleInwardBookF001_F002_F003History history : reportHistory) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDateF003(), cellStyle); // Assuming you use dateF001 for date
	        
	        createCell(valueRow, columnCount++, history.getEtp_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getEtp_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getEtp_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, 
	        	    history.getEtp_saved_id() != null ? history.getEtp_saved_id().toString() : "null", cellStyle);

	        createDateCell(valueRow, columnCount++, history.getEtp_submit_on(), cellStyle);
	        createCell(valueRow, columnCount++, 
	        	    history.getEtp_submit_by() != null ? history.getEtp_submit_by().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getEtp_submit_id() != null ? history.getEtp_submit_id().toString() : "null", cellStyle);

	        createCell(valueRow, columnCount++, history.getEtp_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);


	        int startColumnForNestedData = columnCount;

	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SampleInwardBookDetailHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                createCell(rowForChild, nestedColumnCount++, details.getShift().toString(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getDescriptionOfMaterial(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getQuantity()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getBmrNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getUom(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleGivenBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getSampleReceivedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 7; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}

	private static String createF021Values(Sheet sheet, Workbook workbook,
	        List<Qc_MediaGrowthPromotionTestReportF021History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_MediaGrowthPromotionTestReportF021History history : reportHistory) {
	        int columnCount = 0;

	        Row valueRow = sheet.createRow(rowCount++);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getSno()), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getIncubationStartOn(), cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getMicrobiologist_saved_id()), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getMicrobiologist_submit_id()), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getManager_submit_id()), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (MediaGrowthDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                createCell(rowForChild, nestedColumnCount++, details.getMediaName(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getManufacturedDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getLotNo(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getExpiryDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getNameOfCulture(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestCompletionDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getApprovedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemarks(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 9; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}

	
	private static String createARF008Values(Sheet sheet, Workbook workbook,
	        List<SwabMicrobiologicalAnalysisARF008_009_010History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SwabMicrobiologicalAnalysisARF008_009_010History history : reportHistory) {
	        int columnCount = 0;

	        Row valueRow = sheet.createRow(rowCount++);

	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSampledDateF008(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : null, cellStyle);

	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SwabMicrobiologicalDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getArNumber()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getLocation(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalViableCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalFungalCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestCompletionDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, history.getQc_submit_by(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 8; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}
	
	private static String createARF009Values(Sheet sheet, Workbook workbook,
	        List<SwabMicrobiologicalAnalysisARF008_009_010History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SwabMicrobiologicalAnalysisARF008_009_010History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (parent columns)
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSampledDateF009(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : null, cellStyle);

	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SwabMicrobiologicalDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	 
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	 
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getArNumber()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getLocation(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalViableCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalFungalCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getEmployeeIdNo()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestCompletionDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, history.getQc_submit_by(), cellStyle);
	            }
	        } else {
	   
	            int numberOfNestedColumns = 8; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}
	
	
	private static String createARF010Values(Sheet sheet, Workbook workbook,
	        List<SwabMicrobiologicalAnalysisARF008_009_010History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (SwabMicrobiologicalAnalysisARF008_009_010History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (parent columns)
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSampledDateF010(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_saved_id() != null ? history.getMicrobiologist_saved_id().toString() : null, cellStyle);

	        createDateCell(valueRow, columnCount++, history.getMicrobiologist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMicrobiologist_submit_id() != null ? history.getMicrobiologist_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getMicrobiologist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : null, cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (SwabMicrobiologicalDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
		                rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getArNumber()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getLocation(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalViableCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getTotalFungalCount()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestCompletionDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRemark(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTestedBy(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, history.getQc_submit_by(), cellStyle);
	            }
	        } else {
		            int numberOfNestedColumns = 8; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}
	
	private static String createF010Values(Sheet sheet, Workbook workbook,
	        List<Qc_WiraFiberFinenessTesterReportF010History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (Qc_WiraFiberFinenessTesterReportF010History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields (parent columns)
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEqIdNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCalibrationDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);

	        createCell(valueRow, columnCount++, String.valueOf(history.getSettingBeforeCalibration()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getFlowOffset()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getPressureOffSet()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getPlGain()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getPhGain()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getNewPlGainAvg()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getCalibratedFlowOffSet()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getCalibratedPlGain()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getCalibratedPressureOffSet()), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getCalibratedPhGain()), cellStyle);
	        createCell(valueRow, columnCount++, history.getCalibNextDueDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
	     
	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : null, cellStyle);
	        createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : null, cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getManager_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getManager_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_submit_id() != null ? history.getManager_submit_id().toString() : null, cellStyle);
	        createCell(valueRow, columnCount++, history.getManager_sign(), cellStyle);
	        
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        int startColumnForNestedData = columnCount;

	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (WiraFiberDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getRefCottonMicroValue()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getObsr()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getRatio()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getPlGain()), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, String.valueOf(details.getNewPlGain()), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 5; // Adjust based on the number of nested fields
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}

	
	private static String createARF012Values(Sheet sheet, Workbook workbook,
	        List<DistilledWaterAnalysisReportARF012History> distilledWaterReportHistory) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (DistilledWaterAnalysisReportARF012History history : distilledWaterReportHistory) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSno() != null ? history.getSno().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getAnalyticalRequestNo() != null ? history.getAnalyticalRequestNo().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getPh() != null ? history.getPh().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getTurbidityInNtu() != null ? history.getTurbidityInNtu().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getTotalDissolvedSolidsInPpm() != null ? history.getTotalDissolvedSolidsInPpm().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getHardnessInPpm() != null ? history.getHardnessInPpm().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);

	        createCell(valueRow, columnCount++, history.getCheckedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getApprovedBy(), cellStyle);

	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        if (history.getChemist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "", cellStyle);
	        if (history.getChemist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        if (history.getQc_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }

	    return "";
	}

	
	private static String createF008Values(Sheet sheet, Workbook workbook,
	        List<QcTdsMeterCalibrationReportF008History> qcTdsReportHistory) {
	    int rowCount = 1; // Assuming row 0 is for headers
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QcTdsMeterCalibrationReportF008History history : qcTdsReportHistory) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEqIdNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSno() != null ? history.getSno().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getStandardSolution() != null ? history.getStandardSolution().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);

	        createCell(valueRow, columnCount++, history.getChemist_status(), cellStyle);
	        if (history.getChemist_saved_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_saved_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_saved_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_saved_id() != null ? history.getChemist_saved_id().toString() : "", cellStyle);
	        if (history.getChemist_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getChemist_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getChemist_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_submit_id() != null ? history.getChemist_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getChemist_sign(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
	        if (history.getQc_submit_on() != null) {
	            createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
	        } else {
	            createCell(valueRow, columnCount++, "", cellStyle);
	        }
	        createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_submit_id() != null ? history.getQc_submit_id().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }

	    return "";
	}
	
	
	private static List<String> getARF003TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Primary Key
	    list.add("ID");

	    // Main Attributes
	    list.add("MATERIAL_DOC_NO");
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("SUPPLIER");
	    list.add("CHEMICAL_NAME");
	    list.add("CHEMICAL_BATCH_NO");
	    list.add("ANALYTICAL_REQUEST_NO");
	    list.add("TESTED_DATE");
	    list.add("SAMPLE_DATE");
	    list.add("APPEARANCE_SPEC");
	    list.add("APPEARANCE_OBSR");
	    list.add("COLOR_SPEC");
	    list.add("COLOR_OBSR");
	    list.add("ODOUR_SPEC");
	    list.add("ODOUR_OBSR");
	    list.add("SOLUBILITY_IN_WATER_SPEC");
	    list.add("SOLUBILITY_IN_WATER_OBSR");
	    list.add("VISIBLE_SPEC");
	    list.add("VISIBLE_OBSR");
	    list.add("PH_SPEC");
	    list.add("PH_OBSR");
	    list.add("PURITY_SPEC");
	    list.add("PURITY_OBSR");
	    list.add("RELATIVE_DENSITY_SPEC");
	    list.add("RELATIVE_DENSITY_OBSR");
	    list.add("SPECIFIC_GRAVITY_SPEC");
	    list.add("SPECIFIC_GRAVITY_OBSR");
	    list.add("TOTAL_SOLIDS_SPEC");
	    list.add("TOTAL_SOLIDS_OBSR");
	    list.add("MOISTURE_SPEC");
	    list.add("MOISTURE_OBSR");
	    list.add("STANDARDIZED_CHEMICAL_LOTNO");
	    list.add("CALCULATION");
	    list.add("DISPOSAL_METHOD");
	    list.add("REMARK");
	    list.add("QTY_ACCEPTED_IN_KG");
	    list.add("QTY_REJECTED_IN_KG");
	    list.add("QTY_ACCEPTED_UNDER_DEVIATION");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}
	
	private static List<String> getF004TitleLabels() {
	    List<String> list = new ArrayList<>();


	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("BLEACHING_BMR_NO");


	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");


	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");


	    list.add("REASON");
	    list.add("VERSION");


	    list.add("DATE");
	    list.add("AR_NO");
	    list.add("DATE_OF_RECEIPT");
	    list.add("TESTED_DATE");
	    list.add("MB_NO");
	    list.add("SUPPLIER");
	    list.add("STATION");
	    list.add("VERITY");
	    list.add("INVOICE_NO");
	    list.add("NO_OF_BALE");
	    list.add("QUANTITY");
	    list.add("FLOURESCENCE");
	    list.add("WHITENESS");
	    list.add("MICRONAIRE");
	    list.add("NEPS_COUNT");
	    list.add("UQL");
	    list.add("LENGTH_BY_WEIGHT_MM");
	    list.add("LENGTH_BY_NO_MM");
	    list.add("SFC_W");
	    list.add("SFC_N");
	    list.add("ASH");
	    list.add("ESS_EXT");
	    list.add("MOISTURE");
	    list.add("TRASH");
	    list.add("REMARK");

	    return list;
	}

	
	private static List<String> getF012TitleLabels() {
	    List<String> list = new ArrayList<>();


	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("FREQUENCY");
	    list.add("DATE");
	    list.add("EQ_ID_NO");
	    list.add("SNO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("SET_TEMPERATURE");
	    list.add("OBSERVED_TEMPERATURE");
	    list.add("CHECKED_BY");
	    list.add("VERIFIED_BY");
	    list.add("STATUS");
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}

	private static List<String> getF014TitleLabels() {
	    List<String> list = new ArrayList<>();

	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("FREQUENCY");
	    list.add("DATE");
	    list.add("EQ_ID");
	    list.add("LOAD_NO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("CHEMICAL_INDICATOR_STRIP");
	    list.add("CHECKED_BY");
	    list.add("VERIFIED_BY");
	    list.add("STATUS");
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");
	    list.add("REASON");
	    list.add("VERSION");
	    list.add("REMARK");

	    return list;
	}

	private static List<String> getF006TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("EQ_ID_NO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("OBSR1");
	    list.add("OBSR2");
	    list.add("OBSR3");	    
	    list.add("CHECKED_BY");
	    list.add("VERIFIED_BY");
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");
	    list.add("REASON");
	    list.add("VERSION");
	    list.add("REMARK");

	    return list;
	}

	private static List<String> getF017TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("PREPARATION_DATE");
	    list.add("MONTH");
	    list.add("YEAR");

	    // Chemical Details
	    list.add("CHEMICAL_NAME");
	    list.add("CHEMICAL_QUANTITY_USED");
	    list.add("PREPARED_SOLUTION_QUANTITY");
	    list.add("DILUTION_NORMALITY_MORALITY");
	    list.add("EXPIRY_DATE");

	    // Prepared and Verified
	    list.add("PREPARED_BY");
	    list.add("VERIFIED_BY");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");

	    // Microbiologist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");

	    // Manager Status Fields
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}

	private static List<String> getF019TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("PREPARATION_DATE");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("LOAD_NO");

	    // SCDA Media Details
	    list.add("SCDA_MEDIA_WEIGHT");
	    list.add("SCDA_DISTILLED_WATER");
	    list.add("SCDA_MEDIA_QUANTITY");
	    list.add("SCDA_PH_OF_MEDIA_REQUIRED");
	    list.add("SCDA_PH_MEDIA_OBSERVED");
	    list.add("SCDA_NO_OF_PLATES");
	    list.add("SCDA_MEDIA_POURED");
	    list.add("SCDA_QUANTITY_USED");
	    list.add("SCDA_REMAINING_QUANTITY");
	    list.add("SCDA_REMARKS");
	    list.add("SCDA_PREPARED_BY");
	    list.add("SCDA_VERIFIED_BY");

	    // SDA Media Details
	    list.add("SDA_MEDIA_WEIGHT");
	    list.add("SDA_DISTILLED_WATER");
	    list.add("SDA_MEDIA_QUANTITY");
	    list.add("SDA_PH_OF_MEDIA_REQUIRED");
	    list.add("SDA_PH_MEDIA_OBSERVED");
	    list.add("SDA_NO_OF_PLATES");
	    list.add("SDA_MEDIA_POURED");
	    list.add("SDA_QUANTITY_USED");
	    list.add("SDA_REMAINING_QUANTITY");
	    list.add("SDA_REMARKS");
	    list.add("SDA_PREPARED_BY");
	    list.add("SDA_VERIFIED_BY");

	    // VRBA Media Details
	    list.add("VRBA_MEDIA_WEIGHT");
	    list.add("VRBA_DISTILLED_WATER");
	    list.add("VRBA_MEDIA_QUANTITY");
	    list.add("VRBA_PH_OF_MEDIA_REQUIRED");
	    list.add("VRBA_PH_MEDIA_OBSERVED");
	    list.add("VRBA_NO_OF_PLATES");
	    list.add("VRBA_MEDIA_POURED");
	    list.add("VRBA_QUANTITY_USED");
	    list.add("VRBA_REMAINING_QUANTITY");
	    list.add("VRBA_REMARKS");
	    list.add("VRBA_PREPARED_BY");
	    list.add("VRBA_VERIFIED_BY");

	    // MACCON Media Details
	    list.add("MACCON_MEDIA_WEIGHT");
	    list.add("MACCON_DISTILLED_WATER");
	    list.add("MACCON_MEDIA_QUANTITY");
	    list.add("MACCON_PH_OF_MEDIA_REQUIRED");
	    list.add("MACCON_PH_OF_MEDIA_OBSERVED");
	    list.add("MACCON_NO_OF_PLATES");
	    list.add("MACCON_MEDIA_POURED");
	    list.add("MACCON_QUANTITY_USED");
	    list.add("MACCON_REMAINING_QUANTITY");
	    list.add("MACCON_REMARKS");
	    list.add("MACCON_PREPARED_BY");
	    list.add("MACCON_VERIFIED_BY");

	    // CITRIC Media Details
	    list.add("CITRIC_MEDIA_WEIGHT");
	    list.add("CITRIC_DISTILLED_WATER");
	    list.add("CITRIC_MEDIA_QUANTITY");
	    list.add("CITRIC_PH_OF_MEDIA_REQUIRED");
	    list.add("CITRIC_PH_MEDIA_OBSERVED");
	    list.add("CITRIC_NO_OF_PLATES");
	    list.add("CITRIC_MEDIA_POURED");
	    list.add("CITRIC_QUANTITY_USED");
	    list.add("CITRIC_REMAINING_QUANTITY");
	    list.add("CITRIC_REMARKS");
	    list.add("CITRIC_PREPARED_BY");
	    list.add("CITRIC_VERIFIED_BY");

	    // VJ Media Details
	    list.add("VJ_MEDIA_WEIGHT");
	    list.add("VJ_DISTILLED_WATER");
	    list.add("VJ_MEDIA_QUANTITY");
	    list.add("VJ_PH_OF_MEDIA_REQUIRED");
	    list.add("VJ_PH_MEDIA_OBSERVED");
	    list.add("VJ_NO_OF_PLATES");
	    list.add("VJ_MEDIA_POURED");
	    list.add("VJ_QUANTITY_USED");
	    list.add("VJ_REMAINING_QUANTITY");
	    list.add("VJ_REMARKS");
	    list.add("VJ_PREPARED_BY");
	    list.add("VJ_VERIFIED_BY");

	    // BGA Media Details
	    list.add("BGA_MEDIA_WEIGHT");
	    list.add("BGA_DISTILLED_WATER");
	    list.add("BGA_MEDIA_QUANTITY");
	    list.add("BGA_PH_OF_MEDIA_REQUIRED");
	    list.add("BGA_PH_MEDIA_OBSERVED");
	    list.add("BGA_NO_OF_PLATES");
	    list.add("BGA_MEDIA_POURED");
	    list.add("BGA_QUANTITY_USED");
	    list.add("BGA_REMAINING_QUANTITY");
	    list.add("BGA_REMARKS");
	    list.add("BGA_PREPARED_BY");
	    list.add("BGA_VERIFIED_BY");

	    // NACL Media Details
	    list.add("NACL_MEDIA_WEIGHT");
	    list.add("NACL_DISTILLED_WATER");
	    list.add("NACL_MEDIA_QUANTITY");

	    // KH2PO Media Details
	    list.add("KH2PO_MEDIA_WEIGHT");
	    list.add("KH2PO_DISTILLED_WATER");
	    list.add("KH2PO_MEDIA_QUANTITY");

	    // Peptone Water Media Details
	    list.add("PEPTONE_WATER_MEDIA_WEIGHT");
	    list.add("PEPTONE_WATER_DISTILLED_WATER");
	    list.add("PEPTONE_WATER_MEDIA_QUANTITY");

	    // Tween80 Media Details
	    list.add("TWEEN80_MEDIA_WEIGHT");
	    list.add("TWEEN80_DISTILLED_WATER");
	    list.add("TWEEN80_MEDIA_QUANTITY");

	    // Buffer Solution Media Details
	    list.add("BUFFER_SOL_PH_MEDIA_REQUIRED");
	    list.add("BUFFER_SOL_PH_MEDIA_OBSERVED");
	    list.add("BUFFER_SOL_NO_OF_PLATES");
	    list.add("BUFFER_SOL_MEDIA_POURED");
	    list.add("BUFFER_SOL_QUANTITY_USED");
	    list.add("BUFFER_SOL_REMAINING_QUANTITY");
	    list.add("BUFFER_SOL_REMARKS");
	    list.add("BUFFER_PREPARED_BY");
	    list.add("BUFFER_VERIFIED_BY");
	    
	    // Microbiologist Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");
	    
	    // Manager Status Fields
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");
	    

	    return list;
	}

	
	private static List<String> getARF012TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("SNO");
	    list.add("ANALYTICAL_REQUEST_NO");
	    list.add("PH");
	    list.add("TURBIDITY_IN_NTU");
	    list.add("TOTAL_DISSOLVED_SOLIDS_IN_PPM");
	    list.add("HARDNESS_IN_PPM");
	    list.add("REMARK");

	    // Checked and Approved By
	    list.add("CHECKED_BY");
	    list.add("APPROVED_BY");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}

	private static List<String> getF008TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("FREQUENCY");
	    list.add("EQ_ID_NO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("SNO");
	    list.add("STANDARD_SOLUTION");
	    list.add("CHECKED_BY");
	    list.add("VERIFIED_BY");
	    list.add("REMARK");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}


	
	private static List<String> getF001TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE_F001");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");


	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SampleInwardBookDetailHistory
	    list.add("SHIFT");
	    list.add("DESCRIPTION_OF_MATERIAL");
	    list.add("QUANTITY");
	    list.add("BMR_NO");
	    list.add("UOM");
	    list.add("SAMPLE_GIVEN_BY");
	    list.add("SAMPLE_RECEIVED_BY");
	    list.add("REMARK");

	    return list;
	}
	
	private static List<String> getF002TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");

	    // Chemist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");


	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SampleInwardBookDetailHistory
	    list.add("SHIFT");
	    list.add("DESCRIPTION_OF_MATERIAL");
	    list.add("QUANTITY");
	    list.add("BMR_NO");
	    list.add("UOM");
	    list.add("SAMPLE_GIVEN_BY");
	    list.add("SAMPLE_RECEIVED_BY");
	    list.add("REMARK");

	    return list;
	}

	private static List<String> getF003TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");

	 // ETP Status Fields
	    list.add("ETP_STATUS");
	    list.add("ETP_SAVED_ON");
	    list.add("ETP_SAVED_BY");
	    list.add("ETP_SAVED_ID");
	    list.add("ETP_SUBMIT_ON");
	    list.add("ETP_SUBMIT_BY");
	    list.add("ETP_SUBMIT_ID");
	    list.add("ETP_SIGN");


	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SampleInwardBookDetailHistory
	    list.add("SHIFT");
	    list.add("DESCRIPTION_OF_MATERIAL");
	    list.add("QUANTITY");
	    list.add("BMR_NO");
	    list.add("UOM");
	    list.add("SAMPLE_GIVEN_BY");
	    list.add("SAMPLE_RECEIVED_BY");
	    list.add("REMARK");

	    return list;
	}
	
	private static List<String> getF021TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("SNO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("INCUBATION_START_ON");

	    // Microbiologist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");

	    // Manager Status Fields
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: MediaGrowthDetailsHistory
	    list.add("MEDIA_NAME");
	    list.add("MANUFACTURED_DATE");
	    list.add("LOT_NO");
	    list.add("EXPIRY_DATE");
	    list.add("NAME_OF_CULTURE");
	    list.add("TEST_COMPLETION_DATE");
	    list.add("TESTED_BY");
	    list.add("APPROVED_BY");
	    list.add("REMARKS");

	    return list;
	}

	
	private static List<String> getARF008TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("MONTH");
	    list.add("YEAR");

	    // Microbiologist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SwabMicrobiologicalDetailsHistory
	    list.add("AR_NUMBER");
	    list.add("LOCATION");
	    list.add("TOTAL_VIABLE_COUNT");
	    list.add("TOTAL_FUNGAL_COUNT");
	    list.add("TEST_COMPLETION_DATE");
	    list.add("REMARK");
	    list.add("TESTED_BY");
	    list.add("APPROVED_BY");

	    return list;
	}
	
	private static List<String> getARF009TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("MONTH");
	    list.add("YEAR");

	    // Microbiologist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SwabMicrobiologicalDetailsHistory
	    list.add("AR_NUMBER");
	    list.add("LOCATION");
	    list.add("EMPLOYEE_ID");
	    list.add("TOTAL_VIABLE_COUNT");
	    list.add("TOTAL_FUNGAL_COUNT");
	    list.add("TEST_COMPLETION_DATE");
	    list.add("REMARK");
	    list.add("TESTED_BY");
	    list.add("APPROVED_BY");

	    return list;
	}
	
	private static List<String> getARF010TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("DATE");
	    list.add("MONTH");
	    list.add("YEAR");

	    // Microbiologist Status Fields
	    list.add("MICROBIOLOGIST_STATUS");
	    list.add("MICROBIOLOGIST_SAVED_ON");
	    list.add("MICROBIOLOGIST_SAVED_BY");
	    list.add("MICROBIOLOGIST_SAVED_ID");
	    list.add("MICROBIOLOGIST_SUBMIT_ON");
	    list.add("MICROBIOLOGIST_SUBMIT_BY");
	    list.add("MICROBIOLOGIST_SUBMIT_ID");
	    list.add("MICROBIOLOGIST_SIGN");

	    // QC Status Fields
	    list.add("QC_STATUS");
	    list.add("QC_SUBMIT_ON");
	    list.add("QC_SUBMIT_BY");
	    list.add("QC_SUBMIT_ID");
	    list.add("QC_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: SwabMicrobiologicalDetailsHistory
	    list.add("AR_NUMBER");
	    list.add("LOCATION");
	    list.add("TOTAL_VIABLE_COUNT");
	    list.add("TOTAL_FUNGAL_COUNT");
	    list.add("TEST_COMPLETION_DATE");
	    list.add("REMARK");
	    list.add("TESTED_BY");
	    list.add("APPROVED_BY");

	    return list;
	}

	private static List<String> getF010TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Main Attributes
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("FORMAT_NAME");
	    list.add("REF_SOP_NO");
	    list.add("FREQUENCY");
	    list.add("EQ_ID_NO");
	    list.add("CALIBRATION_DATE");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("SETTING_BEFORE_CALIBRATION");
	    list.add("FLOW_OFFSET");
	    list.add("PRESSURE_OFFSET");
	    list.add("PL_GAIN");
	    list.add("PH_GAIN");
	    list.add("NEW_PL_GAIN_AVG");
	    list.add("CALIBRATED_FLOW_OFFSET");
	    list.add("CALIBRATED_PL_GAIN");
	    list.add("CALIBRATED_PRESSURE_OFFSET");
	    list.add("CALIBRATED_PH_GAIN");
	    list.add("CALIB_NEXT_DUE_DATE");
	    list.add("REMARKS");

	    // Chemist Status Fields
	    list.add("CHEMIST_STATUS");
	    list.add("CHEMIST_SAVED_ON");
	    list.add("CHEMIST_SAVED_BY");
	    list.add("CHEMIST_SAVED_ID");
	    list.add("CHEMIST_SUBMIT_ON");
	    list.add("CHEMIST_SUBMIT_BY");
	    list.add("CHEMIST_SUBMIT_ID");
	    list.add("CHEMIST_SIGN");

	    // Manager Status Fields
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMIT_ON");
	    list.add("MANAGER_SUBMIT_BY");
	    list.add("MANAGER_SUBMIT_ID");
	    list.add("MANAGER_SIGN");

	    // Additional Attributes
	    list.add("REASON");
	    list.add("VERSION");

	    // Child Entity Fields: WiraFiberDetailsHistory
	    list.add("REF_COTTON_MICRO_VALUE");
	    list.add("OBSR");
	    list.add("RATIO");
	    list.add("PL_GAIN");
	    list.add("NEW_PL_GAIN");

	    return list;
	}

	

	private static void createHeaderCell(Row headerRow, int columnIndex, String header) {
		Cell cell = headerRow.createCell(columnIndex);
		cell.setCellValue(header);
		CellStyle style = headerRow.getSheet().getWorkbook().createCellStyle();
		org.apache.poi.ss.usermodel.Font font = headerRow.getSheet().getWorkbook().createFont();
		font.setBold(true);
		style.setFont(font);
		style.setAlignment(HorizontalAlignment.CENTER); 
		cell.setCellStyle(style);
	}
	

	


			private static void createCell(Row row, int columnIndex, String value, Workbook workbook) {
				CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
				Cell cell = row.createCell(columnIndex);
				cell.setCellValue(value != null ? value : "");
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
		
			private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
				Cell cell = row.createCell(columnIndex);
				cell.setCellValue(value != null ? value : "");
				cell.setCellStyle(cellStyle);
			}
				
			public static void createDateCell(Row row, int columnCount, java.util.Date date, CellStyle dateCellStyle) {
			    Cell cell = row.createCell(columnCount++);
			    if (date != null) {
			        cell.setCellValue(date);
			        cell.setCellStyle(dateCellStyle);
			    } else {
			        cell.setCellValue("");
			        cell.setCellStyle(dateCellStyle);
			    }
			}

			
			private static CellStyle createDateCellStyle(Workbook workbook) {
				CellStyle cellStyle = workbook.createCellStyle();
				DataFormat format = workbook.createDataFormat();
				cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
				return cellStyle;
			}

}
