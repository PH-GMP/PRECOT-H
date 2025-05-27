package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;

@Repository
public interface BleachHouseKeepingCheckListF02Repository extends JpaRepository<BleachHouseKeepingCheckListF02, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE DATE = :date", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02> getDetailsBaseDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02> getHRSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02> getHodSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02> getMonthandYear(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02 WHERE CLEAN_ID=:id", nativeQuery = true)
	BleachHouseKeepingCheckListF02 getHousekeepingRecordById(@Param("id") Long id);
	
}
