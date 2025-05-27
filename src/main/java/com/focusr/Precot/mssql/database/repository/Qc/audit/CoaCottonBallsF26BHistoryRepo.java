package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonBallsF26BHistory;

@Repository
public interface CoaCottonBallsF26BHistoryRepo extends JpaRepository<CoaCottonBallsF26BHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.COA_COTTON_BALLS_F26B_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("product") String product, @Param("customer") String customer);

	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer AND VERSION IN (SELECT MAX(VERSION) FROM precot.COA_COTTON_BALLS_F26B_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer)", nativeQuery = true)
	CoaCottonBallsF26BHistory fetchLastSubmittedRecord(@Param("product") String product,
			@Param("customer") String customer);

	// AUDIT

	@Query(value = "SELECT * FROM precot.COA_COTTON_BALLS_F26B_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)"
			+ "AND (:procuct IS NULL OR PRODUCT = :procuct)"
			+ "AND (:customer IS NULL OR CUSTOMER = :customer)", nativeQuery = true)
	List<CoaCottonBallsF26BHistory> findByParamsF026B(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("procuct") String procuct, @Param("customer") String customer);

}