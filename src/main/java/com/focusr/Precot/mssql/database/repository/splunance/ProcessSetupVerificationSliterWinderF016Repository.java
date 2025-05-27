package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;

public interface ProcessSetupVerificationSliterWinderF016Repository extends JpaRepository<ProcessSetupVerificationSliterWinderF016,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE PROCESS_ID = :processId ", nativeQuery = true)
	ProcessSetupVerificationSliterWinderF016 findFormById(@Param("processId") long processId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo", nativeQuery = true)
	ProcessSetupVerificationSliterWinderF016 findByDateShiftOrderNo(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	ProcessSetupVerificationSliterWinderF016 findByDateShiftOrderNoPrintApi(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
//    List<ProcessSetupVerificationSliterWinderF016> operatorSummary();
//	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
//    List<ProcessSetupVerificationSliterWinderF016> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
//    List<ProcessSetupVerificationSliterWinderF016> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
    List<ProcessSetupVerificationSliterWinderF016> operatorSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
    List<ProcessSetupVerificationSliterWinderF016> supervisorSummary();
}
