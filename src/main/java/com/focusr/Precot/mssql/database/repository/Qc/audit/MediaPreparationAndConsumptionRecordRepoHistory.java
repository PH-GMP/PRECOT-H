package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaPreparationAndConsumptionRecordF019History;

public interface MediaPreparationAndConsumptionRecordRepoHistory extends JpaRepository<Qc_MediaPreparationAndConsumptionRecordF019History, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE ID = :id ", nativeQuery = true)
	Qc_MediaPreparationAndConsumptionRecordF019History findFormById(@Param("id") long id);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE PREPARATION_DATE=:preparationDate AND LOAD_NO=:loadNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("preparationDate") String preparationDate,@Param("loadNo") String loadNo);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE PREPARATION_DATE=:preparationDate AND LOAD_NO=:loadNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE PREPARATION_DATE=:preparationDate AND LOAD_NO=:loadNo)", nativeQuery = true)
	Qc_MediaPreparationAndConsumptionRecordF019History fetchLastSubmittedRecordByDateAndLoad(@Param("preparationDate") String preparationDate,@Param("loadNo") String loadNo);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR PREPARATION_DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:loadNo IS NULL OR LOAD_NO = :loadNo) ", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019History> findByParamsF019(
			@Param("from_date") String from_date,
			@Param("to_date") String to_date,
			@Param("loadNo") String loadNo);
	
//	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE PREPARATION_DATE = :date ", nativeQuery = true)
//	List<Qc_MediaPreparationAndConsumptionRecordF019History> findFormByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QC_MEDIA_PREPARATION_AND_CONSUMPTION_RECORD_F019_HISTORY WHERE "
			+ "PREPARATION_DATE = :date "
			+ "AND (:loadNo IS NULL OR LOAD_NO = :loadNo) ", nativeQuery = true)
	List<Qc_MediaPreparationAndConsumptionRecordF019History> findFormByDate(@Param("date") String date,@Param("loadNo") String loadNo);

}