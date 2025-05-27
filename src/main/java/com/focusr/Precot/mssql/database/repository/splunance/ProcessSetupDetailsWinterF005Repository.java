package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsWinterF005;

public interface ProcessSetupDetailsWinterF005Repository extends JpaRepository<ProcessSetupDetailsWinterF005, Long> {

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE ORDER_NO = :order_no AND DATE= :date AND SHIFT = :shift", nativeQuery = true)
	List<ProcessSetupDetailsWinterF005> getDetailstUsageById(@Param("order_no") String order_no,
			@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE OPERATOR_STATUS ='OPERATOR_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<ProcessSetupDetailsWinterF005> getQASummeryDetails();

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ProcessSetupDetailsWinterF005> getSupervisorSummeryDetails();

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ProcessSetupDetailsWinterF005> getHodSummeryDetails();

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE ORDER_NO =:order_no AND DATE=:date AND SHIFT =:shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProcessSetupDetailsWinterF005> getPrintDetails(@Param("order_no") String order_no, @Param("date") String date,
			@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE ID = :reportId", nativeQuery = true)
	ProcessSetupDetailsWinterF005 findFormById(@Param("reportId") long reportId);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
  List<ProcessSetupDetailsWinterF005> supervisorHodSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
  List<ProcessSetupDetailsWinterF005> operatorSummary();

}
