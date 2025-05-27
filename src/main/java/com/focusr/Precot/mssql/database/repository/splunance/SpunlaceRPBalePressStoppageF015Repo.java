package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceRPBalePressStoppageF015;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;

@Repository
public interface SpunlaceRPBalePressStoppageF015Repo extends JpaRepository<SpunlaceRPBalePressStoppageF015, Long> {

	
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE ID=:id", nativeQuery = true)
	SpunlaceRPBalePressStoppageF015 findBalePressStoppageById(@Param("id") Long id);

	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE ORDER_NO=:order AND DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<SpunlaceRPBalePressStoppageF015> fetchBalePressStoppage(@Param("order") String order,
			@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE DATE=:date AND (HOD_STATUS = 'HOD_APPROVED' OR HOD_MAIL_STATUS = 'HOD_APPROVED')", nativeQuery = true)
	List<SpunlaceRPBalePressStoppageF015> printBalePressStoppage(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND HOD_MAIL_STATUS != 'HOD_APPROVED'" , nativeQuery = true)
//    List<SpunlaceRPBalePressStoppageF015> hodSummaryF15();
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC" , nativeQuery = true)
    List<SpunlaceRPBalePressStoppageF015> hodSummaryF15();
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_F15 WHERE DATE=:date", nativeQuery = true)
	List<SpunlaceRPBalePressStoppageF015> getByDate(@Param("date") String date);
}
