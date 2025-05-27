package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaGrowthPromotionTestReportF021;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;

public interface MediaGrowthPromotionF021Repo extends JpaRepository<Qc_MediaGrowthPromotionTestReportF021, Long> {

	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE ID = :id ", nativeQuery = true)
	Qc_MediaGrowthPromotionTestReportF021 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE INCUBATION_START_ON=:incubationStartOn ", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> findByIncubationDate(@Param("incubationStartOn") String incubationStartOn);
	
//	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE " +
//	        "(:month IS NULL OR MONTH = :month) AND " +
//	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
//	List<Qc_MediaGrowthPromotionTestReportF021> findByDateMonthYear(
//	    @Param("month") String month,
//	    @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' OR (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> findByMicroStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE  MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS !='QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> findByMicroStatusSubmittedAndHodStatusNotApproved();	
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> getForReportPrint(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE " +
			"(:incubationStartOn IS NULL OR INCUBATION_START_ON = :incubationStartOn) AND " +
			"(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "MICROBIOLOGIST_STATUS= 'MICROBIOLOGIST_APPROVED' AND (MANAGER_STATUS = 'QC_APPROVED' OR MANAGER_STATUS ='QA_APPROVED')", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> getForReportPrint(
		@Param("incubationStartOn") String incubationStartOn,
		@Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' OR MANAGER_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021> findAll();



}
