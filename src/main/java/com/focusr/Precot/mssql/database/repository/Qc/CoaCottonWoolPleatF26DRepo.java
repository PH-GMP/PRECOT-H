package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolPleatF26D;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;

@Repository
public interface CoaCottonWoolPleatF26DRepo extends JpaRepository<CoaCottonWoolPleatF26D, Long> {

	
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE ID =:id ", nativeQuery = true)
	CoaCottonWoolPleatF26D findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaCottonWoolPleatF26D> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaCottonWoolPleatF26D> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonWoolPleatF26D> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonWoolPleatF26D> exeManagerSummary();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_COTTON_WOOL_PLEAT_F26D WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26D(@Param("customer") String customer);
}
