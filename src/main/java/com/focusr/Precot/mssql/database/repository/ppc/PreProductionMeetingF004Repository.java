package com.focusr.Precot.mssql.database.repository.ppc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummary_ProductionData_F_002;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingF004;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;


@Repository
public interface PreProductionMeetingF004Repository extends JpaRepository<PreProductionMeetingF004, Long> {

	@Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE ID=:id", nativeQuery = true)
	PreProductionMeetingF004 fetchPreProductionMeetingF004ById(@Param("id") Long id);

	
	@Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE DATE=:date AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<PreProductionMeetingF004> getPreproductionMeetingPrint(@Param("date") String date);
	
	
	@Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE  DATE=:date", nativeQuery = true)
	List<PreProductionMeetingF004> getPreproductionMeetingByid(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE ASSISTANT_STATUS='ASSISANT_SAVED'  ORDER BY ID DESC", nativeQuery = true)
		List<PreProductionMeetingF004> getPreproductionMeeting();
	
	
	 @Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE DATE=:date AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	    List<PreProductionMeetingF004> getPreproductionMeetingByDate(@Param("date") String date);

	    @Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE YEAR(DATE)=:year AND MONTH(DATE)=:month AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	    List<PreProductionMeetingF004> getPreproductionMeetingByYearAndMonth(@Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.PPC_PRE_PRODUCTIONS_F004 WHERE YEAR(DATE)=:year AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	    List<PreProductionMeetingF004> getPreproductionMeetingByYear(@Param("year") String year);
	    
	    
	
	// CR 
	    
	    @Query(value = "SELECT DISTINCT CUST_NAME FROM tblcusinfo", nativeQuery = true)
	    List<String> customerNameList();


	    @Query(value = "SELECT DISTINCT tp.Brand FROM tblProduct tp JOIN tblcusinfo t ON tp.Product = t.MATERIAL \r\n"
	    		+ "WHERE t.CUST_NAME =:customer", nativeQuery = true)
	    List<String> brandNameList(@Param("customer") String customer);
	    
	    @Query(value = "SELECT DISTINCT Material FROM tblcusinfo WHERE CUST_NAME =:customer", nativeQuery = true)
	    List<String> materialCodeByCustomer(@Param("customer") String customer);
	    
	    
	    @Query(value = "SELECT DISTINCT tp.ProdDesc FROM tblProduct tp JOIN tblcusinfo t ON tp.ProdDesc = t.MAT_DESC \r\n"
	    		+ "WHERE t.CUST_NAME =:customer AND tp.Brand =:product", nativeQuery = true)
	    List<String> productDescriptionByCustomerBrand(@Param("customer") String customer, @Param("product") String product);
	    
	
}
