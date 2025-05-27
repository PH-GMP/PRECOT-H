package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.CoaMoistureF26GHistory;

@Repository
public interface CoaMoistureF26GHistoryRepo extends JpaRepository<CoaMoistureF26GHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.COA_MOISTURE_F26G_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer AND TESTING_DATE =:testingDate", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("product") String product, @Param("customer") String customer,
			@Param("testingDate") String testingDate);
	
	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer AND TESTING_DATE =:testingDate AND VERSION IN (SELECT MAX(VERSION) FROM precot.COA_MOISTURE_F26G_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer AND TESTING_DATE =:testingDate)", nativeQuery = true)
	CoaMoistureF26GHistory fetchLastSubmittedRecord(@Param("product") String product,
			@Param("customer") String customer, @Param("testingDate") String testingDate);


	// AUDIT

	@Query(value = "SELECT * FROM precot.COA_MOISTURE_F26G_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)"
			+ "AND (:procuct IS NULL OR PRODUCT = :procuct)"
			+ "AND (:customer IS NULL OR CUSTOMER = :customer)", nativeQuery = true)
	List<CoaMoistureF26GHistory> findByParamsF026G(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("procuct") String procuct, @Param("customer") String customer);

}
