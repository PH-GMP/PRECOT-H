package com.focusr.Precot.mssql.database.repository.drygoods;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;


@Repository
public interface SanitiziationMachineSurfaceRepository extends JpaRepository<SanitizationDetails, Long> {

	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION WHERE MC_ID=:mc_id AND FORMAT_NO ='PH-PRD04/F-012'", nativeQuery = true)
	SanitizationDetails getDetails(@Param("mc_id") Long mc_id);

	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY MC_ID DESC", nativeQuery = true)
	List<SanitizationDetails> SupervisorSummary();

	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  MC_ID DESC", nativeQuery = true)
	List<SanitizationDetails> hodSummary();

	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION WHERE WEEK = :week AND MONTH = :month AND YEAR = :year", nativeQuery = true)
	List<SanitizationDetails> getdetailsbyParam(@Param("week") String week, @Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION WHERE " + 
            "(:month IS NULL OR MONTH = :month) AND " + 
            "(:year IS NULL OR YEAR = :year) AND " + 
            "HOD_STATUS = 'HOD_APPROVED'", 
    nativeQuery = true)
List<SanitizationDetails> printParam(@Param("month") String month, 
                                          @Param("year") String year);
	
	
}
