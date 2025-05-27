package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;


@Repository
public interface BleachBmrSummaryRepository extends JpaRepository<BmrSummary, Long>{

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY WHERE DATE=:date AND BMR_NO=:bmr_no", nativeQuery = true)
	List<BmrSummary> getSummaryByDateAndBMR(@Param("date") String date, @Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BMR_SUMMARY WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BmrSummary> getSummaryByBMR(@Param("bmr_no") String bmr_no);
}
