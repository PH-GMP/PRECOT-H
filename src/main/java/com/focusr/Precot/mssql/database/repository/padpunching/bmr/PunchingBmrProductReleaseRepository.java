package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductRelease;

@Repository
public interface PunchingBmrProductReleaseRepository extends JpaRepository<PunchingBmrProductRelease, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PRODUCT_RELEASE WHERE PRODUCT_ID=:id", nativeQuery = true)
	PunchingBmrProductRelease productReleaseById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PRODUCT_RELEASE WHERE BATCH_NO=:order", nativeQuery = true)
	PunchingBmrProductRelease productReleaseByOrder(@Param("order") String order);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PRODUCT_RELEASE WHERE BATCH_NO=:batchNo", nativeQuery = true)
	PunchingBmrProductRelease productReleaseByBatchNo(@Param("batchNo") String batchNo);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PRODUCT_RELEASE WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<PunchingBmrProductRelease> productReleaseListByBatchNo(@Param("batchNo") String batchNo);
}
