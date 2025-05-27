package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachLayDownCheckListF42RepositoryHistory extends JpaRepository<BleachLayDownCheckListF42History, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY WHERE LAY_DOWN_NO=:laydown", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY WHERE LAY_DOWN_NO=:laydown AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY WHERE LAY_DOWN_NO=:laydown)", nativeQuery = true)
	BleachLayDownCheckListF42History fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY WHERE LAY_DOWN_NO=:laydown", nativeQuery = true)
	List<BleachLayDownCheckListF42History> fetchLaydownHistories(@Param("laydown") String laydown);

	// EXCEL

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY where LAY_DOWN_NO LIKE :laydown AND  \r\n"
			+ "LAY_DOWN_START_DATE between :start AND :end ORDER BY LAY_DOWN_START_DATE asc;", nativeQuery = true)
	List<BleachLayDownCheckListF42History> fetchLaydownHistories1(@Param("laydown") String laydown,
			@Param("start") String start, @Param("end") String end);

	@Query(value = "SELECT MIN(LAY_DOWN_START_DATE) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY", nativeQuery = true)
	String findMinimumCreationDate();
	@Query(value = "SELECT MAX(LAY_DOWN_START_DATE) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY", nativeQuery = true)
	String findMaximumCreationDate();
	
}
