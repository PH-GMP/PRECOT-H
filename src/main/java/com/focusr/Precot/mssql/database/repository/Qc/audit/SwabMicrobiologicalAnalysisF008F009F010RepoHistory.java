package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalAnalysisARF008_009_010History;

public interface SwabMicrobiologicalAnalysisF008F009F010RepoHistory extends JpaRepository<SwabMicrobiologicalAnalysisARF008_009_010History, Long> {

	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F008=:sampledDateF008 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F008=:sampledDateF008)", nativeQuery = true)
	SwabMicrobiologicalAnalysisARF008_009_010History fetchLastSubmittedRecordDateF008(@Param("sampledDateF008") String sampledDateF008);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F009=:sampledDateF009 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F009=:sampledDateF009)", nativeQuery = true)
	SwabMicrobiologicalAnalysisARF008_009_010History fetchLastSubmittedRecordDateF009(@Param("sampledDateF009") String sampledDateF009);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F010=:sampledDateF010 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F010=:sampledDateF010)", nativeQuery = true)
	SwabMicrobiologicalAnalysisARF008_009_010History fetchLastSubmittedRecordDateF010(@Param("sampledDateF010") String sampledDateF010);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F008=:sampledDateF008", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF008(@Param("sampledDateF008") String sampledDateF008);

	@Query(value = "SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F009=:sampledDateF009", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF009(@Param("sampledDateF009") String sampledDateF009);

	@Query(value = "SELECT MAX(VERSION) FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F010=:sampledDateF010", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF010(@Param("sampledDateF010") String sampledDateF010);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR SAMPLED_DATE_F008 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findByParamsARF008(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR SAMPLED_DATE_F009 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findByParamsARF009(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR SAMPLED_DATE_F010 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findByParamsARF010(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F008 = :date ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findFormByDate08(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F009 = :date ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findFormByDate09(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010_HISTORY WHERE SAMPLED_DATE_F010 = :date ", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010History> findFormByDate010(@Param("date") String date);

}
