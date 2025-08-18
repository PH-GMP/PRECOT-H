package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationListF41;

@Repository
public interface BleachSanitizationListF41Repository extends JpaRepository<BleachSanitizationListF41, Long> {

	// BLEACHING

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE LAY_DOWN_START_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long laydownChecklistCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

//	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
//	long appliedRawCottonCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 " +
            "WHERE DATE BETWEEN :fromDate AND :toDate", 
    nativeQuery = true)
long appliedRawCottonCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);


	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long contaminationChecking(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long metalDetector(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE START_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long carding(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE START_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long cakepress(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_JOB_CARD_F13 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long jobcard(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11 WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long hydroExtractor(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long sanitationMachines(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long handSanitation(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_F08 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long appliedAbCotton(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long contaminationAbCotton(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_SHIFT_LOGBOOK_F36 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long shiftLogbook(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long machineChangeOver(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long wasteBale(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long machineCleaning(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long housekeeping2(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long housekeeping2A(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	/**
	 * SPULANCE
	 */

	@Query(value = "SELECT COUNT(*) FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splBaleConsumption(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splProcessSetupF02(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splProcessSetupF03(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE CONVERT(DATE, [DATE], 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splFilterBag(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splWinterF05(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	// F06-F010

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splProduction(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splRejection(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splStoppageF08(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splMahloF09(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splLogbookF010(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	// F011-F015

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splProductChangeOver(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_SAMPLE_REPORT_F012 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splReportSample(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

//	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_F013 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
//	long splSetupVerifyF13(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_F013 " +
            "WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", 
    nativeQuery = true)
long splSetupVerifyF13(@Param("fromDate") String fromDate, @Param("toDate") String toDate);


	@Query(value = "SELECT COUNT(*) FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splRpProdF14(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splStoppageF015(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	// F016-F020

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splSetupVerifyF16(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_F017 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splSetupVerifyF17(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splStoppageF018(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splWasteF019(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splMetalF20(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	// F021-F023

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splmachineCleanF023(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splMachineSanityF024(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long splhandSanityF025(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	/**
	 * PAD PUNCHING
	 */

	// F001 - F005

//	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
//	long punchBagMakingF01(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 " +
            "WHERE CONVERT(DATE, [DATE], 103) BETWEEN :fromDate AND :toDate", 
    nativeQuery = true)
long punchBagMakingF01(@Param("fromDate") String fromDate, @Param("toDate") String toDate);


	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchRollConsumptionF02(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchProdChangeOverF03(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchDailyProdF04(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchMachineCleanF05(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	// F006 - F010

	@Query(value = "SELECT COUNT(*) FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchHandSanitationF06(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchMetalDetectF07(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchMachineSanityF08(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchHousekeepingF09(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchLogbookF10(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	
	
	// F011-F013 - BAG MAKING 
	
	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F26 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long houseKeepingBag(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchSpecification(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long punchLogbookF01(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	
	
		/**
		 * DRY GOODS
		 */
	
	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsBaleCons(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_SLIVER_MAKING WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsSliverMake(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsCottonballs(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.MINI_ROLL_F05 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsMiniRoll(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsPleatWoll(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsProductChange(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_LOGBOOK_DETAILS WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsLogbookDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsTransferRecordF011(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	
	@Query(value = "SELECT COUNT(*) FROM precot.DRYGOODS_MC_SANITIZATION WHERE EXP_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsSanitationDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	
	@Query(value = "SELECT COUNT(*) FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsHandSanitationDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	@Query(value = "SELECT COUNT(*) FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
	long goodsHouseKeepingDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	
	/**
	 * QUALITY CONTROL
	 */
	
	// Absorbent Bleached Cotton Parent
    @Query(value = "SELECT COUNT(*) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE TESTED_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAbsorbentBleachedCottonParent(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Raw Cotton Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countRawCottonAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Absorbent Bleached Cotton
    @Query(value = "SELECT COUNT(*) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005 WHERE TESTED_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAbsorbentBleachedCotton(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Chemical Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countChemicalAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Exfoliating Fabric Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE TESTED_ON BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countExfoliatingFabricAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Finished Product Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE TESTED_ON BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countFinishedProductAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Water Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWaterAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Fumigation and Microbiological Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 WHERE FUMIGATION_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countFumigationAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Distilled Water Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDistilledWaterAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Potable Water Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 WHERE SAMPLED_ON BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countPotableWaterAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Briquettes Analysis
    @Query(value = "SELECT COUNT(*) FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBriquettesAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Sample Inward Book (F001)
    @Query(value = "SELECT COUNT(*) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F001 BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSampleInwardBookF001(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Sample Inward Book (F002)
    @Query(value = "SELECT COUNT(*) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F002 BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSampleInwardBookF002(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Sample Inward Book (F003)
    @Query(value = "SELECT COUNT(*) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F003 BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSampleInwardBookF003(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Raw Cotton Consolidated Report
    @Query(value = "SELECT COUNT(*) FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countRawCottonConsolidated(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Absorbent Bleached Cotton Consolidated Report
    @Query(value = "SELECT COUNT(*) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAbsorbentBleachedCottonConsolidated(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // pH Meter Calibration
    @Query(value = "SELECT COUNT(*) FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countPhMeterCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Weighing Scale Calibration
    @Query(value = "SELECT COUNT(*) FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWeighingScaleCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // TDS Meter Calibration
    @Query(value = "SELECT COUNT(*) FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTdsmeterCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Turbidity Calibration
    @Query(value = "SELECT COUNT(*) FROM precot.TURBIDITY_CALIBRATION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTurbidityCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Wira Fiber Fineness Tester
    @Query(value = "SELECT COUNT(*) FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWiraFiberFinenessTester(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Spectrophotometer Report
    @Query(value = "SELECT COUNT(*) FROM precot.SPECTROPHOTOMETR_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSpectrophotometrReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Standardization of Chemical Report F016
    @Query(value = "SELECT COUNT(*) FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countStandarizationChemicalReportF016(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Reagent Preparation Record F017
    @Query(value = "SELECT COUNT(*) FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE PREPARATION_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countReagentPreparationRecordF017(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Shelf Life Period Report F026
    @Query(value = "SELECT COUNT(*) FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE TESTING_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countShelfLifePeriodPhycicalChemMicroF026(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Distilled Water Consumption Report
    @Query(value = "SELECT COUNT(*) FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDistilledWaterConsumptionReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    // Glasswares Breakage & Disposal Register F028
    @Query(value = "SELECT COUNT(*) FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE BRAKAGE_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countGlasswaresBreakageDisposalRegisterF028(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    	// MISSED TABLES
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE PREPARATION_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMediaPreparationRecord(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 WHERE SAMPLED_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMicrobiologicalAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.MEDIA_GROWTH_DETAILS WHERE EXPIRY_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMediaGrowthDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.MEDIA_DISPOSAL_RECORD WHERE DISPOSED_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMediaDisposalRecord(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCleaningOfAutoclaves(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.FUNGAL_INCUBATOR_TEMPERATURE_CALIBRATION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTemperatureCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBacterialCalibration(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    

    @Query(value = "SELECT COUNT(*) FROM precot.COA_AB_COTTON_F26 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonAB(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_COTTON_PADS_F26A WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26A(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_COTTON_BALLS_F26B WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26B(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26C(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26D(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26E(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26F(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.COA_MOISTURE_F26G WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCOAForCottonF26G(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.REQUISITION_SAMPLE_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countReqSampleReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE createdAt BETWEEN :fromDate AND :toDate AND FORMAT_NO = 'PH-QCL01-AR-F-009'", nativeQuery = true)
    long countswabMicrobilogy(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE createdAt BETWEEN :fromDate AND :toDate AND FORMAT_NO = 'PH-QCL01-AR-F-008'", nativeQuery = true)
    long countswabMicrobilogyMachine(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.SWAB_MICROBIOLOGICAL_DETAILS WHERE TEST_COMPLETION_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countswabMicrobilogyDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.WIRA_FIBER_DETAILS WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWiraFiberReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBacterialTempReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.FUNGAL_INCUBATOR_TEMPERATURE_CALIBRATION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countFungalTempReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countChemicalIndicatorTempReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBiologicalIndicatorTempReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.DIGITAL_COLONY_COUNTER_F030 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDigitalColonyCounterTempReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.DISPOSAL_RECORD WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDisposalReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWovenReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countFabricReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * STORE
     */
    
    
    @Query(value = "SELECT COUNT(*) FROM PDE.precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long receptionChecklist(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long nonReturnableGatePass(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long forkliftMovementChecklist(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long eyeWashChecklist(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * COTTON BUDS
     */
    
    @Query(value = "SELECT COUNT(*) FROM PDE.precot.BUDS_EQUIPMENT_USUAGE_HEADER WHERE EQUIPMENT_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long equipmentUsageLogbook(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.BUDS_LOGBOOK_HEADER WHERE LOG_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long logBook(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE MACHINE_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long dailyProductionSliverMaking(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.BUDS_PRODUCT_CHANGE_OVER WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long productChangeOver(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM PDE.precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE BETWEEN :fromDate AND :toDate AND DEPT_NAME = 'COTTON_BUDS'", nativeQuery = true)
    long finalInspectionReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * PPC
     */
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long contractReviewMeetingCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE CONVERT(DATE, DATE, 103) BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long monthlyPlanSummaryCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long preProductionsCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * DISPATCH
     */
    
    @Query(value = "SELECT COUNT(*) FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long dispatchCount(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * QUALITY ASSURANCE
     */
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_MANAGEMENT_OF_INCIDENCE WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countManagementOfIncidence(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countRequestAndIssuanceOfDocument(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDistributionAndDestructionRecord(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTrainingNeedIdentification(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_TRAINING_CALENDAR WHERE UPDATED_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTrainingCalendar(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_TRAINING_CARD WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTrainingCard(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_TRAINING_QUESTIONNAIRE WHERE TRAINING_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTrainingQuestionnaire(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_INTERNAL_AUDIT_SCHEDULE WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countInternalAuditSchedule(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_INTERNAL_AUDIT_REPORT WHERE REPORT_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countInternalAuditReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_INTERNAL_AUDIT_NC_REPORT WHERE REPORT_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countInternalAuditNCReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_ANNUAL_PLAN WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAnnualPlan(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    	// F15 - F029
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAgendaForManagementReviewMeeting(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_MINUTES_OF_MRM WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMinutesOfMRM(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCustomerComplaintRegisterForm(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_NON_CONFORMITY_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countNonConformityReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_SUPPLIER_AUDIT_PLAN WHERE createdAt BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSupplierAuditPlan(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_SUPPLIER_AUDIT_REPORT WHERE REPORT_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSupplierAuditReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_SUMMARY_OF_TRACEBILITY WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countSummaryOfTraceability(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.TEMPLATE_FOR_RECALL WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTemplateForRecall(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.MOM_MOC_RECALL_TBL WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMOMMOCRecallTbl(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_ANNUAL_PRODUCT_REVIEW WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countAnnualProductReview(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.NEW_SAMPLE_REQUEST_F029 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countNewSampleRequest(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    	// F030 - F045
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-029'", nativeQuery = true)
    long countInwardInspectionReport1(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-030'", nativeQuery = true)
    long countInwardInspectionReport2(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-031'", nativeQuery = true)
    long countInwardInspectionReport3(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-032'", nativeQuery = true)
    long countInwardInspectionReport4(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-033'", nativeQuery = true)
    long countInwardInspectionReport5(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
//    @Query(value = "SELECT COUNT(*) FROM precot.QA_INWARD_INSPECTION_REPORT WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-QAD01-F-034'", nativeQuery = true)
//    long countInwardInspectionReport6(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countOnlineInspectionReportF034(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE BETWEEN :fromDate AND :toDate AND DEPT_NAME = 'QUALITY_ASSURANCE'", nativeQuery = true)
    long countFinalInspectionReportF037(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countContainerInspectionReportF039(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countProductionRetainedSampleRegisterParent(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.CHANGE_CONTROLL_LOG_BOOK_DETAILS WHERE CHANGE_INTIATION_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countChangeControlLogBookDetails(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_CHANGE_CONTROL_FORM WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countChangeControlForm(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countQualityReviewMeetingsF043(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_CORRECTIVE_ACTION_REPORT WHERE REPORT_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countCorrectiveActionReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBmrIssueRegisterF045(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_BATCH_RELEASE_NOTE_HEADER WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBatchReleaseNoteHeader(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    	// F046- F060
    
    @Query(value = "SELECT COUNT(*) FROM precot.BATCH_RELEASE_CHECKLIST WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBatchReleaseChecklist(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_DEVIATION_FORM WHERE DATE_OF_INITIATION BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countDeviationForm(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countProductDispositionLogbookF049(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.LIST_OF_GHPWC WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countListOfGHPWC(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.CONTROL_OF_GHPWC WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countControlOfGHPWC(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_BREAKAGE_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBreakageReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMetalDetectorCalibrationRecords(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMetalDetectorPassReport(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countMasterListOfSharpToolsF060(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_LIST_OF_SHARP_TOOLS WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countListOfSharpTools(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countTrainingSessionAllotmentRegister(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    
    	// QA - HR FORMS
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_RODENT_BOX_CHECK_LIST WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countRodentCheckbox(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-014'", nativeQuery = true)
    long countPestController14(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-015'", nativeQuery = true)
    long countPestController15(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-016'", nativeQuery = true)
    long countPestController16(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-017'", nativeQuery = true)
    long countPestController17(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-018'", nativeQuery = true)
    long countPestController18(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    @Query(value = "SELECT COUNT(*) FROM precot.QA_PEST_CONTROLLER WHERE DATE BETWEEN :fromDate AND :toDate AND FORMAT_NO='PH-HRD01-F-019'", nativeQuery = true)
    long countPestController19(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    /**
     * ENGINEERING
     */
    
    
    @Query(value = "SELECT COUNT(*) FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countBreakdownIntimationSlip(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countRootCauseAnalysis(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 WHERE DATE_OF_REQUEST BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWorkOrderRequestForm(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

    @Query(value = "SELECT COUNT(*) FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    long countWeighingScalesCalibrationRecord(@Param("fromDate") String fromDate, @Param("toDate") String toDate);
    
    
    
	
}
