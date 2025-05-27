package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;

public interface BMR13RP14QaReleaseRepository  extends JpaRepository<BMR13RP14QaRelease, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR13RP14QaRelease> getSummaryByOrderNo13(@Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR13RP14QaRelease> getSummaryByOrderNoRPB14(@Param("order_no") String order_no);


}
