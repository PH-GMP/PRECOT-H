package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.RPB12ListOfEnclouser;

public interface RPB12ListOfEnclouserRepository extends JpaRepository< RPB12ListOfEnclouser, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_12_LIST_OF_ENCLOSURS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RPB12ListOfEnclouser> getSummaryByOrderNo12(@Param("order_no") String order_no);

}
