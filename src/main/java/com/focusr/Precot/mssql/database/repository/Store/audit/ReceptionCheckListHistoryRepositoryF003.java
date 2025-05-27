package com.focusr.Precot.mssql.database.repository.Store.audit;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001;


public interface ReceptionCheckListHistoryRepositoryF003 extends JpaRepository<ReceptionCheckListHistoryF003, Long> {
	

	
//	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 WHERE INVOICE_NO=:invoiceNo AND DESCRIPTION=:description AND VERSION IN (SELECT MAX(VERSION) FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 WHERE INVOICE_NO=:invoiceNo AND DESCRIPTION=:description)", nativeQuery = true)
//	ReceptionCheckListHistoryF003 fetchLastSubmittedReceptionCheckList(@Param("invoiceNo") String invoiceNo, @Param("description") String description);
	
//	@Query(value = "SELECT  * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 WHERE INVOICE_NO=:invoiceNo AND DESCRIPTION=:description", nativeQuery = true)
//	ReceptionCheckListHistoryF003 fetchLastSubmittedReceptionCheckList(@Param("invoiceNo") String invoiceNo, @Param("description") String description);

	
	@Query(value = "SELECT TOP 1 * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 WHERE INVOICE_NO=:invoiceNo AND DESCRIPTION=:description ORDER BY STORE_IN_CHARGE_SUBMIT_ON DESC", nativeQuery = true)
	ReceptionCheckListHistoryF003 fetchLastSubmittedReceptionCheckList(@Param("invoiceNo") String invoiceNo, @Param("description") String description);


	
	@Query(value = "SELECT MAX(VERSION) FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 WHERE INVOICE_NO = :invoiceNo AND DESCRIPTION=:description  ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("invoiceNo") String invoiceNo , @Param("description") String description);



//	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 r WHERE "
//            + "(:from_date IS NULL OR :to_date IS NULL OR r.DATE BETWEEN :from_date AND :to_date) "
//            + "AND (:invoiceNo IS NULL OR r.INVOICE_NO = :invoiceNo) "
//            + "AND (:description IS NULL OR r.DESCRIPTION LIKE %:description%)", 
//            nativeQuery = true)
//List<ReceptionCheckListHistoryF003> findByParams(
//    @Param("from_date") String from_date,
//    @Param("to_date") String to_date,
//    @Param("invoiceNo") String invoiceNo,
//    @Param("description") String description);





	
	
//	testing
//	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 r WHERE "
//		    + "(:from_date IS NULL OR :to_date IS NULL OR r.DATE BETWEEN :from_date AND :to_date) "
//		    + "AND (:invoiceNo IS NULL OR r.INVOICE_NO = :invoiceNo) "
//		    + "AND (:description IS NULL OR r.DESCRIPTION LIKE %:description%)", 
//		    nativeQuery = true)
//		List<ReceptionCheckListHistoryF003> findByParams(
//		    @Param("from_date") Date from_date,  // Use Date instead of String
//		    @Param("to_date") Date to_date,      // Use Date instead of String
//		    @Param("invoiceNo") String invoiceNo,
//		    @Param("description") String description);



//	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 f " +
//            "WHERE (:fromDate IS NULL OR f.DATE >= :fromDate) " +
//            "AND (:toDate IS NULL OR f.DATE <= :toDate) " +
//            "AND (:invoiceNo IS NULL OR f.INVOICE_NO = :invoiceNo)" +
//            "AND (:description IS NULL OR f.DESCRIPTION = :description)"
//            ,nativeQuery = true)
//List<ReceptionCheckListHistoryF003> findByParams003(@Param("fromDate") LocalDate fromDate,
//                                                        @Param("toDate") LocalDate toDate,
//                                                        @Param("invoiceNo") String invoiceNo,
//                                                        @Param("description") String description);
	
	
	
	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_HISTORY_F003 f " +
	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
	        "AND (:invoiceNo IS NULL OR f.INVOICE_NO = :invoiceNo) " +
	        "AND (:description IS NULL OR f.DESCRIPTION = :description)", 
	        nativeQuery = true)
	List<ReceptionCheckListHistoryF003> findByParams003(
	  @Param("fromDate") LocalDate fromDate,
	  @Param("toDate") LocalDate toDate,
	  @Param("invoiceNo") String invoiceNo,
	  @Param("description") String description);



}


	
	
	
	

	
	
	

