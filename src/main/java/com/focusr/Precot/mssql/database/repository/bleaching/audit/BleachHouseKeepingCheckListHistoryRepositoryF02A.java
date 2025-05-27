package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02A;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachHouseKeepingCheckListHistoryRepositoryF02A extends JpaRepository<BleachHouseKeepingCheckListHistoryF02A, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A WHERE DATE=:date)", nativeQuery = true)
	BleachHouseKeepingCheckListHistoryF02A fetchLastSubmittedRecordLaydown(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A WHERE DATE=:date", nativeQuery = true)
	List<BleachHouseKeepingCheckListHistoryF02A> fetchLaydownHistories(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A WHERE DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
	List<BleachHouseKeepingCheckListHistoryF02A> fetchhouseKeepingHistories(@Param("start") String startDate,
			@Param("end") String endDate);

	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F02A", nativeQuery = true)
	String findMaximumCreationDate();

}
