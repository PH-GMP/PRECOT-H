package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001;




@Repository
public interface BaleConsumptionReportDryGoodsHistoryF001Repository  extends JpaRepository<BaleConsumptionReportDryGoodsHistoryF001, Long> {
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY WHERE DATE=:date AND SHIFT =:shift AND LAYDOWN_NO =:laydownno", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("laydownno") String laydownno);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND LAYDOWN_NO =:laydownno AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND LAYDOWN_NO =:laydownno)", nativeQuery = true)
	BaleConsumptionReportDryGoodsHistoryF001 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("laydownno") String laydownno);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY WHERE DATE=:date AND SHIFT =:shift AND LAYDOWN_NO =:laydownno", nativeQuery = true)
	List<BaleConsumptionReportDryGoodsHistoryF001> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("laydownno") String laydownno);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f01_shift IS NULL OR SHIFT = :f01_shift) AND(:f01_laydown_no IS NULL OR LAYDOWN_NO =:f01_laydown_no) ", nativeQuery = true)
	List<BaleConsumptionReportDryGoodsHistoryF001> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f01_shift") String f01_shift,@Param("f01_laydown_no") String f01_laydown_no);
}
