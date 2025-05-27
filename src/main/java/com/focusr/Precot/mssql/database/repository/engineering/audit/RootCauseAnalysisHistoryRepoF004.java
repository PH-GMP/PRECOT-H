package com.focusr.Precot.mssql.database.repository.engineering.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;

import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;

public interface RootCauseAnalysisHistoryRepoF004 extends JpaRepository<RootCauseAnalysisHistoryF004, Long>{

	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.ENG_ROOT_CAUSE_ANALYSIS_HISTORY_FOO4 WHERE DATE = :dates AND RCA_NO=:RCA  ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("dates") String dates , @Param("RCA") String RCA);

	
	
	@Query(value = "SELECT TOP 1 * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_HISTORY_FOO4 WHERE DATE=:date AND RCA_NO=:rcaNo ORDER BY SUPERVISOR_SUBMIT_ON DESC", nativeQuery = true)
	RootCauseAnalysisHistoryF004 fetchLastrootCause(@Param("date") String date, @Param("rcaNo") String rcaNo);



	
	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_HISTORY_FOO4 f " +
	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
	        "AND (:rcaNo IS NULL OR f.RCA_NO = :rcaNo)", 
	        nativeQuery = true)
	List<RootCauseAnalysisHistoryF004> findByParams004(
	  @Param("fromDate") LocalDate fromDate,
	  @Param("toDate") LocalDate toDate,
	  @Param("rcaNo") String rcaNo);




}
