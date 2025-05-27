package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsHouseKeepingCheckListF14;

public interface DryGoodsHouseKeepingCheckListF14Repo extends JpaRepository<DryGoodsHouseKeepingCheckListF14, Long> {

	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE DATE = :date", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListF14> getDetailsBaseDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND  HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListF14> getSummary();
	
	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListF14> getHRSummaryDetails();

	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListF14> getHodSummaryDetails();
	
	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE MONTH =:month AND YEAR =:year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<DryGoodsHouseKeepingCheckListF14> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.DRY_GOODS_HOUSE_KEEP_CLEAN_CHECK_LIST_F14 WHERE CLEAN_ID=:id", nativeQuery = true)
	DryGoodsHouseKeepingCheckListF14 getHousekeepingRecordById(@Param("id") Long id);
	
	
}
