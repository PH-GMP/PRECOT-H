package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.DistilledWaterAnalysisReportARF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcPhMeterCalibrationReportF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;

@Repository
public interface RegantPreparationRecordF017RepoHistory extends JpaRepository<QcReagentPreparationRecordF017History, Long> {

//	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE PREPARATION_DATE=:preparationDate AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE PREPARATION_DATE=:preparationDate)", nativeQuery = true)
//	QcReagentPreparationRecordF017History fetchLastSubmittedRecordDate(@Param("preparationDate") String preparationDate);

	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE MONTH=:month AND YEAR=:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE MONTH=:month AND YEAR=:year)"
		, nativeQuery = true)
	QcReagentPreparationRecordF017History fetchLastSubmittedRecordDate(@Param("month") String month,@Param("year") String year);
	
//	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE PREPARATION_DATE=:preparationDate", nativeQuery = true)
//	Optional<Integer> getMaximumVersionOfDate(@Param("preparationDate") String preparationDate);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE  MONTH=:month AND YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDate(@Param("month") String month,@Param("year") String year);	

	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR PREPARATION_DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:month IS NULL OR MONTH = :month) "
			+ "AND (:year IS NULL OR YEAR = :year) ", nativeQuery = true)
	List<QcReagentPreparationRecordF017History> findByParamsF017(
			@Param("from_date") String from_date,
			@Param("to_date") String to_date,
			@Param("month") String month,
			@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017HISTORY WHERE PREPARATION_DATE = :date ", nativeQuery = true)
	List<QcReagentPreparationRecordF017History> findFormByDate(@Param("date") String date);

}
