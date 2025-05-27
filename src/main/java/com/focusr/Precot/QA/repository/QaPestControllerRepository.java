package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaPestController;

@Repository
public interface QaPestControllerRepository extends JpaRepository<QaPestController, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER WHERE CONTROL_ID = :control_id ", nativeQuery = true)
	QaPestController findFormById(@Param("control_id") long control_id);
	
	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year AND (:date IS NULL OR :date='' OR DATE=:date)", nativeQuery = true)
	QaPestController findByparam(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER WHERE FORMAT_NO =:format_no AND (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND (:date IS NULL OR :date='' OR DATE=:date)  AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<QaPestController> printApi(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER WHERE FORMAT_NO =:format_no AND (PCI_STATUS = 'PCI_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED') ORDER BY CONTROL_ID DESC", nativeQuery = true)
    List<QaPestController> pciSummary(@Param("format_no") String format_no);

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER WHERE FORMAT_NO =:format_no AND PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY CONTROL_ID DESC", nativeQuery = true)
    List<QaPestController> qaMrSummary(@Param("format_no") String format_no);
	
}
