package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.Payload.BudsStoppageRequest;
import com.focusr.Precot.Buds.model.bmr.BudsBmrStoppageHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;

@Repository
public interface BudsBmrStoppageHeaderRepository extends JpaRepository<BudsBmrStoppageHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_STOPPAGE_HEADER WHERE FROM_DATE=:from_date AND TO_DATE=:to_date AND MACHINE_NAME=:machineName", nativeQuery = true)
	List<BudsBmrStoppageHeader> getStoppageHeader(@Param("from_date") String from_date, @Param("to_date") String to_date, @Param("machineName") String machineName);
	
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_STOPPAGE_HEADER WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BudsBmrStoppageHeader> getStoppageBatchNo(@Param("batchNo") String batchNo );
	
		// SAP STOPPAGE 
	
	@Query(value = "SELECT PackDt AS packDate, ShiftID AS shiftId, SType AS type, MCN AS machine, FTime AS fromTime, TTime AS toTime, Scause AS reason, TotHrs AS totalHours FROM tblSFng WHERE PackDt BETWEEN :fromdate AND :todate AND ShiftID=:shift AND SType = 'Stop' AND MCN IN ('BUD1', 'BUD2')", nativeQuery = true)
	List<Object[]> getStoppageRecord(@Param("fromdate") String fromdate, @Param("todate") String todate, @Param("shift") String shift);
	
}
