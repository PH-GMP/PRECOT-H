package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14;

public interface DryGoodsHouseKeepingCheckListHistoryF14Repo
		extends JpaRepository<DryGoodsHouseKeepingCheckListHistoryF14, Long> {
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F14 WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F14 WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F14 WHERE DATE=:date)", nativeQuery = true)
	DryGoodsHouseKeepingCheckListHistoryF14 fetchLastSubmittedRecordLaydown(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F14 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListHistoryF14> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date);
}