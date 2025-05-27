package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;

@Repository
public interface SpunlaceShiftWiseRPProdSupportF14Repo extends JpaRepository<SpunlaceShiftWiseRPProdSupportF14, Long> {

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE ID=:id", nativeQuery = true)
	SpunlaceShiftWiseRPProdSupportF14 findRPReprtById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE ORDER_NO=:order AND DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<SpunlaceShiftWiseRPProdSupportF14> fetchRPProdReport(@Param("order") String order, @Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE ORDER_NO=:order AND DATE=:date AND SHIFT=:shift AND (HOD_STATUS = 'HOD_APPROVED' OR HOD_MAIL_STATUS = 'HOD_APPROVED')", nativeQuery = true)
	List<SpunlaceShiftWiseRPProdSupportF14> printRPProdReport(@Param("order") String order, @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
    List<SpunlaceShiftWiseRPProdSupportF14> supervisorHodSummary();

//	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED'", nativeQuery = true)
//    List<SpunlaceShiftWiseRPProdSupportF14> operatorSummary();
	
//	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND HOD_MAIL_STATUS != 'HOD_APPROVED'", nativeQuery = true)
//    List<SpunlaceShiftWiseRPProdSupportF14> hodSummary();
	
	
	/**
	 *  GSM PDF REPORT
	 */
	
	@Query(value = "SELECT DISTINCT POrder FROM tblRGoods WHERE PackYear = YEAR(GETDATE()) AND ShaftNo LIKE CONCAT('%', :rollNumber, '%')", nativeQuery = true)
	List<String> getBaleNoFromRoll(@Param("rollNumber") String rollNumber);

	
	@Query(value = "SELECT DISTINCT POrder FROM tblRCons WHERE BaleNo IN (:bales)", nativeQuery = true)
	List<String> getOrderFromBales(@Param("bales") List<String> bales);
	
}
