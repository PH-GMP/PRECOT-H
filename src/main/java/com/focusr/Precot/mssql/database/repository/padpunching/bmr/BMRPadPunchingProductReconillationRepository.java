package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.BMRPunchingProductReconillation;

@Repository
public interface BMRPadPunchingProductReconillationRepository
		extends JpaRepository<BMRPunchingProductReconillation, Long> {

	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PRODUCT_RECONILLATION WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BMRPunchingProductReconillation> fetchProductReconillation(@Param("batchNo") String batchNo);

}
