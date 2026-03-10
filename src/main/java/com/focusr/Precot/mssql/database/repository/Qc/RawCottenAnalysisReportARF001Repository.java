package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.util.Qc.RawCottonFetchBatchNo;
import com.focusr.Precot.util.Qc.TblsupPayloadRawCottonAnalysis;

public interface RawCottenAnalysisReportARF001Repository extends JpaRepository<RawCottenAnalysisReportARF001, Long> {
    
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE ID = :id ", nativeQuery = true)
	RawCottenAnalysisReportARF001 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<RawCottenAnalysisReportARF001> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE MILL_BATCH_NO=:millBatchNo", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByMillBatchNo(@Param("millBatchNo") String millBatchNo);
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE MILL_BATCH_NO=:millBatchNo AND CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByMillBatchNoFinalApproval(@Param("millBatchNo") String millBatchNo);
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE (CHEMIST_STATUS = 'CHEMIST_SAVED' OR MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED') AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByChemistOrMicroStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE ( CHEMIST_STATUS = 'CHEMIST_APPROVED' OR MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED'  ) AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByChemistAndMicroStatusSubmittedAndQcStatusNotApproved();

	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE DATE = :date AND MILL_BATCH_NO=:millBatchNo  ORDER BY ID DESC", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByDateNewF001(@Param("date") String date, @Param("millBatchNo") String millBatchNo);
	
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE MILL_BATCH_NO = :millBatchNo AND CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findByMillBatchNoForPrint(@Param("millBatchNo") String millBatchNo);

	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') OR QC_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findAll();
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE MILL_BATCH_NO = :millBatchNo ORDER BY ID DESC", nativeQuery = true)
	List<RawCottenAnalysisReportARF001> findAllDataByMillBatchNo(@Param("millBatchNo") String millBatchNo);
	
	
	/**
	 * QC SAP
	 */
	@Query(value = "SELECT Batchno AS batchNo, Suplier AS supplier, Noofbales AS noofBales, Invoice AS invoice, Weight AS weight, [Date] AS date, REGION AS region, Material AS material " +
            "FROM Tblsup WHERE MVT_TYPE = 101 AND STRG = 'rct1' AND Batchno = :PH", nativeQuery = true)
	List<TblsupPayloadRawCottonAnalysis> fetchPdeData(@Param("PH") String PH);
	
	@Query(value = "SELECT Batchno AS batchNo FROM tblrm WHERE mvt_type = 261 AND laydownno=:laydown_no", nativeQuery = true)
	List<RawCottonFetchBatchNo> FetchRawCottonBatchNo(@Param("laydown_no") String laydown_no);
	
	
	@Query(value = "SELECT Batchno AS batchNo, [Date] FROM tblrm", nativeQuery = true)
	List<Object[]> fetchAllBatchNumbersAndDatesOld();
	
	@Query(value = "SELECT Batchno AS batchNo FROM tblrm\r\n"
			+ "WHERE TRY_CAST([Date] AS DATE) >= DATEADD(DAY, -45, GETDATE());", nativeQuery = true)
	List<String> fetchAllBatchNumbersAndDates();
	
	// DASHBOARD
	
		//--001
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS !='QC_REJECTED' AND QC_STATUS != 'QA_REJECTED')  THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001", nativeQuery = true)
		List<Object[]> getRawCottonAnalysisReportStatusCounts();
		
		//--002
		
		@Query(value = "SELECT SUM(CASE WHEN qa_inspector_STATUS != 'QA_INSPECTOR_APPROVED' \r\n"
				+ "OR (QA_MNG_STATUS = 'QA_MANAGER_REJECTED' AND qa_inspector_STATUS ='QA_INSPECTOR_APPROVED')THEN 1 ELSE 0 END) AS qaInspectorCount,\r\n"
				+ "SUM(CASE WHEN QA_MNG_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT", nativeQuery = true)
		List<Object[]> getNonWovenFleeceAnalysisReportStatusCounts();
		
		
		//--003
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'OPERATOR_APPROVED'THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN INS_STATUS = 'WAITING_FOR_APPROVAL' OR INS_STATUS ='QA_INSPECTOR_SAVED' THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS_B = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS firstProductionManagerCount,\r\n"
				+ "SUM(CASE WHEN DEVELOP_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS developmentManagerCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.REQUISITION_SAMPLE_REPORT", nativeQuery = true)
		List<Object[]> getRequsitionSampleAnalysisReportStatusCounts();
		
		
		//--004
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN micro_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND micro_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN chemist_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.PHYSICAL_AND_CHEMCAL_TEST", nativeQuery = true)
		List<Object[]> getAbsorbmentBleachedCottonAnalysisReportStatusCounts();
		
		
		
		//--005   PH-QCL01-AR-F-008
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount  \r\n"
				+ "FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE FORMAT_NO = 'PH-QCL01-AR-F-008'", nativeQuery = true)
		List<Object[]> getFloorSwabReportStatusCounts();
		
		
		//--004   PH-QCL01-AR-F-009
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount  \r\n"
				+ "FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE FORMAT_NO = 'PH-QCL01-AR-F-009'", nativeQuery = true)
		List<Object[]> getHandlerSwabReportStatusCounts();
		
		
		//--004	  PH-QCL01-AR-F-010
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount  \r\n"
				+ "FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE FORMAT_NO = 'PH-QCL01-AR-F-010'", nativeQuery = true)
		List<Object[]> getMachineSwabReportStatusCounts();
		
		
		// -- -- INWARD BOOK 
		
		// -- -- PH-QCL01/F-001 -- --  Physical And Chemical Lab Sample Inward Book 
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' THEN 1 ELSE 0 END) AS chemistCount\r\n"
				+ "FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE FORMAT_NO = 'PH-QCL01/F-001'", nativeQuery = true)
		List<Object[]> getPhysicalAndChemicalLabSampleInwardBookStatusCounts();
		
		
		// -- -- PH-QCL01/F-002 --  Microbiology Lab Sample Inward Book
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' THEN 1 ELSE 0 END) AS microBiologistCount\r\n"
				+ "FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE FORMAT_NO = 'PH-QCL01/F-002'", nativeQuery = true)
		List<Object[]> getMicroBiologyLabSampleInwwardBookStatusCounts();
		
		
		// -- -- PH-QCL01/F-003 --  ETP Lab Sample Inward Book
		
		@Query(value = "SELECT SUM(CASE WHEN ETP_STATUS != 'ETP_APPROVED' THEN 1 ELSE 0 END) AS etpCount\r\n"
				+ "FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE FORMAT_NO = 'PH-QCL01/F-003'", nativeQuery = true)
		List<Object[]> getEtpLabSampleInwardBookStatusCounts();
		
		
		// --11  -- PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012", nativeQuery = true)
		List<Object[]> getBacterialIncubatorTempratureCalibrationReportStatusCounts();
		
		// --12 -- -- PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED' OR QC_STATUS = 'MICRO_DESIGNEE_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.FUNGAL_INCUBATOR_TEMPERATURE_CALIBRATION_REPORT", nativeQuery = true)
		List<Object[]> getFungalIncubatorTempratureCalibrationReportStatusCounts();
		
		
		// --13
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED' OR MANAGER_STATUS = 'MICRO_DESIGNEE_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014", nativeQuery = true)
		List<Object[]> getValidationForAutoclaveByChemicalIndicatorStatusCounts();
		
		// --14
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED' OR QC_STATUS = 'MICRO_DESIGNEE_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014", nativeQuery = true)
		List<Object[]> getValidationForAutoclaveByBiologicalIndicatorStatusCounts();
		
		// --15
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED' OR QC_STATUS = 'MICRO_DESIGNEE_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018", nativeQuery = true)
		List<Object[]> getTempratureRelativeHumidityRecordOfDryAndWetBulbStatusCounts();
		
		// --16
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED' OR MANAGER_STATUS = 'MICRO_DESIGNEE_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019", nativeQuery = true)
		List<Object[]> getMediaPreparationAndConsumptionRecordStatusCounts();
		
		// --17
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR (QC_STATUS = 'QC_REJECTED'  AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20", nativeQuery = true)
		List<Object[]> getMicroBiologicalAnalysisReportForMiscellaneousStatusCounts();
		
		// --18
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021", nativeQuery = true)
		List<Object[]> getMediaGrowthPromotionTestReportStatusCounts();
		
		// --19
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.MEDIA_DISPOSAL_RECORD", nativeQuery = true)
		List<Object[]> getMediaDisposalRecordStatusCounts();
		
		// --20
		
		@Query(value = "SELECT SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' THEN 1 ELSE 0 END) AS microBiologistCount\r\n"
				+ "FROM precot.QC_CLEANING_OF_AUTOCLAVESF023", nativeQuery = true)
		List<Object[]> getCleaningOfAutoClavesStatusCounts();
		
		
		// --21
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' OR chemist_STATUS != 'CHEMIST_APPROVED' THEN 1 ELSE 0 END) AS Count\r\n"
				+ "FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT", nativeQuery = true)
		List<Object[]> getDistilledWaterConsumptionReportStatusCounts();
		
		// --22
		
		@Query(value = "SELECT SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED' \r\n"
				+ "OR (MICRO_DESIGNEE_STATUS = 'MICRO_DESIGNEE_REJECTED' AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED')THEN 1 ELSE 0 END) AS microBiologistCount,\r\n"
				+ "SUM(CASE WHEN MICRO_DESIGNEE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS microDesigneeCount  \r\n"
				+ "FROM precot.DIGITAL_COLONY_COUNTER_F030", nativeQuery = true)
		List<Object[]> getDigitalColonyCounterCalibrationStatusCounts();
		
		// --23
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount  \r\n"
				+ "FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003", nativeQuery = true)
		List<Object[]> getChemicalAnalysisReportStatusCounts();
		
		// --24
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN micro_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND micro_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN chemist_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT", nativeQuery = true)
		List<Object[]> getExfoliatingFabricAnalysisReportStatusCounts();
		
		// --25
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICRO_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006", nativeQuery = true)
		List<Object[]> getFinishedProductAnalysisReportStatusCounts();
		
		
		// --26
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED' OR  QA_EXE_STATUS = 'QA_EXE_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN MICRO_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED') AND MICRO_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount, \r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'QA_EXE_APPROVED' AND MICRO_STATUS = 'MICROBIOLOGIST_APPROVED' AND MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.WATER_ANALYSIS_REPORT_F007", nativeQuery = true)
		List<Object[]> getWaterAnalysisReportStatusCounts();
		
		// --27
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED'OR (QC_STATUS = 'QC_REJECTED' AND chemist_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN micro_STATUS != 'MICROBIOLOGIST_APPROVED'OR (QC_STATUS = 'QC_REJECTED' AND micro_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN chemist_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011", nativeQuery = true)
		List<Object[]> getFumigationAndMicrobiologicalAnalysisForAirStatusCounts();
		
		// --28
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012", nativeQuery = true)
		List<Object[]> getDistilledWaterAnalysisReportStatusCounts();
		
		// --29
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED'OR (QC_STATUS = 'QC_REJECTED' AND chemist_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN micro_STATUS != 'MICROBIOLOGIST_APPROVED'OR (QC_STATUS = 'QC_REJECTED' AND micro_STATUS ='MICROBIOLOGIST_APPROVED') \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN chemist_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013", nativeQuery = true)
		List<Object[]> getPotableWaterAnalysisReportStatusCounts();
		
		// --30
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount  \r\n"
				+ "FROM precot.BRIQUETTES_ANALYSIS_REPORT", nativeQuery = true)
		List<Object[]> getBriquettesAnalysisReportStatusCounts();
		
		
		
		// --31
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004", nativeQuery = true)
		List<Object[]> getRawCottonConsolidatedAnalyticalReportStatusCounts();
		
		// --32
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' OR (QC_STATUS = 'QC_REJECTED'  AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT", nativeQuery = true)
		List<Object[]> getAbsorbentBleachedCottonConsolidatedAnalyticalReportStatusCounts();
		
		// --33
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED' OR MANAGER_STATUS = 'CHEMIST_DESIGNEE_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_PHMETER_CALIBRATION_REPORTF006", nativeQuery = true)
		List<Object[]> getPhMeterCalibrationReportStatusCounts();
		
		// --34
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT", nativeQuery = true)
		List<Object[]> getWeighingScaleCalibrationReportStatusCounts();
		
		// --35
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED' OR QC_STATUS = 'CHEMIST_DESIGNEE_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008", nativeQuery = true)
		List<Object[]> getTdsMeterCalibrationReportStatusCounts();
		
		// --36
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'CHEMIST_DESIGNEE_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.TURBIDITY_CALIBRATION_REPORT", nativeQuery = true)
		List<Object[]> getTurbidityCalibrationReportStatusCounts();
		
		// --37
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED' OR MANAGER_STATUS = 'CHEMIST_DESIGNEE_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010", nativeQuery = true)
		List<Object[]> getWiraFiberFitnessTesterCalibrationReportStatusCounts();
		
		// --38
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'CHEMIST_DESIGNEE_REJECTED') AND chemist_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.SPECTROPHOTOMETR_REPORT", nativeQuery = true)
		List<Object[]> getSpectroMeterCm3600aCalibrationReportStatusCounts();
		
		// --39
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'QC_REJECTED' OR MANAGER_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016", nativeQuery = true)
		List<Object[]> getStandardizationOfChemicalSolutionStatusCounts();
		
		// --40
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' \r\n"
				+ "OR ((MANAGER_STATUS = 'CHEMIST_DESIGNEE_REJECTED' OR MANAGER_STATUS = 'MICRO_DESIGNEE_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount  \r\n"
				+ "FROM precot.QC_REAGENT_PREPARATION_RECORD_F017", nativeQuery = true)
		List<Object[]> getReagentPreprationRecordStatusCounts();
		
		// --41
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND CHEMIST_STATUS ='CHEMIST_APPROVED')\r\n"
				+ "THEN 1 ELSE 0 END) AS chemistCount, \r\n"
				+ "SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED'OR ((QC_STATUS = 'QC_REJECTED' OR QC_STATUS = 'QA_REJECTED') AND MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED')  \r\n"
				+ "THEN 1 ELSE 0 END) AS microBiologistCount, \r\n"
				+ "SUM(CASE WHEN CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcStatus\r\n"
				+ "FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026", nativeQuery = true)
		List<Object[]> getShelfLifePeriodPhysicalAndChemicalAndMiceoTestingReportDataStatusCounts();
		
		// COA 
		
		// -- 42
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_AB_COTTON_F26", nativeQuery = true)
		List<Object[]> getCoaForAbsorbentBleachedCottonStatusCounts();
		
		// -- 43
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_COTTON_PADS_F26A", nativeQuery = true)
		List<Object[]> getCoaForCottonPadsStatusCounts();
		
		// -- 44
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_COTTON_BALLS_F26B ;", nativeQuery = true)
		List<Object[]> getCoaForCottonBallsStatusCounts();
		
		// -- 45
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_COTTON_WOOL_ROOL_F26C", nativeQuery = true)
		List<Object[]> getCoaForCottonWoolRollStatusCounts();
		
		// -- 46
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_COTTON_WOOL_PLEAT_F26D", nativeQuery = true)
		List<Object[]> getCoaForCottonPleatStatusCounts();
		
		// -- 47
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_COTTON_ROLL_GOODS_F26E", nativeQuery = true)
		List<Object[]> getCoaForCottonRollGoodsStatusCounts();
		
		// -- 48
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_INFUSED_COTTON_PADS_F26F", nativeQuery = true)
		List<Object[]> getCoaForInfusedCottonPadsStatusCounts();
		
		// -- 49
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED'\r\n"
				+ "OR ((QA_EXE_STATUS = 'QA_EXE_REJECTED' OR MANAGER_STATUS IN ('QC_REJECTED','QA_REJECTED')) AND CHEMIST_STATUS ='CHEMIST_APPROVED')THEN 1 ELSE 0 END) AS chemistount,\r\n"
				+ "SUM(CASE WHEN QA_EXE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaExecutiveCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.COA_MOISTURE_F26G", nativeQuery = true)
		List<Object[]> getCoaForMoistureContentStatusCounts();
		
		// -- 50
		
		@Query(value = "SELECT SUM(CASE WHEN CHEMIST_STATUS != 'CHEMIST_APPROVED' THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED'  THEN 1 ELSE 0 END) AS microBiologistCount  \r\n"
				+ "FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028", nativeQuery = true)
		List<Object[]> getGlasswaresBreakageAndDisposalRegisterStatusCounts();
		
		// -- 51
		
		@Query(value = "SELECT SUM(CASE WHEN chemist_STATUS != 'LAB_ASSISTANT_APPROVED' THEN 1 ELSE 0 END) AS labAssistantCount\r\n"
				+ "FROM precot.DISPOSAL_RECORD", nativeQuery = true)
		List<Object[]> getDisposalRecordChemicalOrMediaStatusCounts();




}