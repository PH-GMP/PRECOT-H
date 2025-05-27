package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrQualityReleaseHeader;

@Repository
public interface BudsBmrQualityReleaseRepository extends JpaRepository<BudsBmrQualityReleaseHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_QUALITY_RELEASE_HEADER WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<BudsBmrQualityReleaseHeader> qualityReleaseByBatchNo(@Param("batchNumber") String batchNumber);
	
}
