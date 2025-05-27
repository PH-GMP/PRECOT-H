package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR08RP09ProductionReconciliation;

public interface BMR0809ProductionReconciliationRepository extends JpaRepository<BMR08RP09ProductionReconciliation, Long> {
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_08_RP_09_PRODUCTION_RECONCILIATION WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR08RP09ProductionReconciliation> getSummaryByOrderNo08(@Param("order_no") String order_no);

	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_08_RP_09_PRODUCTION_RECONCILIATION WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR08RP09ProductionReconciliation> getSummaryByOrderNo09(@Param("order_no") String order_no);


}
