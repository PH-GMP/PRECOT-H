package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005Parent;

@Repository
public interface absorbentbleachedcottonreportCLF005ParentRepo extends JpaRepository<absorbentbleachedcottonreportCLF005Parent, Long> {

	
	@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT " +
            "WHERE (:BMR IS NULL OR BMR = :BMR) " +
            "AND (:regular_trial_batch IS NULL OR REGULAR_TRIAL_BATCH = :regular_trial_batch)", 
    nativeQuery = true)
	List<absorbentbleachedcottonreportCLF005Parent> findByBatch(@Param("BMR") String BMR,
                                             @Param("regular_trial_batch") String regular_trial_batch);

	   
	   @Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT " +
               "WHERE (:BMR IS NULL OR BMR = :BMR) " +
               "AND (:regular_trial_batch IS NULL OR REGULAR_TRIAL_BATCH = :regular_trial_batch) " +
               "AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')", 
       nativeQuery = true)
	   List<absorbentbleachedcottonreportCLF005Parent> print(@Param("BMR") String BMR,
                                          @Param("regular_trial_batch") String regular_trial_batch);

	   
	   @Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	  List<absorbentbleachedcottonreportCLF005Parent> getAll();
	  
	  @Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS != 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	  List<absorbentbleachedcottonreportCLF005Parent> approveList();

		@Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
		List<absorbentbleachedcottonreportCLF005Parent> chemistSubmitted();
		
		@Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
		List<absorbentbleachedcottonreportCLF005Parent> chemistSaved();
		
		@Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
		List<absorbentbleachedcottonreportCLF005Parent> microSaved();
		
		@Query(value="SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
		List<absorbentbleachedcottonreportCLF005Parent> microSubmitted();

		@Query(value="SELECT bp.BatchNo, bp.POrder, oi.Mix, oi.Finish , Bp.LotNo FROM TblBalePack bp JOIN tblOrderinfo oi ON bp.POrder = oi.POrder WHERE bp. BMR_No = :id",nativeQuery = true)
		List<Object[]> pde(@Valid String id);

			@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY PA_ID DESC", nativeQuery = true)
	  List<absorbentbleachedcottonreportCLF005Parent> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY PA_ID DESC", nativeQuery = true)
	  List<absorbentbleachedcottonreportCLF005Parent> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT WHERE  micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY PA_ID DESC", nativeQuery = true)
	  List<absorbentbleachedcottonreportCLF005Parent> microSummary();
	
}
