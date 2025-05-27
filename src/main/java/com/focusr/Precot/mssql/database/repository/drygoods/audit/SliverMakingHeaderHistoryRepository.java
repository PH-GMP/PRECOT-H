package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingHeaderHistory;

public interface SliverMakingHeaderHistoryRepository extends JpaRepository<SliverMakingHeaderHistory, Long> {
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING_02 WHERE SLIVER_ID=:sliver_id AND FORM_NO ='PH-PRD04/F-002'", nativeQuery = true)
	SliverMakingHeaderHistory getDetails(@Param("sliver_id") Long sliver_id);
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_SLIVER_MAKING_HISTORY_02 WHERE MACHINE_NAME=:machine_name AND DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("machine_name") String machine_name, @Param("date") String date, @Param("shift") String shift, @Param("order_no") String order_no);

	@Query(value = "SELECT * \r\n"
			+ "FROM precot.DRYGOODS_SLIVER_MAKING_HISTORY_02 \r\n"
			+ "WHERE \r\n"
			+ "    (:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) \r\n"
			+ "    AND (:f02_shift IS NULL OR SHIFT = :f02_shift) \r\n"
			+ "    AND (:machine_name IS NULL OR MACHINE_NAME = :machine_name)", nativeQuery = true)
	List<SliverMakingHeaderHistory> findByParams02(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f02_shift") String f02_shift,@Param("machine_name") String machine_name);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING_HISTORY_02 WHERE MACHINE_NAME=:machine_name AND DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_SLIVER_MAKING_HISTORY_02 WHERE MACHINE_NAME=:machine_name AND DATE=:date AND SHIFT=:shift AND ORDER_NO = :order_no)", nativeQuery = true)
	SliverMakingHeaderHistory fetchLastSubmittedRecord(@Param("machine_name") String machine_name, @Param("date") String date, @Param("shift") String shift, @Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING_HISTORY_02 WHERE MACHINE_NAME=:machine_name AND DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<SliverMakingHeaderHistory> fetchHistory(@Param("machine_name") String machine_name, @Param("date") String date, @Param("shift") String shift);
	

}
