package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseCleaningCheckListF010History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseKeepingCleaningCheckListF26History;

@Repository
public interface PadPunchingHouseKeepingCheckListF010RepositoryHistory
		extends JpaRepository<PadPunchingHouseCleaningCheckListF010History, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE DATE =:date)", nativeQuery = true)
	PadPunchingHouseCleaningCheckListF010History fetchLastSubmittedRecord(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE DATE =:date", nativeQuery = true)
	List<PadPunchingHouseCleaningCheckListF010History> fetchHistory(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<PadPunchingHouseCleaningCheckListF010History> findByParams020(@Param("from_date") String from_date,
			@Param("to_date") String to_date);

	// EXCEL
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010 WHERE "
			+ "(:fromDate IS NULL OR :toDate IS NULL OR DATE BETWEEN :fromDate AND :toDate)", nativeQuery = true)
	List<PadPunchingHouseCleaningCheckListF010History> findByDate(@Param("fromDate") String fromDate,
			@Param("toDate") String toDate);
}
