package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.payload.BleachingWasteBaleResponseNew;

@Repository
public interface BleachEquipmentUsageLogBookF33Repository extends JpaRepository<BleachEquipmentUsageLogBookF33, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33details(@Param("format_no") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33detailsByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date AND HOD_STATUS = 'WAITING_FOR_APPROVAL' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> findWasteBaleForApproval(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date AND HOD_STATUS != 'HOD_APPROVED'", nativeQuery = true)
//	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33detailsByDatePrint(@Param("date") String date);

	//new
//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33detailsByDatePrint(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 "
//	        + "WHERE (:year IS NULL OR :year='' OR SUBSTRING(DATE, 1, 4) = :year) "
//	        + "AND (:month IS NULL OR :month='' OR SUBSTRING(DATE, 6, 2) = RIGHT('00' + CAST(:month AS VARCHAR), 2)) "
//	        + "AND (:date IS NULL OR :date='' OR DATE = :date) "
//	        + "AND HOD_STATUS = 'HOD_APPROVED'", 
//	        nativeQuery = true)
//	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33detailsByDatePrint(
//	        @Param("year") String year,
//	        @Param("month") String month,
//	        @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 "
	        + "WHERE (:year IS NULL OR :year='' OR SUBSTRING(DATE, 1, 4) = :year) "
	        + "AND (:month IS NULL OR :month='' OR SUBSTRING(DATE, 6, 2) = RIGHT('00' + CAST(:month AS VARCHAR), 2)) "
			+ "AND (:fromDate IS NULL OR :fromDate ='' OR :toDate IS NULL OR :toDate='' OR DATE BETWEEN :fromDate AND :toDate)"
	        + "AND HOD_STATUS = 'HOD_APPROVED'", 
	        nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> findByEquipmentUsageF33detailsByDatePrint(
	        @Param("year") String year,
	        @Param("month") String month,
			@Param("fromDate") String fromDate,
			@Param("toDate") String toDate);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE ID =:id", nativeQuery = true)
	BleachEquipmentUsageLogBookF33 BleachEquipmentUsageById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE SUPERVISOR_STATUS =:supSubmitted AND HOD_STATUS = :pendingStatus AND MAIL_STATUS = :mailStatus AND DATE = :approvalDate ORDER BY ID DESC", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> getPending(@Param("supSubmitted") String supSubmitted,
			@Param("pendingStatus") String pendingStatus, @Param("mailStatus") String mailStatus,
			@Param("approvalDate") String approvalDate);

	List<BleachEquipmentUsageLogBookF33> findByDate(String date);

//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date AND SUPERVISOR_STATUS =:submit AND HOD_STATUS !='HOD_APPROVED' AND MAIL_STATUS !='HOD_APPROVED'", nativeQuery = true)
//	List<BleachEquipmentUsageLogBookF33> HODEquipmentUsageF33detailsByDate(@Param("date") String date,
//			@Param("submit") String submit);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE DATE =:date AND SUPERVISOR_STATUS =:submit", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> HODEquipmentUsageF33detailsByDate(@Param("date") String date,
			@Param("submit") String submit);

	@Query(value = "SELECT SUPERVISOR_STATUS FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE ID =:id", nativeQuery = true)
	String getStatus(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE ID =:id", nativeQuery = true)
	BleachEquipmentUsageLogBookF33 getStatus2(@Param("id") Long id);

	// UNIQUE RECORD

	@Query(value = "WITH UniqueRecords AS (\r\n"
			+ "    SELECT *, ROW_NUMBER() OVER (PARTITION BY date ORDER BY date) AS rn\r\n"
			+ "    FROM PDE.precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33\r\n"
			+ "    WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED')\r\n"
			+ "SELECT * FROM UniqueRecords WHERE rn = 1", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> GetAllUniqueDate();

	@Query(value = "WITH UniqueRecords AS (\r\n"
			+ "    SELECT *, ROW_NUMBER() OVER (PARTITION BY date ORDER BY date) AS rn\r\n"
			+ "    FROM PDE.precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33\r\n"
			+ "    WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED')\r\n"
			+ "SELECT * FROM UniqueRecords WHERE rn = 1", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> GetAllUniqueDateHOD();

	@Query(value = "SELECT DATE FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE ID =:id", nativeQuery = true)
	String getdatebyId(@Param("id") Long id);
	
	@Query(value = "WITH UniqueRecords AS (\r\n"
			+ "    SELECT BaleNo AS bale_no, POrder AS waste_code, GrsWt AS gross_weight, NetWt AS net_weight ,PackDt As date,\r\n"
			+ "           ROW_NUMBER() OVER (PARTITION BY PackDt ORDER BY PackDt) AS rn\r\n"
			+ "    FROM PDE.precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33\r\n"
			+ ")\r\n"
			+ "SELECT *\r\n"
			+ "FROM UniqueRecords\r\n"
			+ "WHERE rn = 1;", nativeQuery = true)
	List<BleachingWasteBaleResponseNew> getTblrejbale();
		@Query(value = "SELECT DISTINCT DATE FROM PDE.precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33", nativeQuery = true)
		List<String> status();
		
	
	// FETCH HOD APPROVAL RECORDS
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_F33 WHERE HOD_STATUS IN ('HOD_APPROVED')", nativeQuery = true)
	List<BleachEquipmentUsageLogBookF33> getHODApprovedRecords();

}
