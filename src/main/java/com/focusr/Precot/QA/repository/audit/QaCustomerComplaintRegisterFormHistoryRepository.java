package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QaCustomerComplaintRegisterFormHistory;

@Repository
public interface QaCustomerComplaintRegisterFormHistoryRepository extends JpaRepository<QaCustomerComplaintRegisterFormHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY WHERE FORMAT_NO =:format_no AND CCF_NO =:ccf_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("format_no") String format_no,@Param("ccf_no") String ccf_no);
		
	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY WHERE FORMAT_NO =:format_no AND CCF_NO =:ccf_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY WHERE CCF_NO =:ccf_no)", nativeQuery = true)
	QaCustomerComplaintRegisterFormHistory fetchLastSubmittedRecord(@Param("format_no") String format_no,@Param("ccf_no") String ccf_no);

	
//	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY WHERE "
//			+ " (:ccf_no IS NULL OR :ccf_no='' OR CCF_NO =:ccf_no)"
//			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<QaCustomerComplaintRegisterFormHistory> excelReport(@Param("from_date") String from_date,
//			@Param("to_date") String to_date,@Param("ccf_no") String ccf_no);
	
	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM_HISTORY WHERE "
			+ " (:ccf_no IS NULL OR :ccf_no='' OR CCF_NO =:ccf_no)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QaCustomerComplaintRegisterFormHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("ccf_no") String ccf_no,@Param("month") String month, @Param("year") String year);
}
