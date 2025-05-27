package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrPostProductionReview;

@Repository
public interface BudsBmrPostProductionReviewRepository  extends JpaRepository<BudsBmrPostProductionReview, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_POST_PRODUCTION_REVIEW WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BudsBmrPostProductionReview> postProductionReviewByBatchNo(@Param("batchNo") String batchNo);
	
}
