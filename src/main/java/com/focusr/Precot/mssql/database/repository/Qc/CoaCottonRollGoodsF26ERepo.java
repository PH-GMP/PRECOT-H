package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;

@Repository
public interface CoaCottonRollGoodsF26ERepo extends JpaRepository<CoaCottonRollGoodsF26E, Long> {

	@Query(value = "SELECT * FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE ID =:id ", nativeQuery = true)
	CoaCottonRollGoodsF26E findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaCottonRollGoodsF26E> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaCottonRollGoodsF26E> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonRollGoodsF26E> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonRollGoodsF26E> exeManagerSummary();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_COTTON_ROLL_GOODS_F26E WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26E(@Param("customer") String customer);
}
