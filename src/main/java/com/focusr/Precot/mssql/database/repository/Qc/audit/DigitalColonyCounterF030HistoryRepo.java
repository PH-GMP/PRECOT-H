package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.DigitalColonyCounterF030History;

@Repository
public interface DigitalColonyCounterF030HistoryRepo extends JpaRepository<DigitalColonyCounterF030History, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.DIGITAL_COLONY_COUNTER_F030_HISTORY WHERE MONTH=:month AND YEAR =:year AND EQUIP_ID = :eq_id", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("month") String month, @Param("year") String year,
			@Param("eq_id") String eq_id);

	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030_HISTORY WHERE MONTH=:month AND YEAR =:year AND EQUIP_ID = :eq_id AND VERSION IN (SELECT MAX(VERSION) FROM precot.DIGITAL_COLONY_COUNTER_F030_HISTORY WHERE MONTH=:month AND YEAR =:year AND EQUIP_ID = :eq_id )", nativeQuery = true)
	DigitalColonyCounterF030History fetchLastSubmittedRecord(@Param("month") String month, @Param("year") String year,
			@Param("eq_id") String eq_id);
	
	// AUDIT
	 
		@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030_HISTORY WHERE "
				+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)"
				+ "AND (:month IS NULL OR MONTH =:month)" + "AND (:year IS NULL OR YEAR =:year)"
				+ "AND (:eq_id IS NULL OR EQUIP_ID =:eq_id)", nativeQuery = true)
		List<DigitalColonyCounterF030History> findByParamsF030(@Param("from_date") String from_date,
				@Param("to_date") String to_date, @Param("month") String month, @Param("year") String year,
				@Param("eq_id") String eq_id);

}
