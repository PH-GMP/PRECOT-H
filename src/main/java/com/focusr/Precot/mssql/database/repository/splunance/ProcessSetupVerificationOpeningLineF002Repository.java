package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationOpeningLineF002;


@Repository
public interface ProcessSetupVerificationOpeningLineF002Repository extends JpaRepository< ProcessSetupVerificationOpeningLineF002,Long> {

	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002 WHERE OPENING_ID=:id", nativeQuery = true)
	ProcessSetupVerificationOpeningLineF002 findProcessSetupDetailsById(@Param("id") Long id);
	
	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002 WHERE ORDER_NO=:order_no AND DATE=:date AND SHIFT=:shift AND HOD_STATUS = 'HOD_APPROVED' ", nativeQuery = true)
	  @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002 WHERE " +
              "(:order_no IS NULL OR ORDER_NO = :order_no) AND " +
              "(:date IS NULL OR DATE = :date) AND " +
              "(:shift IS NULL OR SHIFT = :shift) AND"
              + " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProcessSetupVerificationOpeningLineF002> printParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002 WHERE ORDER_NO=:order_no AND DATE=:date AND SHIFT=:shift ", nativeQuery = true)
	ProcessSetupVerificationOpeningLineF002 getdetailsbyParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);

	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY OPENING_ID DESC", nativeQuery = true)
	 List<ProcessSetupVerificationOpeningLineF002> hodSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY OPENING_ID DESC", nativeQuery = true)
	 List<ProcessSetupVerificationOpeningLineF002> supervisorSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002  WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY OPENING_ID DESC", nativeQuery = true)
	 List<ProcessSetupVerificationOpeningLineF002> operatorSummary();
	 
		// DASHBOARD

		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_F002", nativeQuery = true)
		List<Object[]> getStatusCounts();
	}
