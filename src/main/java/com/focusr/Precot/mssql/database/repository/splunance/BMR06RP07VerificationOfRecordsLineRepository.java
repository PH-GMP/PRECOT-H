package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureList;
import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecordsLine;

public interface BMR06RP07VerificationOfRecordsLineRepository extends JpaRepository<BMR06RP07VerificationOfRecordsLine, Long> {
	
	
	
	
	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_05_ANNEXURE WHERE ORDER_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
//	List<BMR05AnnexureList> getSummaryByOrderNo05(@Param("order_no") String order_no);

}
