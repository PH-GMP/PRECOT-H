package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019;

public interface ShiftWiseWasteReportSpunlaceHistoryF019Repo extends JpaRepository<ShiftWiseWasteReportSpunlaceHistoryF019,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_HISTORY_F019 WHERE DATE =:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_HISTORY_F019 WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_HISTORY_F019 WHERE DATE =:date AND SHIFT=:shift)", nativeQuery = true)
	ShiftWiseWasteReportSpunlaceHistoryF019 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_HISTORY_F019 WHERE DATE =:date AND SHIFT=:shift ", nativeQuery = true)
	List<ShiftWiseWasteReportSpunlaceHistoryF019> fetchHistory(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_HISTORY_F019 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f019_shift IS NULL OR SHIFT = :f019_shift)", nativeQuery = true)
	List<ShiftWiseWasteReportSpunlaceHistoryF019> findByParams019(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("f019_shift") String f019_shift);
}
