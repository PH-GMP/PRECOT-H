package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR12RP13PostProdReview;

public interface BMR12RP13PostProdReviewRepository  extends JpaRepository<BMR12RP13PostProdReview, Long>{
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_12_RP_13_POST_PROD_REVIEW WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR12RP13PostProdReview> getSummaryByOrderNo12(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_12_RP_13_POST_PROD_REVIEW WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR12RP13PostProdReview> getSummaryByOrderNo13(@Param("order_no") String order_no);


}
