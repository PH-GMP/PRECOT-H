package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;




@Repository
public interface ProcessSetupDetailsJetlaceAndDryerF003Repository extends JpaRepository<ProcessSetupDetailsJetlaceAndDryerF003,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE PROCESS_ID=:id", nativeQuery = true)
	ProcessSetupDetailsJetlaceAndDryerF003 findProcessSetupDetailsById(@Param("id") Long id);
	
	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE ORDER_NO = :order_no AND DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED' ", nativeQuery = true)
	  @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE " +
              "(:order_no IS NULL OR ORDER_NO = :order_no) AND " +
              "(:date IS NULL OR DATE = :date) AND " +
              "(:shift IS NULL OR SHIFT = :shift) AND " +
              " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProcessSetupDetailsJetlaceAndDryerF003> printParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE ORDER_NO=:order_no AND DATE=:date AND SHIFT=:shift ", nativeQuery = true)
	ProcessSetupDetailsJetlaceAndDryerF003 getdetailsbyParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);
	
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> hodSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> supervisorSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY  PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> operatorSummary();
}
