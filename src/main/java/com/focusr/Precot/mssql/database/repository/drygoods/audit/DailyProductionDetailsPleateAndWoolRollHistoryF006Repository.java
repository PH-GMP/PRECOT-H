package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006;

@Repository
public interface DailyProductionDetailsPleateAndWoolRollHistoryF006Repository extends JpaRepository<DailyProductionDetailsPleateAndWoolRollHistoryF006,Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006_HISTORY WHERE DATE=:date AND SHIFT =:shift AND PRODUCT_NAME =:machine_name AND ORDER_NO = :order_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND PRODUCT_NAME =:machine_name AND ORDER_NO = :order_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND PRODUCT_NAME =:machine_name AND ORDER_NO = :order_no)", nativeQuery = true)
	DailyProductionDetailsPleateAndWoolRollHistoryF006 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006_HISTORY WHERE DATE=:date AND SHIFT =:shift AND PRODUCT_NAME =:machine_name", nativeQuery = true)
	List<DailyProductionDetailsPleateAndWoolRollHistoryF006> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f06_shift IS NULL OR SHIFT = :f06_shift AND PRODUCT_NAME =:machine_name) ", nativeQuery = true)
	List<DailyProductionDetailsPleateAndWoolRollHistoryF006> findByParams06(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f06_shift") String f06_shift,@Param("machine_name") String machine_name);

}
