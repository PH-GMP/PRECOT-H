package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.EquipLogBookHydroExtractorHistoryF11;

@Repository
public interface EquipLogBookHydroExtractorF11RepositoryHistory
		extends JpaRepository<EquipLogBookHydroExtractorHistoryF11, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11 WHERE BMR_NO=:bmrNo AND SUB_BATCH_NO=:batchNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("bmrNo") String bmrNo, @Param("batchNo") String batchNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11 WHERE BMR_NO=:bmrNo AND SUB_BATCH_NO=:batchNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11 WHERE BMR_NO=:bmrNo AND SUB_BATCH_NO=:batchNo)", nativeQuery = true)
	EquipLogBookHydroExtractorHistoryF11 fetchLastSubmittedRecord(@Param("bmrNo") String bmrNo,
			@Param("batchNo") String batchNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11 WHERE BMR_NO=:bmrNo AND SUB_BATCH_NO=:batchNo", nativeQuery = true)
	List<EquipLogBookHydroExtractorHistoryF11> fetchHistory(@Param("bmrNo") String bmrNo,
			@Param("batchNo") String batchNo);

	// EXCEL

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11 where BMR_NO LIKE :bmr AND SUB_BATCH_NO LIKE :subBatchNo AND  \r\n"
			+ "updatedAt between :start AND :end ORDER BY updatedAt asc;", nativeQuery = true)
	List<EquipLogBookHydroExtractorHistoryF11> fetchHydroExtractor(@Param("bmr") String bmr,
			@Param("subBatchNo") String subBatchNo, @Param("start") String start, @Param("end") String end);

	@Query(value = "SELECT MIN(createdAt) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(createdAt) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11", nativeQuery = true)
	String findMaximumCreationDate();

}
