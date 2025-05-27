package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;

@Repository
public interface BleachHouseKeepingCheckListF02ARepository
		extends JpaRepository<BleachHouseKeepingCheckListF02A, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE DATE = :date", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02A> getDetailsBaseDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02A> getHRSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02A> getHodSummeryDetails();
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02A> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE CLEAN_ID =:id", nativeQuery = true)
	List<BleachHouseKeepingCheckListF02A> getMonthandYear( @Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A WHERE CLEAN_ID=:id", nativeQuery = true)
	BleachHouseKeepingCheckListF02A getHousekeepingRecordById(@Param("id") Long id);

}
