package com.focusr.Precot.mssql.database.repository.engineering;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;



public interface WeightScalesCalibrationRepoF016  extends JpaRepository<WeightScalesCalibrationF016, Long>{
	
	
	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE ID=:id", nativeQuery = true)
	WeightScalesCalibrationF016 fetchWeightScalesById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE DATE = :date AND MACHINE_ID_NO = :machineIdNo AND DEPARTMENT = :department", nativeQuery = true)
	List<WeightScalesCalibrationF016> findBydateNoAndmachineId(@Param("date") String date, @Param("machineIdNo") String machineIdNo, @Param("department") String department);

//	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE ENGINEERINGSUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<WeightScalesCalibrationF016> WeightScalesSummaryforAssistant();
	
//	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE ENGINEERINGSUPERVISOR_STATUS='SUPERVISOR_SAVED' OR  HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<WeightScalesCalibrationF016> WeightScalesSummaryforAssistant();
//
//	
//	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<WeightScalesCalibrationF016> WeightScalesSummaryforHod();



	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE ENGINEERINGSUPERVISOR_STATUS='SUPERVISOR_SAVED' OR  HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<WeightScalesCalibrationF016> WeightScalesSummaryforAssistant();
 
	
	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<WeightScalesCalibrationF016> WeightScalesSummaryforHod();
	
//	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 WHERE YEAR(CONVERT(date, DATE, 120)) = :year AND MONTH(CONVERT(date, DATE, 120)) = :month AND MACHINE_ID_NO = :machineIdNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<WeightScalesCalibrationF016> getWeightCalibrationByMachineIdNoAndYearMonth(
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("machineIdNo") String machineIdNo);
	
	@Query(value = "SELECT * FROM precot.ENG_WEIGHING_SCALES_CALIBRATION_RECORD_F016 " +
            "WHERE (:year IS NULL OR YEAR(CONVERT(date, DATE, 120)) = :year) " +
            "AND (:month IS NULL OR MONTH(CONVERT(date, DATE, 120)) = :month) " +
            "AND (:machineIdNo IS NULL OR MACHINE_ID_NO = :machineIdNo) " +
            "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
List<WeightScalesCalibrationF016> getWeightCalibrationByOptionalParams(
 @Param("year") String year,
 @Param("month") String month,
 @Param("machineIdNo") String machineIdNo);

	
	
	List<WeightScalesCalibrationF016> findByDepartment(String department);




	
	
	
	

}
