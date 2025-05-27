package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.QcShelfLifePeriodPhysicChemMicroF026;
import com.focusr.Precot.util.Qc.ShelfLifePeriodLotPayload;

public interface ShelfLifePeriodPhysicChemMicroF026Repo extends JpaRepository<QcShelfLifePeriodPhysicChemMicroF026, Long> {
    
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE ID = :id ", nativeQuery = true)
	QcShelfLifePeriodPhysicChemMicroF026 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE MILL_BATCH_NO=:millBatchNo", nativeQuery = true)
//	List<QcShelfLifePeriodPhysicChemMicroF026> findByMillBatchNo(@Param("millBatchNo") String millBatchNo);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE MILL_BATCH_NO=:millBatchNo AND CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByMillBatchNoFinalApproval(@Param("millBatchNo") String millBatchNo);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE (CHEMIST_STATUS = 'CHEMIST_SAVED' OR MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED') AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByChemistOrMicroStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByChemistAndMicroStatusSubmittedAndQcStatusNotApproved();

	
	@Query(value = "SELECT * FROM precot.RAW_COTTON_ANALYSIS_REPORT_AR_F001 WHERE DATE = :date AND MILL_BATCH_NO=:millBatchNo  ORDER BY ID DESC", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByDateNewF001(@Param("date") String date, @Param("millBatchNo") String millBatchNo);
	
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE MILL_BATCH_NO = :millBatchNo AND CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByMillBatchNoForPrint(@Param("millBatchNo") String millBatchNo);

	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') OR QC_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findAll();
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE " +
	        "(:productionDate IS NULL OR PRODUCTION_DATE = :productionDate) AND " +
	        "(:testingDate IS NULL OR TESTING_DATE = :testingDate) AND " +
	        "(:lotNo IS NULL OR LOT_NUMBER = :lotNo) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> findByProdDateTestingDateYear(
	    @Param("productionDate") String productionDate,
	    @Param("testingDate") String testingDate,
	    @Param("lotNo") String lotNo,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE " +
	        "(:productionDate IS NULL OR PRODUCTION_DATE = :productionDate) AND " +
	        "(:testingDate IS NULL OR TESTING_DATE = :testingDate) AND " +
	        "(:lotNo IS NULL OR LOT_NUMBER = :lotNo) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "(QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<QcShelfLifePeriodPhysicChemMicroF026> getForReportPrint(
	    @Param("productionDate") String productionDate,
	    @Param("testingDate") String testingDate,
	    @Param("lotNo") String lotNo,
	    @Param("year") String year);
	
//	@Query(value = "SELECT CUSTOMER,BRAND,PRODUCTION_DESCRIPTION FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE LOT_NUMBER = :lotNo", nativeQuery = true)
//	List<ShelfLifePeriodLotPayload> findDetailByLot(@Param("lotNo") String lotNo);
	
	@Query(value = "SELECT CUSTOMER, BRAND, PRODUCTION_DESCRIPTION FROM precot.QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026 WHERE LOT_NUMBER = :lotNo", nativeQuery = true)
	List<Object[]> findDetailByLot(@Param("lotNo") String lotNo);
	
	




}