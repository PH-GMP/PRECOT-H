package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProductReconillation;

@Repository
public interface BMR10ReconillationRepository extends JpaRepository<BMR10GoodsProductReconillation, Long>{

	
		// FOR COTTON BALLS 
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_RECONILLATION WHERE BATCH_NO=:batchNo AND FORM_NO ='Balls'", nativeQuery = true)
	List<BMR10GoodsProductReconillation> fetchReconillationBalls(@Param("batchNo") String batchNo);
	
	
		// FOR PLEAT
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_RECONILLATION WHERE BATCH_NO=:batchNo AND FORM_NO ='Pleat'", nativeQuery = true)
	List<BMR10GoodsProductReconillation> fetchReconillationPleats(@Param("batchNo") String batchNo);
	
	
		// FOR WOOL ROLL
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_RECONILLATION WHERE BATCH_NO=:batchNo AND FORM_NO ='WoolRoll'", nativeQuery = true)
	List<BMR10GoodsProductReconillation> fetchReconillationRolls(@Param("batchNo") String batchNo);
	
	
}
