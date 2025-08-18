package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProcessDeviationRecordHeader;
import com.focusr.Precot.payload.padpunching.PadPunchingStoppageResponse;

@Repository
public interface PunchingBmrDeviationRecordHeaderRepository extends JpaRepository<PunchingBmrProcessDeviationRecordHeader, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_PROCESS_DEVIATION_HEADER WHERE DEVIATION_ID=:id", nativeQuery = true)
	PunchingBmrProcessDeviationRecordHeader getDeviationRecordById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_PROCESS_DEVIATION_HEADER WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrProcessDeviationRecordHeader> getDeviationRecordByOrder(@Param("order") String order);
	
	
	/**
	 * STOPPAGE ORDER
	 */
	
	
	@Query(value = "SELECT PackDt AS packdate, ShiftID AS shift, SType AS type, MCN AS machine, FTime AS fromTime, TTime AS toTime, SCause AS remarks, TotHrs AS totalTime FROM tblSFng WHERE SType = 'Stop' AND MCN=:machine AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Object[]> stoppageResponse(@Param("fromdate") String fromdate, @Param("todate") String todate, @Param("machine") String machine);

	// GET MULTIPLE MACHINE
	
	@Query(value = "SELECT PackDt AS packdate, ShiftID AS shift, SType AS type, MCN AS machine, FTime AS fromTime, TTime AS toTime, SCause AS remarks, TotHrs AS totalTime FROM tblSFng WHERE SType = 'Stop' AND MCN IN (:machines) AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Object[]> stoppageResponseMultiple(@Param("fromdate") String fromdate, @Param("todate") String todate, @Param("machines") List<String> machines);


}

