package com.focusr.Precot.QA.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.focusr.Precot.QA.model.DeviationForm;
import com.focusr.Precot.QA.model.DeviationFormSummaryDTO;

public interface DeviationFormRepo extends JpaRepository<DeviationForm,Long> {

	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM WHERE DEVIATION_ID=:ID" , nativeQuery=true)
	public DeviationForm findDeviationFormById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM WHERE"
			+ " DATE_OF_INITIATION =:dateOfIniation AND DEPARTMENT =:department"
			+ " AND DEVIATION_NUMBER =:deviationNumber",nativeQuery = true)
	DeviationForm findByUniqueParams(@Param("dateOfIniation") LocalDate dateOfIniation,@Param("department") String department,@Param("deviationNumber") String deviationNumber);
	
	@Query(value = "SELECT DISTINCT DEVIATION_NUMBER FROM precot.QA_DEVIATION_FORM WHERE"
			+ " DEPARTMENT =:department"
			+ " AND SEC3_QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_SUBMITTED'",nativeQuery = true)
	List<String> findDeviationNumberByDepartment(@Param ("department") String department);
	
	@Query("select new com.focusr.Precot.QA.model.DeviationFormSummaryDTO(i.deviationId,i.year,i.month,i.department,"
			+ " i.dateOfInitiation,i.deviationNumber,"
			+ " i.sec1SupervisorStatus,i.sec1HodDesigneeStatus,"
			+ " i.sec1QaManagerMrReviewStatus,i.sec1QaManagerMrInvgStatus,"
			+ " i.sec2SupervisorStatus,i.sec2HodDesigneeStatus,"
			+ " i.sec2QaManagerMrStatus,i.sec3SupervisorStatus,"
			+ " i.sec3HodDesigneeStatus,i.sec3QaManagerMrStatus,i.reason)"
			+ " from DeviationForm i WHERE i.sec3QaManagerMrStatus <> 'QA_MANAGER_MR_SUBMITTED' OR i.sec3QaManagerMrStatus IS NULL order by updatedAt desc")
	List<DeviationFormSummaryDTO> getDeviationFormSummary();
	
	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM"
			+ " WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:dateOfIniation IS NULL OR :dateOfIniation='' OR DATE_OF_INITIATION =:dateOfIniation)"
			+ " AND (:deviationNumber IS NULL OR :deviationNumber='' OR DEVIATION_NUMBER=:deviationNumber)"
			+ " AND SEC3_QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_SUBMITTED'", nativeQuery = true)
	List<DeviationForm> findByPrintParams(@Param("year") String year,@Param("month") String month,@Param("dateOfIniation") LocalDate dateOfIniation,@Param("deviationNumber") String deviationNumber);
	
	// Deviation number generation
	@Query(value = "SELECT TOP 1 DEVIATION_NUMBER"
			+ " FROM precot.QA_DEVIATION_FORM WHERE"
			+ " DEPARTMENT =:department"
			+ " AND YEAR =:year AND DEVIATION_NUMBER IS NOT NULL "
			+ " ORDER BY DEVIATION_ID DESC", nativeQuery = true)
	Object fetchLastGeneratedNo(@Param("department") String department, @Param("year") String year);
}
