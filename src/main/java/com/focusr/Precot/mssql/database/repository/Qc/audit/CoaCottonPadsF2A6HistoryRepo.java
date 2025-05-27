package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonPadsF26AHistory;

@Repository
public interface CoaCottonPadsF2A6HistoryRepo extends JpaRepository<CoaCottonPadsF26AHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.COA_COTTON_PADS_F26A_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("product") String product, @Param("customer") String customer);

	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer AND VERSION IN (SELECT MAX(VERSION) FROM precot.COA_COTTON_PADS_F26A_HISTORY WHERE PRODUCT=:product AND CUSTOMER =:customer)", nativeQuery = true)
	CoaCottonPadsF26AHistory fetchLastSubmittedRecord(@Param("product") String product,
			@Param("customer") String customer);

	// AUDIT

	@Query(value = "SELECT * FROM precot.COA_COTTON_PADS_F26A_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)"
			+ "AND (:procuct IS NULL OR PRODUCT = :procuct)"
			+ "AND (:customer IS NULL OR CUSTOMER = :customer)", nativeQuery = true)
	List<CoaCottonPadsF26AHistory> findByParamsF026A(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("procuct") String procuct, @Param("customer") String customer);

}
