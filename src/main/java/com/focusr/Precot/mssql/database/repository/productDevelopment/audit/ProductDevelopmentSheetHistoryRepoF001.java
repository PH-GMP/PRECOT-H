package com.focusr.Precot.mssql.database.repository.productDevelopment.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachingJobcard13History;
import com.focusr.Precot.mssql.database.model.productDevelopment.audit.ProductDevelopmentSheetHistoryF001;

@Repository
public interface ProductDevelopmentSheetHistoryRepoF001 extends  JpaRepository<ProductDevelopmentSheetHistoryF001, Long> {

	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.PRODUCT_DEVELOPMENT_SHEET_HISTORY_F001 WHERE PDS_NO = :pdsNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("pdsNo") String pdsNo);



	
	@Query(value = "SELECT TOP 1 * FROM precot.PRODUCT_DEVELOPMENT_SHEET_HISTORY_F001 WHERE PDS_NO=:pdsNo ORDER BY DEVELOPMENTSUPERVISOR_SUBMIT_ON ", nativeQuery = true)
	ProductDevelopmentSheetHistoryF001 fetchLastSubmittedProductDevelopmentSheet(@Param("pdsNo") String pdsNo);



	
	

	
	@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_HISTORY_F001 f " +
            "WHERE (:fromDate IS NULL OR f.REV_DATE >= :fromDate) " +
            "AND (:toDate IS NULL OR f.REV_DATE <= :toDate) " +
            "AND (:pdsNo IS NULL OR f.PDS_NO = :pdsNo)", nativeQuery = true)
List<ProductDevelopmentSheetHistoryF001> findByParams001(
 @Param("fromDate") LocalDate fromDate,
 @Param("toDate") LocalDate toDate,
 @Param("pdsNo") String pdsNo);



	
 

}
