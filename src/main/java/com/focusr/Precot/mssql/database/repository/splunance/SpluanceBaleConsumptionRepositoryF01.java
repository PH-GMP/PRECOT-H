package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.SplunanceBaleConsumptionF01;

@Repository
public interface SpluanceBaleConsumptionRepositoryF01 extends JpaRepository<SplunanceBaleConsumptionF01, Long>{

	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE SB_ID =:id", nativeQuery = true)
	SplunanceBaleConsumptionF01 findBaleConsumptionById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE ORDER_NO=:order AND DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<SplunanceBaleConsumptionF01> findBaleConsumptionByOrder(@Param("order") String order, @Param("date") String date, @Param("shift") String shift);
 	
//	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY SB_ID DESC ", nativeQuery = true)
//    List<SplunanceBaleConsumptionF01> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY SB_ID DESC ", nativeQuery = true)
//    List<SplunanceBaleConsumptionF01> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY SB_ID DESC ", nativeQuery = true)
    List<SplunanceBaleConsumptionF01> getSummary();
	
//	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE HOD_STATUS = 'HOD_APPROVED' AND HOD_MAIL_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//    List<SplunanceBaleConsumptionF01> approvedBaleConsumption();
	
//	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//    List<SplunanceBaleConsumptionF01> approvedBaleConsumption();
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE ORDER_NO=:order AND DATE=:date AND HOD_STATUS = 'HOD_APPROVED' AND (:shift IS NULL OR SHIFT = :shift)", nativeQuery = true)
    List<SplunanceBaleConsumptionF01> approvedBaleConsumption(@Param("order") String order, @Param("date") String date, @Param("shift") String shift);
	
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_F01 WHERE ORDER_NO=:order", nativeQuery = true)
	List<SplunanceBaleConsumptionF01> getBaleConsumptionDetails(@Param("order") String order);
}
