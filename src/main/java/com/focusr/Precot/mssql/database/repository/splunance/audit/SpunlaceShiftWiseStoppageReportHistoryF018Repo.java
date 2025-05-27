package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018;

public interface SpunlaceShiftWiseStoppageReportHistoryF018Repo extends JpaRepository<SpunlaceShiftWiseStoppageReportHistoryF018,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SHIFT_WISE_STOPPAGE_REPORT_HISTORY_F018 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_HISTORY_F018 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.SHIFT_WISE_STOPPAGE_REPORT_HISTORY_F018 WHERE DATE =:date)", nativeQuery = true)
	SpunlaceShiftWiseStoppageReportHistoryF018 fetchLastSubmittedRecord(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_HISTORY_F018 WHERE DATE =:date", nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportHistoryF018> fetchHistory(@Param("date") String date);
	
	// audit
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_HISTORY_F018 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	      , nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportHistoryF018> findByParams18(@Param("from_date") String from_date,
	        @Param("to_date") String to_date);

}
