package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsProductChangeOverHistoryF09;



@Repository
public interface GoodsProductChangeOverRepositoryHistoryF09 extends JpaRepository<GoodsProductChangeOverHistoryF09, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.GOODS_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE=:date AND SECTION=:section AND MACHINE_NAME=:machine", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("section") String section, @Param("machine") String machine);
	
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE =:date AND SECTION=:section AND MACHINE_NAME=:machine AND VERSION IN (SELECT MAX(VERSION) FROM precot.GOODS_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE =:date AND SECTION=:section AND MACHINE_NAME=:machine)", nativeQuery = true)
	GoodsProductChangeOverHistoryF09 findLastSubmittedRecord(@Param("date") String date,@Param("section") String section,@Param("machine") String machine);
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_HISTORY_F03 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f09_machineName IS NULL OR MACHINE_NAME = :f09_machineName) "
	        + "AND (:f09_orderNo1 IS NULL OR ORDER_NO_1 = :f09_orderNo1)", nativeQuery = true)
	List<GoodsProductChangeOverHistoryF09> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f09_machineName") String f09_machineName,
	        @Param("f09_orderNo1") String f09_orderNo1);
	
}
