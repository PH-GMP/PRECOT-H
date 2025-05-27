package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.distillwaterconsumhistoryF27;

public interface distillwaterconsumF27HistoryRepo extends JpaRepository<distillwaterconsumhistoryF27, Long>{


	@Query(value = "SELECT MAX(VERSION) FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT_HISTORY WHERE EQ_ID=:eq_id AND DATE = :date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("eq_id") String eq_id,@Param("date") String  date);
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT_HISTORY WHERE EQ_ID=:eq_id AND DATE = :date AND  VERSION IN (SELECT MAX(VERSION) FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY WHERE EQ_ID=:eq_id)", nativeQuery = true)
	distillwaterconsumhistoryF27 fetchLastSubmittedRecordPhNumber(@Param("eq_id") String eq_id ,@Param("date") String  date);
}
