package com.focusr.Precot.util.splunance;

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

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProdPlanHistoryF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionDetailsHistoryF006;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionReportHistoryF006;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyStoppageReportSpunlaceHistoryF008;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterBagConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.LogbookSpunlacePlanningHistoryF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.MachineCleaningRecordHistoryF023;
import com.focusr.Precot.mssql.database.model.splunance.audit.MetalDetectorCheckListHistoryF020;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryF003;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsWinterHistoryF005;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011;
import com.focusr.Precot.mssql.database.model.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdDetailsHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportDetailsHistoryF019;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019;
import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationListHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationReportHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportDetailsHistoryF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportHistoryF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSmsActivitiesHistoryF024;
import com.focusr.Precot.mssql.database.model.splunance.audit.StoppageDetailsHistoryF008;

public class SpunlaceExcelUtill {

	// F01

	public static ByteArrayResource generateF01Excel(
			List<SplunanceBaleConsumptionHistoryF01> splunancebaleconsumptionhistoryf01) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF01Values(sheet, workbook, splunancebaleconsumptionhistoryf01);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");
		list.add("TOTAL AB WEIGHT");
		list.add("TOTAL RP WEIGHT");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SUBMITTED ON");
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

	private static String createF01Values(Sheet sheet, Workbook workbook,
			List<SplunanceBaleConsumptionHistoryF01> splunancebaleconsumptionhistoryf01) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (SplunanceBaleConsumptionHistoryF01 history : splunancebaleconsumptionhistoryf01) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotalABWeight(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotalRpWeight(), cellStyle);

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

		return "";
	}

	// F02-----------------------------------------

	public static ByteArrayResource generateF02Excel(
			List<ProcessSetupVerificationOpeningLineHistoryF002> processsetupverificationopeninglinehistoryf002)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF02TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF02Values(sheet, workbook, processsetupverificationopeninglinehistoryf002);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getF02TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");

		list.add("MIXING");
		list.add("CUSTOMER_NAME");
		list.add("STD_GSM");
		list.add("MATERIAL_CODE");

		list.add("BO_STRIPER_ROLLER_SPEED");
		list.add("BO_SPIKED_LATTICE_SPEED");
		list.add("BO_WIPER_ROLLER_SPEED");
		list.add("BO_TRANSPORT_FAN_SPEED");

		// WBO 1
		list.add("SCALE_SETTING_1");
		list.add("TOTAL_WEIGHT_1");
		list.add("WBO_1_1");
		list.add("WBO_2_1");
		list.add("WBO_STRIPPER_ROLLER_SPEED_1");
		list.add("WBO_SPIKED_LATTICE_SPEED_1");
		list.add("WBO_WIPER_ROLLER_SPEED_1");

		// WBO 2
		list.add("SCALE_SETTING_2");
		list.add("TOTAL_WEIGHT_2");
		list.add("WBO_1_2");
		list.add("WBO_2_2");
		list.add("WBO_STRIPPER_ROLLER_SPEED_2");
		list.add("WBO_SPIKED_LATTICE_SPEED_2");
		list.add("WBO_WIPER_ROLLER_SPEED_2");

		list.add("CMO_FEED_ROLLER_SPEED");
		list.add("TRANSPORT_FAN_SPEED");

		// FINE OPENER REITER
		list.add("FEED_ROLLER_SPEED_FOR");
		list.add("TRANSPORT_FAN_SPEED_FOR");

		// FINE OPENER ALC 01
		list.add("FEED_ROLLER_SPEED_FOA");
		list.add("TRANSPORT_FAN_SPEED_FOA");

		// PRE-OPENER - REITER
		list.add("FEED_ROLLER_SPEED_POR");
		list.add("TRANSPORT_FAN_SPEED_POR");

		// PRE-OPENER-ALC
		list.add("FEED_ROLLER_SPEED_POA");
		list.add("TRANSPORT_FAN_SPEED_POA");

		// REITER CARDING
		list.add("REITER_CHUTE_FEED_ROLLER_SPEED");
		list.add("FEED_ROLLER_SPEED_RC");
		list.add("LICKER_IN_SPEED");
		list.add("FLAT_SPEED");
		list.add("CONDENSER_ROLLER_SPEED");
		list.add("REITER_CARD_1_DELIVERY_SPEED");

		// AIR LAY CARDING
		list.add("ALC_TOP_CHUTE_PRESSURE");
		list.add("ALC_BOTTOM_CHUTE_PRESSURE");
		list.add("ALC_FEED_ROLLER_SPEED");
		list.add("ALC_K1_ROLLER_SPEED");
		list.add("ALC_K2_ROLLER_SPEED");
		list.add("ALC_K3_ROLLER_SPEED");
		list.add("TURBO_ROLLER_SPEED");
		list.add("PRESS_ROLLER_SPEED");
		list.add("MESH_BELT_SPEED");
		list.add("COLLECTING_BELT_SPEED");

		// FINE OPENER ALC 02
		list.add("FEED_ROLLER_SPEED_FOA_2");
		list.add("TRANSPORT_FAN_SPEED_FOA_2");

		// PRE-OPENER - REITER
		list.add("FEED_ROLLER_SPEED_POR_2");
		list.add("TRANSPORT_FAN_SPEED_POR_2");

		// PRE-OPENER-ALC
		list.add("FEED_ROLLER_SPEED_POA_2");
		list.add("TRANSPORT_FAN_SPEED_POA_2");

		// REITER CARDING
		list.add("REITER_CHUTE_FEED_ROLLER_SPEED_2");
		list.add("FEED_ROLLER_SPEED_RC_2");
		list.add("LICKER_IN_SPEED_2");
		list.add("FLAT_SPEED_2");
		list.add("CONDENSER_ROLLER_SPEED_2");
		list.add("REITER_CARD_1_DELIVERY_SPEED_2");

		// AIR LAY CARDING
		list.add("ALC_TOP_CHUTE_PRESSURE_2");
		list.add("ALC_BOTTOM_CHUTE_PRESSURE_2");
		list.add("ALC_FEED_ROLLER_SPEED_2");
		list.add("ALC_K1_ROLLER_SPEED_2");
		list.add("ALC_K2_ROLLER_SPEED_2");
		list.add("ALC_K3_ROLLER_SPEED_2");
		list.add("TURBO_ROLLER_SPEED_2");
		list.add("PRESS_ROLLER_SPEED_2");
		list.add("MESH_BELT_SPEED_2");
		list.add("COLLECTING_BELT_SPEED_2");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SUBMITTED ON");
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

	private static String createF02Values(Sheet sheet, Workbook workbook,
			List<ProcessSetupVerificationOpeningLineHistoryF002> processsetupverificationopeninglinehistoryf002) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (ProcessSetupVerificationOpeningLineHistoryF002 history : processsetupverificationopeninglinehistoryf002) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);

			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer_name(), cellStyle);
			createCell(valueRow, columnCount++, history.getStd_gsm(), cellStyle);
			createCell(valueRow, columnCount++, history.getMaterial_code(), cellStyle);

			createCell(valueRow, columnCount++, history.getBo_striper_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getBo_spiked_lattice_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getBo_wiper_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getBo_transport_fan_speed(), cellStyle);

			// WBO 1
			createCell(valueRow, columnCount++, history.getScale_setting_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_weight_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_1_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_2_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_stripper_roller_speed_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_spiked_lattice_speed_1(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_wiper_roller_speed_1(), cellStyle);

			// WBO 2
			createCell(valueRow, columnCount++, history.getScale_setting_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotal_weight_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_1_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_2_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_stripper_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_spiked_lattice_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getWbo_wiper_roller_speed_2(), cellStyle);

			// More fields from the entity
			createCell(valueRow, columnCount++, history.getCmo_feed_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed(), cellStyle);

			// FINE OPENER REITER
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_for(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_for(), cellStyle);

			// FINE OPENER ALC 01
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_foa(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_foa(), cellStyle);

			// PRE-OPENER - RETIER
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_por(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_por(), cellStyle);

			// PRE-OPENER-ALC
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_poa(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_poa(), cellStyle);

			// REITER CARDING
			createCell(valueRow, columnCount++, history.getReiter_chute_feed_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_rc(), cellStyle);
			createCell(valueRow, columnCount++, history.getLicker_in_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getFlat_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getCondenser_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getReiter_card_1_delivery_speed(), cellStyle);

			// AIR LAY CARDING
			createCell(valueRow, columnCount++, history.getAlc_top_chute_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_bottom_chute_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_feed_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k1_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k2_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k3_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getTurbo_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getPress_roller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getMesh_belt_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getCollecting_belt_speed(), cellStyle);

			// FINE OPENER ALC 02
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_foa_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_foa_2(), cellStyle);

			// PRE-OPENER - RETIER
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_por_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_por_2(), cellStyle);

			// PRE-OPENER-ALC
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_poa_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getTransport_fan_speed_poa_2(), cellStyle);

			// REITER CARDING
			createCell(valueRow, columnCount++, history.getReiter_chute_feed_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getFeed_roller_speed_rc_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getLicker_in_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getFlat_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getCondenser_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getReiter_card_1_delivery_speed_2(), cellStyle);

			// AIR LAY CARDING
			createCell(valueRow, columnCount++, history.getAlc_top_chute_pressure_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_bottom_chute_pressure_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_feed_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k1_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k2_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlc_k3_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getTurbo_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getPress_roller_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getMesh_belt_speed_2(), cellStyle);
			createCell(valueRow, columnCount++, history.getCollecting_belt_speed_2(), cellStyle);

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

		return "";
	}
//F03--------------

	public static ByteArrayResource generateF03Excel(
			List<ProcessSetupDetailsJetlaceAndDryerHistoryF003> processsetupdetailsjetlaceanddryerhistoryf003)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF03TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF03Values(sheet, workbook, processsetupdetailsjetlaceanddryerhistoryf003);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getF03TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");

		list.add("MIXING");
		list.add("CUSTOMER_NAME");
		list.add("STD_GSM");

		list.add("WIDTH");
		list.add("PATTERN");
		list.add("MOISTURE");
		list.add("THICKNESS");

		list.add("J1_CONVEYOR_SPEED");
		list.add("JP_CONVEYOR_SPEED");
		list.add("INJ_PW_PRESSURE");
		list.add("INJ_01_PRESSURE");
		list.add("INJ_IPA_PRESSURE");
		list.add("INJ_11_PRESSURE");
		list.add("INJ_12_PRESSURE");
		list.add("INJ_21_PRESSURE");
		list.add("INJ_PW_STRIP");
		list.add("VACUUM");
		list.add("INJ_01_STRIP_SPECIFICATION");
		list.add("INJ_IPA_STRIP_SPECIFICATION");
		list.add("INJ_11_STRIP_SPECIFICATION");
		list.add("INJ_12_STRIP_SPECIFICATION");
		list.add("INJ_21_STRIP_SPECIFICATION");
		list.add("CPA_DRUM_SPEED");
		list.add("C1_DRUM_SPEED");
		list.add("C2_DRUM_SPEED");
		list.add("J2S_CONVEYER_SPEED");

		list.add("MDU_TENSION_DRAFT_A");
		list.add("MDL_TENSION_DRAFT_A");
		list.add("MDL_SPEED_A");
		list.add("MDU_SPEED_A");
		list.add("TTU_A");
		list.add("TTL_A");
		list.add("MFU_SPEED_A");
		list.add("MFL_SPEED_A");
		list.add("TOP_DAMPER_INLET_A");
		list.add("TOP_DAMPER_OUTLET_A");
		list.add("BOTTOM_DAMPER_INLET_A");
		list.add("BOTTOM_DAMPER_OUTLET_A");
		list.add("BOILER_TEMPERATURE_A");

		list.add("MDU_TENSION_DRAFT_B");
		list.add("MDL_TENSION_DRAFT_B");
		list.add("MDL_SPEED_B");
		list.add("MDU_SPEED_B");
		list.add("TTU_B");
		list.add("TTL_B");
		list.add("MFU_SPEED_B");
		list.add("MFL_SPEED_B");
		list.add("TOP_DAMPER_INLET_B");
		list.add("TOP_DAMPER_OUTLET_B");
		list.add("BOTTOM_DAMPER_INLET_B");
		list.add("BOTTOM_DAMPER_OUTLET_B");
		list.add("BOILER_TEMPERATURE_B");

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

	private static String createF03Values(Sheet sheet, Workbook workbook,
			List<ProcessSetupDetailsJetlaceAndDryerHistoryF003> processsetupdetailsjetlaceanddryerhistoryf003) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (ProcessSetupDetailsJetlaceAndDryerHistoryF003 history : processsetupdetailsjetlaceanddryerhistoryf003) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);

			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomer_name(), cellStyle);
			createCell(valueRow, columnCount++, history.getStd_gsm(), cellStyle);

			createCell(valueRow, columnCount++, history.getWidth(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getMoisture(), cellStyle);
			createCell(valueRow, columnCount++, history.getThickness(), cellStyle);

			createCell(valueRow, columnCount++, history.getJ1_conveyor_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getJp_conveyor_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_pw_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_01_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_ipa_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_11_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_12_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_21_pressure(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_pw_strip(), cellStyle);
			createCell(valueRow, columnCount++, history.getVaccum(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_01_strip_specification(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_ipa_strip_specification(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_11_strip_specification(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_12_strip_specification(), cellStyle);
			createCell(valueRow, columnCount++, history.getInj_21_strip_specification(), cellStyle);
			createCell(valueRow, columnCount++, history.getCpa_drum_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getC1_drum_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getC2_drum_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getJ2s_conveyer_speed(), cellStyle);

			createCell(valueRow, columnCount++, history.getMdu_tension_draft_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdl_tension_draft_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdl_speed_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdu_speed_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getTtu_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getTtl_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getMfu_speed_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getMfl_speed_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getTop_damper_inlet_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getTop_damper_outlet_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getBottom_damper_inlet_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getBottom_damper_outlet_a(), cellStyle);
			createCell(valueRow, columnCount++, history.getBoiler_temperature_a(), cellStyle);

			createCell(valueRow, columnCount++, history.getMdu_tension_draft_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdl_tension_draft_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdl_speed_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getMdu_speed_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getTtu_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getTtl_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getMfu_speed_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getMfl_speed_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getTop_damper_inlet_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getTop_damper_outlet_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getBottom_damper_inlet_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getBottom_damper_outlet_b(), cellStyle);
			createCell(valueRow, columnCount++, history.getBoiler_temperature_b(), cellStyle);

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

		return "";
	}

	/// F04-------------

	public static ByteArrayResource generateF04Excel(
			List<FilterBagConsumptionDetailsHistoryF004> filterbagconsumptiondetailshistoryf004) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get04TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF04Values(sheet, workbook, filterbagconsumptiondetailshistoryf004);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get04TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SUBMITTED ON");
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
		list.add("TIME");
		list.add("NO_OF_BAGS");
		list.add("F1");
		list.add("F2");
		list.add("F3");
		list.add("F4");

		return list;
	}

	private static String createF04Values(Sheet sheet, Workbook workbook,
			List<FilterBagConsumptionDetailsHistoryF004> filterbagconsumptiondetailshistoryf004) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (FilterBagConsumptionDetailsHistoryF004 history : filterbagconsumptiondetailshistoryf004) {
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

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle);
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

			int startColumnForNestedData = columnCount;

			// Nested records
			if (history.getDetails() != null && !history.getDetails().isEmpty()) {
				for (FilterConsumptionDetailsHistoryF004 details : history.getDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, details.getTime(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getNoOfBags()), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getF1(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getF2(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getF3(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getF4(), cellStyle);
				}
			} else {
				// Add empty cells for nested data if none exist
				int numberOfNestedColumns = 6;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}
//F05

	public static ByteArrayResource generateF05Excel(
			List<ProcessSetupDetailsWinterHistoryF005> processsetupdetailswinterhistoryf005) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF05TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF05Values(sheet, workbook, processsetupdetailswinterhistoryf005);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	// Method to get the list of titles for the F05 report
	private static List<String> getF05TitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("UNIT");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");

		list.add("MIXING");
		list.add("PRODUCT_NAME");
		list.add("SDT_GSM");
		list.add("WIDTH");
		list.add("PATTERN");
		list.add("MOISTURT");
		list.add("THICKNESS");
		list.add("LINE_SPEED");
		list.add("ROLLER_SPEED");
		list.add("LINE_DRAW");
		list.add("GROUP_SPEED");
		list.add("WIND_GRP_DRAW");
		list.add("WIND_ARMS_PRESSUER");
		list.add("SROLLS_WINDER_DRAW");
		list.add("TENSION");
		list.add("TAPER_ON");
		list.add("TENS_PER_CUT");
		list.add("TENS_POST_CUT");
		list.add("LENGTH");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SUBMITTED ON");
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

	private static String createF05Values(Sheet sheet, Workbook workbook,
			List<ProcessSetupDetailsWinterHistoryF005> processSetupDetailsWinterHistoryF005List) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (ProcessSetupDetailsWinterHistoryF005 history : processSetupDetailsWinterHistoryF005List) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormat_name(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getRevision_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);

			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getProduct_name(), cellStyle);
			createCell(valueRow, columnCount++, history.getSdt_gsm(), cellStyle);
			createCell(valueRow, columnCount++, history.getWidth(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getMoisturt(), cellStyle);
			createCell(valueRow, columnCount++, history.getThickness(), cellStyle);
			createCell(valueRow, columnCount++, history.getLine_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getRoller_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getLine_draw(), cellStyle);
			createCell(valueRow, columnCount++, history.getGroup_speed(), cellStyle);
			createCell(valueRow, columnCount++, history.getWind_grp_draw(), cellStyle);
			createCell(valueRow, columnCount++, history.getWind_arms_pressuer(), cellStyle);
			createCell(valueRow, columnCount++, history.getSrolls_winder_draw(), cellStyle);
			createCell(valueRow, columnCount++, history.getTension(), cellStyle);
			createCell(valueRow, columnCount++, history.getTaper_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getTens_per_cut(), cellStyle);
			createCell(valueRow, columnCount++, history.getTens_post_cut(), cellStyle);
			createCell(valueRow, columnCount++, history.getLength(), cellStyle);

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

		return "";
	}

	// F06

	public static ByteArrayResource generateF06Excel(
			List<DailyProductionReportHistoryF006> dailyproductionreporthistoryf006) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get06TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF06Values(sheet, workbook, dailyproductionreporthistoryf006);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get06TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("SHIFT");

		// ADDITIONAL FIELDS
		list.add("ORDER NO");
		list.add("STD WIDTH");
		list.add("STD GSM");
		list.add("MIXING");
		list.add("PRODUCT NAME");
		list.add("STD ROLL DIA");
		list.add("MATERIAL CODE");
		list.add("PATTERN");
		list.add("STD THICKNESS");

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
		list.add("SHAFT NO");
		list.add("ROLL NO");
		list.add("LENGTH");
		list.add("WIDTH");
		list.add("NET WT");
		list.add("ROLL GSM");
		list.add("MOISTURE");
		list.add("ROLL DIA");
		list.add("REMARKS");

		return list;
	}

	private static String createF06Values(Sheet sheet, Workbook workbook,
			List<DailyProductionReportHistoryF006> dailyProductionReportHistoryF006List) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DailyProductionReportHistoryF006 history : dailyProductionReportHistoryF006List) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);

			createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdWidth(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdGsm(), cellStyle);
			createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdRollDia(), cellStyle);
			createCell(valueRow, columnCount++, history.getMaterialCode(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdThickness(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle);
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

			int startColumnForNestedData = columnCount;

			if (history.getReportDetails() != null && !history.getReportDetails().isEmpty()) {
				for (DailyProductionDetailsHistoryF006 details : history.getReportDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, details.getShaftNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRollNo(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLength(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getWidth(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getNetWt(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRollGsm(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMoisture(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRollDia(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
				}
			} else {
				int numberOfNestedColumns = 9;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	// F07

	public static ByteArrayResource generateF07Excel(
			List<DailyRejectionReportHistoryF007> dailyrejectionreporthistoryf007) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = generateF07Excel();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF07Values(sheet, workbook, dailyrejectionreporthistoryf007);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	// Method to get the list of titles for the F05 report
	private static List<String> generateF07Excel() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("UNIT");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");

		// STATUS COLUMNS
		list.add("OPERATOR STATUS");
		list.add("OPERATOR SUBMITTED BY");
		list.add("OPERATOR SUBMITTED ON");
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

	private static String createF07Values(Sheet sheet, Workbook workbook,
			List<DailyRejectionReportHistoryF007> dailyrejectionreporthistoryf007) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DailyRejectionReportHistoryF007 history : dailyrejectionreporthistoryf007) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);

			createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle);
			createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle);
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

		return "";
	}

	// F08

	public static ByteArrayResource generateF08Excel(
			List<DailyStoppageReportSpunlaceHistoryF008> dailystoppagereportspunlacehistoryf008) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get08TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF08Values(sheet, workbook, dailystoppagereportspunlacehistoryf008);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get08TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");

		// ADDITIONAL FIELDS
		list.add("PRODUCT_SUM");
		list.add("LC_SUM");
		list.add("STRIP_CLEAN_SUM");
		list.add("GR_CLEAN_SUM");
		list.add("MIS_SUM");
		list.add("OTHERS_SUM");
		list.add("DOWNTIME_TOTAL_SUM");
		list.add("ER_SUM");
		list.add("MR_SUM");
		list.add("BREAKDOWN_TOTAL_SUM");

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
		list.add("SHIFT");
		list.add("PRODUCT_NAME");
		list.add("ORDER_NUMBER");
		list.add("PRODUCT_IN_KG");
		list.add("LC");
		list.add("STRIP_CLEAN");
		list.add("GR_CLEAN");
		list.add("MIS");
		list.add("OTHERS");
		list.add("DOWNTIME_TOTAL");
		list.add("ER");
		list.add("MR");
		list.add("BREAKDOWN_TOTAL");

		return list;
	}

	private static String createF08Values(Sheet sheet, Workbook workbook,
			List<DailyStoppageReportSpunlaceHistoryF008> dailystoppagereportspunlacehistoryf008) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (DailyStoppageReportSpunlaceHistoryF008 history : dailystoppagereportspunlacehistoryf008) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);

			createCell(valueRow, columnCount++, history.getProduct_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getLc_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getStrip_clean_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getGr_clean_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getMis_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getOthers_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getDowntime_total_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getEr_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getMr_sum(), cellStyle);
			createCell(valueRow, columnCount++, history.getBreakdown_total_sum(), cellStyle);

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

			if (history.getStoppageDetails() != null && !history.getStoppageDetails().isEmpty()) {
				for (StoppageDetailsHistoryF008 details : history.getStoppageDetails()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, details.getShift(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct_name(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getOrder_number(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getProduct_in_kg(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getLc(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getStrip_clean(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getGr_clean(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMis(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getOthers(), cellStyle);

					createCell(nestedRow, nestedColumnCount++, details.getDowntime_total(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getEr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getMr(), cellStyle);
					createCell(nestedRow, nestedColumnCount++, details.getBreakdown_total(), cellStyle);
				}
			} else {
				int numberOfNestedColumns = 13;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}
	
	
	
	//F09
	
	public static ByteArrayResource generateF09Excel(
			List<SpunlaceGsmAnalysisReportHistoryF009> spunlacegsmanalysisreporthistoryf009) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = generateF09Excel();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF09Values(sheet, workbook, spunlacegsmanalysisreporthistoryf009);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	// Method to get the list of titles for the F05 report
	private static List<String> generateF09Excel() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("UNIT");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("DATE");
		list.add("SHIFT");
		list.add("ORDER NUMBER");
		
		list.add("PRODUCT_NAME");
		list.add("MIXING");
		list.add("MATERIAL_CODE");
		list.add("STD_GSM");
		list.add("STD_MOISTURE");
		list.add("PATTERN");
		
		
		

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

	private static String createF09Values(Sheet sheet, Workbook workbook,
			List<SpunlaceGsmAnalysisReportHistoryF009> spunlacegsmanalysisreporthistoryf009) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (SpunlaceGsmAnalysisReportHistoryF009 history : spunlacegsmanalysisreporthistoryf009) {
			int columnCount = 0;
			Row valueRow = sheet.createRow(rowCount++);

			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getShift(), cellStyle);
			createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);
			
			//
			
			createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
			createCell(valueRow, columnCount++, history.getMaterialCode(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdGsm(), cellStyle);
			createCell(valueRow, columnCount++, history.getStdMoisture(), cellStyle);
			createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
			
			//

			
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
	
	//F10
	
	
	public static ByteArrayResource generateF10Excel(
			List<LogbookSpunlacePlanningHistoryF010> logbookspunlaceplanninghistoryf010) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get10TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF10Values(sheet, workbook, logbookspunlaceplanninghistoryf010);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get10TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Basic fields
	    list.add("FORM NAME");
	    list.add("FORMAT NO");
	    list.add("REVISION NO");
	    list.add("SOP NUMBER");
	    list.add("UNIT");
	    list.add("DATE");

	    // Additional fields
	    list.add("SPECIAL INSTRUCTION");

	    // Spunlace-MP
	    list.add("SPUNLACE STD PH");
	    list.add("SPUNLACE STD OTHER");
	    list.add("SPUNLACE PH 1SHIFT");
	    list.add("SPUNLACE OTHER 1SHIFT");
	    list.add("SPUNLACE PH 2SHIFT");
	    list.add("SPUNLACE OTHER 2SHIFT");
	    list.add("SPUNLACE PH 3SHIFT");
	    list.add("SPUNLACE OTHER 3SHIFT");
	    list.add("SPUNLACE PH GEN SHIFT");
	    list.add("SPUNLACE OTHER GEN SHIFT");

	    // RP_BalePress - MP
	    list.add("RP BALEPRESS STD PH");
	    list.add("RP BALEPRESS STD OTHER");
	    list.add("RP BALEPRESS PH 1SHIFT");
	    list.add("RP BALEPRESS OTHER 1SHIFT");
	    list.add("RP BALEPRESS PH 2SHIFT");
	    list.add("RP BALEPRESSE OTHER 2SHIFT");
	    list.add("RP BALEPRESS PH 3SHIFT");
	    list.add("RP BALEPRESS OTHER 3SHIFT");
	    list.add("RP BALEPRESS PH GEN SHIFT");
	    list.add("RP BALEPRESS OTHER GEN SHIFT");

	    // SliterWinder-MP
	    list.add("SLITERWINDER STD PH");
	    list.add("SLITERWINDER STD OTHER");
	    list.add("SLITERWINDER PH 1SHIFT");
	    list.add("SLITERWINDER OTHER 1SHIFT");
	    list.add("SLITERWINDER PH 2SHIFT");
	    list.add("SLITERWINDER OTHER 2SHIFT");
	    list.add("SLITERWINDER PH 3SHIFT");
	    list.add("SLITERWINDER OTHER 3SHIFT");
	    list.add("SLITERWINDER PH GEN SHIFT");
	    list.add("SLITERWINDER OTHER GEN SHIFT");

	    // Total
	    list.add("TOTAL STD PH");
	    list.add("TOTAL STD OTHER");
	    list.add("TOTAL PH 1SHIFT");
	    list.add("TOTAL OTHER 1SHIFT");
	    list.add("TOTAL PH 2SHIFT");
	    list.add("TOTAL OTHER 2SHIFT");
	    list.add("TOTAL PH 3SHIFT");
	    list.add("TOTAL OTHER 3SHIFT");
	    list.add("TOTAL PH GEN SHIFT");
	    list.add("TOTAL OTHER GEN SHIFT");

	    // Status columns
	    list.add("SUPERVISOR STATUS");
	    list.add("SUPERVISOR SUBMITTED ON");
	    list.add("SUPERVISOR SUBMITTED BY");
	    list.add("SUPERVISOR SIGN");

	    list.add("HOD STATUS");
	    list.add("HOD SUBMITTED ON");
	    list.add("HOD SUBMITTED BY");
	    list.add("HOD SIGN");

	    // Other fields
	    list.add("REASON");
	    list.add("VERSION");

	    // Many
	    list.add("PRODUCT NAME");
	    list.add("MIXING");
	    list.add("PLANNED PROD KG");
	    list.add("GSM");
	    list.add("WIDTH");
	    list.add("THICKNESS");
	    list.add("MOISTURE");
	    list.add("PATTERN");
	    list.add("REMARKS");

	    return list;
	}


	private static String createF10Values(Sheet sheet, Workbook workbook,
	        List<LogbookSpunlacePlanningHistoryF010> logbookspunlaceplanninghistoryf010) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    // Set column titles
	    List<String> titles = get10TitleLabels();
	    Row headerRow = sheet.createRow(0);
	    for (int i = 0; i < titles.size(); i++) {
	        createCell(headerRow, i, titles.get(i), cellStyle);
	    }

	    // Populate data
	    for (LogbookSpunlacePlanningHistoryF010 history : logbookspunlaceplanninghistoryf010) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        
	        // Additional fields
	        
	        createCell(valueRow, columnCount++, history.getSplInstruction(), cellStyle);

	        // Spunlace-MP
	        createCell(valueRow, columnCount++, history.getSpunlace_stdPh(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_stdOther(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_ph_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_Other_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_ph_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_Other_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_ph_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_Other_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_ph_GS(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpunlace_Other_GS(), cellStyle);

	        // RP_BalePress - MP
	        createCell(valueRow, columnCount++, history.getRpBale_stdPh(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_stdOther(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_ph_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_Other_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_ph_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_Other_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_ph_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_Other_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_ph_GS(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRpBale_Other_GS(), cellStyle);

	        // SliterWinder-MP
	        createCell(valueRow, columnCount++, history.getSliterWinder_stdPh(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_stdOther(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_ph_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_Other_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_ph_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_Other_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_ph_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_Other_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_ph_GS(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSliterWinder_Other_GS(), cellStyle);

	        // Total
	        createCell(valueRow, columnCount++, history.getTotal_stdPh(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_stdOther(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_ph_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_Other_1S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_ph_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_Other_2S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_ph_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_Other_3S(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_ph_GS(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTotal_Other_GS(), cellStyle);

	        // Status columns
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

	        if (history.getProdPlanDetails() != null && !history.getProdPlanDetails().isEmpty()) {
	            for (DailyProdPlanHistoryF010 details : history.getProdPlanDetails()) {
	                Row nestedRow = sheet.createRow(rowCount++);
	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data
	                createCell(nestedRow, nestedColumnCount++, details.getProdName(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getMixing(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getPlannedProdKG(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getGsm(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getWidth(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getThickness(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getMoisture(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getPattern(), cellStyle);
	                createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 9;
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }

	    return "";
	}


	//KAVIYA(F11)
	
	// F011
		public static ByteArrayResource generateF011Excel(
		        List<ProductChangeOverCheckListSpunlaceHistoryF011> productChangeOverCheckListSpunlaceHistoryF011)
		        throws IOException {
//		    Logger logger = Logger.getLogger("GenerateF011Excel");

		    try (Workbook workbook = new SXSSFWorkbook()) {
		        Sheet sheet = workbook.createSheet("Report");

		        // Create header row
		        Row headerRow = sheet.createRow(0);
		        List<String> headers = getF011TitleLabels();
		        int headerColumnIndex = 0;
		        for (String header : headers) {
		            createCell(headerRow, headerColumnIndex++, header, workbook);
		        }

		        // Log header creation
		        System.out.println("Headers created: " + headers.toString());

		        // Populate data
		        createF011Values(sheet, workbook, productChangeOverCheckListSpunlaceHistoryF011);

		        // Write the workbook to a byte array
		        ByteArrayOutputStream baos = new ByteArrayOutputStream();
		        workbook.write(baos);

		        // Log byte array size
		        System.out.println("Generated Excel byte array size: " + baos.size());

		        return new ByteArrayResource(baos.toByteArray());
		    } catch (IOException e) {
		    	 System.out.println("IOException occurred: " + e.getMessage());
		        throw e;
		    } catch (Exception e) {
		    	 System.out.println("Unexpected exception occurred: " + e.getMessage());
		        throw new RuntimeException("Failed to generate report", e);
		    }
		}

		private static List<String> getF011TitleLabels() {
		    List<String> list = new ArrayList<>();

		    list.add("FORMAT NAME");
		    list.add("FORMAT NO");
		    list.add("REVISION NO");
		    list.add("REF SOP NO");
		    list.add("UNIT");
		    list.add("DATE");
		    list.add("SHIFT");
		    list.add("ORDER NO FROM");
		    list.add("ORDER NO TO");
		    list.add("SHAFT NUMBER");
		    list.add("PRODUCT NAME");
		    list.add("MIXING FROM");
		    list.add("MIXING TO");
		    list.add("ROLL NUMBER");

		    // For Organic
		    list.add("MACHINE CLEANED THOROUGHLY");
		    list.add("SETTING AND PARAMETERS CHANGED");
		    list.add("MATERIAL MIXING CHANGED");
		    list.add("TRIAL ROLL TAKEN QC APPROVAL");
		    list.add("QC CHECKED APPROVAL TRIAL RUN");

		    // QC REPORT
		    list.add("QC CD");
		    list.add("QC MD");
		    list.add("QC GSM");
		    list.add("QC MOISTURE");
		    list.add("QC THICKNESS");

		    // Spunlace std Operating Param
		    list.add("PRODUCT NAME OP");
		    list.add("PATTERN TOP OP");
		    list.add("PATTERN BOTTOM OP");
		    list.add("NO OF ROLLS WIDTH OP");
		    list.add("GSM OP");
		    list.add("MOISTURE OP");
		    list.add("ROLL NET WT OP");
		    list.add("ROLL DIA OP");
		    list.add("ROLL LENGTH OP");

		    list.add("MATERIAL BO");
		    list.add("MATERIAL WBO1");
		    list.add("MATERIAL WBO2");

		    list.add("PERCENTAGE BO");
		    list.add("PERCENTAGE WBO1");
		    list.add("PERCENTAGE WBO2");

		    list.add("ALC1 GSM");
		    list.add("ALC2 GSM");
		    list.add("RC601 GSM");
		    list.add("RC602 GSM");

		    // Jetlace
		    list.add("JETLACE VACUUM STD");
		    list.add("JETLACE PW STD");
		    list.add("JETLACE INJ01 STD");
		    list.add("JETLACE IPA STD");
		    list.add("JETLACE INJ11 STD");
		    list.add("JETLACE INJ12 STD");
		    list.add("JETLACE INJ21 STD");
		    
		    // Add other Jetlace fields here

		    list.add("JETLACE VACUUM SET");
		    list.add("JETLACE PW SET");
		    list.add("JETLACE INJ01 SET");
		    list.add("JETLACE IPA SET");
		    list.add("JETLACE INJ11 SET");
		    list.add("JETLACE INJ12 SET");
		    list.add("JETLACE INJ21 SET");
		    
		    list.add("REMARKS");
		    // Status Columns
		  

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

		private static String createF011Values(Sheet sheet, Workbook workbook,
		        List<ProductChangeOverCheckListSpunlaceHistoryF011> productChangeOverCheckListSpunlaceHistoryF011) {
		    int rowCount = 1;
		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		    CellStyle dateCellStyle = createDateCellStyle(workbook);

		    for (ProductChangeOverCheckListSpunlaceHistoryF011 history : productChangeOverCheckListSpunlaceHistoryF011) {
		        int columnCount = 0;
		        Row valueRow = sheet.createRow(rowCount++);

		        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOrderNoFrom(), cellStyle);
		        createCell(valueRow, columnCount++, history.getOrderNoTo(), cellStyle);
		        createCell(valueRow, columnCount++, history.getShaftNumber(), cellStyle);
		        createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMixingFrom(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMixingTo(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollNumber(), cellStyle);

		        createCell(valueRow, columnCount++, history.getMachineCleanedThoroughly(), cellStyle);
		        createCell(valueRow, columnCount++, history.getSettingAndParametersChanged(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMaterialMixingChanged(), cellStyle);
		        createCell(valueRow, columnCount++, history.getTrialRollTakenQcApproval(), cellStyle);
		        createCell(valueRow, columnCount++, history.getQcCheckedApprovalTrialRun(), cellStyle);

		        createCell(valueRow, columnCount++, history.getQcCd(), cellStyle);
		        createCell(valueRow, columnCount++, history.getQcMd(), cellStyle);
		        createCell(valueRow, columnCount++, history.getQcGsm(), cellStyle);
		        createCell(valueRow, columnCount++, history.getQcMoisture(), cellStyle);
		        createCell(valueRow, columnCount++, history.getQcThickness(), cellStyle);

		        createCell(valueRow, columnCount++, history.getProductNameOperatingParam(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPatternTop(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPatternBottom(), cellStyle);
		        createCell(valueRow, columnCount++, history.getNoOfRollsWidth(), cellStyle);
		        createCell(valueRow, columnCount++, history.getGsmOperatingParam(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMoisture(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollNetWt(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollDia(), cellStyle);
		        createCell(valueRow, columnCount++, history.getRollLength(), cellStyle);

		        createCell(valueRow, columnCount++, history.getMaterialBO(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMaterialWBO1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getMaterialWBO2(), cellStyle);

		        createCell(valueRow, columnCount++, history.getPercentageBO(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPercentageWBO1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getPercentageWBO2(), cellStyle);

		        createCell(valueRow, columnCount++, history.getGsmAlc1(), cellStyle);
		        createCell(valueRow, columnCount++, history.getGsmAlc2(), cellStyle);
		        createCell(valueRow, columnCount++, history.getGsmRc601(), cellStyle);
		        createCell(valueRow, columnCount++, history.getGsmRc602(), cellStyle);

		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceVacuumStd()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlacePwStd()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj01Std()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceIpaStd()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj11Std()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj12Std()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj21Std()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceVacuumSet()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlacePwSet()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj01Set()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceIpaSet()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj11Set()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj12Set()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(history.getJetlaceInj21Set()), cellStyle);
		        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

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

		    return " ";
		}

		//F013
		public static ByteArrayResource generateF013Excel(
		        List<ProcessSetupVerificationRpBalePressHistoryF013> processSetupVerificationList)
		        throws IOException {

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
		        createF013Values(sheet, workbook, processSetupVerificationList);

		        // Write the workbook to a byte array
		        ByteArrayOutputStream baos = new ByteArrayOutputStream();
		        workbook.write(baos);

		        return new ByteArrayResource(baos.toByteArray());
		    } catch (IOException e) {
		        throw new IOException("IOException occurred while generating the Excel report: " + e.getMessage(), e);
		    } catch (Exception e) {
		        throw new RuntimeException("Failed to generate the Excel report: " + e.getMessage(), e);
		    }
		}

		private static List<String> getF013TitleLabels() {
		    List<String> list = new ArrayList<>();

		    list.add("FORMAT NAME");
		    list.add("FORMAT NO");
		    list.add("REVISION NO");
		    list.add("REF SOP NO");
		    list.add("UNIT");
		    list.add("DATE");
		    list.add("SHIFT");
		    list.add("ORDER NO");
		    list.add("NO OF TWIST WITH NEEDLES");
		    list.add("NO OF TWIST WITHOUT NEEDLES");
		    list.add("ACTUAL NO OF TWIST");
		    list.add("LENGTH OF BALE");
		    list.add("ACTUAL LENGTH OF BALE");
		    
		    // Setting press
		    list.add("PRESSURE PRESS PLATE");
		    list.add("PRESSURE COMPENSATOR");
		    list.add("DE PRESSURIZED PRESS PLATE");
		    list.add("TIME OUT MOTOR");
		    list.add("ODT FILL LEVEL");
		    list.add("ODT HIGH LEVEL");
		    
		    // Hopper setting
		    list.add("BEATER SPEED");
		    list.add("FEED ROLLER SPEED");
		    list.add("TRANSPORT FAN SPEED");

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

		private static void createF013Values(Sheet sheet, Workbook workbook,
		        List<ProcessSetupVerificationRpBalePressHistoryF013> processSetupVerificationList) {
		    int rowCount = 1;
		    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		    CellStyle dateCellStyle = createDateCellStyle(workbook);
		    for (ProcessSetupVerificationRpBalePressHistoryF013 verification : processSetupVerificationList) {
		        int columnCount = 0;
		        Row valueRow = sheet.createRow(rowCount++);

		        createCell(valueRow, columnCount++, verification.getFormatName(), cellStyle);
		        createCell(valueRow, columnCount++, verification.getFormatNo(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getRevisionNo()), cellStyle);
		        createCell(valueRow, columnCount++, verification.getRefSopNo(), cellStyle);
		        createCell(valueRow, columnCount++, verification.getUnit(), cellStyle);
		        createCell(valueRow, columnCount++, verification.getDate(), cellStyle);
		        createCell(valueRow, columnCount++, verification.getShift(), cellStyle);
		        createCell(valueRow, columnCount++, verification.getOrderNo(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getTwistWithNeedles()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getTwistWithoutNeedles()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getActualNoOftwist()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getLenOfBales()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getActualLenOfBales()), cellStyle);

		        // Setting press
		        createCell(valueRow, columnCount++, String.valueOf(verification.getPressurePressPlate()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getPressureCompensator()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getDePressurizedPressPlate()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getTimeOutMotor()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getOdtFillLevel()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getOdtHighLevel()), cellStyle);

		        // Hopper setting
		        createCell(valueRow, columnCount++, String.valueOf(verification.getBeaterSpeed()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getFeedRollerSpeed()), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getTransportFanSpeed()), cellStyle);

		        createCell(valueRow, columnCount++, verification.getOperator_status(), cellStyle);
				createDateCell(valueRow, columnCount++, verification.getOperator_submitted_on(), dateCellStyle);
				createCell(valueRow, columnCount++, verification.getOperator_submitted_by(), cellStyle);
				createCell(valueRow, columnCount++, verification.getOperator_sign(), cellStyle);

				createCell(valueRow, columnCount++, verification.getSupervisor_status(), cellStyle);
				createDateCell(valueRow, columnCount++, verification.getSupervisor_submit_on(), dateCellStyle);
				createCell(valueRow, columnCount++, verification.getSupervisor_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, verification.getSupervisor_sign(), cellStyle);

				createCell(valueRow, columnCount++, verification.getHod_status(), cellStyle);
				createDateCell(valueRow, columnCount++, verification.getHod_submit_on(), dateCellStyle);
				createCell(valueRow, columnCount++, verification.getHod_submit_by(), cellStyle);
				createCell(valueRow, columnCount++, verification.getHod_sign(), cellStyle);

		        createCell(valueRow, columnCount++, verification.getReason(), cellStyle);
		        createCell(valueRow, columnCount++, String.valueOf(verification.getVersion()), cellStyle);
		    }
		}

	         //F014
		  public static ByteArrayResource generateF14Excel(
		            List<SpunlaceShiftWiseRPProdSupportHistoryF14> historyF14List) throws IOException {

		        try (Workbook workbook = new SXSSFWorkbook()) {
		            Sheet sheet = workbook.createSheet("Report");

		            // Create header row
		            Row headerRow = sheet.createRow(0);
		            List<String> headers = getF14TitleLabels();
		            int headerColumnIndex = 0;
		            for (String header : headers) {
		                createCell(headerRow, headerColumnIndex++, header, workbook);
		            }

		            // Populate data
		            createF14Values(sheet, workbook, historyF14List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF14TitleLabels() {
		        List<String> list = new ArrayList<>();
		        list.add("FORMAT NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("REF SOP NO");
		        list.add("UNIT");
		        list.add("DATE");
		        list.add("SHIFT");
		        list.add("ORDER NO");
		        list.add("RP MIXING");
		        //status
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

		    private static void createF14Values(Sheet sheet, Workbook workbook,
		            List<SpunlaceShiftWiseRPProdSupportHistoryF14> historyF14List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		        CellStyle dateCellStyle = createDateCellStyle(workbook);

		        for (SpunlaceShiftWiseRPProdSupportHistoryF14 history : historyF14List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		            createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getRp_mixing(), cellStyle);
		           
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

		    public static ByteArrayResource generateF15Excel(
		            List<SpunlaceRPBalePressStoppageHistoryF015> historyF15List) throws IOException {

		        try (Workbook workbook = new SXSSFWorkbook()) {
		            Sheet sheet = workbook.createSheet("Report");

		            // Create header row
		            Row headerRow = sheet.createRow(0);
		            List<String> headers = getF15TitleLabels();
		            int headerColumnIndex = 0;
		            for (String header : headers) {
		                createCell(headerRow, headerColumnIndex++, header, workbook);
		            }

		            // Populate data
		            createF15Values(sheet, workbook, historyF15List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF15TitleLabels() {
		        List<String> list = new ArrayList<>();
		        list.add("FORMAT NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("REF SOP NO");
		        list.add("UNIT");
		        list.add("DATE");
		      
		        list.add("SUPERVISOR STATUS");
		        list.add("SUPERVISOR SUBMIT ON");
		        list.add("SUPERVISOR SUBMIT BY");
		        list.add("SUPERVISOR SUBMIT ID");
		        list.add("SUPERVISOR SIGN");
		        list.add("HOD STATUS");
		        list.add("HOD SUBMIT ON");
		        list.add("HOD SUBMIT BY");
		        list.add("HOD SUBMIT ID");
		        list.add("HOD SIGN");
		        
		        list.add("REASON");
		        list.add("VERSION");
		       
		        return list;
		    }

		    private static void createF15Values(Sheet sheet, Workbook workbook,
		            List<SpunlaceRPBalePressStoppageHistoryF015> historyF15List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);

		        for (SpunlaceRPBalePressStoppageHistoryF015 history : historyF15List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_submit_on() != null ? history.getSupervisor_submit_on().toString() : "", cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getSupervisor_submit_id()), cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_submit_on() != null ? history.getHod_submit_on().toString() : "", cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getHod_submit_id()), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);
		            createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		           
		        }
		    }
		    //F16
		    public static ByteArrayResource generateF016Excel(
		            List<ProcessSetupVerificationSliterWinderHistoryF016> historyF016List) throws IOException {

		        try (Workbook workbook = new SXSSFWorkbook()) {
		            Sheet sheet = workbook.createSheet("Report");

		            // Create header row
		            Row headerRow = sheet.createRow(0);
		            List<String> headers = getF016TitleLabels();
		            int headerColumnIndex = 0;
		            for (String header : headers) {
		                createCell(headerRow, headerColumnIndex++, header, workbook);
		            }

		            // Populate data
		            createF016Values(sheet, workbook, historyF016List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF016TitleLabels() {
		        List<String> list = new ArrayList<>();
		        list.add("PROCESS ID");
		        list.add("FORMAT NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("REF SOP NO");
		        list.add("UNIT");
		        list.add("DATE");
		        list.add("SHIFT");
		        list.add("ORDER NO");
		        list.add("MIXING");
		        list.add("PRODUCT NAME");
		        list.add("PATTERN");
		        list.add("GSM");
		        list.add("MOISTURE");
		        list.add("WIDTH");
		        list.add("THICKNESS");
		        list.add("UNWINDER");
		        list.add("REWINDER");
		        list.add("CUTTER TRIM");
		        list.add("LAYON TRIM");
		        list.add("NO OF FLAGS");
		        list.add("PRESSURE");
		        list.add("UW DATA");
		        list.add("TENSION");
		        list.add("DIAMETER");
		        
		        //status
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
	              //F016
		    private static void createF016Values(Sheet sheet, Workbook workbook,
		            List<ProcessSetupVerificationSliterWinderHistoryF016> historyF016List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		        CellStyle dateCellStyle = createDateCellStyle(workbook);
		        for (ProcessSetupVerificationSliterWinderHistoryF016 history : historyF016List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, String.valueOf(history.getProcessId()), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		            createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
		            createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getPattern(), cellStyle);
		            createCell(valueRow, columnCount++, history.getGsm(), cellStyle);
		            createCell(valueRow, columnCount++, history.getMoisture(), cellStyle);
		            createCell(valueRow, columnCount++, history.getWidth(), cellStyle);
		            createCell(valueRow, columnCount++, history.getThickness(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getUnwinder()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRewinder()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getCutterTrim()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getLayonTrim()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getNoOfFlags()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getPressure()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getUwData()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getTension()), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getDiameter()), cellStyle);
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
		    //F017
		    public static ByteArrayResource generateF017Excel(
		            List<ShiftWiseSliterWinderProdReportHistoryF017> historyF017List) throws IOException {

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
		            createF017Values(sheet, workbook, historyF017List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF017TitleLabels() {
		        List<String> list = new ArrayList<>();
		        
		        // Main report fields
		        list.add("FORM NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("SOP NUMBER");
		        list.add("UNIT");
		        list.add("DATE");
		        list.add("SHIFT");
		        list.add("ORDER NO");
		        list.add("MATERIAL CODE");
		        list.add("PRODUCT NAME");
		        list.add("STD GSM");
		        list.add("PATTERN");

		        // Operator, Supervisor, HOD status fields
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

		        // Nested report details
		        list.add("SHAFT NO");
		        list.add("ROLL NO");
		        list.add("ROLL WEIGHT");
		        list.add("ROLL WIDTH");
		        list.add("ROLL LENGTH");

		        return list;
		    }

		    private static void createF017Values(Sheet sheet, Workbook workbook,
		            List<ShiftWiseSliterWinderProdReportHistoryF017> historyF017List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		        CellStyle dateCellStyle = createDateCellStyle(workbook);

		        for (ShiftWiseSliterWinderProdReportHistoryF017 history : historyF017List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		            createCell(valueRow, columnCount++, history.getOrderNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getMaterialCode(), cellStyle);
		            createCell(valueRow, columnCount++, history.getProductName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getStdGsm(), cellStyle);
		            createCell(valueRow, columnCount++, history.getPattern(), cellStyle);

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

		            int startColumnForNestedData = columnCount;

		            if (history.getReportDetails() != null && !history.getReportDetails().isEmpty()) {
		                for (ShiftWiseSliterWinderProdDetailsHistoryF017 details : history.getReportDetails()) {
		                    Row nestedRow = sheet.createRow(rowCount++);
		                    int nestedColumnCount = startColumnForNestedData;

		                    // Fill nested data
		                    createCell(nestedRow, nestedColumnCount++, details.getSplShaftNo(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getSplRollNo(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getSplRollWeight(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getSplRollWidth(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getSplRollLength(), cellStyle);
		                }
		            } else {
		                int numberOfNestedColumns = 5;
		                for (int i = 0; i < numberOfNestedColumns; i++) {
		                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
		                }
		            }
		        }
		    }
		    
		    //F012
		    public static ByteArrayResource generateF012Excel(List<SpunlaceSampleReportHistoryF012> historyF012List) throws IOException {

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
		            createF012Values(sheet, workbook, historyF012List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF012TitleLabels() {
		        List<String> list = new ArrayList<>();

		        // Main report fields
		        list.add("FORM NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("SOP NUMBER");
		        list.add("UNIT");
		        list.add("DATE");
		        list.add("SHIFT");
		        list.add("ORDER NO");
		        list.add("PRODUCT NAME");
		        list.add("MIXING");
		        list.add("MATERIAL CODE");
		        list.add("STD GSM");
		        list.add("STD THICKNESS");
		        list.add("STD MOISTURE");
		        list.add("PATTERN");
		        // Qc, Supervisor, HOD status fields
		      
		        list.add("SUPERVISOR STATUS");
		        list.add("SUPERVISOR SUBMITTED ON");
		        list.add("SUPERVISOR SUBMITTED BY");
		        list.add("SUPERVISOR SIGN");
		        list.add("HOD STATUS");
		        list.add("HOD SUBMITTED ON");
		        list.add("HOD SUBMITTED BY");
		        list.add("HOD SIGN");
		        list.add("QC STATUS");
		        list.add("QC SUBMITTED ON");
		        list.add("QC SUBMITTED BY");
		        list.add("QC SIGN");

		        list.add("REASON");
		        list.add("VERSION");

		        // Nested report details
		        list.add("SHAFT NO");
		        list.add("ROLL NO");
		        list.add("LENGTH");
		        list.add("WIDTH");
		        list.add("NET WEIGHT");
		        list.add("ROLL GSM");
		        list.add("MOISTURE");
		        list.add("ROLL DIA");
		        list.add("REMARKS");

		        return list;
		    }

		    private static void createF012Values(Sheet sheet, Workbook workbook, List<SpunlaceSampleReportHistoryF012> historyF012List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		        CellStyle dateCellStyle = createDateCellStyle(workbook);

		        for (SpunlaceSampleReportHistoryF012 history : historyF012List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getShift(), cellStyle);
		            createCell(valueRow, columnCount++, history.getOrder_no(), cellStyle);
		            createCell(valueRow, columnCount++, history.getProduct_name(), cellStyle);
		            createCell(valueRow, columnCount++, history.getMixing(), cellStyle);
		            createCell(valueRow, columnCount++, history.getMaterial_code(), cellStyle);
		            createCell(valueRow, columnCount++, history.getStd_gsm(), cellStyle);
		            createCell(valueRow, columnCount++, history.getStd_thickness(), cellStyle);
		            createCell(valueRow, columnCount++, history.getStd_moisture(), cellStyle);
		            createCell(valueRow, columnCount++, history.getPattern(), cellStyle);

		            createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
		            createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

		            createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
		            createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
		            createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);
		            
		            createCell(valueRow, columnCount++, history.getQc_status(), cellStyle);
		            createDateCell(valueRow, columnCount++, history.getQc_submit_on(), dateCellStyle);
		            createCell(valueRow, columnCount++, history.getQc_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, history.getQc_sign(), cellStyle);
		            
		            createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		            int startColumnForNestedData = columnCount;

		            if (history.getReportDetails() != null && !history.getReportDetails().isEmpty()) {
		                for (SpunlaceSampleReportDetailsHistoryF012 details : history.getReportDetails()) {
		                    Row nestedRow = sheet.createRow(rowCount++);
		                    int nestedColumnCount = startColumnForNestedData;

		                    // Fill nested data
		                    createCell(nestedRow, nestedColumnCount++, details.getShaft_no(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getRoll_no(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getLength(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getWidth(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getNet_weight(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getRoll_gsm(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getMoisture(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getRoll_dai(), cellStyle);
		                    createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
		                }
		            } else {
		                int numberOfNestedColumns = 9;
		                for (int i = 0; i < numberOfNestedColumns; i++) {
		                    createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
		                }
		            }
		        }
		    }
		    //F018
		    public static ByteArrayResource generateF018Excel(
		            List<SpunlaceShiftWiseStoppageReportHistoryF018> historyF018List) throws IOException {

		        try (Workbook workbook = new SXSSFWorkbook()) {
		            Sheet sheet = workbook.createSheet("Report");

		            // Create header row
		            Row headerRow = sheet.createRow(0);
		            List<String> headers = getF018TitleLabels();
		            int headerColumnIndex = 0;
		            for (String header : headers) {
		                createCell(headerRow, headerColumnIndex++, header, workbook);
		            }

		            // Populate data
		            createF018Values(sheet, workbook, historyF018List);

		            // Write the workbook to a byte array
		            ByteArrayOutputStream baos = new ByteArrayOutputStream();
		            workbook.write(baos);

		            return new ByteArrayResource(baos.toByteArray());
		        } catch (IOException e) {
		            throw e;
		        } catch (Exception e) {
		            throw new RuntimeException("Failed to generate report", e);
		        }
		    }

		    private static List<String> getF018TitleLabels() {
		        List<String> list = new ArrayList<>();
		        
		        // Main report fields
		        list.add("FORMAT NAME");
		        list.add("FORMAT NO");
		        list.add("REVISION NO");
		        list.add("SOP NUMBER");
		        list.add("UNIT");
		        list.add("DATE");
		        list.add("REMARKS");
		        

		        // Supervisor fields
		        list.add("SUPERVISOR STATUS");
		        list.add("SUPERVISOR SUBMIT ON");
		        list.add("SUPERVISOR SUBMIT BY");
		        list.add("SUPERVISOR SIGN");

		        // HOD fields
		        list.add("HOD STATUS");
		        list.add("HOD SUBMIT ON");
		        list.add("HOD SUBMIT BY");
		        list.add("HOD SIGN");
		       
		        list.add("REASON");
		        list.add("VERSION");
		        return list;
		    }

		    private static void createF018Values(Sheet sheet, Workbook workbook,
		                                         List<SpunlaceShiftWiseStoppageReportHistoryF018> historyF018List) {
		        int rowCount = 1;
		        CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		        CellStyle dateCellStyle = createDateCellStyle(workbook);

		        for (SpunlaceShiftWiseStoppageReportHistoryF018 history : historyF018List) {
		            int columnCount = 0;
		            Row valueRow = sheet.createRow(rowCount++);

		            createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
		            createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
		            createCell(valueRow	, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
		            createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
		            createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
		            createCell(valueRow, columnCount++, history.getDate(), cellStyle);
		            createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
		           

		            // Supervisor fields
		            createCell(valueRow, columnCount++, history.getSupervisor_status(), cellStyle);
		            createDateCell(valueRow, columnCount++, history.getSupervisor_submit_on(), dateCellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, history.getSupervisor_sign(), cellStyle);

		            // HOD fields
		            createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
		            createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
		            createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);
		            createCell(valueRow, columnCount++, history.getHod_mail_status(), cellStyle);
		            
		            createCell(valueRow, columnCount++, history.getReason(), cellStyle);
		            createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
		        }
		    }

	
	

	// GAYATHRI(23- 25-25)

	public static ByteArrayResource generateF023Excel(List<MachineCleaningRecordHistoryF023> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF023TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF023Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getF023TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");

//		BO , WBO 
		list.add("BO_FEED_TABLE");
		list.add("BO_MID_TABLE");

//		FO/PO
		list.add("FO_FEED_ROLLER");
		list.add("FO_BEATER");
		list.add("FO_PERFORATED_PLATES");

//		RIETER1&2
		list.add("RIETER_CHUTE_CLEAN");
		list.add("RIETER_FLATS_CLEAN");
		list.add("RIETER_DOFFER_CLEAN");

//		ALC1&2   
		list.add("ALC_CHUTE_CLEAN");
		list.add("ALC_MICRODUST_CLEAN");
		list.add("ALC_MESHBELT_CLEAN");
		list.add("ALC_EXHAUST_DUST_CLEAN");
		list.add("ALC_COLLECTING_BELT_CLEAN");
		list.add("ALC_PLATFORM");

//		Jetlace
		list.add("JETLACE_BELTS");
		list.add("JETLACE_DRUMS");

//		Dryer
		list.add("DRYER_FEED_ROLLERS");
		list.add("DRYER_DRUMS");

//		Winder
		list.add("WINDER_SROLLERS");
		list.add("WINDER_DRUM");

//		RP Bale press
		list.add("RP_FEED_ROLLER");
		list.add("RP_BEATER");
		list.add("RP_PERFORATED_PLATES");

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

	private static String createF023Values(Sheet sheet, Workbook workbook,
			List<MachineCleaningRecordHistoryF023> details) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (MachineCleaningRecordHistoryF023 history : details) {
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

			createCell(valueRow, columnCount++, history.getBoFeedTable(), cellStyle);
			createCell(valueRow, columnCount++, history.getBoMidTable(), cellStyle);

			createCell(valueRow, columnCount++, history.getFoFeedRoller(), cellStyle);
			createCell(valueRow, columnCount++, history.getFoBeater(), cellStyle);
			createCell(valueRow, columnCount++, history.getFoPerforatedPlate(), cellStyle);

			createCell(valueRow, columnCount++, history.getRieterChuteClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getRieterFlatsClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getRieterDofferClean(), cellStyle);

			createCell(valueRow, columnCount++, history.getAlcChuteClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlcMicrodustClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlcMeshBeltClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlcExhaustHMeshClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlcCollectngBeltClean(), cellStyle);
			createCell(valueRow, columnCount++, history.getAlcPlatform(), cellStyle);

			createCell(valueRow, columnCount++, history.getJetlaceBelts(), cellStyle);
			createCell(valueRow, columnCount++, history.getJetlaceDrums(), cellStyle);

			createCell(valueRow, columnCount++, history.getDryerFeedRollers(), cellStyle);
			createCell(valueRow, columnCount++, history.getDryerDrums(), cellStyle);

			createCell(valueRow, columnCount++, history.getWinderSRollers(), cellStyle);
			createCell(valueRow, columnCount++, history.getWinderDrum(), cellStyle);

			createCell(valueRow, columnCount++, history.getRpFeedRoller(), cellStyle);
			createCell(valueRow, columnCount++, history.getRpBeater(), cellStyle);
			createCell(valueRow, columnCount++, history.getRpPerforatedPlates(), cellStyle);

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

	// F025

	public static ByteArrayResource generateF025Excel(List<SpunlaceHandSanitizationReportHistoryF025> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get025TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF025Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> get025TitleLables() {
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

	private static String createF025Values(Sheet sheet, Workbook workbook,
			List<SpunlaceHandSanitizationReportHistoryF025> reportHistory) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (SpunlaceHandSanitizationReportHistoryF025 history : reportHistory) {
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
				for (SpunlaceHandSanitizationListHistoryF025 details : history.getSanitizationList()) {
					Row nestedRow = sheet.createRow(rowCount++);
					int nestedColumnCount = startColumnForNestedData;

					// Fill nested data
					createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSerialNumber()), cellStyle);
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
				int numberOfNestedColumns = 11;
				for (int i = 0; i < numberOfNestedColumns; i++) {
					createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
				}
			}
		}

		return "";
	}

	// F020

	public static ByteArrayResource generateF020Excel(List<MetalDetectorCheckListHistoryF020> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getF020TitleLabels();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF020Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getF020TitleLabels() {
		List<String> list = new ArrayList<>();

		list.add("FORM NAME");
		list.add("FORMAT NO");
		list.add("REVISION NO");
		list.add("SOP NUMBER");
		list.add("UNIT");
		list.add("DATE");
		list.add("MONTH");
		list.add("YEAR");
		list.add("FREQUENCY");

		list.add("METAL_CONTAMINATED_MATERIALS_CCP4A");
		list.add("METAL_CONTAMINATED_MATERIALS_CCP4B");
		list.add("NO_OF_METAL_CONTAMINANTS_CCP4A");
		list.add("NO_OF_METAL_CONTAMINANTS_CCP4B");

		list.add("USING_FERROUS");
		list.add("USING_COPPER");

		list.add("REMARKS");

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

	private static String createF020Values(Sheet sheet, Workbook workbook,
			List<MetalDetectorCheckListHistoryF020> details) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (MetalDetectorCheckListHistoryF020 history : details) {
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
			createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);

			createCell(valueRow, columnCount++, history.getMetalContaminatedMaterials4A(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetalContaminatedMaterials4B(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfMetalContaminants4A(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfMetalContaminants4B(), cellStyle);

			createCell(valueRow, columnCount++, history.getUsingFerrous(), cellStyle);
			createCell(valueRow, columnCount++, history.getUsingCopper(), cellStyle);
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
	
	//F019
	
			public static ByteArrayResource generateF019Excel(
					List<ShiftWiseWasteReportSpunlaceHistoryF019> details) throws IOException {
				try (Workbook workbook = new SXSSFWorkbook()) {
					Sheet sheet = workbook.createSheet("Report");
		 
					// Create header row
					Row headerRow = sheet.createRow(0);
					List<String> headers = get019TitleLables();
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
		 
			private static List<String> get019TitleLables() {
				List<String> list = new ArrayList<>();
		 
				list.add("FORM NAME");
				list.add("FORMAT NO");
				list.add("REVISION NO");
				list.add("SOP NUMBER");
				list.add("UNIT");
				list.add("DATE");
				list.add("SHIFT");
				
				list.add("COMPACTOR_WASTE_NO_OF_BAGS_SUM");
				list.add("COMPACTOR_WASTE_NET_WEIGHT_SUM");
				list.add("SWWS_WASTE_NO_OF_BAGS_SUM");
				list.add("SWWS_WASTE_NET_WEIGHT_SUM");
				list.add("SWWS_WASTE_TOTAL_WEIGHT_SUM");
				list.add("EXFOLATING_WASTE_NO_OF_BAGS_SUM");
				list.add("EXFOLATING_WASTE_NET_WEIGHT_SUM");
		 
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
				list.add("COMPACTOR_WASTE_NO_OF_BAGS");
				list.add("COMPACTOR_WASTE_NET_WEIGHT");
				list.add("SWWS_WASTE_NO_OF_BAGS");
				list.add("SWWS_WASTE_NET_WEIGHT");
				list.add("SWWS_WASTE_TOTAL_WEIGHT");
				list.add("EXFOLATING_WASTE_NO_OF_BAGS");
				list.add("EXFOLATING_WASTE_NET_WEIGHT");
				list.add("REMARKS");
		 
				return list;
			}
		 
			private static String createF019Values(Sheet sheet, Workbook workbook,
			        List<ShiftWiseWasteReportSpunlaceHistoryF019> reportHistory) {
			    int rowCount = 1;
			    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
			    CellStyle dateCellStyle = createDateCellStyle(workbook);
		 
			    for (ShiftWiseWasteReportSpunlaceHistoryF019 history : reportHistory) {
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
			        
			        createCell(valueRow, columnCount++, String.valueOf(history.getCompactorWasteNoOfBagsSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getCompactorWasteNWtSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getSwwsWasteNoOfBagsSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getSwwsWasteNWtSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getSwwsWasteTotalWtSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getExfolatingWasteNoOfBagsSum()), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getExfolatingWasteNWtSum()), cellStyle);
			   	 
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
			        if (history.getReportDetails() != null && !history.getReportDetails().isEmpty()) {
			            for (ShiftWiseWasteReportDetailsHistoryF019 details : history.getReportDetails()) {
			                Row nestedRow = sheet.createRow(rowCount++);
			                int nestedColumnCount = startColumnForNestedData;
		 
			                // Fill nested data
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getCompactorWasteNoOfBags()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getCompactorWasteNWt()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSwwsWasteNoOfBags()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSwwsWasteNWt()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getSwwsWasteTotalWt()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getExfolatingWasteNoOfBags()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, String.valueOf(details.getExfolatingWasteNWt()), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
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

		
		//F024
		
			public static ByteArrayResource generateF024Excel(
					List<SanitizationOfMachineAndSurfacesHistoryF024> details) throws IOException {
				try (Workbook workbook = new SXSSFWorkbook()) {
					Sheet sheet = workbook.createSheet("Report");
		 
					// Create header row
					Row headerRow = sheet.createRow(0);
					List<String> headers = get024TitleLables();
					int headerColumnIndex = 0;
					for (String header : headers) {
						createCell(headerRow, headerColumnIndex++, header, workbook);
					}
		 
					// Populate data
					createF024Values(sheet, workbook, details);
		 
					// Write the workbook to a byte array
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					workbook.write(baos);
					return new ByteArrayResource(baos.toByteArray());
				}
			}
		 
			private static List<String> get024TitleLables() {
				List<String> list = new ArrayList<>();
		 
				list.add("FORM NAME");
				list.add("FORMAT NO");
				list.add("REVISION NO");
				list.add("SOP NUMBER");
				list.add("UNIT");
				list.add("DEPARTMENT");
				list.add("FREQUENCY");
				list.add("MONTH");
				list.add("YEAR");
				list.add("WEEK");
				list.add("WEEK_AND_DATE");
				list.add("REMARKS");
				list.add("SANITIZED_BY");
		 
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
				list.add("ACTIVITY");
				list.add("IS_COMPLETED");
		 
				return list;
			}
		 
			private static String createF024Values(Sheet sheet, Workbook workbook,
			        List<SanitizationOfMachineAndSurfacesHistoryF024> reportHistory) {
			    int rowCount = 1;
			    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
			    CellStyle dateCellStyle = createDateCellStyle(workbook);
		 
			    for (SanitizationOfMachineAndSurfacesHistoryF024 history : reportHistory) {
			        int columnCount = 0;
		 
			        // Create main record row
			        Row valueRow = sheet.createRow(rowCount++);
		 
			        // Main record fields
			        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
			        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
			        createCell(valueRow, columnCount++, history.getFrequency(), cellStyle);
			        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
			        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
			        createCell(valueRow, columnCount++, history.getWeek(), cellStyle);
			        createCell(valueRow, columnCount++, history.getWeekAndDate(), cellStyle);
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
		 
			        int startColumnForNestedData = columnCount;
		 
			        // Nested records
			        if (history.getActivites() != null && !history.getActivites().isEmpty()) {
			            for (SpunlaceSmsActivitiesHistoryF024 details : history.getActivites()) {
			                Row nestedRow = sheet.createRow(rowCount++);
			                int nestedColumnCount = startColumnForNestedData;
		 
			                // Fill nested data
			                createCell(nestedRow, nestedColumnCount++, details.getActivity(), cellStyle);
			                createCell(nestedRow, nestedColumnCount++, details.getIsCompleted(), cellStyle);
			            }
			        } else {
			            // Add empty cells for nested data if none exist
			            int numberOfNestedColumns = 2; 
			            for (int i = 0; i < numberOfNestedColumns; i++) {
			                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
			            }
			        }
			    }
		 
			    return "";
			}
		

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
