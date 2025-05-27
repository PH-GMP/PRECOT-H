package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;

public interface BMR14RP15ProductReleaseRepository extends JpaRepository<BMR14RP15ProductRelease, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR14RP15ProductRelease> getSummaryByOrderNo14(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR14RP15ProductRelease> getSummaryByOrderNoRpb15(@Param("order_no") String order_no);


}
