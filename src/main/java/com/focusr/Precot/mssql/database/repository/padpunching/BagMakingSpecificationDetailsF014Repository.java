package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;

public interface BagMakingSpecificationDetailsF014Repository extends JpaRepository<BagMakingSpecificationDetailsF014, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE BAG_ID = :bagId ", nativeQuery = true)
	BagMakingSpecificationDetailsF014 findFormById(@Param("bagId") long bagId);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE DATE = :date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND PRODUCT_NAME = :productName", nativeQuery = true)
	BagMakingSpecificationDetailsF014 findByDateShift(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName,@Param("productName") String productName);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift)  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BagMakingSpecificationDetailsF014> findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY BAG_ID DESC", nativeQuery = true)
    List<BagMakingSpecificationDetailsF014> operatorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY BAG_ID DESC", nativeQuery = true)
    List<BagMakingSpecificationDetailsF014> hodSummary();
	
	// CR 
	
	@Query(value = "SELECT DISTINCT PRODUCT_NAME FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014", nativeQuery = true)
	List<String> productNamelist();
	
	@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct tp WHERE Cat IN ('Pads', 'Bags', 'Balls')", nativeQuery = true)
	List<String> productNamelistSAP();
	
	@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct tp WHERE Cat IN ('Bags')", nativeQuery = true)
	List<String> productNamesBags();
	
	
	
}


