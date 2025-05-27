package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR10ProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.splunance.BMR11ListsOfEnclosures;

public interface BMR11ListsOfEnclosuresRepository extends JpaRepository<BMR11ListsOfEnclosures, Long> {
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_11_LIST_OF_ENCLOSURES WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR11ListsOfEnclosures> getSummaryByOrderNo11(@Param("order_no") String order_no);


}
