package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.ChemicalAnalysisReportARF003History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;

public interface ChemicalAnalysisReportARF003HistoryRepository extends JpaRepository<ChemicalAnalysisReportARF003History, Long> {

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE MATERIAL_DOC_NO=:materialDocNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE MATERIAL_DOC_NO=:materialDocNo)", nativeQuery = true)
	ChemicalAnalysisReportARF003History fetchLastSubmittedRecordMaterialDocNo(@Param("materialDocNo") String materialDocNo);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE MATERIAL_DOC_NO=:materialDocNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("materialDocNo") String materialDocNo);
	
//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE "
//			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
//			+ "AND (:materialDocNo IS NULL OR MATERIAL_DOC_NO = :materialDocNo) ", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003History> findByParamsARF003(@Param("from_date") String from_date,
//			@Param("to_date") String to_date,@Param("materialDocNo") String materialDocNo);
	
	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:materialDocNo IS NULL OR MATERIAL_DOC_NO = :materialDocNo) ", nativeQuery = true)
	List<ChemicalAnalysisReportARF003History> findByParamsARF003(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("materialDocNo") String materialDocNo);


//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE DATE = :date ", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003History> findFormByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003_HISTORY WHERE "
			+ "DATE = :date "
			+ "AND (:materialDocNo IS NULL OR MATERIAL_DOC_NO = :materialDocNo)", nativeQuery = true)
	List<ChemicalAnalysisReportARF003History> findFormByDate(@Param("date") String date,@Param("materialDocNo") String materialDocNo);

	

}
