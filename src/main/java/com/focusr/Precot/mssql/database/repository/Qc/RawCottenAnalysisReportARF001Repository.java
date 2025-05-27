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
	List<Object[]> fetchAllBatchNumbersAndDates();




}