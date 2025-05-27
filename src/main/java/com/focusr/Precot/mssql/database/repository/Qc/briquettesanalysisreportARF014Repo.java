package com.focusr.Precot.mssql.database.repository.Qc;
 
import java.util.List;
 
import javax.validation.Valid;
 
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
 
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
 
@Repository
public interface briquettesanalysisreportARF014Repo extends JpaRepository<briquettesanalysisreportARF014, Long> {
 
	   @Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE INVOICE_NO = :invoice_no ",nativeQuery = true)

		briquettesanalysisreportARF014 findByBatch( @Param("invoice_no") String invoice_no);

	   @Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE (:invoice_no IS NULL OR INVOICE_NO = :invoice_no) AND (:supplier IS NULL OR SUPPLIER_NAME = :supplier) AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)

		List <briquettesanalysisreportARF014> print( @Param("invoice_no") String invoice_no ,@Param("supplier") String supplier);

	   @Query(value="SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)

	  List<briquettesanalysisreportARF014> getAll();

	  @Query(value="SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)

	  List<briquettesanalysisreportARF014> approveList();
 
	  @Query(value = "SELECT BatchNo, Suplier, NoofBales, Mat_DEC,Invoice, Weight, Date FROM Tblsup WHERE MVT_TYPE = 101 and Mat_Dec like '%BRIQ%'",nativeQuery = true)
	  List<Object[]> pde();

		@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<briquettesanalysisreportARF014> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<briquettesanalysisreportARF014> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND chemist_STATUS = 'CHEMIST_APPROVED'  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<briquettesanalysisreportARF014> microSummary();
 
	  
}

 