package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsHandSanitationHistoryF06;

@Repository
public interface GoodsHandSanitationHistoryRepositoryF06 extends JpaRepository<GoodsHandSanitationHistoryF06, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE =:date AND SHIFT=:shift)", nativeQuery = true)
	GoodsHandSanitationHistoryF06 findLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f13_shift IS NULL OR SHIFT = :f13_shift)", nativeQuery = true)
	List<GoodsHandSanitationHistoryF06> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f13_shift") String f13_shift);
 
}
