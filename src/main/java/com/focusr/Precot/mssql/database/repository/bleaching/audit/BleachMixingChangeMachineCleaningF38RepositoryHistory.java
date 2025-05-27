package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMixingChangeMachineCleaningHistoryF38;

@Repository
public interface BleachMixingChangeMachineCleaningF38RepositoryHistory
		extends JpaRepository<BleachMixingChangeMachineCleaningHistoryF38, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 WHERE BMR_NO_FROM=:bmrFrom AND BMR_NO_TO=:bmrTo AND DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("bmrFrom") String bmrFrom, @Param("bmrTo") String bmrTo,
			@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 WHERE BMR_NO_FROM=:bmrFrom AND BMR_NO_TO=:bmrTo AND DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 WHERE BMR_NO_FROM=:bmrFrom AND BMR_NO_TO=:bmrTo AND DATE=:date)", nativeQuery = true)
	BleachMixingChangeMachineCleaningHistoryF38 fetchLastSubmittedRecordLaydown(@Param("bmrFrom") String bmrFrom,
			@Param("bmrTo") String bmrTo, @Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 WHERE BMR_NO_FROM=:bmrFrom AND BMR_NO_TO=:bmrTo AND DATE=:date", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningHistoryF38> fetchLaydownHistories(@Param("bmrFrom") String bmrFrom,
			@Param("bmrTo") String bmrTo, @Param("date") String date);

	// EXCEL

//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 where BMR_NO_FROM LIKE :bmrFrom AND BMR_NO_TO LIKE :bmrTo AND  \r\n"
//			+ "DATE between :start AND :end ORDER BY DATE asc;", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningHistoryF38> fetchMachineCleaningHistories(@Param("bmrFrom") String bmrFrom,
//			@Param("bmrTo") String bmrTo, @Param("start") String start, @Param("end") String end);
	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38 WHERE BMR_NO_FROM LIKE :bmrFrom AND BMR_NO_TO LIKE :bmrTo AND " +
            "CONVERT(date, DATE, 103) BETWEEN CONVERT(date, :start, 103) AND CONVERT(date, :end, 103) ORDER BY CONVERT(date, DATE, 103) ASC", nativeQuery = true)
List<BleachMixingChangeMachineCleaningHistoryF38> fetchMachineCleaningHistories(@Param("bmrFrom") String bmrFrom,
                                                                     @Param("bmrTo") String bmrTo,
                                                                     @Param("start") String start,
                                                                     @Param("end") String end);

	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_HISTORY_F38", nativeQuery = true)
	String findMaximumCreationDate();
}
