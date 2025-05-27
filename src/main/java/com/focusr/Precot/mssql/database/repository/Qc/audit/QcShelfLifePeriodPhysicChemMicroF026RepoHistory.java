package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;

public interface QcShelfLifePeriodPhysicChemMicroF026RepoHistory extends JpaRepository<QcShelfLifePeriodPhysicChemMicroF026History, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE ID = :id ", nativeQuery = true)
	QcShelfLifePeriodPhysicChemMicroF026History findFormById(@Param("id") long id);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE TESTING_DATE=:testingDate", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("testingDate") String testingDate);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE TESTING_DATE=:testingDate AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE TESTING_DATE=:testingDate)", nativeQuery = true)
	QcShelfLifePeriodPhysicChemMicroF026History fetchLastSubmittedRecordTestingDate(@Param("testingDate") String testingDate);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR TESTING_DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:productionDate IS NULL OR PRODUCTION_DATE = :productionDate) "
			+ "AND (:lotNo IS NULL OR LOT_NUMBER = :lotNo) ", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026History> findByParamsF026(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("productionDate") String productionDate,@Param("lotNo") String lotNo);
	
//	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE TESTING_DATE = :date ", nativeQuery = true)
//	List<QcShelfLifePeriodPhysicChemMicroF026History> findFormByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY WHERE "
			+ "TESTING_DATE = :date "
			+ "AND (:lotNo IS NULL OR LOT_NUMBER = :lotNo)", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026History> findFormByDate(@Param("date") String date, @Param("lotNo") String lotNo);


}