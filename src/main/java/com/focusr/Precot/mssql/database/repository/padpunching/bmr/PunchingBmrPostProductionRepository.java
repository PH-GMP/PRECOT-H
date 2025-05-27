package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrPostProductionReview;


@Repository
public interface PunchingBmrPostProductionRepository extends JpaRepository<PunchingBmrPostProductionReview, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_POST_PRODUCTION_REVIEW WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrPostProductionReview> postproductionReviewByOrder(@Param("order") String order);
	
}
