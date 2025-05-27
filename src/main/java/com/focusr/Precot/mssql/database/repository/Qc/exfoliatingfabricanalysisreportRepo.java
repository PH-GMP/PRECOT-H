package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.exfoliatingfabricanalysisreport;



@Repository
public interface exfoliatingfabricanalysisreportRepo extends JpaRepository<exfoliatingfabricanalysisreport, Long> {

	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT  WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> getAll();
	
	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> chemistSubmitted();
	
	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> chemistSaved();
	
	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> microSaved();
	
	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> microSubmitted();

	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where INVOICE_NO = :invoice",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> findbyInvoice(@Param("invoice") String invoice);
	
	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT where INVOICE_NO = :invoice",nativeQuery = true)
	exfoliatingfabricanalysisreport findbyInvoicePDE(@Param("invoice") String invoice);

	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT "
			+ "WHERE (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)\r\n"
			+ "",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> approveList();

	@Query(value="SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE QC_STATUS IN ('QC_APPROVED', 'QA_APPROVED') AND INVOICE_NO = :invoice",nativeQuery = true)
	List<exfoliatingfabricanalysisreport> print(@Param("invoice") String invoice);

	@Query(value="SELECT PONO, Suplier, NoofBales, Mat_DEC,Invoice, Weight FROM Tblsup WHERE MVT_TYPE = 101 and Material LIKE 'FAB%'",nativeQuery = true)
	List<Object[]> pdeData();
	
	@Query(value="SELECT PONO, Suplier, NoofBales, Mat_DEC,Invoice, Weight, Date FROM Tblsup WHERE MVT_TYPE = 101 and Material LIKE 'FAB%' AND Invoice = :invoice",nativeQuery = true)
	List<Object[]> pdeData(@Param("invoice") String invoice);

	@Query(value = "SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED'))  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<exfoliatingfabricanalysisreport> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<exfoliatingfabricanalysisreport> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT WHERE (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') or chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<exfoliatingfabricanalysisreport> microSummary();
	
	

}
