package com.focusr.Precot.mssql.database.service.drygoods;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionCottonBallsHistoryF003;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsHandSanitationHistoryF06;
import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsProductChangeOverHistoryF09;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.MiniRollHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingHeaderHistory;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionCottonBallsF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DailyProductionCottonBallsHistoryF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14Repo;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.GoodsHandSanitationHistoryRepositoryF06;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.GoodsProductChangeOverRepositoryHistoryF09;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.LogBookHeaderHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.MiniRollHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SanitizationDetailsHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SliverMakingHeaderHistoryRepository;
import com.focusr.Precot.payload.ApiResponse;

import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.DryGoodsAuditRequest;
import com.focusr.Precot.util.drygoods.DryGoodsExcelUtil;

@Service
public class DryGoodsAuditService {
	
	@Autowired
	BaleConsumptionReportDryGoodsHistoryF001Repository baleconsumptionreportdrygoodshistoryf001repository;
	
	@Autowired
	DailyProductionCottonBallsHistoryF003Repository dailyproductioncottonballshistoryf003repository;
	@Autowired
	DailyProductionDetailsPleateAndWoolRollHistoryF006Repository dailyproductiondetailspleateandwoolrollhistoryf006repository;
	
	@Autowired
	BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011Repository ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository;
	
	@Autowired
	SliverMakingHeaderHistoryRepository slivermakingheaderhistoryrepository;
	
	@Autowired
	private GoodsProductChangeOverRepositoryHistoryF09 goodsProductChangeOverRepositoryHistoryF09;
	
	@Autowired
	private GoodsHandSanitationHistoryRepositoryF06 goodsHandSanitationHistoryRepositoryF06;
	
	@Autowired
	private DryGoodsHouseKeepingCheckListHistoryF14Repo dryGoodsHouseKeepingCheckListHistoryF14Repo;
	
	@Autowired
	MiniRollHistoryRepository minirollhistoryrepository;
	
	@Autowired
	SanitizationDetailsHistoryRepository sanitizationdetailshistoryrepository;
	
	@Autowired
	LogBookHeaderHistoryRepository logbookheaderhistoryrepository;
	
	Logger logger = LoggerFactory.getLogger(DryGoodsAuditService.class);

	SCAUtil sca = new SCAUtil();

	
	public ResponseEntity<?> getAuditSummary(DryGoodsAuditRequest summeryrequest) {
		//Forms Entity
		List<BaleConsumptionReportDryGoodsHistoryF001> summaryF01;
		List<DailyProductionCottonBallsHistoryF003> summaryF03;
		List<DailyProductionDetailsPleateAndWoolRollHistoryF006> summaryF06;
		List<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011> summaryF11;
		List<SliverMakingHeaderHistory> summaryF02;
		List<MiniRollHistory> summaryF05;
		List<SanitizationDetailsHistory> summaryF012;
		List<LogBookHeaderHistory> summaryF010;
		//Menaga
		List<GoodsProductChangeOverHistoryF09> summaryF009;
		List<GoodsHandSanitationHistoryF06> summaryF013;
		List<DryGoodsHouseKeepingCheckListHistoryF14> summaryF014;
		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();
			
			//F001

			if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f001.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF01_shift().isEmpty() ? null : summeryrequest.getF01_shift();
				String laydownNo = summeryrequest.getF01_laydown_no().isEmpty() ? null : summeryrequest.getF01_laydown_no();

				summaryF01 = baleconsumptionreportdrygoodshistoryf001repository.findByParams01(fromDate, toDate, shift, laydownNo);

				if (!summaryF01.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateF001Excel(summaryF01);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Bale_Consumption_Report_Drygoods.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			//F003
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f003.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF03_shift().isEmpty() ? null : summeryrequest.getF03_shift();
				String machineName = summeryrequest.getF03_machine_name().isEmpty() ? null : summeryrequest.getF03_machine_name();

				summaryF03 = dailyproductioncottonballshistoryf003repository.findByParams03(fromDate, toDate, shift, machineName);

				if (!summaryF03.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateF003Excel(summaryF03);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Production_Report_Cotton_Balls.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			//F006
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f006.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF06_shift().isEmpty() ? null : summeryrequest.getF06_shift();
				String machine_name = summeryrequest.getF06_machine_name().isEmpty() ? null : summeryrequest.getF06_machine_name();

				summaryF06 = dailyproductiondetailspleateandwoolrollhistoryf006repository.findByParams06(fromDate, toDate, shift, machine_name);

				if (!summaryF06.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateF006Excel(summaryF06);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Production_Details_Pleate_And_WoolRoll.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//F011
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f011.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF11_shift().isEmpty() ? null : summeryrequest.getF11_shift();
				
			

				summaryF11 = ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.findByParams11(fromDate, toDate, shift);

				if (!summaryF11.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateFinishedGoodsTransferExcelF011(summaryF11);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Ballpleate_And_WoolRoll_Finished_Goods_Transfer_Record.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//F002
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f002.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF02_shift().isEmpty() ? null : summeryrequest.getF02_shift();
				String machine_name = summeryrequest.getF02_machine_name().isEmpty() ? null : summeryrequest.getF02_machine_name();

				summaryF02 = slivermakingheaderhistoryrepository.findByParams02(fromDate, toDate, shift,machine_name);

				if (!summaryF02.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateSliverMakingExcelF02(summaryF02);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Production_Sliver_Making.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//F005
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f005.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF05_shift().isEmpty() ? null : summeryrequest.getF05_shift();
				
			

				summaryF05 = minirollhistoryrepository.findByParams05(fromDate, toDate, shift);

				if (!summaryF05.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateMiniRollHistoryExcelF005(summaryF05);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Mini_Roll_Drygoods.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//F012
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f012.equalsIgnoreCase(formName)) {

				String year = summeryrequest.getF12_year().isEmpty() ? null : summeryrequest.getF12_year();
				String month = summeryrequest.getF12_month().isEmpty() ? null : summeryrequest.getF12_month();				
				String week = summeryrequest.getF12_week().isEmpty() ? null : summeryrequest.getF12_week();
				
				
				summaryF012 = sanitizationdetailshistoryrepository.findByParams12(year, month,week);

				if (!summaryF012.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateSanitizationDetailsHistoryExcelF012(summaryF012);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Sanitization_Of_Mechine_And_Surface_DryGoods.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//F010
			else if (AppConstantDryGoods.departmentName.equals(department)
					&& AppConstantDryGoods.f010.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF10_shift().isEmpty() ? null : summeryrequest.getF10_shift();
				summaryF010 = logbookheaderhistoryrepository.findByParams10(fromDate, toDate,shift);

				if (!summaryF010.isEmpty()) {
					ByteArrayResource resource = DryGoodsExcelUtil.generateLogBookHeaderHistoryExcelF10(summaryF010);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Log_Books_DryGoods.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}	
			
		
				//Menaga
				else if (AppConstantDryGoods.departmentName.equals(department)
						&& AppConstantDryGoods.f009.equalsIgnoreCase(formName)) {
	 
					String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
					String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
					
					String machineName = summeryrequest.getF09_machineName().isEmpty() ? null : summeryrequest.getF09_machineName();
					String order_no = summeryrequest.getF09_orderNo1().isEmpty() ? null : summeryrequest.getF09_orderNo1();
//					String fromDate = Optional.ofNullable(summeryrequest.getFrom_date()).orElse(null);
//				    String toDate = Optional.ofNullable(summeryrequest.getTo_date()).orElse(null);
//				    String machineName = Optional.ofNullable(summeryrequest.getF09_machineName()).orElse(null);
//				    String order_no = Optional.ofNullable(summeryrequest.getF09_orderNo1()).orElse(null);

				    logger.debug("From Date: {}", fromDate);
				    logger.debug("To Date: {}", toDate);
				    logger.debug("Machine Name: {}", machineName);
				    logger.debug("Order No: {}", order_no);
	 
					summaryF009 = goodsProductChangeOverRepositoryHistoryF09.findByParams01(fromDate, toDate,
							machineName,order_no);
	 
					if (!summaryF009.isEmpty()) {
						ByteArrayResource resource = DryGoodsExcelUtil.generateF009Excel(summaryF009);
						return ResponseEntity.ok()
								.header(HttpHeaders.CONTENT_DISPOSITION,
										"attachment; filename=Product_Change_Over_Drygoods.xlsx")
								.contentType(MediaType.parseMediaType(
										"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
								.body(resource);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
					}
				}
				else if (AppConstantDryGoods.departmentName.equals(department)
			            && AppConstantDryGoods.f013.equalsIgnoreCase(formName)) {

			        String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			        String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			        String shift = summeryrequest.getF13_shift().isEmpty() ? null : summeryrequest.getF13_shift();

			       summaryF013 = goodsHandSanitationHistoryRepositoryF06.findByParams01(fromDate, toDate, shift);

			        if (!summaryF013.isEmpty()) {
			            ByteArrayResource resource = DryGoodsExcelUtil.generateF013Excel(summaryF013);
			            return ResponseEntity.ok()
			                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Hand_Sanitization_Drygoods.xlsx")
			                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                    .body(resource);
			        } else {
			            return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			        }
			    
				}
				else if (AppConstantDryGoods.departmentName.equals(department)
						&& AppConstantDryGoods.f014.equalsIgnoreCase(formName)) {
	 
					String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
					String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
	 
					summaryF014 = dryGoodsHouseKeepingCheckListHistoryF14Repo.findByParams01(fromDate, toDate
							);
	 
					if (!summaryF014.isEmpty()) {
						ByteArrayResource resource = DryGoodsExcelUtil.generateF014Excel(summaryF014);
						return ResponseEntity.ok()
								.header(HttpHeaders.CONTENT_DISPOSITION,
										"attachment; filename=House_keeping_cleaning_DryGoods.xlsx")
								.contentType(MediaType.parseMediaType(
										"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
								.body(resource);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
					}
				}
			
			else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.error("*** Unable to Get Audit History ***", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

		
}
