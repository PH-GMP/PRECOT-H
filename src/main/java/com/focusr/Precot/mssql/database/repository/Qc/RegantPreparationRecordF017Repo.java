package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017;

public interface RegantPreparationRecordF017Repo extends JpaRepository<QcReagentPreparationRecordF017, Long> {

	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE ID = :id ", nativeQuery = true)
	QcReagentPreparationRecordF017 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<QcReagentPreparationRecordF017> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE FORMAT_NO = 'PH-QCL01-AR-F-012' ", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> findFormByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE " +
	        "(:date IS NULL OR PREPARATION_DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE (CHEMIST_STATUS ='CHEMIST_SAVED' OR MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED') AND MANAGER_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE  (CHEMIST_STATUS = 'CHEMIST_APPROVED') AND (MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByChemistStatusSubmittedAndHodStatusNotApproved();	 
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE  (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByMicroStatusSubmittedAndHodStatusNotApproved();	 
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE  (CHEMIST_STATUS = 'CHEMIST_APPROVED') AND (MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_REJECTED') ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByChemistStatusSubmitted();	
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE  (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByMicroStatusSubmitted();	
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(MANAGER_STATUS = 'CHEMIST_DESIGNEE_APPROVED')", nativeQuery = true)
	List<QcReagentPreparationRecordF017> getForReportPrintChemistDesigne(
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(MANAGER_STATUS = 'MICRO_DESIGNEE_APPROVED')", nativeQuery = true)
	List<QcReagentPreparationRecordF017> getForReportPrintMicroDesigne(
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE MONTH = :month AND YEAR = :year", nativeQuery = true)
	List<QcReagentPreparationRecordF017> findByMonthAndYear(@Param("month") String month, @Param("year") String year);


	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> getForReportPrint(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' QC_STATUS IS NOT NULL ORDER BY ID DESC", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> findAll();
	//.,...........
//	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE (CHEMIST_STATUS= 'CHEMIST_SAVED' AND CHEMIST_STATUS= 'CHEMIST_APPROVED') AND (MANAGER_STATUS IS NULL OR (MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED')) AND createdBy =:userName ORDER BY ID DESC", nativeQuery = true)
//	List<QcReagentPreparationRecordF017> chemistfindAll(@Param("userName") String userName);
	
	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 " +
			"WHERE CHEMIST_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') " +
			"AND (MANAGER_STATUS IS NULL OR MANAGER_STATUS NOT IN ('CHEMIST_DESIGNEE_APPROVED', 'MICRO_DESIGNEE_APPROVED')) " +
			"AND createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> chemistfindAll(@Param("userName") String userName);

//	
//	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 WHERE (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' AND MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (MANAGER_STATUS IS NULL OR (MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED')) AND createdBy =:userName ORDER BY ID DESC", nativeQuery = true)
//	List<QcReagentPreparationRecordF017> microfindAll(@Param("userName") String userName);

	@Query(value = "SELECT * FROM precot.QC_REAGENT_PREPARATION_RECORD_F017 " +
			"WHERE MICROBIOLOGIST_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') " +
			"AND (MANAGER_STATUS IS NULL OR MANAGER_STATUS NOT IN ('CHEMIST_DESIGNEE_APPROVED', 'MICRO_DESIGNEE_APPROVED')) " +
			"AND createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QcReagentPreparationRecordF017> microfindAll(@Param("userName") String userName);

}
