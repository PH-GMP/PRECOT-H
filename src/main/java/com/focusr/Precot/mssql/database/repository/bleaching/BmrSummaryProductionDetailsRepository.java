package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryProductionDetails;

@Repository
public interface BmrSummaryProductionDetailsRepository extends JpaRepository<BmrSummaryProductionDetails, Long>{

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_PROD_DETAILS WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BmrSummaryProductionDetails> productionDetailsBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT BMR_NO FROM precot.BMR_SUMMARY_PROD_DETAILS", nativeQuery = true)
    List<String> findAllByBmrNo();
	
	@Query(value = "SELECT BMR_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE STATUS NOT IN ('CREATED')", nativeQuery = true)
    List<String> findAllByBmrNoBleaching();
	
}
