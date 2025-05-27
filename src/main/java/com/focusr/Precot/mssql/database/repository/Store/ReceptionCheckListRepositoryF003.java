package com.focusr.Precot.mssql.database.repository.Store;

import java.time.LocalDate;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;



public interface ReceptionCheckListRepositoryF003 extends JpaRepository<ReceptionCheckListF003, Long> {

	
	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE ID=:id", nativeQuery = true)
	ReceptionCheckListF003 fetchReceptionChecklistById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE OPERATOR_STATUS='OPERATOR_SAVED' OR STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<ReceptionCheckListF003> ReceptionChecklistSummaryforAssistant();

		
		@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<ReceptionCheckListF003> ReceptionChecklistSummaryforHod();
		
		   @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE DATE = :date AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
		    List<ReceptionCheckListF003> getReceptionCheckListByDate(@Param("date") String date);

//		    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
//		    List<ReceptionCheckListF003> getReceptionCheckListByYearAndMonth(@Param("year") String year, @Param("month") String month);

//		    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
//		    List<ReceptionCheckListF003> getReceptionCheckListByYear(@Param("year") String year);
		
		
		@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE  DATE=:date AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
		List<ReceptionCheckListF003> getMonthlyplanSummaryPrint(@Param("date") String date);
		
		
	    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE DATE BETWEEN :fromDate AND :toDate AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ReceptionCheckListF003> getReceptionCheckListByDateRange(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND INVOICE_NO = :invoice AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ReceptionCheckListF003> getReceptionCheckListByYearMonthInvoice(@Param("year") String year, @Param("month") String month, @Param("invoice") String invoice);

	    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ReceptionCheckListF003> getReceptionCheckListByYearAndMonth(@Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ReceptionCheckListF003> getReceptionCheckListByYear(@Param("year") String year);

		@Query(value = "SELECT * FROM precot.STORE_RECEPTION_CHECK_LIST_F003 WHERE INVOICE_NO = :invoiceNo AND DESCRIPTION = :description", nativeQuery = true)
		List<ReceptionCheckListF003> findByInvoiceNoAndDescription(@Param("invoiceNo") String invoiceNo, @Param("description") String description);
		
		 @Query(value ="SELECT INVOICE_NO FROM precot.STORE_RECEPTION_CHECK_LIST_F003", nativeQuery = true)
		    List<String> findAllUniqueInvoiceNumbers();
		 


			List<ReceptionCheckListF003> findByInvoiceNo(String invoiceNo);
		
		
		

		





	


	
}
