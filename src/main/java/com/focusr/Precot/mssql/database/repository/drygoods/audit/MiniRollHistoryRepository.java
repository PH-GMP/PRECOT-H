package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.MiniRollHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;


@Repository
public interface MiniRollHistoryRepository extends JpaRepository<MiniRollHistory,Long> {

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05_HISTORY WHERE ROLL_ID=:roll_id", nativeQuery = true)
	MiniRollHistory getDetails(@Param("roll_id") Long roll_id);
	
	
//	@Query(value = "SELECT MAX(VERSION) FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
//	Optional<Integer> getMaximumVersion( @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift, @Param("order_no") String order_no);

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f05_shift IS NULL OR SHIFT = :f05_shift) ", nativeQuery = true)
	List<MiniRollHistory> findByParams05(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f05_shift") String f05_shift);

	
//	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift)", nativeQuery = true)
//	MiniRollHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no)", nativeQuery = true)
	MiniRollHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("shift") String shift,
			@Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05_HISTORY WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<MiniRollHistory> fetchHistory(@Param("date") String date, @Param("shift") String shift);
	

}
