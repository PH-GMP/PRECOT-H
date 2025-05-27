package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.newamplerequestQA;

@Repository
public interface newamplerequestQARepo extends JpaRepository<newamplerequestQA, Long>{

	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 WHERE (REQUISITION_NO = :rquis_no OR :rquis_no IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<newamplerequestQA> getbyRequis(@Param("rquis_no") String rquis_no);
	
	@Query(value = "SELECT TOP 1 REQUISITION_NO \r\n"
			+ "FROM precot.NEW_SAMPLE_REQUEST_F029\r\n"
			+ "ORDER BY TEST_ID DESC", nativeQuery = true)
	String getRequis();
	
	@Query(value = "SELECT REQUISITION_NO \r\n"
			+ "FROM precot.NEW_SAMPLE_REQUEST_F029\r\n"
			+ "WHERE TEST_ID =:test_id ", nativeQuery = true)
	String getRequis(@Param("test_id") Long test_id);

	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 WHERE (mark_rep_STATUS = 'MARKET_REPRESENTATIVE_SUBMITTED' AND QC_STATUS  NOT IN ('QC_APPROVED', 'QA_APPROVED') ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<newamplerequestQA> InspecterManagerSummary();

//	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<newamplerequestQA> ManagerSummarydevelop();
	
	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 WHERE mark_rep_STATUS_B NOT IN  ('MARKET_REPRESENTATIVE_SUBMITTED','QA_APPROVED') OR mark_rep_STATUS_B IS NULL ORDER BY TEST_ID DESC", nativeQuery = true)
	List<newamplerequestQA> ManagerSummarydevelop();
	
	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 ORDER BY TEST_ID DESC", nativeQuery = true)
	List<newamplerequestQA> Summarydevelop();
	
//	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 WHERE mark_rep_STATUS_B = 'MARKET_REPRESENTATIVE_SUBMITTED' AND (REQUISITION_NO = :rquis_no OR :rquis_no IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<newamplerequestQA> print (@Param("rquis_no") String rquis_no);
	

	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029 " +
            "WHERE mark_rep_STATUS_B = 'MARKET_REPRESENTATIVE_SUBMITTED' " +
            "AND (:rquis_no IS NULL OR REQUISITION_NO = :rquis_no) " +
            "AND (:date IS NULL OR DATE = :date) " +
            "AND (:month IS NULL OR MONTH = :month) " +
            "AND (:year IS NULL OR YEAR = :year) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<newamplerequestQA> print(@Param("rquis_no") String rquis_no,
                           @Param("date") String date,
                           @Param("month") String month,
                           @Param("year") String year);



}
