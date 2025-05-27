package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;

@Repository
public interface BleachShiftLogBookF36Repository extends JpaRepository<BleachShiftLogBookF36, Long>{
	
	@Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36 WHERE SLB_ID = :slb_id", nativeQuery = true)
	BleachShiftLogBookF36 getdetaisById(@Param("slb_id") Long slb_id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachShiftLogBookF36> findFormatDetailsF36(@Param("formatNo") String formatNo);

	 @Query(value= "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	 List<BleachShiftLogBookF36> findByDateAndShift(@Param("date") String date, @Param("shift") String shift);


	 @Query(value="SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY DATE DESC ", nativeQuery = true)
	    List<BleachShiftLogBookF36> getsummaryForSupervisor();

	    @Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' AND MAIL_STATUS = 'WAITING_FOR_APPROVAL' ORDER BY DATE DESC", nativeQuery = true)
	    List<BleachShiftLogBookF36> getsummaryForHod();
	 
//	 @Query("SELECT b FROM BleachShiftLogBookF36 b WHERE b.supervisor_status = 'SUPERVISOR_APPROVED'")
//	    List<BleachShiftLogBookF36> getsummaryForHod();
	    
	    @Query(value="SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_F36 WHERE HOD_STATUS ='HOD_APPROVED' ORDER BY DATE DESC", nativeQuery = true)
	    List<BleachShiftLogBookF36> getsummaryPrint();
	    
	    @Query(value="SELECT SUM(NetWt) AS TotalNetWeight, COUNT(BaleNo) AS BaleCount FROM tblBalePack WHERE PackDt = :date AND ShiftID = :shift", nativeQuery = true)
	    Object[] getBaleAndWeight(@Param("date") String date, @Param("shift") String shift);
}
