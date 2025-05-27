package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011;

@Repository
public interface BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011Repository extends JpaRepository<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011,Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY WHERE DATE=:date AND SHIFT =:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY WHERE  DATE=:date AND SHIFT =:shift  AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY WHERE  DATE=:date AND SHIFT =:shift)", nativeQuery = true)
  	BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY WHERE DATE=:date AND SHIFT =:shift", nativeQuery = true)
	List<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011> fetchHistory(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f011_shift IS NULL OR SHIFT = :f011_shift) ", nativeQuery = true)
	List<BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011> findByParams11(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f011_shift") String f011_shift);
}
