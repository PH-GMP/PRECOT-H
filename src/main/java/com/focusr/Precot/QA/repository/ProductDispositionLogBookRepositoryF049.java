package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ProductDispositionLogBookF049;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;

@Repository
public interface ProductDispositionLogBookRepositoryF049 extends JpaRepository<ProductDispositionLogBookF049, Long>{

	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE PRODUCT_ID = :productId ", nativeQuery = true)
	ProductDispositionLogBookF049 findFormById(@Param("productId") long productId);
	
	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE DATE=:date", nativeQuery = true)
	List<ProductDispositionLogBookF049> getDetailsBaseParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
    List<ProductDispositionLogBookF049> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
    List<ProductDispositionLogBookF049> qaMrSummary();
	
	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<ProductDispositionLogBookF049> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 " +
            "WHERE (:date IS NULL OR :date='' OR DATE=:date) " +     
            "AND (:month IS NULL OR :month='' OR MONTH=:month) " + 
            "AND (:year IS NULL OR :year='' OR YEAR=:year) " + 
            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
List<ProductDispositionLogBookF049> printProductDispositionLogBookReport(
     @Param("date") String date,
     @Param("month") String month, 
     @Param("year") String year 
);
	
	 //Form Number generation
 	 @Query(value = "SELECT TOP 1 * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 ORDER BY CONTAINER_ID DESC", nativeQuery = true)
 	QaContainerInspectionReport fetchLastGeneratedNo();
 	 
 	//APPROVED CIR NO
 	
 	@Query(value = "SELECT CIR_NO FROM PDE.precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE QA_MR_STATUS ='QA_MR_APPROVED'", nativeQuery = true)
 	List<String> approvedCirNo();
}
