package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;
import com.focusr.Precot.mssql.database.model.Qc.CoaInfusedCottonPadsF26F;

@Repository
public interface CoaInfusedCottonPadsF26FRepo extends JpaRepository<CoaInfusedCottonPadsF26F, Long> {

	@Query(value = "SELECT * FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE ID =:id ", nativeQuery = true)
	CoaInfusedCottonPadsF26F findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaInfusedCottonPadsF26F> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaInfusedCottonPadsF26F> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaInfusedCottonPadsF26F> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaInfusedCottonPadsF26F> exeManagerSummary();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_INFUSED_COTTON_PADS_F26F WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26F(@Param("customer") String customer);
	
}
