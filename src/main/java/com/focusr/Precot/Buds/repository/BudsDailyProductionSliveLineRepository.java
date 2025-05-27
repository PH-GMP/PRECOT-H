package com.focusr.Precot.Buds.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.Buds.model.BudsLogbookProductionLine;

@Repository
public interface BudsDailyProductionSliveLineRepository extends JpaRepository<BudsDailyProductionSliverLine, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_LINE WHERE LINE_ID=:id", nativeQuery = true)
	BudsDailyProductionSliverLine productionLineById(@Param("id") Long id);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_LINE WHERE LINE_ID = :id", nativeQuery = true)
	void deleteProductionLineById(@Param("id") Long id);
	
}
