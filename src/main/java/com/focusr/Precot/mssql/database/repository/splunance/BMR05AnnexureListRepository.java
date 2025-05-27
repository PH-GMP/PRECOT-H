package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;
import com.focusr.Precot.mssql.database.model.splunance.BMR05AnnexureList;

public interface BMR05AnnexureListRepository extends JpaRepository<BMR05AnnexureList, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_05_ANNEXURE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR05AnnexureList> getSummaryByOrderNo05(@Param("order_no") String order_no);

}
