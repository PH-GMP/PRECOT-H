package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.newamplerequestQA;
import com.focusr.Precot.QA.model.productionretainedsampleregister40;

@Repository
public interface productionretainedsampleregister40Repo extends JpaRepository<productionretainedsampleregister40, Long>{

//	  @Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT WHERE INS_STATUS IN ('QA_INSPECTOR_SAVED', 'QA_INSPECTOR_APPROVED') AND (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	  List<productionretainedsampleregister40> insSummary();
//
//	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT WHERE INS_STATUS = 'QA_INSPECTOR_APPROVED' AND (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'CHEMIST_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<productionretainedsampleregister40> exeManagerSummary();
//	
//	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT WHERE INS_STATUS = 'QA_INSPECTOR_APPROVED' AND  (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<productionretainedsampleregister40> designeSummary();
//	
//	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
//            "WHERE QC_STATUS IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') " +
//            "AND (:month IS NULL OR MONTH = :month) " +
//            "AND (:year IS NULL OR YEAR = :year) " +
//            "ORDER BY TEST_ID DESC", nativeQuery = true)
//List<productionretainedsampleregister40> print(
//
//                           @Param("month") String month,
//                           @Param("year") String year);
//
//
//@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
//        "WHERE  (:date IS NULL OR DATE = :date) " +
//        "AND (:shift IS NULL OR SHIFT = :shift) " +
//        "ORDER BY TEST_ID DESC", nativeQuery = true)
//List<productionretainedsampleregister40> getunique(String date, String shift);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
            "WHERE INS_STATUS IN ('QA_INSPECTOR_SAVED', 'QA_INSPECTOR_APPROVED') " +
            "AND (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<productionretainedsampleregister40> insSummary();

@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
            "WHERE INS_STATUS = 'QA_INSPECTOR_APPROVED' " +
            "AND (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<productionretainedsampleregister40> exeManagerSummary();

@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
            "WHERE INS_STATUS = 'QA_INSPECTOR_APPROVED' " +
            "AND (QC_STATUS NOT IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<productionretainedsampleregister40> designeSummary();

@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
            "WHERE QC_STATUS IN ('QA_MANAGER_APPROVED', 'QA_APPROVED') " +
            "AND (:month IS NULL OR MONTH = :month) " +
            "AND (:year IS NULL OR YEAR = :year) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<productionretainedsampleregister40> print(@Param("month") String month, @Param("year") String year);

@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT " +
            "WHERE (:date IS NULL OR DATE = :date) " +
            "AND (:shift IS NULL OR SHIFT = :shift) " +
            "ORDER BY TEST_ID DESC", nativeQuery = true)
List<productionretainedsampleregister40> getunique(@Param("date") String date, @Param("shift") String shift);


}
