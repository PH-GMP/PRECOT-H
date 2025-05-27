package com.focusr.Precot.mssql.database.service.padpunching;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.payload.PunchingTracebilityPayload;
import com.focusr.Precot.QA.repository.FinalInspectionReportRepositoryF037;
import com.focusr.Precot.QA.repository.QaOnlineInspectionRepository;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.PadPunchingTracebilityRepo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.drygoods.GoodsAbCons;
import com.focusr.Precot.util.drygoods.RpBalePayload;

@Service
public class PadPunchingTracebilityService {
	Logger logger = LoggerFactory.getLogger(PunchingBmrService.class);

	@Autowired
	private PadPunchingTracebilityRepo padPunchingTracebility;

	@Autowired
	private QaOnlineInspectionRepository qaOnlineInspectionRepository;

	@Autowired
	private FinalInspectionReportRepositoryF037 finalInspectionReportRepositoryF037;

	@Autowired
	private BleachBmrSummaryRepository bleachBmrSummaryRepository;

//	Get datas from JulianDate

	public ResponseEntity<?> getTraceblityBatchNo(String julianDay, String yearLastTwoDigits) {

		List<Map<String, Object>> getBatchNo;

		try {

			String date = padPunchingTracebility.getDateFromJulianDay(julianDay, yearLastTwoDigits);

			if (date == null || date.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given Julian Day and Year"),
						HttpStatus.NOT_FOUND);
			}

			getBatchNo = padPunchingTracebility.getBatchNo(date);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Get Production Reconciliation Details: " + msg);
			ex.printStackTrace();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Reconciliation Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(getBatchNo, HttpStatus.OK);
	}

	public PunchingTracebilityPayload getCompleteTracebilityDetails(String batchNo) {
		PunchingTracebilityPayload payload = new PunchingTracebilityPayload();

		try {
			// Step 1: Get merged header details for Pad Punching Prod and Order Info
			List<Map<String, Object>> headerDetails = padPunchingTracebility.headerDetails(batchNo);
			
			String startDate = "";
			String endDate = "";

			if (headerDetails != null && !headerDetails.isEmpty()) {
				
				
				
				
				Map<String, Object> headerDetail = headerDetails.get(0); // Assuming one row is needed
				
				startDate = (String) headerDetail.get("startDate");
				endDate = (String) headerDetail.get("endDate");

				// Set values for the payload from merged header details
				payload.setOrderNo((String) headerDetail.get("orderNo"));

				payload.setProduct((String) headerDetail.get("product"));
				payload.setBmr((String) headerDetail.get("bmr"));
				payload.setBrand((String) headerDetail.get("brand"));
				payload.setPoNo((String) headerDetail.get("pOno"));
	            payload.setSaleOrder((BigDecimal) headerDetail.get("saleOrder"));
	            payload.setItemCode((BigDecimal) headerDetail.get("itemCode"));
				payload.setPattern((String) headerDetail.get("pattern"));
	            payload.setGsm((BigDecimal) headerDetail.get("gsm"));
	            payload.setPackedQty((Integer)headerDetail.get("packedQty"));
	            payload.setProductQty((Integer)headerDetail.get("productionQty"));
	            payload.setEdge((String) headerDetail.get("edge"));
			}

			// Step 2: Get Online Inspection Details using batchNo
			List<QaOnlineInspectionReport> onlineInspection = qaOnlineInspectionRepository
					.getDetailsOnlineInspection(batchNo);
			payload.setOnlineInspection(onlineInspection);

			// Step 3: Get Final Inspection Details using batchNo
			List<FinalInspectionReportF037> finalInspection = finalInspectionReportRepositoryF037
					.getDetailsByBmr(batchNo);
			payload.setFinalInspection(finalInspection);

			// Step 4: Get Packing Details using batchNo
			List<Map<String, Object>> packingDetails = padPunchingTracebility.getPackingDetails(batchNo);
			payload.setPackingDetails(packingDetails);

			// Step 5: Get Roll Consumption Details using orderNo
			List<Map<String, Object>> rollConsumptionDetails = padPunchingTracebility
					.getRollConsumptionDetails(payload.getOrderNo(), startDate, endDate);
			payload.setRollConsumptionDetails(rollConsumptionDetails);

			Set<String> bmrList = new HashSet<>();

			List<List<BmrSummary>> bmrSummary = new ArrayList();
			List<String> mixingDescriptionsList = new ArrayList<>(); // List to store Mixing Descriptions

			// Step 6: Fetch AB Cotton Details using the new GoodsAbCons class
			List<GoodsAbCons> abCottonDetails = new ArrayList<>();
			List<RpBalePayload> rpDetails = new ArrayList<>(); // New List for RP Bale using RpBalePayload

			// Fetch the BMR from rollConsumptionDetails
			if (payload.getRollConsumptionDetails() != null) {

				for (Map<String, Object> rollConsumption : payload.getRollConsumptionDetails()) {
					String bmr = (String) rollConsumption.get("bmr");
					System.out.println("Processing BMR from Roll Consumption: " + bmr);

					if (bmr != null) {
						// Fetch Bale Numbers using BMR as POrder
						List<String> baleNos = padPunchingTracebility.getBaleByOrder(bmr);
						System.out.println("Bale Numbers for BMR " + bmr + ": " + baleNos);

						// Loop through each BaleNo to fetch related details
						for (String baleNo : baleNos) {

							if (baleNo.startsWith("B")) {

								GoodsAbCons goodsAbCons = new GoodsAbCons();

								// Get BMR and Net Weight for the Bale
								Map<String, Object> bmrData = padPunchingTracebility.getBmrByBale(baleNo);
								System.out.println("BMR Data for Bale " + baleNo + ": " + bmrData);

                                //	          AbCotton             
								if (bmrData != null) {
									String bmrNo = (String) bmrData.get("bmr_no");
									System.out.println("Bmr :" + bmrNo);
									BigDecimal netWt = (BigDecimal) bmrData.get("NetWt");

									goodsAbCons.setBale(baleNo);
									goodsAbCons.setBmr(bmrNo);
									goodsAbCons.setNewWt(netWt);

									bmrList.add(bmrNo);
									// Get Laydown using BMR
									String laydownNo = null;
									if (bmrNo != null && !bmrNo.isEmpty()) {
										laydownNo = padPunchingTracebility.getLaydownByBmr(bmrNo);
									}
									System.out.println("Laydown No for BMR " + bmrNo + ": " + laydownNo);
									goodsAbCons.setLaydown(laydownNo);

									// Get Sub Batch using BMR
									List<String> subBatches = padPunchingTracebility.getBatchByBmr(bmrNo);
									System.out.println("Sub Batches for BMR " + bmrNo + ": " + subBatches);
									goodsAbCons.setBatchNo(subBatches);

									// Get RM Batch using Laydown
									List<String> rmBatches = padPunchingTracebility.getRmBatchByLaydown(laydownNo);
									System.out.println("RM Batches for Laydown " + laydownNo + ": " + rmBatches);
									goodsAbCons.setRmBatch(rmBatches);
								}

								// Add this Bale's details to AB Cotton details list
								abCottonDetails.add(goodsAbCons);

							}
							// RP BALE
							else if (baleNo.startsWith("R"))
							{
								RpBalePayload rpBale = new RpBalePayload();
								
//								Map<String, Object> bmrNetWt = padPunchingTracebility.getRpBale(baleNo);
								
								Map<String, Object> netWt = padPunchingTracebility.getRpBale(baleNo,bmr);
								
								System.out.println("************************************************************** baleNo " + baleNo
								+ "*************************************");
								
								
//								System.out.println("************************************************************** bale " + bmrNetWt.get("BaleNo") + "*************************************");
								System.out.println("************************************************************** netWt " + netWt + "*************************************");
								
//								String bale = (String) bmrNetWt.get("BaleNo");
//								BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");
								
//								String bale = (String) bmrNetWt.get("BaleNo");
//								BigDecimal netWt = (BigDecimal) bmrNetWt.get("NetWt");
								
//								System.out.println("************************************************************** bale " + bale + " netwt " + netWt + "*************************************");
								
								rpBale.setBaleNo(baleNo);
								rpBale.setNetWt(new BigDecimal(netWt.get("NetWt").toString()));
								rpBale.setBmrNo(bmr);
								
								String mixing = padPunchingTracebility.getRpBaletblOrderInfo(bmr);
								rpBale.setMixing(mixing);
								
								rpDetails.add(rpBale);
								
							}
						}

					}
//	             // Step 7: Fetch RP Bale Data using `RpBalePayload`
//                    List<String> rpBaleList = padPunchingTracebility.getRpBale(bmr);
//                    if (rpBaleList != null && !rpBaleList.isEmpty()) {
//                        for (String rpBale : rpBaleList) {
//                            RpBalePayload rpPayload = new RpBalePayload();
//                            Map<String, Object> rpBaleData = padPunchingTracebility.getBmrByBale(rpBale);
//
//                            if (rpBaleData != null) {
//                                BigDecimal newWt = (BigDecimal) rpBaleData.get("NetWt");
//
//                                rpPayload.setBale(rpBale);
//                                rpPayload.setNewWt(newWt);
//
//                                // Fetch BatchNo for RP Bale
//                                List<String> batchNos = padPunchingTracebility.getBatchByBmr(rpBale);
//                                rpPayload.setBatchNo(batchNos);
//
//                                // Fetch Mixing Details for RP Bale
//                                List<String> mixingDescriptions = padPunchingTracebility.getRpBaletblOrderInfo(rpBale);
//                                rpPayload.setMixing(mixingDescriptions);
//
//                                // Add to RP Details list
//                                rpDetails.add(rpPayload);
//                            }
//                        }
//                    }
				}
			}

			// Add the AB Cotton and RP Bale details to the payload
			payload.setAbCottonDetails(abCottonDetails);
			payload.setRpList(rpDetails); // Setting RP Bale details with RpBalePayload

			System.out.println("AB Cotton Details Added: " + abCottonDetails);
			System.out.println("RP Bale Details Added: " + rpDetails);

			// CHEMICAL: Fetch BMR Summary
			for (String bmr : bmrList) {
				List<BmrSummary> summary = bleachBmrSummaryRepository.getSummaryByBMR(bmr);
				bmrSummary.add(summary);
			}
			payload.setBmrSummary(bmrSummary);

			System.out.println("Final Payload: " + payload);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return payload;
	}
}
