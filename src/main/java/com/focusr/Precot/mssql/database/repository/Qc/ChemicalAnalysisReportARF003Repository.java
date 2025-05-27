package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;

public interface ChemicalAnalysisReportARF003Repository extends JpaRepository<ChemicalAnalysisReportARF003, Long> {

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE ID = :id ", nativeQuery = true)
	ChemicalAnalysisReportARF003 findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE FORMAT_NO = :formatNo ", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> getDetailsByFormatNo(@Param("formatNo") String formatNo);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE MATERIAL_DOC_NO=:materialDocNo", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findByMaterialDocNo(@Param("materialDocNo") String materialDocNo);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' OR QC_STATUS != 'QC_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findByChemistStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findByChemistStatusSubmittedAndHodStatusNotApproved();

//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE = :date AND MATERIAL_DOC_NO=:materialDocNo AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003> findByDateF003(@Param("date") String date, @Param("materialDocNo") String materialDocNo);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE = :date AND MATERIAL_DOC_NO = :materialDocNo ORDER BY ID DESC", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findByDateF003(@Param("date") String date,
			@Param("materialDocNo") String materialDocNo);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE MATERIAL_DOC_NO=:materialDocNo AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findByMaterialDocNoForPrint(@Param("materialDocNo") String materialDocNo);

	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') OR QC_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<ChemicalAnalysisReportARF003> findAll();

	/*
	 * PDE Data Query
	 */

//	@Query(value = "SELECT BatchNo, Suplier, Mat_DEC, MATDOC FROM Tblsup WHERE MVT_TYPE = 101 and STRG ='CHB1' ", nativeQuery = true)
//	List<TblsupPayloadChemicalAnalysis> fetchPdeData();

	@Query(value = "SELECT BatchNo, Suplier, Mat_DEC, MATDOC FROM Tblsup WHERE MVT_TYPE = 101 and STRG ='CHB1'", nativeQuery = true)
	List<Object[]> fetchPdeData();

	// AMC

	@Query(value = "SELECT * FROM precot.CHEMICAL_SPECIFICATION_F003 WHERE CHEMICAL = :chemical", nativeQuery = true)
	List<Object[]> fetchChemicalData(@Param("chemical") String chemical);

}
