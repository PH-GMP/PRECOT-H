package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;

@Repository
public interface CoaCottonWoolRollF26CRepo extends JpaRepository<CoaCottonWoolRollF26C, Long> {
	
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE ID =:id ", nativeQuery = true)
	CoaCottonWoolRollF26C findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaCottonWoolRollF26C> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaCottonWoolRollF26C> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonWoolRollF26C> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonWoolRollF26C> exeManagerSummary();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_COTTON_WOOL_ROOL_F26C WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26C(@Param("customer") String customer);



}
