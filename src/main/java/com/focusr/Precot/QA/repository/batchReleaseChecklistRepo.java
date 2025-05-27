package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.batchReleaseChecklist;


@Repository
public interface batchReleaseChecklistRepo extends JpaRepository<batchReleaseChecklist, Long>{

	  @Query(value = "SELECT * \r\n"
	  		+ "FROM precot.BATCH_RELEASE_CHECKLIST \r\n"
	  		+ "WHERE (QC_STATUS = 'QC_REJECTED' \r\n"
	  		+ "       OR (INS_STATUS IN ('QA_INSPECTOR_SAVED', 'QA_INSPECTOR_SUBMITTED') \r\n"
	  		+ "           AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') \r\n"
	  		+ "                OR QC_STATUS IS NULL)))\r\n"
	  		+ "ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<batchReleaseChecklist> insSummary();

	@Query(value = "SELECT *\r\n"
			+ "FROM precot.BATCH_RELEASE_CHECKLIST \r\n"
			+ "WHERE (QC_STATUS = 'QC_REJECTED' \r\n"
			+ "       OR (INS_STATUS = 'QA_INSPECTOR_SUBMITTED' \r\n"
			+ "           AND (QC_STATUS NOT IN ('QC_APPROVED', 'CHEMIST_APPROVED') \r\n"
			+ "                OR QC_STATUS IS NULL)))\r\n"
			+ "ORDER BY TEST_ID DESC", nativeQuery = true)
	List<batchReleaseChecklist> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST WHERE INS_STATUS = 'QA_INSPECTOR_SUBMITTED' AND QC_STATUS_B = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED')) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<batchReleaseChecklist> designeSummary();
	
	 @Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST w  WHERE (:bmr IS NULL OR w.BMR_NO = :bmr) AND (:department IS NULL OR w.DEPARTMENT = :department)  AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED') ORDER BY TEST_ID DESC",nativeQuery = true)
	   List<batchReleaseChecklist> print(@Param("bmr") String bmr , @Param("department") String department);
	   
//	   @Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST w  WHERE (:bmr IS NULL OR w.BMR_NO = :bmr) AND (:department IS NULL OR w.DEPARTMENT = :department) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month)",nativeQuery = true)
//	   List<batchReleaseChecklist> findByBatch(@Param("bmr") String bmr , @Param("department") String department , @Param("year") String year,@Param("month") String month);
	   
	   @Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST w " +
               "WHERE (:bmr IS NULL OR w.BMR_NO = :bmr) " +
               "AND (:department IS NULL OR w.DEPARTMENT = :department) " +
               "AND (:year IS NULL OR w.YEAR = :year) " +
               "AND (:month IS NULL OR w.MONTH = :month)  ORDER BY TEST_ID DESC", 
       nativeQuery = true)
List<batchReleaseChecklist> findByBatch(@Param("bmr") String bmr, 
                                        @Param("department") String department, 
                                        @Param("year") String year, 
                                        @Param("month") String month);

//DRY GOODS

@Query(value = "select prod_desc,PROD_CODE,START_DATE,END_DATE,LOT_NO from PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS where BATCH_NO = :bmr",nativeQuery = true)
List<Object[]> drygoodsPDE(@Param("bmr") String bmr );

// PAD PUNCHING

@Query(value = "SELECT PRODUCT_DESCRIPTION,PRODUCT_CODE,MANUFACTURER_START_DATE,MANUFACTURER_END_DATE,LOT_NUMBER FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS where BATCH_NO = :bmr",nativeQuery = true)
List<Object[]> padpunchingPDE(@Param("bmr") String bmr );

//COTTON BUDS

@Query(value = "SELECT PRODUCT_DESCRIPTION,PRODUCT_CODE,MANUFACTURER_START_DATE,MANUFACTURER_END_DATE,LOT_NUMBER FROM PDE.precot.BUDS_BMR_PRODUCTION_DETAILS where BATCH_NO = :bmr",nativeQuery = true)
List<Object[]> cottonBudsPDE(@Param("bmr") String bmr );
}
