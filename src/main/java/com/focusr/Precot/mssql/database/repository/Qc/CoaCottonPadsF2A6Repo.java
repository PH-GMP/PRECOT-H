package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaCottonPadsF26A;

@Repository
public interface CoaCottonPadsF2A6Repo extends JpaRepository<CoaCottonPadsF26A, Long> {
	
	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A WHERE ID =:id ", nativeQuery = true)
	CoaCottonPadsF26A findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaCottonPadsF26A> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

	// PRINT
	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaCottonPadsF26A> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonPadsF26A> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaCottonPadsF26A> exeManagerSummary();
	
	// AMC
	
	@Query(value = "SELECT DISTINCT PRODUCT FROM precot.COA_COTTON_PADS_F26A WHERE MANAGER_STATUS IN ('QA_APPROVED','QC_APPROVED')\r\n"
			+ "AND CUSTOMER  = :customer", nativeQuery = true)
	List<String> ProductF26A(@Param("customer") String customer);
	

}
