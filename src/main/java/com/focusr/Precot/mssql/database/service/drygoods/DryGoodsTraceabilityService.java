package com.focusr.Precot.mssql.database.service.drygoods;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.repository.FinalInspectionReportRepositoryF037;
import com.focusr.Precot.QA.repository.QaOnlineInspectionRepository;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;
import com.focusr.Precot.mssql.database.model.drygoods.SliverReceiptDetailsF003;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR03GoodsPackingMeterialIssueRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionCottonBallsF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsProductChangeRepositoryF09;
import com.focusr.Precot.mssql.database.repository.drygoods.MiniRollRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingHeaderRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingLinesRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.drygoods.BallsTraceabilityRequest;
import com.focusr.Precot.util.drygoods.GoodsAbCons;
import com.focusr.Precot.util.drygoods.GoodsProdDetails;
import com.focusr.Precot.util.drygoods.MinirollDetails;

@Service
public class DryGoodsTraceabilityService {

	Logger log = LoggerFactory.getLogger(DryGoodsTraceabilityService.class);

	@Autowired
	private BMR001GoodsProductionDetailsRepository bMR001GoodsProductionDetailsRepository;

	@Autowired
	private MiniRollRepository miniRollRepository;

	@Autowired
	private GoodsProductChangeRepositoryF09 productChangeOverRepositoryF09;

	@Autowired
	BleachBmrSummaryRepository bleachBmrSummaryRepository;

	@Autowired
	private BMR03GoodsPackingMeterialIssueRepository bmr03goodspackingmeterialissuerepository;

	@Autowired
	private DailyProductionCottonBallsF003Repository dailyProductionCottonBallsF003Repository;

	// ONLINE INSPECTION

	@Autowired
	private QaOnlineInspectionRepository onlineInspectionRepository;

	// FINAL INSPECTION

	@Autowired
	private FinalInspectionReportRepositoryF037 finalInspectionReportRepositoryF037;

	// SLIVE MAKING

	@Autowired
	private SliverMakingHeaderRepository sliverMakingHeaderRepository;

	@Autowired
	private SliverMakingLinesRepository sliverMakingLinesRepository;

	public ResponseEntity<?> getTraceblityBatchNo(String julianDay, String yearLastTwoDigits) {

		List<Map<String, Object>> getBatchNo;

		try {

			String date = bMR001GoodsProductionDetailsRepository.getDateFromJulianDay(julianDay, yearLastTwoDigits);

			System.out.println("date " + date);

			if (date == null || date.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given Julian Day and Year"),
						HttpStatus.BAD_REQUEST);
			}

			getBatchNo = bMR001GoodsProductionDetailsRepository.getBatchNo(date);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getBatchNo, HttpStatus.OK);
	}

	public ResponseEntity<?> productionDetailsPleat(String batchNo) {

		String formNo = "PH-PRD04/F-007";

		List<MinirollDetails> response = new ArrayList();

		List<GoodsAbCons> goodsAbcons = new ArrayList();

		List<List<BmrSummary>> bmrSummary = new ArrayList();

		Set<String> porderList = new HashSet<>();

		Set<String> bmrList = new HashSet<>();

		// ONLINE INSPECTION

		List<QaOnlineInspectionReport> onlineInspection = new LinkedList<QaOnlineInspectionReport>();

		// FINAL INSPECTION

		List<FinalInspectionReportF037> finalInspection = new LinkedList<FinalInspectionReportF037>();

		List<Object[]> results = bMR001GoodsProductionDetailsRepository.getByBatchNo(formNo, batchNo);

		GoodsProdDetails dto = new GoodsProdDetails();

		results.stream().map(result -> {
			dto.setBatch_no((String) result[0]);
			dto.setPorder((String) result[1]);
			dto.setProduct((String) result[2]);
			dto.setProd_qty_bag((String) result[3]);
			dto.setProd_qty_box((String) result[4]);
			dto.setPo_no((String) result[5]);
			dto.setMachine_no((String) result[6]);
			dto.setStart_date((String) result[7]);
			dto.setEnd_date((String) result[8]);
			return dto;
		}).collect(Collectors.toList());

		String porder = dto.getPorder();
		String startDate = dto.getStart_date();
		String endDate = dto.getEnd_date();

		System.out.println(" ************************************************************** Data " + porder + " "
				+ startDate + " " + endDate + " **************************************************************");

		List<MiniRoll> minirollResponse = miniRollRepository.getDateAndShift(porder, startDate, endDate);

		System.out.println(" ************************************************************** miniroll "
				+ minirollResponse + " **************************************************************");

		for (MiniRoll miniroll : minirollResponse) {
			MinirollDetails res = new MinirollDetails();

			String date = miniroll.getDate();
			String shiftRoman = miniroll.getShift();
			String shift = null;

			if (shiftRoman.equalsIgnoreCase("I"))
				shift = "1";
			else if (shiftRoman.equalsIgnoreCase("II"))
				shift = "2";
			else if (shiftRoman.equalsIgnoreCase("III"))
				shift = "3";

			System.out.println(
					" ******************************** shift " + shift + "Date " + date + " ********************");
			res.setLaydown(miniroll.getLaydown_no());
			res.setProd_date(miniroll.getDate());

			List<Map<String, Object>> productionMiniRollPde = productChangeOverRepositoryF09
					.getProductionMiniROllTrace(date, shift);

			res.setDetails(productionMiniRollPde);

			for (Map<String, Object> roll : productionMiniRollPde) {
				String pOrder = (String) roll.get("POrder");

				if (pOrder != null && !pOrder.isEmpty()) {

					System.out.println(" ******************************** porder (String)roll.get(POrder) "
							+ (String) roll.get("POrder") + " ********************");

					porderList.add(pOrder);

				}
			}

			for (String orderNo : porderList) {

				List<String> baleList = bMR001GoodsProductionDetailsRepository.getBaleByOrder(orderNo);

				for (String bale : baleList) {
					System.out.println(" ******************************** bale " + bale + " ********************");
					GoodsAbCons abcons = new GoodsAbCons();
					abcons.setBale(bale);

					Map<String, Object> bmrNetWt = bMR001GoodsProductionDetailsRepository.getBmrByBale(bale);
					if (bmrNetWt != null) {

						String bmrNo = (String) bmrNetWt.get("bmr_no");
						BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");

						System.out.println(" ******************************** netwt " + netWt + " bmr " + bmrNo
								+ " ********************");
						abcons.setNewWt(netWt);
						abcons.setBmr(bmrNo);

						bmrList.add(bmrNo);

						if (bmrNo != null) {
							String laydown = bMR001GoodsProductionDetailsRepository.getLaydownByBmr(bmrNo);
							abcons.setLaydown(laydown);

							List<String> subBatch = bMR001GoodsProductionDetailsRepository.getBatchByBmr(bmrNo);
							abcons.setBatchNo(subBatch);

							List<String> rmBatch = bMR001GoodsProductionDetailsRepository.getRmBatchByLaydown(laydown);
							abcons.setRmBatch(rmBatch);

							System.out.println(" ******************************** laydown " + laydown + " subbatch "
									+ subBatch + " ********************");
							System.out.println(
									" ******************************** rmbatch " + rmBatch + " ********************");
						}
					}
					goodsAbcons.add(abcons);
				}
			}

			response.add(res);
		}

		for (String bmr : bmrList) {
			List<BmrSummary> summary = bleachBmrSummaryRepository.getSummaryByBMR(bmr);
			bmrSummary.add(summary);
		}

		onlineInspection = onlineInspectionRepository.onlineInspectionTraceForPleat(batchNo);

		finalInspection = finalInspectionReportRepositoryF037.finalInspectionTraceForpleat(batchNo);

		// Fetch Packing Meterials

		List<BMR03GoodsPackingMeterialIssue> packingMeterialDetails = bmr03goodspackingmeterialissuerepository
				.getDetailsTrace(batchNo, formNo);

		Map<String, Object> finalResponse = new HashMap();
		finalResponse.put("productionDetails", dto);
		finalResponse.put("PackingMeterial", packingMeterialDetails);
		finalResponse.put("minirollDetails", response);
		finalResponse.put("abCons", goodsAbcons);
		finalResponse.put("chemicalDetails", bmrSummary);

		finalResponse.put("onlineInspection", onlineInspection);
		finalResponse.put("finalInspection", finalInspection);

		return new ResponseEntity<>(finalResponse, HttpStatus.OK);

	}

	/////////

	public ResponseEntity<?> getTraceblityWollRoll(String julianDay, String yearLastTwoDigits) {

		List<Map<String, Object>> getBatchNo;

		try {

			String date = bMR001GoodsProductionDetailsRepository.getDateFromJulianDay(julianDay, yearLastTwoDigits);

			System.out.println("date " + date);

			if (date == null || date.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given Julian Day and Year"),
						HttpStatus.BAD_REQUEST);
			}

			getBatchNo = bMR001GoodsProductionDetailsRepository.getBatchNoWoll(date);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getBatchNo, HttpStatus.OK);
	}

	public ResponseEntity<?> productionDetailsWollRoll(String batchNo) {

		String formNo = "PH-PRD04/F-008";

		List<MinirollDetails> response = new ArrayList();

		List<GoodsAbCons> goodsAbcons = new ArrayList();

		List<List<BmrSummary>> bmrSummary = new ArrayList();

		Set<String> porderList = new HashSet<>();

		Set<String> bmrList = new HashSet<>();

		// ONLINE INSPECTION

		List<QaOnlineInspectionReport> onlineInspection = new LinkedList<QaOnlineInspectionReport>();

		// FINAL INSPECTION

		List<FinalInspectionReportF037> finalInspection = new LinkedList<FinalInspectionReportF037>();

		List<Object[]> results = bMR001GoodsProductionDetailsRepository.getByBatchNo(formNo, batchNo);

		GoodsProdDetails dto = new GoodsProdDetails();

		results.stream().map(result -> {
			dto.setBatch_no((String) result[0]);
			dto.setPorder((String) result[1]);
			dto.setProduct((String) result[2]);
			dto.setProd_qty_bag((String) result[3]);
			dto.setProd_qty_box((String) result[4]);
			dto.setPo_no((String) result[5]);
			dto.setMachine_no((String) result[6]);
			dto.setStart_date((String) result[7]);
			dto.setEnd_date((String) result[8]);
			return dto;
		}).collect(Collectors.toList());

		String porder = dto.getPorder();
		String startDate = dto.getStart_date();
		String endDate = dto.getEnd_date();

		System.out.println(" ************************************************************** Data " + porder + " "
				+ startDate + " " + endDate + " **************************************************************");

		List<MiniRoll> minirollResponse = miniRollRepository.getDateAndShift(porder, startDate, endDate);

		System.out.println(" ************************************************************** miniroll "
				+ minirollResponse + " **************************************************************");

		for (MiniRoll miniroll : minirollResponse) {
			MinirollDetails res = new MinirollDetails();

			String date = miniroll.getDate();
			String shiftRoman = miniroll.getShift();
			String shift = null;

			if (shiftRoman.equalsIgnoreCase("I"))
				shift = "1";
			else if (shiftRoman.equalsIgnoreCase("II"))
				shift = "2";
			else if (shiftRoman.equalsIgnoreCase("III"))
				shift = "3";

			System.out.println(
					" ******************************** shift " + shift + "Date " + date + " ********************");
			res.setLaydown(miniroll.getLaydown_no());
			res.setProd_date(miniroll.getDate());

			List<Map<String, Object>> productionMiniRollPde = productChangeOverRepositoryF09
					.getProductionMiniROllTrace(date, shift);

			res.setDetails(productionMiniRollPde);

			for (Map<String, Object> roll : productionMiniRollPde) {
				String pOrder = (String) roll.get("POrder");

				if (pOrder != null && !pOrder.isEmpty()) {

					System.out.println(" ******************************** porder (String)roll.get(POrder) "
							+ (String) roll.get("POrder") + " ********************");

					porderList.add(pOrder);

				}
			}

			for (String orderNo : porderList) {

				List<String> baleList = bMR001GoodsProductionDetailsRepository.getBaleByOrder(orderNo);

				for (String bale : baleList) {
					System.out.println(" ******************************** bale " + bale + " ********************");
					GoodsAbCons abcons = new GoodsAbCons();
					abcons.setBale(bale);

					Map<String, Object> bmrNetWt = bMR001GoodsProductionDetailsRepository.getBmrByBale(bale);
					if (bmrNetWt != null) {

						String bmrNo = (String) bmrNetWt.get("bmr_no");
						BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");

						System.out.println(" ******************************** netwt " + netWt + " bmr " + bmrNo
								+ " ********************");
						abcons.setNewWt(netWt);
						abcons.setBmr(bmrNo);

						bmrList.add(bmrNo);

						if (bmrNo != null) {
							String laydown = bMR001GoodsProductionDetailsRepository.getLaydownByBmr(bmrNo);
							abcons.setLaydown(laydown);

							List<String> subBatch = bMR001GoodsProductionDetailsRepository.getBatchByBmr(bmrNo);
							abcons.setBatchNo(subBatch);

							List<String> rmBatch = bMR001GoodsProductionDetailsRepository.getRmBatchByLaydown(laydown);
							abcons.setRmBatch(rmBatch);

							System.out.println(" ******************************** laydown " + laydown + " subbatch "
									+ subBatch + " ********************");
							System.out.println(
									" ******************************** rmbatch " + rmBatch + " ********************");
						}
					}
					goodsAbcons.add(abcons);
				}
			}

			response.add(res);
		}

		for (String bmr : bmrList) {
			List<BmrSummary> summary = bleachBmrSummaryRepository.getSummaryByBMR(bmr);
			bmrSummary.add(summary);
		}
		onlineInspection = onlineInspectionRepository.onlineInspectionTraceForWoll(batchNo);

		finalInspection = finalInspectionReportRepositoryF037.finalInspectionTraceForWoll(batchNo);

		// Fetch Packing Meterials

		List<BMR03GoodsPackingMeterialIssue> packingMeterialDetails = bmr03goodspackingmeterialissuerepository
				.getDetailsTrace(batchNo, formNo);

		Map<String, Object> finalResponse = new HashMap();
		finalResponse.put("productionDetails", dto);
		finalResponse.put("PackingMeterial", packingMeterialDetails);
		finalResponse.put("minirollDetails", response);
		finalResponse.put("abCons", goodsAbcons);
		finalResponse.put("chemicalDetails", bmrSummary);

		finalResponse.put("onlineInspection", onlineInspection);
		finalResponse.put("finalInspection", finalInspection);

		return new ResponseEntity<>(finalResponse, HttpStatus.OK);

	}

	// VIJAY

	public ResponseEntity<?> getBallsTraceblityBatchNo(String julianDay, String yearLastTwoDigits) {

		List<Map<String, Object>> getBatchNo;

		try {

			String date = bMR001GoodsProductionDetailsRepository.getDateFromJulianDay(julianDay, yearLastTwoDigits);

			if (date == null || date.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given Julian Day and Year"),
						HttpStatus.NOT_FOUND);
			}

			getBatchNo = bMR001GoodsProductionDetailsRepository.getBatchNoBalls(date);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getBatchNo, HttpStatus.OK);
	}

	public ResponseEntity<?> ballsTraceabilityByBatchNumber(String batchNumber) {

		BMR001GoodsProductionDetails productionDetails = new BMR001GoodsProductionDetails();

		List<BMR03GoodsPackingMeterialIssue> packingMaterial = new LinkedList<BMR03GoodsPackingMeterialIssue>();

		// ONLINE INSPECTION

		List<QaOnlineInspectionReport> onlineInspection = new LinkedList<QaOnlineInspectionReport>();

		// FINAL INSPECTION

		List<FinalInspectionReportF037> finalInspection = new LinkedList<FinalInspectionReportF037>();

		List<DailyProductionCottonBallsF003> sliverHeaderList = new LinkedList<DailyProductionCottonBallsF003>();

		List<SliverReceiptDetailsF003> sliverProductionLine = new LinkedList<SliverReceiptDetailsF003>();

		// SLIVER MAKING

		List<SliverMakingHeader> sliverMakingHeader = new LinkedList<SliverMakingHeader>();

		List<SliverMakingLines> sliverMakingLines = new LinkedList<SliverMakingLines>();

		List<GoodsAbCons> goodsAbcons = new ArrayList();

		Set<String> bmrList = new HashSet<>();

		List<List<BmrSummary>> bmrSummary = new ArrayList();

		BallsTraceabilityRequest traceabilityRequest = new BallsTraceabilityRequest();

		try {

			productionDetails = bMR001GoodsProductionDetailsRepository.productionDetailsByBatchNumber(batchNumber);

			packingMaterial = bmr03goodspackingmeterialissuerepository.getPackingMaterialDetails(batchNumber);

			// GET ORDER, FROM DATE AND TO DATE FOR FETCHING SLIVER PRODUCTION

			String orderNumber = "";
			String fromDate = "";
			String toDate = "";

			if (productionDetails != null)

			{

				orderNumber = productionDetails.getOrder_no();

				fromDate = productionDetails.getStart_date();

				toDate = productionDetails.getEnd_date();

			}

			sliverHeaderList = dailyProductionCottonBallsF003Repository.get(orderNumber, fromDate, toDate);

			Set<String> orderNoSet = new HashSet<>();

			List<BallsTraceabilityRequest.SliverLineDetails> sliverLineDetailsList = new LinkedList<>();

			// Process each sliver header
			for (DailyProductionCottonBallsF003 header : sliverHeaderList) {
				List<SliverReceiptDetailsF003> sliverReceiptDetails = header.getSliverreceiptdetails();

				// Process each sliver receipt detail
				for (SliverReceiptDetailsF003 receipt : sliverReceiptDetails) {

					String canNo = receipt.getCan_no();
					String cardingMcNo = String.valueOf(receipt.getCarding_mc_no());

					// Fetch sliver making lines in bulk if possible
					sliverMakingLines = sliverMakingLinesRepository.getOrder(canNo, cardingMcNo);

					// Process sliver making lines
					for (SliverMakingLines line : sliverMakingLines) {
						List<SliverMakingHeader> headers = sliverMakingHeaderRepository.getData(line.getSliver_id());

						// Map sliver making headers to DTO
						for (SliverMakingHeader sliverHeader : headers) {

							BallsTraceabilityRequest.SliverLineDetails details = mapToSliverLineDetails(line,
									sliverHeader);

							sliverLineDetailsList.add(details);

							orderNoSet.add(sliverHeader.getOrder_no());
						}
					}
				}
			}

			for (String orderNo : orderNoSet) {

				List<String> baleList = bMR001GoodsProductionDetailsRepository.getBaleByOrder(orderNo);

				for (String bale : baleList) {
					GoodsAbCons abcons = new GoodsAbCons();
					abcons.setBale(bale);

					Map<String, Object> bmrNetWt = bMR001GoodsProductionDetailsRepository.getBmrByBale(bale);
					if (bmrNetWt != null) {

						String bmrNo = (String) bmrNetWt.get("bmr_no");
						BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");

						System.out.println(" ******************************** netwt " + netWt + " bmr " + bmrNo
								+ " ********************");

						abcons.setNewWt(netWt);
						abcons.setBmr(bmrNo);

						bmrList.add(bmrNo);

						if (bmrNo != null) {
							String laydown = bMR001GoodsProductionDetailsRepository.getLaydownByBmr(bmrNo);
							abcons.setLaydown(laydown);

							List<String> subBatch = bMR001GoodsProductionDetailsRepository.getBatchByBmr(bmrNo);
							abcons.setBatchNo(subBatch);

							List<String> rmBatch = bMR001GoodsProductionDetailsRepository.getRmBatchByLaydown(laydown);
							abcons.setRmBatch(rmBatch);

							System.out.println(" ******************************** laydown " + laydown + " subbatch "
									+ subBatch + " ********************");
							System.out.println(
									" ******************************** rmbatch " + rmBatch + " ********************");
						}
					}

					goodsAbcons.add(abcons);

				}
			}

			// CHEMICAL

			for (String bmr : bmrList) {
				List<BmrSummary> summary = bleachBmrSummaryRepository.getSummaryByBMR(bmr);

				bmrSummary.add(summary);
			}

			onlineInspection = onlineInspectionRepository.onlineInspectionTraceForBalls(batchNumber);

			finalInspection = finalInspectionReportRepositoryF037.finalInspectionTraceForBalls(batchNumber);

			traceabilityRequest.setProductionDetails(productionDetails);
			traceabilityRequest.setPackingMaterial(packingMaterial);
			traceabilityRequest.setSliverLineDetails(sliverLineDetailsList);
			traceabilityRequest.setOnlineInspection(onlineInspection);
			traceabilityRequest.setFinalInspection(finalInspection);
			traceabilityRequest.setGoodsAbcons(goodsAbcons);
			traceabilityRequest.setBmrSummary(bmrSummary);

			return ResponseEntity.status(HttpStatus.OK).body(traceabilityRequest);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("Unable to get Buds Traceability Details: " + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get buds traceability records: " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	private BallsTraceabilityRequest.SliverLineDetails mapToSliverLineDetails(SliverMakingLines line,
			SliverMakingHeader header) {

		BallsTraceabilityRequest.SliverLineDetails details = new BallsTraceabilityRequest.SliverLineDetails();
		details.setCanNo(line.getCan_no());
		details.setCardingMcNo(line.getCarding_mc_no());
		details.setNetWt(line.getNet_wt());
		details.setGpm(line.getGpm());
		details.setProd_date(header.getDate());
		details.setOrderNo(header.getOrder_no());
		details.setLaydownNo(header.getLaydown_no());

		return details;
	}

}
