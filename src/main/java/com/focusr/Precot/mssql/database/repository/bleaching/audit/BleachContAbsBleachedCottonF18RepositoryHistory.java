package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContAbsBleachedCottonHistoryF18;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachContAbsBleachedCottonF18RepositoryHistory extends JpaRepository<BleachContAbsBleachedCottonHistoryF18, Long>{

//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO=:bmrNo AND BATCH_NO = :batchNo AND BALE_NO = :baleNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO = :bmrNo AND BATCH_NO = :batchNo AND BALE_NO = :baleNo)", nativeQuery = true)
//	BleachContAbsBleachedCottonHistoryF18 fetchLastSubmittedF18(@Param("bmrNo") String bmrNo, @Param("baleNo") String baleNo, @Param("batchNo") Long batchNo);
//	
//	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE WHERE BMR_NO = :bmrNo AND BATCH_NO = :batchNo AND BALE_NO = :baleNo", nativeQuery = true)
//	Optional<Integer> getMaximumVersion(@Param("bmrNo") String bmrNo, @Param("batchNo") Long batchNo, @Param("baleNo") String baleNo);
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO=:bmrNo AND BATCH_NO=:batchNo AND BALE_NO=:baleNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("bmrNo") String bmrNo, @Param("batchNo") Long batchNo, @Param("baleNo") String baleNo);

	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO=:bmrNo AND BATCH_NO=:batchNo AND BALE_NO=:baleNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO=:bmrNo AND BATCH_NO=:batchNo AND BALE_NO=:baleNo)", nativeQuery = true)
	BleachContAbsBleachedCottonHistoryF18 fetchLastSubmittedRecordLaydown(@Param("bmrNo") String bmrNo, @Param("batchNo") Long batchNo, @Param("baleNo") String baleNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO=:bmrNo AND BATCH_NO=:batchNo AND BALE_NO=:baleNo", nativeQuery = true)
	List<BleachContAbsBleachedCottonHistoryF18> fetchLaydownHistories(@Param("bmrNo") String bmrNo, @Param("batchNo") Long batchNo, @Param("baleNo") String baleNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18 WHERE BMR_NO LIKE :bmr AND BALE_NO LIKE :baleNo AND BATCH_NO LIKE :batchNo AND DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
	List<BleachContAbsBleachedCottonHistoryF18> fetchBleachedCottonHistories(@Param("bmr") String bmr,
			@Param("baleNo") String baleNo, @Param("batchNo") String batchNo, @Param("start") String startDate,
			@Param("end") String endDate);
 
	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18", nativeQuery = true)
	String findMinimumCreationDate();
 
	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_HISTORY_F18", nativeQuery = true)
	String findMaximumCreationDate();
	
}
