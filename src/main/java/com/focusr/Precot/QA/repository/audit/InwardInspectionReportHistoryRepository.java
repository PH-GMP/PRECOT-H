package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InwardInspectionReportHistory;


@Repository
public interface InwardInspectionReportHistoryRepository extends JpaRepository<InwardInspectionReportHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_INWARD_INSPECTION_REPORT_HISTORY WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO = :invoice_no AND IIR_NO = :iir_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName, @Param("invoice_no") String invoice_no, @Param("iir_no") String iir_no);

	
	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT_HISTORY WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO = :invoice_no AND IIR_NO = :iir_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_INWARD_INSPECTION_REPORT_HISTORY WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO = :invoice_no AND IIR_NO = :iir_no)", nativeQuery = true)
	InwardInspectionReportHistory fetchLastSubmittedRecord(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName, @Param("invoice_no") String invoice_no, @Param("iir_no") String iir_no);
	
	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT_HISTORY WHERE " + " FORMAT_NO =:format_no "
			+ " AND (:gr_date IS NULL OR :gr_date='' OR GR_DATE = :gr_date)"
			+ " AND (:supplierName IS NULL OR :supplierName='' OR SUPPLIER_NAME=:supplierName)"
			+ " AND (:invoice_no IS NULL OR :invoice_no='' OR INVOICE_NO=:invoice_no)"
			+ " AND (:iir_no IS NULL OR :iir_no='' OR IIR_NO=:iir_no)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<InwardInspectionReportHistory> excelReport(@Param("format_no") String format_no,
			@Param("from_date") String from_date, @Param("to_date") String to_date, @Param("gr_date") String gr_date,
			@Param("supplierName") String supplierName, @Param("invoice_no") String invoice_no,
			@Param("iir_no") String iir_no);
}
