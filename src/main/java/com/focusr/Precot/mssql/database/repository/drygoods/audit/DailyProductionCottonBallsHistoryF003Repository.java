package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionCottonBallsHistoryF003;

@Repository
public interface DailyProductionCottonBallsHistoryF003Repository  extends JpaRepository<DailyProductionCottonBallsHistoryF003, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003_HISTORY WHERE DATE=:date AND SHIFT =:shift AND MACHINE_NAME =:machine_name AND ORDER_NO = :order_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND MACHINE_NAME =:machine_name AND ORDER_NO = :order_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003_HISTORY WHERE  DATE=:date AND SHIFT =:shift AND MACHINE_NAME =:machine_name AND ORDER_NO = :order_no)", nativeQuery = true)
	DailyProductionCottonBallsHistoryF003 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003_HISTORY WHERE DATE=:date AND SHIFT =:shift AND MACHINE_NAME =:machine_name", nativeQuery = true)
	List<DailyProductionCottonBallsHistoryF003> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name);
	
	@Query(value = "SELECT * \r\n"
			+ "FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003_HISTORY \r\n"
			+ "WHERE (:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)\r\n"
			+ "  AND (:f03_shift IS NULL OR SHIFT = :f03_shift)\r\n"
			+ "  AND (:f03_machine_name IS NULL OR MACHINE_NAME = :f03_machine_name)\r\n"
			+ " ", nativeQuery = true)
	List<DailyProductionCottonBallsHistoryF003> findByParams03(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f03_shift") String f03_shift,@Param("f03_machine_name") String f03_machine_name);


}
