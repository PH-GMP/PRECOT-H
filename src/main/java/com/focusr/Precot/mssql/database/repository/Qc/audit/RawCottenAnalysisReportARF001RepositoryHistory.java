package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContRawCottonF05History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMachineCleaningRecordHistoryF16;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailsLogBookHistory01;

public interface RawCottenAnalysisReportARF001RepositoryHistory extends JpaRepository<RawCottenAnalysisReportARF001History, Long> {
    
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE ID = :id ", nativeQuery = true)
	RawCottenAnalysisReportARF001 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE MILL_BATCH_NO=:millBatchNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("millBatchNo") String millBatchNo);
	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE MILL_BATCH_NO=:millBatchNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE MILL_BATCH_NO=:millBatchNo)", nativeQuery = true)
	RawCottenAnalysisReportARF001History fetchLastSubmittedRecordMillBatchNo(@Param("millBatchNo") String millBatchNo);

//1
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:millBatchNo IS NULL OR MILL_BATCH_NO = :millBatchNo) ", nativeQuery = true)
	List<RawCottenAnalysisReportARF001History> findByParamsARF001(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("millBatchNo") String millBatchNo);

	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001_HSITORY WHERE "
			+ "DATE = :date "
			+ "AND (:millBatchNo IS NULL OR MILL_BATCH_NO = :millBatchNo) ", nativeQuery = true)
	List<RawCottenAnalysisReportARF001History> findFormByDate(@Param("date") String date,@Param("millBatchNo") String millBatchNo);

}