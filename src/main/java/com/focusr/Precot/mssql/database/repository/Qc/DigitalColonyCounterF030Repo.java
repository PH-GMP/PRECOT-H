package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.DigitalColonyCounterF030;

@Repository
public interface DigitalColonyCounterF030Repo extends JpaRepository<DigitalColonyCounterF030, Long> {

	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030 WHERE ID =:id ", nativeQuery = true)
	DigitalColonyCounterF030 findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030 "
			+ "WHERE (:month IS NULL OR :month='' OR MONTH = :month) "
			+ "AND (:year IS NULL OR :year='' OR YEAR = :year) "
			+ "AND (:eq_id IS NULL OR :eq_id='' OR EQUIP_ID = :eq_id) "
			+ "AND MICRO_DESIGNEE_STATUS = 'MICRO_DESIGNEE_APPROVED'", nativeQuery = true)
	List<DigitalColonyCounterF030> PrintApiF016(@Param("month") String month, @Param("year") String year,
			@Param("eq_id") String eq_id);

	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030 WHERE MONTH=:month AND YEAR =:year AND EQUIP_ID = :eq_id", nativeQuery = true)
	List<DigitalColonyCounterF030> GetAbCottonF26(@Param("month") String month, @Param("year") String year,
			@Param("eq_id") String eq_id);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030 WHERE MICRO_STATUS = 'MICRO_SAVED' OR MICRO_DESIGNEE_STATUS != 'MICRO_DESIGNEE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<DigitalColonyCounterF030> microSummary();

	// MANAGER SUMMARY

	@Query(value = "SELECT * FROM precot.DIGITAL_COLONY_COUNTER_F030 WHERE MICRO_STATUS = 'MICROBIOLOGIST_APPROVED' AND MICRO_DESIGNEE_STATUS != 'MICRO_DESIGNEE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<DigitalColonyCounterF030> microDesigneeSummary();
}
