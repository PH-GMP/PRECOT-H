package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;

@Repository
public interface CoaCottonBallsF26BRepo extends JpaRepository<CoaCottonBallsF26B, Long> {

	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B WHERE ID =:id ", nativeQuery = true)
	CoaCottonBallsF26B findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaCottonBallsF26B> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaCottonBallsF26B> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonBallsF26B> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonBallsF26B> exeManagerSummary();
	
	//AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_COTTON_BALLS_F26B WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26B(@Param("customer") String customer);

}
