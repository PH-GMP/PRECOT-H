package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ManagementOfIncidence;

@Repository
public interface ManagementOfIncidenceRepository extends JpaRepository<ManagementOfIncidence,Long>{
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE WHERE YEAR = :year AND PLANT_HEAD_STATUS = 'PLANT_HEAD_APPROVED'", nativeQuery = true)
	List<ManagementOfIncidence> printParam(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE WHERE DATE = :date", nativeQuery = true)
	ManagementOfIncidence getdetailsbyParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE  WHERE DEPARTMENT = :department AND (HOD_STATUS = 'HOD_SAVED' OR PLANT_HEAD_STATUS !='PLANT_HEAD_APPROVED') ORDER BY INCIDENCE_ID DESC", nativeQuery = true)
	List<ManagementOfIncidence> hodSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE  WHERE HOD_STATUS = 'HOD_SUBMITTED' AND PLANT_HEAD_STATUS !='PLANT_HEAD_APPROVED' ORDER BY  INCIDENCE_ID DESC", nativeQuery = true)
	List<ManagementOfIncidence> plantHeadSummary();
	
	//Form Number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_MANAGEMENT_OF_INCIDENCE ORDER BY INCIDENCE_ID DESC ;", nativeQuery = true)
	 ManagementOfIncidence fetchLastGeneratedNo();

	
}
