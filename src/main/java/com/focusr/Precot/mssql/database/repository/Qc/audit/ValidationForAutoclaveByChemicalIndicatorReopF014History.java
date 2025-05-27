package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.Qc_BacterialIncubatorTempCalibrationF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_ValidationForAutoclaveByChemicalIndicatorF014History;

public interface ValidationForAutoclaveByChemicalIndicatorReopF014History extends JpaRepository<Qc_ValidationForAutoclaveByChemicalIndicatorF014History, Long> {

	@Query(value = "SELECT * FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE DATE=:date)", nativeQuery = true)
	Qc_ValidationForAutoclaveByChemicalIndicatorF014History fetchLastSubmittedRecordByDate(@Param("date") String date);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:eqIdNo IS NULL OR EQ_ID = :eqIdNo) ", nativeQuery = true)
	List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> findByParamsF014(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("eqIdNo") String eqIdNo);
	
//	@Query(value = "SELECT * FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE DATE = :date ", nativeQuery = true)
//	List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> findFormByDate(@Param("date") String date);


	@Query(value = "SELECT * FROM precot.QC_VALIDATION_FOR_AUTOCLAVE_BY_CHEMICAL_INDICATORF014_HISTORY WHERE "
			+ "DATE = :date "
			+ "AND (:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) ", nativeQuery = true)
	List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> findFormByDate(@Param("date") String date,@Param("eqIdNo") String eqIdNo);

}
