package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;

@Repository
public interface CoaMoistureF26GRepo extends JpaRepository<CoaMoistureF26G, Long> {

	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G WHERE ID =:id ", nativeQuery = true)
	CoaMoistureF26G findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G WHERE PRODUCT=:product AND CUSTOMER =:customer AND TESTING_DATE = :testingDate", nativeQuery = true)
	List<CoaMoistureF26G> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer,
			@Param("testingDate") String testingDate);
	// PRINT
	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G WHERE PRODUCT=:product AND CUSTOMER =:customer AND TESTING_DATE = :testingDate AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaMoistureF26G> PrintApiF26(@Param("product") String product, @Param("customer") String customer,
			@Param("testingDate") String testingDate);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaMoistureF26G> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaMoistureF26G> exeManagerSummary();
	
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_MOISTURE_F26G", nativeQuery = true)
	List<String> getProductF26G();
	
	@Query(value = "SELECT DISTINCT CUSTOMER FROM precot.COA_MOISTURE_F26G", nativeQuery = true)
	List<String> getCustomerF26G();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_MOISTURE_F26G WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED') AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26G(@Param("customer") String customer);

}
