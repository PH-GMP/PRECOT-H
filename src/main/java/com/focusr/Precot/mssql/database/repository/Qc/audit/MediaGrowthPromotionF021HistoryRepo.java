package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaGrowthPromotionTestReportF021History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_WiraFiberFinenessTesterReportF010History;

public interface MediaGrowthPromotionF021HistoryRepo extends JpaRepository<Qc_MediaGrowthPromotionTestReportF021History, Long> {

	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021_HISTORY WHERE  INCUBATION_START_ON =:incubationStartOn AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010_HISTORY WHERE INCUBATION_START_ON=:incubationStartOn)", nativeQuery = true)
	Qc_MediaGrowthPromotionTestReportF021History fetchLastSubmittedRecordByIncubationDate(@Param("incubationStartOn")String incubationStartOn);
		
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021_HISTORY WHERE INCUBATION_START_ON=:incubationStartOn", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDate(@Param("incubationStartOn")String incubationStartOn);

	@Query(value = "SELECT * FROM precot.QC_MEDIA_GROWTH_PROPMOTION_TEST_REPORT_F021_HISTORY WHERE "
			+ "(:month IS NULL OR MONTH = :month) "
			+ "AND (:year IS NULL OR YEAR = :year) ", nativeQuery = true)
	List<Qc_MediaGrowthPromotionTestReportF021History> findByParamsF021(
			@Param("month") String month,
			@Param("year") String year);
}
