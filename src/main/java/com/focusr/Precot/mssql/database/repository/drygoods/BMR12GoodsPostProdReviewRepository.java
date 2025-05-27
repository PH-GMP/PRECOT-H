package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR12GoodsPostProdReview;

public interface BMR12GoodsPostProdReviewRepository  extends JpaRepository<BMR12GoodsPostProdReview, Long>{
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_12_POST_PROD_REVIEW WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR12GoodsPostProdReview> getDetails(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_12_POST_PROD_REVIEW WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR12GoodsPostProdReview> getDetailscp(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_12_POST_PROD_REVIEW WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR12GoodsPostProdReview> GetPostProductionReviewWool(@Param("batch_no") String batch_no);

}
