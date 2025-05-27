package com.focusr.Precot.mssql.database.repository.engineering.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;

import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;

public interface WeightScalesCalibrationHistoryRepoF016  extends JpaRepository<WeightScalesCalibrationHistoryF016, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_HISTORY_F016 WHERE DATE = :dates AND DEPARTMENT=:department AND MACHINE_ID_NO =:machine_id ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("dates") String dates , @Param("department") String department, @Param("machine_id") String machine_id);

//	WeightScalesCalibrationHistoryF016 fetchLastSubmittedReceptionCheckList(String date, String department);
	
	
	@Query(value = "SELECT TOP 1 * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_HISTORY_F016 WHERE DATE=:date AND DEPARTMENT=:department AND MACHINE_ID_NO =:machine_id ORDER BY ENGINEERINGSUPERVISOR_SUBMIT_ON DESC", nativeQuery = true)
	WeightScalesCalibrationHistoryF016 fetchLastWeightScalesCalibration(@Param("date") String date, @Param("department") String department, @Param("machine_id") String machine_id);


	
	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_HISTORY_F016 f " +
	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
	        "AND (:machineIdNo IS NULL OR f.MACHINE_ID_NO = :machineIdNo)", 
	        nativeQuery = true)
	List<WeightScalesCalibrationHistoryF016> findByParams016(
	  @Param("fromDate") LocalDate fromDate,
	  @Param("toDate") LocalDate toDate,
	  @Param("machineIdNo") String machineIdNo);



}
