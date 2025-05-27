package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaRelease;

public interface BMR13GoodsQaReleaserRepository extends JpaRepository<BMR13GoodsQaRelease, Long> {
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_13_QA_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR13GoodsQaRelease> getDetails(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_13_QA_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR13GoodsQaRelease> getDetailscp(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_13_QA_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR13GoodsQaRelease> GetQaReleaseWool(@Param("batch_no") String batch_no);

}
