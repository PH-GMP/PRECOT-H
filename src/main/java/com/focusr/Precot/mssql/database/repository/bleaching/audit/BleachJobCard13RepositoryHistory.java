package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachingJobcard13History;

@Repository
public interface BleachJobCard13RepositoryHistory extends JpaRepository<BleachingJobcard13History, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_JOB_CARD_HISTORY_F13 WHERE BMR_NO=:laydown AND SUB_BATCH_NO=:batch", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown, @Param("batch") String batch);

	
	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_HISTORY_F13 WHERE BMR_NO=:laydown AND SUB_BATCH_NO=:batch AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_JOB_CARD_HISTORY_F13 WHERE BMR_NO=:laydown AND SUB_BATCH_NO=:batch)", nativeQuery = true)
	BleachingJobcard13History fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown,
			@Param("batch") String batch);

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_HISTORY_F13 WHERE BMR_NO=:laydown AND SUB_BATCH_NO=:batch", nativeQuery = true)
	List<BleachingJobcard13History> fetchLaydownHistories(@Param("laydown") String laydown,
			@Param("batch") String batch);

	// EXCEL

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_HISTORY_F13 where BMR_NO LIKE :bmr AND SUB_BATCH_NO LIKE :subBatchNo AND  \r\n"
			+ "DATE between :start AND :end ORDER BY DATE asc;", nativeQuery = true)
	List<BleachingJobcard13History> fetchJobCardHistories(@Param("bmr") String bmr,
			@Param("subBatchNo") String subBatchNo, @Param("start") String start, @Param("end") String end);

	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_JOB_CARD_HISTORY_F13", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_JOB_CARD_HISTORY_F13", nativeQuery = true)
	String findMaximumCreationDate();

}
