package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;

@Repository
public interface BMRSummaryBleachRepository extends JpaRepository<BMR_Summary_Bleach, Long>{

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_BLEACH WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BMR_Summary_Bleach> getBMRSummaryByBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_BLEACH WHERE SUMMARY_ID=:id", nativeQuery = true)
	BMR_Summary_Bleach findSummaryBleachById(@Param("id") Long id);

}
