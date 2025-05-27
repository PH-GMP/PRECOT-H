package com.focusr.Precot.util.drygoods;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.mssql.database.model.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionCottonBallsHistoryF003;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14;
import com.focusr.Precot.mssql.database.model.drygoods.audit.FinishedGoodsTransferRecordLineHistoryF011;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsHandSanitationHistoryF06;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsProductChangeOverHistoryF09;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsSanitationListHistoryF06;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookManPowerDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookPlanProdDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookWorkAllocationHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.MiniRollHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingLinesHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverReceiptDetailsHistoryF003;

public class DryGoodsExcelUtil {
	
	//F001
	public static ByteArrayResource generateF001Excel(
	        List<BaleConsumptionReportDryGoodsHistoryF001> baleConsumptionReportDryGoodsHistoryF001) throws IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF001TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF001Values(sheet, workbook, baleConsumptionReportDryGoodsHistoryF001);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static List<String> getF001TitleLabels() {
	    List<String> list = new ArrayList<>();

//	    list.add("BALE REPORT ID");
	    list.add("UNIT");
	    list.add("FORMAT NO");
	    list.add("FORMAT NAME");
	    list.add("SOP NO");
	    list.add("REVISION NO");
	    list.add("DATE");
	    list.add("SHIFT");
	    list.add("MIXING");
	    list.add("LAYDOWN NO");
	    list.add("AB COTTON IN KG");

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

	private static void createF001Values(Sheet sheet, Workbook workbook,
	        List<BaleConsumptionReportDryGoodsHistoryF001> baleConsumptionReportDryGoodsHistoryF001) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (BaleConsumptionReportDryGoodsHistoryF001 history : baleConsumptionReportDryGoodsHistoryF001) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

//	        createCell(valueRow, columnCount++, history.getBale_report_id().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLaydown_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAb_cotton_in_kg(), cellStyle);

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
	}

	public static ByteArrayResource generateF003Excel(
			   List<DailyProductionCottonBallsHistoryF003> details) throws IOException {
        try (Workbook workbook = new SXSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("CottonBallsReport");

            // Create header row
            Row headerRow = sheet.createRow(0);
            List<String> headers = getCottonBallsTitleLabels();
            int headerColumnIndex = 0;
            for (String header : headers) {
                createCell(headerRow, headerColumnIndex++, header, workbook);
            }

            // Populate data
            createCottonBallsValues(sheet, workbook, details);

            // Write the workbook to a byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            return new ByteArrayResource(baos.toByteArray());
        }
    }

    private static List<String> getCottonBallsTitleLabels() {
        List<String> list = new ArrayList<>();

        list.add("UNIT");
        list.add("FORMAT NO");
        list.add("FORMAT NAME");
        list.add("SOP NO");
        list.add("REVISION NO");
        list.add("DATE");
        list.add("SHIFT");
        list.add("MACHINE NAME");
        list.add("PRODUCT_NAME");
        list.add("ORDER NO");
        list.add("CUSTOMER NAME");
        list.add("BALL OR BAG");
        list.add("SALE ORDER NO");
        list.add("BRAND");
        list.add("BAG OR BOX");
        list.add("CUTTING LENGTH");
        list.add("FEED ROLLER");
        list.add("CUTTING ROLLER");
        list.add("SLIVER WEIGHT GRAMS");
        list.add("BALL WEIGHT GRAMS");
        list.add("BAG COUNTS");
        list.add("STD BAGS PER HR");
        list.add("BAG HOUR1");
        list.add("BAG HOUR2");
        list.add("BAG HOUR3");
        list.add("BAG HOUR4");
        list.add("BAG HOUR5");
        list.add("BAG HOUR6");
        list.add("BAG HOUR7");
        list.add("BAG HOUR8");
        list.add("BAG TOTAL HOUR");
        list.add("BOX HOUR1");
        list.add("BOX HOUR2");
        list.add("BOX HOUR3");
        list.add("BOX HOUR4");
        list.add("BOX HOUR5");
        list.add("BOX HOUR6");
        list.add("BOX HOUR7");
        list.add("BOX HOUR8");
        list.add("BOX TOTAL HOUR");
        list.add("SLIVER WEIGHT KG");
        list.add("BALL WEIGHT KG");
        list.add("REASON");
        list.add("VERSION");

        // Nested records
        list.add("CAN NO");
        list.add("GRAM OR MTRS");
        list.add("CARDING MC NO");
        list.add("NET WEIGHT KG");

        return list;
    }

    private static void createCottonBallsValues(Sheet sheet, Workbook workbook,
                                                List<DailyProductionCottonBallsHistoryF003> details) {
        int rowCount = 1;
        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);

        for (DailyProductionCottonBallsHistoryF003 history : details) {
            int columnCount = 0;

            // Create main record row
            Row valueRow = sheet.createRow(rowCount++);

            // Main record fields
            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
            createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
            createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
            createCell(valueRow, columnCount++, history.getMachine_name(), cellStyle);
            createCell(valueRow, columnCount++, history.getProduct_name(),cellStyle);
            createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);
            createCell(valueRow, columnCount++, history.getCoustomer_name(), cellStyle);
            createCell(valueRow, columnCount++, history.getBall_or_bag(), cellStyle);
            createCell(valueRow, columnCount++, history.getSale_order_no(), cellStyle);
            createCell(valueRow, columnCount++, history.getBrand(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_or_box(), cellStyle);
            createCell(valueRow, columnCount++, history.getCutting_length(), cellStyle);
            createCell(valueRow, columnCount++, history.getFeed_roller(), cellStyle);
            createCell(valueRow, columnCount++, history.getCutting_roller(), cellStyle);
            createCell(valueRow, columnCount++, history.getSliver_weight_grams(), cellStyle);
            createCell(valueRow, columnCount++, history.getBall_weight_grams(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_counts(), cellStyle);
            createCell(valueRow, columnCount++, history.getStd_bags_per_hr(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour1(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour2(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour3(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour4(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour5(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour6(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour7(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_hour8(), cellStyle);
            createCell(valueRow, columnCount++, history.getBag_total_hour(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour1(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour2(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour3(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour4(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour5(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour6(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour7(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_hour8(), cellStyle);
            createCell(valueRow, columnCount++, history.getBox_total_hour(), cellStyle);
            createCell(valueRow, columnCount++, history.getSliver_weight_kg(), cellStyle);
            createCell(valueRow, columnCount++, history.getBall_weight_kg(), cellStyle);
            createCell(valueRow, columnCount++, history.getReason(), cellStyle);
            createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

            int startColumnForNestedData = columnCount;

            // Nested records (SliverReceiptDetailsHistoryF003)
            if (history.getSliverreceiptdetailshistory() != null && !history.getSliverreceiptdetailshistory().isEmpty()) {
                for (SliverReceiptDetailsHistoryF003 sliverDetails : history.getSliverreceiptdetailshistory()) {
                    Row nestedRow = sheet.createRow(rowCount++);
                    int nestedColumnCount = startColumnForNestedData;

                    // Fill nested data
                    createCell(nestedRow, nestedColumnCount++, sliverDetails.getCan_no(), cellStyle);
                    createCell(nestedRow, nestedColumnCount++, sliverDetails.getGram_or_mtrs(), cellStyle);
                    createCell(nestedRow, nestedColumnCount++, String.valueOf(sliverDetails.getCarding_mc_no()), cellStyle);
                    createCell(nestedRow, nestedColumnCount++, String.valueOf(sliverDetails.getNet_weight_kg()), cellStyle);
                }
            } else {
                // Add empty cells for nested data if none exist
                int numberOfNestedColumns = 4; 
                for (int i = 0; i < numberOfNestedColumns; i++) {
                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
                }
            }
        }
    }

	public static ByteArrayResource generateF006Excel(
	        List<DailyProductionDetailsPleateAndWoolRollHistoryF006> dailyProductionPleateAndWoolRollHistoryF006) throws IOException {
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
	        createF006Values(sheet, workbook, dailyProductionPleateAndWoolRollHistoryF006);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static List<String> getF006TitleLabels() {
	    List<String> list = new ArrayList<>();

//	    list.add("PLEATE ID");
	    list.add("UNIT");
	    list.add("FORMAT NO");
	    list.add("FORMAT NAME");
	    list.add("SOP NO");
	    list.add("REVISION NO");
	    list.add("DATE");
	    list.add("SHIFT");
	    list.add("PRODUCT NAME");
	    list.add("ORDER NO");
	    list.add("CUSTOMER NAME");
	    list.add("PERFORATE TYPE");
	    list.add("NON PERFORATE TYPE");
	    list.add("BRAND");
	    list.add("BAG OR BOX");

	    // PARAMETERS
	    list.add("GRAMS");
	    list.add("WIDTH");
	    list.add("HEIGHT");

	    // OUTPUT DETAILS
	    // BAG
	    list.add("BAG HOUR 1");
	    list.add("BAG HOUR 2");
	    list.add("BAG HOUR 3");
	    list.add("BAG HOUR 4");
	    list.add("BAG HOUR 5");
	    list.add("BAG HOUR 6");
	    list.add("BAG HOUR 7");
	    list.add("BAG HOUR 8");
	    list.add("BAG_TOTAL_HOUR");

	    // BOX
	    list.add("BOX HOUR 1");
	    list.add("BOX HOUR 2");
	    list.add("BOX HOUR 3");
	    list.add("BOX HOUR 4");
	    list.add("BOX HOUR 5");
	    list.add("BOX HOUR 6");
	    list.add("BOX HOUR 7");
	    list.add("BOX HOUR 8");
	    list.add("BOX TOTAL HOUR");

	    // WASTE IN KG
	    list.add("WASTE KG");

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

	    return list;
	}

	private static void createF006Values(Sheet sheet, Workbook workbook,
	        List<DailyProductionDetailsPleateAndWoolRollHistoryF006> dailyProductionPleateAndWoolRollHistoryF006) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (DailyProductionDetailsPleateAndWoolRollHistoryF006 history : dailyProductionPleateAndWoolRollHistoryF006) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

//	        createCell(valueRow, columnCount++, history.getPleate_id().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProduct_name(), cellStyle);
	        createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCoustomer_name(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPerforate_type(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNon_perforate_type(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBrand(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_or_box(), cellStyle);

	        // PARAMETERS
	        createCell(valueRow, columnCount++, history.getGrams(), cellStyle);
	        createCell(valueRow, columnCount++, history.getWidth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getHeight(), cellStyle);

	        // OUTPUT DETAILS - BAG
	        createCell(valueRow, columnCount++, history.getBag_hour1(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour2(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour3(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour4(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour5(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour6(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour7(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_hour8(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBag_total_hour(), cellStyle);

	        // OUTPUT DETAILS - BOX
	        createCell(valueRow, columnCount++, history.getBox_hour1(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour2(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour3(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour4(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour5(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour6(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour7(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_hour8(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBox_total_hour(), cellStyle);

	        // WASTE IN KG
	        createCell(valueRow, columnCount++, history.getWaste_kg(), cellStyle);

	        // STATUS COLUMNS
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
	    }
	}

	  public static ByteArrayResource generateFinishedGoodsTransferExcelF011(
	            List<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011> records) throws IOException {
	        try (Workbook workbook = new SXSSFWorkbook()) {
	            Sheet sheet = workbook.createSheet("FinishedGoodsTransferReport");

	            // Create header row
	            Row headerRow = sheet.createRow(0);
	            List<String> headers = getFinishedGoodsTransferTitleLabels();
	            int headerColumnIndex = 0;
	            for (String header : headers) {
	                createCell(headerRow, headerColumnIndex++, header, workbook);
	            }

	            // Populate data
	            createFinishedGoodsTransferValues(sheet, workbook, records);

	            // Write the workbook to a byte array
	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            workbook.write(baos);
	            return new ByteArrayResource(baos.toByteArray());
	        }
	    }

	    private static List<String> getFinishedGoodsTransferTitleLabels() {
	        List<String> list = new ArrayList<>();

	        // Main record fields
	        list.add("UNIT");
		    list.add("FORMAT NO");
		    list.add("FORMAT NAME");
		    list.add("SOP NO");
		    list.add("REVISION NO");
	        list.add("DATE");
	        list.add("SHIFT");
	        list.add("VERSION");
	       //Status
	        list.add("SUPERVISOR STATUS");
	        list.add("SUPERVISOR SUBMIT ON");
	        list.add("SUPERVISOR SUBMIT BY");
	        list.add("SUPERVISOR SIGN");

	        // Nested records (FinishedGoodsTransferRecordLineHistoryF011)
	        list.add("PO NO");
	        list.add("PRODUCT NAME");
	        list.add("MATERIAL CODE NO");
	        list.add("NO OF BOX IN PALLET");
	        list.add("NO OF PALLET");
	        list.add("TOTAL BOX");
	        list.add("FG NAME");

	        return list;
	    }

	    private static void createFinishedGoodsTransferValues(Sheet sheet, Workbook workbook,
	                                                          List<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011> records) {
	        int rowCount = 1;
	        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);

	        for (BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 record : records) {
	            int columnCount = 0;

	            // Create main record row
	            Row valueRow = sheet.createRow(rowCount++);

	            // Main record fields
	            createCell(valueRow, columnCount++, record.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, record.getFormatNo(), cellStyle);
		        createCell(valueRow, columnCount++, record.getFormatName(), cellStyle);
		        createCell(valueRow, columnCount++, record.getSopNumber(), cellStyle);
		        createCell(valueRow, columnCount++, record.getRevisionNo(), cellStyle);
	            createCell(valueRow, columnCount++, record.getDate(), cellStyle);
	            createCell(valueRow, columnCount++, record.getShift(), cellStyle);
	            createCell(valueRow, columnCount++, String.valueOf(record.getVersion()), cellStyle);
	            createCell(valueRow, columnCount++, record.getSupervisor_status(), cellStyle);
	          
	            createCell(valueRow, columnCount++, record.getSupervisor_submit_on() != null ? record.getSupervisor_submit_on().toString() : "", cellStyle);
	            createCell(valueRow, columnCount++, record.getSupervisor_submit_by(), cellStyle);
	            createCell(valueRow, columnCount++, record.getSupervisor_sign(), cellStyle);

	            int startColumnForNestedData = columnCount;

	            // Nested records (FinishedGoodsTransferRecordLineHistoryF011)
	            if (record.getFinishedLineshistory() != null && !record.getFinishedLineshistory().isEmpty()) {
	                for (FinishedGoodsTransferRecordLineHistoryF011 line : record.getFinishedLineshistory()) {
	                    Row nestedRow = sheet.createRow(rowCount++);
	                    int nestedColumnCount = startColumnForNestedData;

	                    // Fill nested data
	                    createCell(nestedRow, nestedColumnCount++, line.getPo_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getProduct_name(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getMaterial_code_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getNo_of_boxes_in_pallet(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getNo_of_pallet(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getTotal_box(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getFg_name(), cellStyle);
	                }
	            } else {
	                // Add empty cells for nested data if none exist
	                int numberOfNestedColumns = 7; 
	                for (int i = 0; i < numberOfNestedColumns; i++) {
	                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	                }
	            }
	        }
	    }
	    
	    //F002
	    public static ByteArrayResource generateSliverMakingExcelF02(
	            List<SliverMakingHeaderHistory> records) throws IOException {
	        try (Workbook workbook = new SXSSFWorkbook()) {
	            Sheet sheet = workbook.createSheet("SliverMakingReport");

	            // Create header row
	            Row headerRow = sheet.createRow(0);
	            List<String> headers = getSliverMakingTitleLabels();
	            int headerColumnIndex = 0;
	            for (String header : headers) {
	                createCell(headerRow, headerColumnIndex++, header, workbook);
	            }

	            // Populate data
	            createSliverMakingValues(sheet, workbook, records);

	            // Write the workbook to a byte array
	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            workbook.write(baos);
	            return new ByteArrayResource(baos.toByteArray());
	        }
	    }

	    private static List<String> getSliverMakingTitleLabels() {
	        List<String> list = new ArrayList<>();

	        // Main record fields
	        list.add("UNIT");
	        list.add("FORMAT NO");
	        list.add("FORMAT NAME");
	        list.add("SOP NO");
	        list.add("REVISION NO");
	        list.add("MACHINE NAME");
	        list.add("DATE");
	        list.add("SHIFT");
	        list.add("LAYDOWN NO");
	        list.add("ORDER NO");
	        list.add("MIXING");
	        list.add("HOURS 01");
	        list.add("HOURS 02");
	        list.add("HOURS 03");
	        list.add("HOURS 04");
	        list.add("HOURS 05");
	        list.add("HOURS 06");
	        list.add("HOURS 07");
	        list.add("HOURS 08");
	        list.add("TOTAL SUM");
	        list.add("COMPACTOR WT");
	        list.add("SLIVER WT");
	        //status
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

	        // Nested records (SliverMakingLinesHistory)
	        list.add("CAN NO");
	        list.add("GPM");
	        list.add("CARDING MC NO");
	        list.add("NET WT");

	        return list;
	    }

	    private static void createSliverMakingValues(Sheet sheet, Workbook workbook,
	                                                 List<SliverMakingHeaderHistory> records) {
	        int rowCount = 1;
	        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	        CellStyle dateCellStyle = createDateCellStyle(workbook);
	        for (SliverMakingHeaderHistory record : records) {
	            int columnCount = 0;

	            // Create main record row
	            Row valueRow = sheet.createRow(rowCount++);

	            // Main record fields
	            createCell(valueRow, columnCount++, record.getUnit(), cellStyle);
	            createCell(valueRow, columnCount++, record.getFormatNo(), cellStyle);
	            createCell(valueRow, columnCount++, record.getFormatName(), cellStyle);
	            createCell(valueRow, columnCount++, record.getSopNumber(), cellStyle);
	            createCell(valueRow, columnCount++, record.getRevisionNo(), cellStyle);
	            createCell(valueRow, columnCount++, record.getMachine_name(), cellStyle);
	            createCell(valueRow, columnCount++, record.getDate(), cellStyle);
	            createCell(valueRow, columnCount++, record.getShift(), cellStyle);
	            createCell(valueRow, columnCount++, record.getLaydown_no(), cellStyle);
	            createCell(valueRow, columnCount++, record.getOrder_no(), cellStyle);
	            createCell(valueRow, columnCount++, record.getMixing(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_01(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_02(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_03(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_04(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_05(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_06(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_07(), cellStyle);
	            createCell(valueRow, columnCount++, record.getHours_08(), cellStyle);
	            createCell(valueRow, columnCount++, record.getTotal_sum(), cellStyle);
	            createCell(valueRow, columnCount++, record.getCompactor_wt(), cellStyle);
	            createCell(valueRow, columnCount++, record.getSliver_wt(), cellStyle);
	            // STATUS COLUMNS
		        createCell(valueRow, columnCount++, record.getOperator_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, record.getOperator_submitted_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, record.getOperator_submitted_by(), cellStyle);
		        createCell(valueRow, columnCount++, record.getOperator_sign(), cellStyle);

		        createCell(valueRow, columnCount++, record.getHod_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, record.getHod_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, record.getHod_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, record.getHod_sign(), cellStyle);
	            createCell(valueRow, columnCount++, record.getReason(), cellStyle);
	            createCell(valueRow, columnCount++, String.valueOf(record.getVersion()), cellStyle);

	            int startColumnForNestedData = columnCount;

	            // Nested records (SliverMakingLinesHistory)
	            if (record.getDetails() != null && !record.getDetails().isEmpty()) {
	                for (SliverMakingLinesHistory line : record.getDetails()) {
	                    Row nestedRow = sheet.createRow(rowCount++);
	                    int nestedColumnCount = startColumnForNestedData;

	                    // Fill nested data
	                    createCell(nestedRow, nestedColumnCount++, line.getCan_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getGpm(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getCarding_mc_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, line.getNet_wt(), cellStyle);
	                }
	            } else {
	                // Add empty cells for nested data if none exist
	                int numberOfNestedColumns = 4;
	                for (int i = 0; i < numberOfNestedColumns; i++) {
	                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	                }
	            }
	        }
	    }
	    
	    //F005
	    public static ByteArrayResource generateMiniRollHistoryExcelF005(List<MiniRollHistory> miniRollHistories) throws IOException {
	        try (Workbook workbook = new SXSSFWorkbook()) {
	            Sheet sheet = workbook.createSheet("MiniRollHistory Report");

	            // Create header row
	            Row headerRow = sheet.createRow(0);
	            List<String> headers = getMiniRollHistoryTitleLabels();
	            int headerColumnIndex = 0;
	            for (String header : headers) {
	                createCell(headerRow, headerColumnIndex++, header, workbook);
	            }

	            // Populate data
	            populateMiniRollHistoryValues(sheet, workbook, miniRollHistories);

	            // Write the workbook to a byte array
	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            workbook.write(baos);
	            return new ByteArrayResource(baos.toByteArray());
	        }
	    }

	    private static List<String> getMiniRollHistoryTitleLabels() {
	        List<String> list = new ArrayList<>();
	      
	        list.add("UNIT");
	        list.add("FORMAT NO");
	        list.add("FORMAT NAME");
	        list.add("SOP NO");
	        list.add("REVISION NO");
	        list.add("DATE");
	        list.add("SHIFT");
	        list.add("LAYDOWN NO");
	        list.add("ORDER NO");
	        list.add("PRODUCT NAME");
	        list.add("CUSTOMER NAME");
	        list.add("USABLE KG");
	        list.add("SALEABLE KG");
	        
	        //status
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

	    private static void populateMiniRollHistoryValues(Sheet sheet, Workbook workbook, List<MiniRollHistory> miniRollHistories) {
	        int rowCount = 1;
	        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	        CellStyle dateCellStyle = createDateCellStyle(workbook);
	        for (MiniRollHistory history : miniRollHistories) {
	            int columnCount = 0;
	            Row valueRow = sheet.createRow(rowCount++);

	          
	            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	            createCell(valueRow, columnCount++, history.getLaydown_no(), cellStyle);
	            createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);
	            createCell(valueRow, columnCount++, history.getProduct_name(), cellStyle);
	            createCell(valueRow, columnCount++, history.getCustomer_name(), cellStyle);
	            createCell(valueRow, columnCount++, history.getUsable_kg(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSaleable_kg(), cellStyle);
	            // STATUS COLUMNS
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
	    }
	    //F012
	    public static ByteArrayResource generateSanitizationDetailsHistoryExcelF012(List<SanitizationDetailsHistory> sanitizationDetailsHistories) throws IOException {
	        try (Workbook workbook = new SXSSFWorkbook()) {
	            Sheet sheet = workbook.createSheet("SanitizationDetailsHistory Report");

	            // Create header row
	            Row headerRow = sheet.createRow(0);
	            List<String> headers = getSanitizationDetailsHistoryTitleLabels();
	            int headerColumnIndex = 0;
	            for (String header : headers) {
	                createCell(headerRow, headerColumnIndex++, header, workbook);
	            }

	            // Populate data
	            populateSanitizationDetailsHistoryValues(sheet, workbook, sanitizationDetailsHistories);

	            // Write the workbook to a byte array
	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            workbook.write(baos);
	            return new ByteArrayResource(baos.toByteArray());
	        }
	    }

	    private static List<String> getSanitizationDetailsHistoryTitleLabels() {
	        List<String> list = new ArrayList<>();
//	        list.add("MC ID");
	        list.add("UNIT");
	        list.add("FORMAT NO");
	        list.add("FORMAT NAME");
	        list.add("REVISION NO");
	        list.add("SOP NO");
	        list.add("WEEK");
	        list.add("MONTH");
	        list.add("YEAR");
	        list.add("NAME OF CHEMICAL");
	        list.add("CHEMICAL BATCH NO");
	        list.add("EXP DATE");
	        list.add("BALLS MC NO 01");
	        list.add("BALLS MC NO 02");
	        list.add("SLIVER MAKING MC");
	        list.add("ROLLS MC");
	        list.add("PLEAT MC");
	        list.add("ROLL PLEAT LINE");
	        list.add("SLIVER OUTPUT AREA");
	        list.add("SLIVER CARRYING DRUMS");
	        list.add("SLIVER FEEDING MECHANISMS");
	        list.add("BALLS OUTPUT AREA");
	        list.add("PACKING TABLES BALLS");
	        list.add("CARDED WEB OUTPUT AREA");
	        list.add("CONVEYOR");
	        list.add("ROLL WINDER");
	        list.add("TROLLEYS");
	        list.add("ROLL PLEAT MACHINE");
	        list.add("PACKING TABLES");
	        list.add("REMARKS");
	        list.add("SANITIZED BY");
	        //STATUS
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

	    private static void populateSanitizationDetailsHistoryValues(Sheet sheet, Workbook workbook, List<SanitizationDetailsHistory> sanitizationDetailsHistories) {
	        int rowCount = 1;
	        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	        CellStyle dateCellStyle = createDateCellStyle(workbook);
	        for (SanitizationDetailsHistory history : sanitizationDetailsHistories) {
	            int columnCount = 0;
	            Row valueRow = sheet.createRow(rowCount++);

	            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	            createCell(valueRow, columnCount++, history.getWeek(), cellStyle);
	            createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	            createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	            createCell(valueRow, columnCount++, history.getName_of_chemical(), cellStyle);
	            createCell(valueRow, columnCount++, history.getChemical_batch_no(), cellStyle);
	            createCell(valueRow, columnCount++, history.getExp_date(), cellStyle);
	            createCell(valueRow, columnCount++, history.getBalls_mc_no_01(), cellStyle);
	            createCell(valueRow, columnCount++, history.getBalls_mc_no_02(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSliver_making_mc(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRolls_mc(), cellStyle);
	            createCell(valueRow, columnCount++, history.getPleat_mc(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRoll_pleat_line(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSliver_output_area(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSliver_carrying_drums(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSliver_feeding_mechanisms(), cellStyle);
	            createCell(valueRow, columnCount++, history.getBalls_output_area(), cellStyle);
	            createCell(valueRow, columnCount++, history.getPacking_tables_balls(), cellStyle);
	            createCell(valueRow, columnCount++, history.getCarded_web_output_area(), cellStyle);
	            createCell(valueRow, columnCount++, history.getConveyor(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRoll_winder(), cellStyle);
	            createCell(valueRow, columnCount++, history.getTrolleys(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRoll_pleat_machine(), cellStyle);
	            createCell(valueRow, columnCount++, history.getPacking_tables(), cellStyle);
	            createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
	            createCell(valueRow, columnCount++, history.getSanitized_by(), cellStyle);
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
	    }
	    //F10
	    public static ByteArrayResource generateLogBookHeaderHistoryExcelF10(
	            List<LogBookHeaderHistory> records) throws IOException {
	        try (Workbook workbook = new SXSSFWorkbook()) {
	            Sheet sheet = workbook.createSheet("LogBookHeaderHistoryReport");

	            // Create header row
	            Row headerRow = sheet.createRow(0);
	            List<String> headers = getLogBookHeaderHistoryTitleLabels();
	            int headerColumnIndex = 0;
	            for (String header : headers) {
	                createCell(headerRow, headerColumnIndex++, header, workbook);
	            }

	            // Populate data
	            createLogBookHeaderHistoryValues(sheet, workbook, records);

	            // Write the workbook to a byte array
	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            workbook.write(baos);
	            return new ByteArrayResource(baos.toByteArray());
	        }
	    }

	    private static List<String> getLogBookHeaderHistoryTitleLabels() {
	        List<String> list = new ArrayList<>();

	        // Main record fields
	       // list.add("LOG ID");
	        list.add("UNIT");
	        list.add("FORMAT NO");
	        list.add("FORMAT NAME");
	        list.add("SOP NO");
	        list.add("REVISION NO");
	        list.add("DATE");
	        list.add("SHIFT");
	        list.add("OTHER COMMUNICATION");
	        list.add("JULAIN DATE");
	        list.add("NO OF SLIVER");
	        list.add("NO OF WOLL ROLL");
	        list.add("PLANED PROD DETAILS");
	        //STATUS
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

	        // Nested records (Work Allocation, Manpower Details, Plan Prod Details)
	        list.add("WORK ALLOCATION MC NO");
	        list.add("PERSON REQ");
	        list.add("PERSON PRESENT");
	        list.add("RUNNING");
	        list.add("NEXT");

	        list.add("MANPOWER CATEGORY");
	        list.add("ON PAY ROLL");
	        list.add("PRESENT");
	        list.add("LEAVE");
	        list.add("ABSENT");

	        list.add("PLAN PROD MACHINE NAME");
	        list.add("ORDER NO");
	        list.add("PROD NAME");
	        list.add("ORDER QTY");
	        list.add("BAG");
	        list.add("BOX");
	        list.add("PROD BLNC QTY");

	        return list;
	    }

	    private static void createLogBookHeaderHistoryValues(Sheet sheet, Workbook workbook,
	                                                         List<LogBookHeaderHistory> records) {
	        int rowCount = 1;
	        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	        CellStyle dateCellStyle = createDateCellStyle(workbook);
	        for (LogBookHeaderHistory record : records) {
	            int columnCount = 0;

	            // Create main record row
	            Row valueRow = sheet.createRow(rowCount++);

	            // Main record fields
	          //  createCell(valueRow, columnCount++, String.valueOf(record.getLog_id()), cellStyle);
	            createCell(valueRow, columnCount++, record.getUnit(), cellStyle);
	            createCell(valueRow, columnCount++, record.getFormatNo(), cellStyle);
	            createCell(valueRow, columnCount++, record.getFormatName(), cellStyle);
	            createCell(valueRow, columnCount++, record.getSopNumber(), cellStyle);
	            createCell(valueRow, columnCount++, record.getRevisionNo(), cellStyle);
	            createCell(valueRow, columnCount++, record.getDate(), cellStyle);
	            createCell(valueRow, columnCount++, record.getShift(), cellStyle);
	            createCell(valueRow, columnCount++, record.getOther_communication(), cellStyle);
	            createCell(valueRow, columnCount++, record.getJulain_date(), cellStyle);
	            createCell(valueRow, columnCount++, record.getNo_of_sliver(), cellStyle);
	            createCell(valueRow, columnCount++, record.getNo_of_woll_roll(), cellStyle);
	            createCell(valueRow, columnCount++, record.getPlaned_prod_details(), cellStyle);
	            createCell(valueRow, columnCount++, record.getSupervisor_status(),cellStyle);
	            createDateCell(valueRow, columnCount++, record.getSupervisor_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, record.getSupervisor_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, record.getSupervisor_sign(), cellStyle);

		        createCell(valueRow, columnCount++, record.getHod_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, record.getHod_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, record.getHod_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, record.getHod_sign(), cellStyle);
	            createCell(valueRow, columnCount++, record.getReason(), cellStyle);
	            createCell(valueRow, columnCount++, String.valueOf(record.getVersion()), cellStyle);

	            int startColumnForNestedData = columnCount;

	            // Nested records (Work Allocation)
	            if (record.getWorkAllocationDetails() != null && !record.getWorkAllocationDetails().isEmpty()) {
	                for (LogBookWorkAllocationHistory allocation : record.getWorkAllocationDetails()) {
	                    Row nestedRow = sheet.createRow(rowCount++);
	                    int nestedColumnCount = startColumnForNestedData;

	                    createCell(nestedRow, nestedColumnCount++, allocation.getMc_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, allocation.getPerson_req(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, allocation.getPerson_present(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, allocation.getRunning(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, allocation.getNext(), cellStyle);
	                }
	            } else {
	                // Add empty cells for nested data if none exist
	                int numberOfNestedColumns = 5; 
	                for (int i = 0; i < numberOfNestedColumns; i++) {
	                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	                }
	            }

	            startColumnForNestedData += 5; // Adjust the starting column for the next nested section

	            // Nested records (Manpower Details)
	            if (record.getManpowerDetails() != null && !record.getManpowerDetails().isEmpty()) {
	                for (LogBookManPowerDetailsHistory manpower : record.getManpowerDetails()) {
	                    Row nestedRow = sheet.createRow(rowCount++);
	                    int nestedColumnCount = startColumnForNestedData;

	                    createCell(nestedRow, nestedColumnCount++, manpower.getCategory(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, manpower.getOn_pay_roll(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, manpower.getPresent(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, manpower.getLeave(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, manpower.getAbsent(), cellStyle);
	                }
	            } else {
	                // Add empty cells for nested data if none exist
	                int numberOfNestedColumns = 5;
	                for (int i = 0; i < numberOfNestedColumns; i++) {
	                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	                }
	            }

	            startColumnForNestedData += 5; // Adjust the starting column for the next nested section

	            // Nested records (Plan Prod Details)
	            if (record.getProdDetails() != null && !record.getProdDetails().isEmpty()) {
	                for (LogBookPlanProdDetailsHistory prodDetail : record.getProdDetails()) {
	                    Row nestedRow = sheet.createRow(rowCount++);
	                    int nestedColumnCount = startColumnForNestedData;

	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getMacine_name(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getOrder_no(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getProd_name(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getOrder_qty(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getBag(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getBox(), cellStyle);
	                    createCell(nestedRow, nestedColumnCount++, prodDetail.getProd_blnc_qty(), cellStyle);
	                }
	            } else {
	                // Add empty cells for nested data if none exist
	                int numberOfNestedColumns = 7;
	                for (int i = 0; i < numberOfNestedColumns; i++) {
	                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	                }
	            }
	        }
	    }
	    //MENAGA
	  //F009
		
		public static ByteArrayResource generateF009Excel(List<GoodsProductChangeOverHistoryF09> summaryF02)
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
				createF007Values(sheet, workbook, summaryF02);

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
			list.add("DATE");
			list.add("SECTION");
//			list.add("TIME");
//			list.add("EQUIPMENT_NAME");
//			list.add("FREQUENCY");

			list.add("MACHINE_NAME");
			list.add("CCP_MAINTAINED_BY");
			list.add("CCP_MAINTAINED_DATE");

			// A. PRODUCT DETAILS - RUNNING PRODUCTION

			list.add("PRODUCT_NAME_1");
			list.add("ORDER_NO_1");
			list.add("LOT_NUMBER_1");
			list.add("SLIVER_WEIGHT_1");
			list.add("PACK_SIZE_1");
			list.add("PDS_NUMBER_1");
			
			// A. PRODUCT DETAILS - CHANGE OVER
			
			list.add("PRODUCT_NAME_2");
			list.add("ORDER_NO_2");
			list.add("LOT_NUMBER_2");
			list.add("SLIVER_WEIGHT_2");
			list.add("PACK_SIZE_2");
			list.add("PDS_NUMBER_2");
			
			// B. REMOVAL OF PACKAGING MATERIAL - REMOVED (Y OR N)
			
			list.add("INNER_BAG");
			list.add("OUTER_BAG");
			list.add("INNER_CARTON");
			list.add("OUTER_CARTON");
			list.add("SILVER_WEIGHT");
			list.add("ROLL_NO");
			
			// B. REMOVAL OF PACKAGING MATERIAL - REMOVE

			list.add("INNER_BAG_REMOVE");
			list.add("OUTER_BAG_REMOVE");
			list.add("INNER_CARTON_REMOVE");
			list.add("OUTER_CARTON_REMOVE");
			list.add("SILVER_WEIGHT_REMOVE");
			list.add("ROLL_NO_REMOVE");
			
			// C. MACHINE SETTINGS

			list.add("TOOL_CHANGE_REQUIRED");
			list.add("TOOL_CHANGE_DONE");
			list.add("MACHINE_SETTING");
			
			// C. MACHINE SETTINGS - REMOVE
			
			list.add("TOOL_CHANGE_REQUIRED_REMOVE");
			list.add("TOOL_CHANGE_DONE_REMOVE");
			list.add("MACHINE_SETTING_REMOVE");
			
			// D. CCP SETTINGS
			
			list.add("METAL_DETECTOR_TEACH");
			list.add("METAL_DETECTOR_CHECK");
			
			// E. PRODUCTION START
			
			list.add("PRODUCTION_CHECK");
			list.add("QUALITY_VERIFICATION");
			
			// E. PRODUCTION START - REMARKS

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

			list.add("REJECT_REASON");
			list.add("VERSION");

			return list;
		}

		private static String createF007Values(Sheet sheet, Workbook workbook,
				List<GoodsProductChangeOverHistoryF09> details) {
			int rowCount = 1;
			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
			CellStyle dateCellStyle = createDateCellStyle(workbook);

			for (GoodsProductChangeOverHistoryF09 history : details) {
				int columnCount = 0;
				Row valueRow = sheet.createRow(rowCount++);

				createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNumber()), cellStyle);
		        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
		        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSection(), cellStyle);
//		        createCell(valueRow, columnCount++, history.getTime(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMachineName(), cellStyle);
		        createCell(valueRow, columnCount++, history.getCcpMaintainedBy(), cellStyle);
		        createCell(valueRow, columnCount++, history.getCcpMaintainedDate(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getProductName1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOrderNo1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getLotNo1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSliverWeight1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPackSize1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPdsNumber1(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getProductName2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOrderNo2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getLotNo2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSliverWeight2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPackSize2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPdsNumber2(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getInnerBag(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOuterBag(), cellStyle);
		        createCell(valueRow, columnCount++, history.getInnerCarton(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOuterCarton(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSilverWeight(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollNo(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getInnerBagRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOuterBagRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getInnerCartonRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOuterCartonRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSilverWeightRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollNoRemove(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getToolChangeRequired(), cellStyle);
		        createCell(valueRow, columnCount++, history.getToolChangeDone(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMachineSetting(), cellStyle);

		        createCell(valueRow, columnCount++, history.getToolChangeRequiredRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getToolChangeDoneRemove(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMachineSettingRemove(), cellStyle);
		        
		        createCell(valueRow, columnCount++, history.getMetalDetectorTeach(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMetalDetectorCheck(), cellStyle);
		        
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

				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
			}

			return "";
		}
		
		
		
		//F013
		
		public static ByteArrayResource generateF013Excel(List<GoodsHandSanitationHistoryF06> details) throws IOException {
		    try (Workbook workbook = new SXSSFWorkbook()) {
		        Sheet sheet = workbook.createSheet("Report");

		        // Create header row
		        Row headerRow = sheet.createRow(0);
		        List<String> headers = getF06TitleLabels();
		        int headerColumnIndex = 0;
		        for (String header : headers) {
		            createCell(headerRow, headerColumnIndex++, header, workbook);
		        }

		        // Populate data
		        createF06Values(sheet, workbook, details);

		        // Write the workbook to a byte array
		        ByteArrayOutputStream baos = new ByteArrayOutputStream();
		        workbook.write(baos);
		        return new ByteArrayResource(baos.toByteArray());
		    }
		}

		private static List<String> getF06TitleLabels() {
		    List<String> list = new ArrayList<>();

		    list.add("FORM NAME");
		    list.add("FORMAT NO");
		    list.add("REVISION NO");
		    list.add("SOP NUMBER");
		    list.add("UNIT");
		    list.add("DATE");
		    list.add("SHIFT");
		    list.add("REASON");
		    list.add("VERSION");

		    // STATUS COLUMNS
		    list.add("OPERATOR STATUS");
		    list.add("OPERATOR SUBMITTED ON");
		    list.add("OPERATOR SUBMITTED BY");
		    list.add("OPERATOR SIGN");

		    list.add("HOD STATUS");
		    list.add("HOD SUBMITTED ON");
		    list.add("HOD SUBMITTED BY");
		    list.add("HOD SIGN");

		    // MANY
		    list.add("SERIAL NUMBER");
		    list.add("NAME");
		    list.add("ID NUMBER");
		    list.add("HOUR 1");
		    list.add("HOUR 2");
		    list.add("HOUR 3");
		    list.add("HOUR 4");
		    list.add("HOUR 5");
		    list.add("HOUR 6");
		    list.add("HOUR 7");
		    list.add("HOUR 8");
		    list.add("REMARKS");

		    return list;
		}

		private static void createF06Values(Sheet sheet, Workbook workbook, List<GoodsHandSanitationHistoryF06> reportHistory) {
		    int rowCount = 1;
		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		    CellStyle dateCellStyle = createDateCellStyle(workbook);

		    for (GoodsHandSanitationHistoryF06 history : reportHistory) {
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
		        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		        createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
				createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

				createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
				createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
				createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

		        int startColumnForNestedData = columnCount;

		        // Nested records
		        if (history.getSanitizationList() != null && !history.getSanitizationList().isEmpty()) {
		            for (GoodsSanitationListHistoryF06 sanitization : history.getSanitizationList()) {
		                Row nestedRow = sheet.createRow(rowCount++);
		                int nestedColumnCount = startColumnForNestedData;

		                // Fill nested data
		                createCell(nestedRow, nestedColumnCount++, String.valueOf(sanitization.getSerialNumber()), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getName(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getIdNumber(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour1(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour2(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour3(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour4(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour5(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour6(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour7(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getHour8(), cellStyle);
		                createCell(nestedRow, nestedColumnCount++, sanitization.getRemarks(), cellStyle);
		            }
		        } else {
		            // Add empty cells for nested data if none exist
		            int numberOfNestedColumns = 12;
		            for (int i = 0; i < numberOfNestedColumns; i++) {
		                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
		            }
		        }
		    }
		}
		
		
//		F014
		
		
		
		public static ByteArrayResource generateF014Excel(List<DryGoodsHouseKeepingCheckListHistoryF14> details) throws IOException {
		    try (Workbook workbook = new SXSSFWorkbook()) {
		        Sheet sheet = workbook.createSheet("Report");

		        // Create header row
		        Row headerRow = sheet.createRow(0);
		        List<String> headers = getF013TitleLabels();
		        int headerColumnIndex = 0;
		        for (String header : headers) {
		            createCell(headerRow, headerColumnIndex++, header, workbook);
		        }

		        // Populate data
		        createF013Values(sheet, workbook, details);

		        // Write the workbook to a byte array
		        ByteArrayOutputStream baos = new ByteArrayOutputStream();
		        workbook.write(baos);
		        return new ByteArrayResource(baos.toByteArray());
		    }
		}


		private static List<String> getF013TitleLabels() {
		    List<String> headers = new ArrayList<>();

//		    headers.add("CLEAN ID");
		    headers.add("UNIT");
		    headers.add("FORMAT NAME");
		    headers.add("FORMAT NO");
		    headers.add("REVISION NO");
		    headers.add("REF SOP NO");
		    headers.add("FREQUENCY");
		    headers.add("DATE");
		    headers.add("MONTH");
		    headers.add("YEAR");
		    headers.add("DEPARTMENT");
		    
		    // Content Fields
		    headers.add("FLOOR CLEANING (DRY)");
		    headers.add("REMOVAL OF UNWANTED MATERIALS");
		    headers.add("SIDE WALL CORNERS");
		    headers.add("DRINKING WATER TANK");
		    headers.add("FLOOR CLEANING (WET)");
		    headers.add("EMERGENCY DOOR");
		    headers.add("FIRE EXTINGUISHERS");
		    headers.add("FIRST AID BOX");
		    headers.add("RAPID DOORS");
		    headers.add("FALSE CEILING");

		    headers.add("REMARKS");
		    headers.add("MAIL STATUS");
		    headers.add("REASON");
		    headers.add("VERSION");

		    // Supervisor Info
		    headers.add("SUPERVISOR STATUS");
		    headers.add("SUPERVISOR SUBMITTED ON");
		    headers.add("SUPERVISOR SUBMITTED BY");
		    headers.add("SUPERVISOR SIGN");

		    // HR Info
		    headers.add("HR SUBMITTED ON");
		    headers.add("HR SUBMITTED BY");
		    headers.add("HR SIGN");
		    headers.add("HR STATUS");
//		    headers.add("HR MAIL STATUS");

		    // HOD Info
		    headers.add("HOD SUBMITTED ON");
		    headers.add("HOD SUBMITTED BY");
		    headers.add("HOD SIGN");
		    headers.add("HOD STATUS");

		    return headers;
		}

		private static void createF013Values(Sheet sheet, Workbook workbook, List<DryGoodsHouseKeepingCheckListHistoryF14> details) {
		    int rowCount = 1;
		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		    CellStyle dateCellStyle = createDateCellStyle(workbook);

		    for (DryGoodsHouseKeepingCheckListHistoryF14 entity : details) {
		        int columnCount = 0;
		        Row valueRow = sheet.createRow(rowCount++);

//		        createCell(valueRow, columnCount++, String.valueOf(entity.getClean_id()), cellStyle);
		        createCell(valueRow, columnCount++, entity.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFormatName(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFormatNo(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(entity.getRevisionNo()), cellStyle);
		        createCell(valueRow, columnCount++, entity.getRefSopNo(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFrequency(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getDate(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getMonth(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getYear(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getDepartment(), cellStyle);
		        
		        createCell(valueRow, columnCount++, entity.getFloor_cleaning_dry(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getRemovel_unwanted_meterials(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getSide_wall_corners(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getDrink_water_tank(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFloor_cleaning_wet(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getEmergency_door(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFire_extinguishers(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFirst_aid_box(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getRapid_doors(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getFalse_ceiling(), cellStyle);

		        createCell(valueRow, columnCount++, entity.getRemarks(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getMail_status(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getReason(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(entity.getVersion()), cellStyle);

		        // Supervisor Info
		        createCell(valueRow, columnCount++, entity.getSupervisor_status(), cellStyle);
		        createDateCell(valueRow, columnCount++, entity.getSupervisor_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, entity.getSupervisor_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getSupervisor_sign(), cellStyle);

		        // HR Info
		        createDateCell(valueRow, columnCount++, entity.getHr_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, entity.getHr_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getHr_sign(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getHr_status(), cellStyle);
//		        createCell(valueRow, columnCount++, entity.getHr_mail_status(), cellStyle);

		        // HOD Info
		        createDateCell(valueRow, columnCount++, entity.getHod_submit_on(), dateCellStyle);
		        createCell(valueRow, columnCount++, entity.getHod_submit_by(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getHod_sign(), cellStyle);
		        createCell(valueRow, columnCount++, entity.getHod_status(), cellStyle);
		    }
		}
		
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
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
