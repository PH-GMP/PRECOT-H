package com.focusr.Precot.mssql.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Stoppage;

import com.focusr.Precot.mssql.database.model.bleaching.lov.BaleNumbers;
import com.focusr.Precot.payload.GetStoppageDetailsResponse;
import com.focusr.Precot.payload.ShoppageDetails;

@Repository
public interface StoppageDetailsRepository  extends JpaRepository<Stoppage, Long> {
	
//	@Query("SELECT * FROM SplB b WHERE b.pack_dt = :pack_dt AND b.shift_id = :shift_id")
	
//	 @Query(value = "SELECT ts.MCN AS mcn ,ts.FTime AS f_time ,ts.TTime AS t_time ,ts.SRemarks AS s_cause FROM tblSBlg ts WHERE PackDt=:date AND ShiftID =:shift_id", nativeQuery = true)
//		List<GetStoppageDetailsResponse> findByDateAndShift(@Param("date") String date, @Param("shift_id") long shift_id);
//	 
//	 @Query(value = "SELECT ts.MCN AS mcn ,ts.FTime AS f_time ,ts.TTime AS t_time ,ts.SRemarks AS s_cause, ts.PackDt AS packDt, ts.TotHrs AS totHrs, ts.ShiftID AS shift FROM tblSBlg ts WHERE PackDt BETWEEN :startDate AND :endDate", nativeQuery = true)
//		List<GetStoppageDetailsResponse> findByDate(@Param("startDate") String startDate, @Param("endDate") String endDate);
	 
//	 @Query(value = "SELECT ts.MCN AS mcn ,ts.FTime AS f_time ,ts.TTime AS t_time ,ts.Scause AS s_cause FROM tblSBlg ts WHERE PackDt=:date AND ShiftID =:shift_id", nativeQuery = true)
//	 List<GetStoppageDetailsResponse> findByDateAndShift(@Param("date") LocalDate date, @Param("shift_id") String shift_id);

	
//		27-02-2025 ENHANCEMENT For Remarks and Reason
	 
	 @Query(value = "SELECT ts.MCN AS mcn ,ts.FTime AS f_time ,ts.TTime AS t_time ,ts.SRemarks AS remarks, ts.Scause AS reason FROM tblSBlg ts WHERE PackDt=:date AND ShiftID =:shift_id", nativeQuery = true)
		List<GetStoppageDetailsResponse> findByDateAndShift(@Param("date") String date, @Param("shift_id") long shift_id);
	 
	 @Query(value = "SELECT ts.MCN AS mcn ,ts.FTime AS f_time ,ts.TTime AS t_time ,ts.SRemarks AS remarks, ts.Scause AS reason, ts.PackDt AS packDt, ts.TotHrs AS totHrs, ts.ShiftID AS shift FROM tblSBlg ts WHERE PackDt BETWEEN :startDate AND :endDate", nativeQuery = true)
		List<GetStoppageDetailsResponse> findByDate(@Param("startDate") String startDate, @Param("endDate") String endDate);
	 

}
