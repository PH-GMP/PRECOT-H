package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;


@Repository
public interface GoodsHandSanitationRepositoryF13 extends JpaRepository<GoodsHandSanitationF06, Long>{

	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE HAND_SANITIZATION_ID=:id", nativeQuery = true)
	GoodsHandSanitationF06 fetchHandSanitizationABPressF41ById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	GoodsHandSanitationF06 handSanitationDetailsByDate(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<GoodsHandSanitationF06> getPunchingSupervisorSummary();
	
	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<GoodsHandSanitationF06> getPunchingHodSummary();
	
	@Query(value = "SELECT * FROM precot.GOODS_HAND_SANITIZATION_AB_PRESS_F13 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift) AND HOD_STATUS='HOD_APPROVED'", nativeQuery = true)
	List<GoodsHandSanitationF06> getHandSanitationPrint(@Param("date") String date,@Param("shift") String shift);
	
	
	// FOR DISTINCT ID NUMBER

	@Query(value = "SELECT DISTINCT ID_NUMBER FROM precot.GOODS_SANITIZATION_LIST_F24", nativeQuery = true)
	List<String> fetchBleachingIdNumbers();
	
}
