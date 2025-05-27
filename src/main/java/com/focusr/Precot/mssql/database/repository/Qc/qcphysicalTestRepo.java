package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;



@Repository
public interface qcphysicalTestRepo extends JpaRepository<physicalandchemicaltest, Long> {
	
   @Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE SUB_BATCH_NO = :sub_batch_no",nativeQuery = true)
   List<physicalandchemicaltest> findByBatch( @Param("sub_batch_no") String sub_batch_no);
   
   @Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE SUB_BATCH_NO = :sub_batch_no",nativeQuery = true)
   physicalandchemicaltest findByBatchPDE( @Param("sub_batch_no") String sub_batch_no);
   
   @Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE SUB_BATCH_NO = :SUB_BATCH_NO AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	List<physicalandchemicaltest> print( @Param("SUB_BATCH_NO") String SUB_BATCH_NO);
   
	@Query(value="SELECT * \r\n"
			+ "FROM precot.PHYSICAL_AND_CHEMCAL_TEST \r\n"
			+ "WHERE (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL) \r\n"
			+ " ",nativeQuery = true)
	List<physicalandchemicaltest> getAll();
   
   @Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
  List<physicalandchemicaltest> approveList();
  
 

	@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<physicalandchemicaltest> chemistSubmitted();
	
	@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<physicalandchemicaltest> chemistSaved();
	
	@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
	List<physicalandchemicaltest> microSaved();
	
	@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
	List<physicalandchemicaltest> microSubmitted();
	
	@Query(value="SELECT bp.BMR_No, bp.POrder, oi.Mix, oi.Finish FROM TblBalePack bp JOIN tblOrderinfo oi ON bp.POrder = oi.POrder WHERE bp.BatchNo = :batchNo -1",nativeQuery = true)
	List<Object[]> getPde(@Param("batchNo") Long batchNo);

//	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<physicalandchemicaltest> chemistSummary();
//
//	// MANAGER SUMMARY
//	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED'  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<physicalandchemicaltest> exeManagerSummary();
//	
//	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE  micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<physicalandchemicaltest> microSummary();
	
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<physicalandchemicaltest> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE ( chemist_STATUS = 'CHEMIST_APPROVED' OR micro_STATUS = 'MICROBIOLOGIST_APPROVED' ) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<physicalandchemicaltest> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST WHERE (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') or chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<physicalandchemicaltest> microSummary();

	@Query(value="SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST where BMR_NO = :bmr",nativeQuery = true)
	List<physicalandchemicaltest> getByBmr(@Param("bmr") @Valid String bmr);
	
	
//	@Query(value = "SELECT u.email, u.TEST_ID, u.username\r\n"
//			+ "FROM precot.USER_LOGIN_DETAILS u\r\n"
//			+ "JOIN precot.ROLES_MAP_BY_USERS rm ON u.TEST_ID = rm.user_id\r\n"
//			+ "JOIN precot.USER_ROLES r ON rm.role_id = r.TEST_ID\r\n"
//			+ "WHERE u.DEPARTMENT_ID = place chemist TEST_ID\r\n"
//			
//			+ "  AND u.is_active = 'Y'\r\n"
//			, nativeQuery = true)
//
//	chemistHod getChemistDepartHOD();

}
