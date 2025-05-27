package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedAnalyticalReportF004History;

public interface RawCottenConsolidatedRepoF004History extends JpaRepository<Qc_RawCottenConsolidatedAnalyticalReportF004History, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORTF004_HISTORY WHERE ID = :id ", nativeQuery = true)
	RawCottenAnalysisReportARF001 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORTF004_HISTORY WHERE BLEACHING_BMR_NO=:bleachingBmrNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("bleachingBmrNo") String bleachingBmrNo);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORTF004_HISTORY WHERE BLEACHING_BMR_NO=:bleachingBmrNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORTF004_HISTORY WHERE BLEACHING_BMR_NO=:bleachingBmrNo)", nativeQuery = true)
	Qc_RawCottenConsolidatedAnalyticalReportF004History fetchLastSubmittedRecordBmrNo(@Param("bleachingBmrNo") String bleachingBmrNo);
	
	@Query(value = "SELECT * FROM precot.QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORTF004_HISTORY WHERE "
	+ "(:bleachingBmrNo IS NULL OR BLEACHING_BMR_NO = :bleachingBmrNo) ", nativeQuery = true)
	List<Qc_RawCottenConsolidatedAnalyticalReportF004History> findByParamsF004(@Param("bleachingBmrNo") String bleachingBmrNo);
}