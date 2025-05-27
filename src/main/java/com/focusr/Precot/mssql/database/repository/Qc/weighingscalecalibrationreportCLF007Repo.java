package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;

@Repository
public interface weighingscalecalibrationreportCLF007Repo extends JpaRepository<weighingscalecalibrationreportCLF007, Long> {
	
	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT  WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> getAll();
	



	@Query(value = "SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT w  WHERE (:eq_no IS NULL OR w.EQ_ID_NO = :eq_no) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) ORDER BY LAB_ID DESC", 
    nativeQuery = true)
List<weighingscalecalibrationreportCLF007> getByDate(@Param("eq_no") String eq_no, 
                                                  @Param("year") String year, 
                                                  @Param("month") String month, 
                                                  @Param("date") String date);


	
	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT where EQ_ID_NO = :eq_no AND YEAR = :year AND MONTH=:month ",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> getByDate(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month);
	
	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT where  YEAR = :year AND MONTH=:month ",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> getByDate(@Param("year") String year,@Param("month") String month);

	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT  w  WHERE (:eq_no IS NULL OR w.EQ_ID_NO = :eq_no) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED') ORDER BY LAB_ID DESC",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> print( @Param("eq_no") String eq_no ,@Param("year") String year,@Param("month") String month,@Param("date") String date);
	
	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT where EQ_ID_NO =:eq_no AND YEAR = :year AND MONTH=:month AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED') ORDER BY LAB_ID DESC",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> print( @Param("eq_no") String eq_no ,@Param("year") String year,@Param("month") String month);

	@Query(value="SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<weighingscalecalibrationreportCLF007> approveList();

	
		@Query(value = "SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT WHERE chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
	  List<weighingscalecalibrationreportCLF007> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
	  List<weighingscalecalibrationreportCLF007> exeManagerSummary();
	
//	@Query(value = "SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED'))  ORDER BY LAB_ID DESC", nativeQuery = true)
//	  List<weighingscalecalibrationreportCLF007> microSummary();

//	  @Query(value = "SELECT * from tblwscr where EQID = (SELECT Eqid FROM tblEqid WHERE Form LIKE CONCAT('%', :id, '%'))", nativeQuery = true)
//	  List<Object[]> pde(@Valid String id);
	  
//	  @Query(value = "SELECT * FROM tblwscr WHERE EQID LIKE CONCAT('%', (SELECT Eqid FROM tblEqid WHERE Form LIKE %:id%), '%')", nativeQuery = true)
//	  List<Object[]> pde(@Param("id") String id);
	  
	  @Query(value = "SELECT * FROM tblwscr WHERE EQID like :id", nativeQuery = true)
	  List<Object[]> pde(@Param("id") String id);
	  
	  @Query(value = "SELECT EQID FROM tblwscr", nativeQuery = true)
	  List<String> pde();



}
