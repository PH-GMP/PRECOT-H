package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;
import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.util.Qc.RawCottonFetchBatchNo;
import com.focusr.Precot.util.Qc.TblsupPayloadRawCottonAnalysis;

public interface RawCottenConsolidatedRepoF004 extends JpaRepository<Qc_RawCottenConsolidatedAnalyticalReportF004, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE ID = :id ", nativeQuery = true)
	Qc_RawCottenConsolidatedAnalyticalReportF004 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE BLEACHING_BMR_NO=:bleachingBmrNo", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByMillBatchNo(@Param("bleachingBmrNo") String bleachingBmrNo);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByChemistStatusSubmittedAndHodStatusNotApproved();
	
//	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE DATE = :date AND BLEACHING_BMR_NO=:bleachingBmrNo AND QC_STATUS = 'QC_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByDateNewF001(@Param("date") String date, @Param("bleachingBmrNo") String bleachingBmrNo);
	
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE BLEACHING_BMR_NO=:bleachingBmrNo AND (MANAGER_STATUS = 'QC_APPROVED' OR MANAGER_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findByBmrNoForPrint(@Param("bleachingBmrNo") String bleachingBmrNo);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' OR MANAGER_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004> findAll();

	
	
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