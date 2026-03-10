package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.util.bleaching.DashboardResponse;
import com.focusr.Precot.util.bleaching.DashboardResponseInterface;

@Repository

public interface BleachLayDownCheckListF42Repository extends JpaRepository<BleachLayDownCheckListF42, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<BleachLayDownCheckListF42> findByLayDownCheckListF42Details(@Param("format_no") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE ID =:id", nativeQuery = true)
	BleachLayDownCheckListF42 BleachLayDownById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE SUPERVISOR_STATUS =:supSubmitted AND HOD_STATUS = :pendingStatus AND MAIL_STATUS = :mailStatus ORDER BY ID DESC", nativeQuery = true)
	List<BleachLayDownCheckListF42> getPending(@Param("supSubmitted") String supSubmitted,
			@Param("pendingStatus") String pendingStatus, @Param("mailStatus") String mailStatus);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:formatNo AND BMR_NO = :bmrNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> findByLayDowndetailsByBMR(@Param("formatNo") String formatNo,
			@Param("bmrNo") String bmrNo);
	
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE BMR_NO = :bmrNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> getLayDowndetailsByBMR(
			@Param("bmrNo") String bmrNo);
	

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:formatNo AND BMR_NO = :bmrNo AND LAY_DOWN_NO = :layDownNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> findByLayDowndetails(@Param("formatNo") String formatNo,
			@Param("bmrNo") String bmrNo, @Param("layDownNo") String layDownNo);

	Optional<BleachLayDownCheckListF42> findByFormatNoAndBmrNo(String formatNo, String bmrNo);

	@Query(value = "SELECT HOD_STATUS FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:formatNo AND BMR_NO = :bmrNo", nativeQuery = true)
	BleachLayDownCheckListF42 findByLayDowndetails(@Param("formatNo") String formatNo, @Param("bmrNo") String bmrNo);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE ID =:id", nativeQuery = true)
	BleachLayDownCheckListF42 layDownByID(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:formatNo AND BMR_NO = :bmrNo AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachLayDownCheckListF42> HODLayDowndetailsByBMR(@Param("formatNo") String formatNo,
			@Param("bmrNo") String bmrNo);

	// FORMAT_NO , BMR_NO , LAYDOWN_NO

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE FORMAT_NO =:formatNo AND BMR_NO = :bmrNo AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND LAY_DOWN_NO =:layDownNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> HODLayDowndetails(@Param("formatNo") String formatNo, @Param("bmrNo") String bmrNo,
			@Param("layDownNo") String layDownNo);

	@Query(value = "SELECT SUPERVISOR_STATUS FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE ID =:id", nativeQuery = true)
	String getStatus(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE ID =:id", nativeQuery = true)
	BleachLayDownCheckListF42 getStatus2(@Param("id") Long id);

	// SUMMARY

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE SUPERVISOR_SIGN = :userName AND SUPERVISOR_STATUS ='SUPERVISOR_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachLayDownCheckListF42> LayDowndetailsSummary(@Param("userName") String userName);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachLayDownCheckListF42> LayDowndetailsSummaryHOD();

	@Query(value = "SELECT DISTINCT BaleNo FROM TBLBALEPACK WHERE Porder >= '85003314'", nativeQuery = true)
	List<String> getBaleNo();

	// SUPERVIISOR

	@Query(value = "SELECT DISTINCT LAY_DOWN_NO FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE LAY_DOWN_NO =:layDown AND ID !=:id", nativeQuery = true)
	String getLayDownDetails(@Param("layDown") String layDown, @Param("id") Long id);

	// HOD

	@Query(value = "SELECT DISTINCT LAY_DOWN_NO FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE LAY_DOWN_NO =:layDown", nativeQuery = true)
	String getLayDownDetailsSubmit(@Param("layDown") String layDown);
	
	@Query(value = "SELECT DISTINCT LAY_DOWN_NO FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE HOD_STATUS IN ('HOD_APPROVED') ORDER  BY LAY_DOWN_NO DESC", nativeQuery = true)
	List<String> getLayDownNumberList();

	// GET MY LAYDOWN

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE LAY_DOWN_NO = :layDownNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> getLayDowndetails(@Param("layDownNo") String layDownNo);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND LAY_DOWN_NO =:layDownNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> getLayDowndetailsHOD(@Param("layDownNo") String layDownNo);

	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachLayDownCheckListF42> LayDowndetailsSummary();
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE  HOD_STATUS ='HOD_APPROVED' AND LAY_DOWN_NO =:layDownNo", nativeQuery = true)
	List<BleachLayDownCheckListF42> LayDownChecklist(@Param("layDownNo") String layDownNo);

	
	// DASHBOARD
	
//	@Query("SELECT b FROM BleachLayDownCheckListF42 b WHERE MONTH(CONVERT(date, b.layDownStartDate, 23)) = :month AND YEAR(CONVERT(date, b.layDownStartDate, 23)) = :year")
//    List<BleachLayDownCheckListF42> findByMonthAndYear(@Param("month") int month, @Param("year") int year);
	
	@Query(value = "SELECT COUNT(*) FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42 WHERE MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23))=:month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23))=:year AND SUPERVISOR_SUBMIT_BY=:username", nativeQuery = true)
	Long getCountSupervisiorEntries(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	
	@Query(value = "SELECT " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
            "FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
	DashboardResponseInterface getDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	
	
	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_SUBMIT_BY IS NOT NULL AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :month AND YEAR(CONVERT(date, LAY_DOWN_END_DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
            "FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
	DashboardResponseInterface getHODDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	
	
	
			// CR - SIGNOFF
	
	@Query(value="SELECT DISTINCT TOOLS_FOR_CUTTING_STRAPS FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
	List<String> cutterStarpTools();
	
//	PENDING APPROVALS 
	
	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' THEN 1 ELSE 0 END) AS supervisorCount,"
            + " SUM(CASE WHEN HOD_STATUS != 'HOD_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_SAVED' THEN 1 ELSE 0 END) AS hodCount"
            + " FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
    List<Object[]> getStatusCounts();
    
    // DASHBOARD FOR BLEACHING
    
//	Form 2

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.METAL_DETECTOR_CHECK_LIST_F03", nativeQuery = true)
	List<Object[]> getMetalDetectorCheckListF03StatusCounts();

//	Form 3

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04", nativeQuery = true)
	List<Object[]> getBleachAppliedContRawCottonF04StatusCounts();

//	Form 4

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_CONT_RAWCOTTON_F05", nativeQuery = true)
	List<Object[]> getBleachContRawCottonF05StatusCounts();

//	Form 5

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34", nativeQuery = true)
	List<Object[]> getEquipmentUsageLogBookBlowRoomCardingStatusCounts();

//	Form 6

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09", nativeQuery = true)
	List<Object[]> getEquipmentUsageLogBookCakePressStatusCounts();

	// FORM 1 TO 6

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM = :tableName", nativeQuery = true)
	List<Object[]> getOneToSixStatusCounts(@Param("tableName") String tableName);

//	Form 7

	@Query(value = "SELECT\r\n"
			+ "	SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')\r\n"
			+ "OR (QA_STATUS = 'QA_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "	SUM(CASE WHEN QA_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaCount,\r\n"
			+ "	SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n" + "FROM\r\n"
			+ "	precot.BLEACH_JOB_CARD_F13 ;", nativeQuery = true)
	List<Object[]> getBleachingJobCardStatusCounts();

	// FORM 8

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11", nativeQuery = true)
	List<Object[]> getEquipmentUsageLogBookHydroExtractorStatusCounts();

	// FORM 9

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01", nativeQuery = true)
	List<Object[]> getSanitizationOfMachineAndSurfacesStatusCounts();

	// FORM 10

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41", nativeQuery = true)
	List<Object[]> getSanitizationReportAbBalePressMachineStatusCounts();

	// FORM 11

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_APPLIED_CONT_AB_COTTON_F08", nativeQuery = true)
	List<Object[]> getAppliedContReportAbCottonStatusCounts();

	// FORM 12

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18", nativeQuery = true)
	List<Object[]> getContCheckingReportAbCottonStatusCounts();

	// FORM 13

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_SHIFT_LOGBOOK_F36", nativeQuery = true)
	List<Object[]> getShiftLogBookStatusCounts();

	// FORM 14

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38", nativeQuery = true)
	List<Object[]> getMixingChangeOverAndMachineCheckListStatusCounts();

	// FORM 15

	@Query(value = "WITH UniqueRecords AS (\r\n" + "    SELECT *,\r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY date ORDER BY date) AS rn\r\n"
			+ "    FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33\r\n" + ")\r\n" + "SELECT \r\n"
			+ "    SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED') THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "    SUM( CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END ) AS hodCount\r\n"
			+ "FROM UniqueRecords\r\n" + "WHERE rn = 1;", nativeQuery = true)
	List<Object[]> getEquipmentUsageLogBookWasteBalePressStatusCounts();

	// FORM 16

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16", nativeQuery = true)
	List<Object[]> getMachineCleaningRecordStatusCounts();

	// FORM 17 F02

	@Query(value = "SELECT\r\n" + "	SUM(CASE WHEN HR_STATUS != 'HR_APPROVED' \r\n"
			+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND HR_STATUS = 'HR_APPROVED')\r\n"
			+ "OR (HOD_STATUS = 'HOD_REJECTED' AND HR_STATUS = 'HR_APPROVED')THEN 1 ELSE 0 END) AS hrCount,\r\n"
			+ "	SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "	SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n" + "FROM\r\n"
			+ "	precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02", nativeQuery = true)
	List<Object[]> getHouseKeepingCleaninfCheckListF02StatusCounts();

	// FORM 18 FO2A

	@Query(value = "SELECT\r\n" + "	SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' \r\n"
			+ "OR (HR_STATUS = 'HR_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')\r\n"
			+ "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "	SUM(CASE WHEN HR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hrCount,\r\n"
			+ "	SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
			+ "FROM precot.BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A", nativeQuery = true)
	List<Object[]> getHouseKeepingCleaninfCheckListF02AStatusCounts();

	// FORM 19

	@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' \r\n"
			+ "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')\r\n"
			+ "OR (QA_STATUS = 'QA_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
			+ "	SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
			+ "	SUM(CASE WHEN  QA_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaCount\r\n"
			+ "FROM precot.BLEACH_REPROCESS_REPORT_F16", nativeQuery = true)
	List<Object[]> getReProcessingReportStatusCounts();

	
	
}
