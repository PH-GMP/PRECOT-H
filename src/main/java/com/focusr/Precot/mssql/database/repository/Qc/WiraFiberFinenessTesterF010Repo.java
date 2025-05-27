package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;

public interface WiraFiberFinenessTesterF010Repo extends JpaRepository<Qc_WiraFiberFinenessTesterReportF010, Long> {

	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE ID = :id ", nativeQuery = true)
	Qc_WiraFiberFinenessTesterReportF010 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date ", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> findByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> findByDateMonthYear(
	    @Param("month") String month,
	    @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE (CHEMIST_STATUS = 'CHEMIST_SAVED' OR (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> findByChemistStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE  CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS !='QA_APPROVED' AND MANAGER_STATUS !='CHEMIST_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> findByChemistStatusSubmittedAndHodStatusNotApproved();	
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> getForReportPrint(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "CHEMIST_STATUS= 'CHEMIST_APPROVED' AND (MANAGER_STATUS = 'QC_APPROVED' OR MANAGER_STATUS ='QA_APPROVED' OR MANAGER_STATUS ='CHEMIST_DESIGNEE_APPROVED')", nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> getForReportPrint(
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED' OR MANAGER_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<Qc_WiraFiberFinenessTesterReportF010> findAll();



}
