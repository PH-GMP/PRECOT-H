package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContRawCottonF05History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;


@Repository
public interface BleachContRawCottonF05RepositoryHistory extends JpaRepository<BleachContRawCottonF05History, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE PH_NO=:phNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("phNo") String phNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE PH_NO=:phNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE PH_NO=:phNo)", nativeQuery = true)
	BleachContRawCottonF05History fetchLastSubmittedRecordPhNumber(@Param("phNo") String phNo);

	// EXCELL

//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE PH_NO LIKE :phNo AND DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
//	List<BleachContRawCottonF05History> fetchRawCottonHistories(@Param("phNo") String phNo,
//			@Param("start") String startDate, @Param("end") String endDate);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE PH_NO LIKE :phNo AND CONVERT(DATE, DATE, 103) BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
	List<BleachContRawCottonF05History> fetchRawCottonHistories(@Param("phNo") String phNo,
			@Param("start") String start, @Param("end") String end);

	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05", nativeQuery = true)
	String findMaximumCreationDate();
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE DATE between :from_date AND :to_date AND (:shift IS NULL OR PH_NO = :shift)", nativeQuery = true)
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_HISTORY_F05 WHERE " +
            "(:start IS NULL OR :end IS NULL OR DATE BETWEEN :start AND :end) " +
            "AND (:phNo IS NULL OR PH_NO = :phNo)",
    nativeQuery = true)
	List<BleachContRawCottonF05History> fetchContaminationHistory(@Param("phNo") String phNo,
			@Param("start") String startDate, @Param("end") String endDate);

}
