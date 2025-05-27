package com.focusr.Precot.mssql.database.repository.splunance;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.DailyProdPlanF010;

public interface DailyProdPlanF010Repository extends JpaRepository<DailyProdPlanF010,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PROD_PLAN_F010 WHERE PROD_ID = :prodId ", nativeQuery = true)
	DailyProdPlanF010 findFormById(@Param("prodId") long prodId);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM precot.SPUNLACE_DAILY_PROD_PLAN_F010 WHERE PROD_ID = :id", nativeQuery = true)
	void deleteLogbookLineById(@Param("id") Long id);
	
}
