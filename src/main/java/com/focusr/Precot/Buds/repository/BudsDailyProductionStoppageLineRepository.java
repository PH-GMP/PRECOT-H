package com.focusr.Precot.Buds.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.BudsDailyProductionStoppageLine;

@Repository
public interface BudsDailyProductionStoppageLineRepository extends JpaRepository<BudsDailyProductionStoppageLine, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_STOPPAGE_LINE WHERE STOPPAGE_ID=:id", nativeQuery = true)
	BudsDailyProductionStoppageLine productionLineById(@Param("id") Long id);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM precot.BUDS_DAILY_PRODUCTION_STOPPAGE_LINE WHERE STOPPAGE_ID = :id", nativeQuery = true)
	void deleteProductionLineById(@Param("id") Long id);
	
}
