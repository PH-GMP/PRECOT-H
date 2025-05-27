package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaPreparationAndConsumptionRecordF019;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;

public interface MediaPreparationAndConsumptionRecordRepo extends JpaRepository<Qc_MediaPreparationAndConsumptionRecordF019, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE ID = :id ", nativeQuery = true)
	Qc_MediaPreparationAndConsumptionRecordF019 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE PREPARATION_DATE=:preparationDate", nativeQuery = true)
//	List<Qc_MediaPreparationAndConsumptionRecordF019> findByPreparationDateOrLoadno(@Param("preparationDate") String preparationDate);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE " +
	        "(:preparationDate IS NULL OR PREPARATION_DATE = :preparationDate) AND " +
	        "(:loadNo IS NULL OR LOAD_NO = :loadNo)", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> findByPreparationDateOrLoadno(
	    @Param("preparationDate") String preparationDate,
	    @Param("loadNo") String loadNo);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE " +
			"(:preparationDate IS NULL OR PREPARATION_DATE = :preparationDate) AND " +
			"(:loadNo IS NULL OR LOAD_NO = :loadNo) AND"+
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(MANAGER_STATUS = 'QA_APPROVED' OR MANAGER_STATUS = 'QC_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> getForReportPrint(
	    @Param("preparationDate") String preparationDate,
	    @Param("loadNo")String loadNo,
	    @Param("month") String month,
	    @Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' OR (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> findByMicroStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> findByMicroStatusSubmittedAndHodStatusNotApproved();
	
//	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE DATE = :date AND BLEACHING_BMR_NO=:bleachingBmrNo AND QC_STATUS = 'QC_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByDateNewF001(@Param("date") String date, @Param("bleachingBmrNo") String bleachingBmrNo);
	
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' OR MANAGER_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019> findAll();

	
	
	/**
	 * QC SAP
	 */
//	@Query(value = "SELECT Batchno AS batchNo, Suplier AS supplier, Noofbales AS noofBales, Invoice AS invoice, Weight AS weight, [Date] AS date, REGION AS region, Material AS material " +
//            "FROM Tblsup WHERE MVT_TYPE = 101 AND STRG = 'rct1' AND Batchno = :PH", nativeQuery = true)
//	List<TblsupPayloadRawCottonAnalysis> fetchPdeData(@Param("PH") String PH);
//	
//	@Query(value = "SELECT Batchno AS batchNo FROM tblrm WHERE mvt_type = 261 AND laydownno=:laydown_no", nativeQuery = true)
//	List<RawCottonFetchBatchNo> FetchRawCottonBatchNo(@Param("laydown_no") String laydown_no);


}