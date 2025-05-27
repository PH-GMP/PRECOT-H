package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.InwardInspectionReport;



@Repository
public interface InwardInspectionReportRepository extends JpaRepository<InwardInspectionReport, Long> {
/*	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT WHERE "
			+ "FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO =:invoice_no AND " +
	        "(:iir_no IS NULL OR IIR_NO = :iir_no) AND " +
	        " QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<InwardInspectionReport> printParam( @Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName,@Param("invoice_no") String invoice_no,@Param("iir_no") String iir_no);*/
	//print
	@Query(value = "SELECT DISTINCT SUPPLIER_NAME FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date", nativeQuery = true)
	List<String> getSuppliersByGrDateInward(@Param("formatNo") String formatNo, @Param("gr_date") String gr_date);

	@Query(value = "SELECT DISTINCT INVOICE_NO FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName", nativeQuery = true)
	List<String> getInvoicesByDateAndSupplierInward(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName);
	
	@Query(value = "SELECT DISTINCT IIR_NO FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo AND  GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO = :invoice_no AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<String> getIirByDateSupplierAndInvoice(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName, @Param("invoice_no") String invoice_no);

	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo AND  GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO = :invoice_no AND (:iir_no IS NULL OR :iir_no = '' OR IIR_NO = :iir_no) AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
    List<InwardInspectionReport> getDetailsByIir(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName, @Param("invoice_no") String invoice_no, @Param("iir_no") String iir_no);
//

	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo AND GR_DATE = :gr_date AND SUPPLIER_NAME = :supplierName AND INVOICE_NO =:invoice_no AND ITEM_DESCRIPTION =:item_description", nativeQuery = true)
	InwardInspectionReport getdetailsbyParam(@Param("formatNo") String formatNo,@Param("gr_date") String gr_date, @Param("supplierName") String supplierName,@Param("invoice_no") String invoice_no,@Param("item_description") String item_description);

	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT  WHERE FORMAT_NO = :formatNo AND (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR QA_MANAGER_STATUS !='QA_MR_APPROVED') ORDER BY  ID DESC", nativeQuery = true)
	List<InwardInspectionReport> inspectorSummary( @Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT  WHERE FORMAT_NO = :formatNo AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED' AND QA_MANAGER_STATUS !='QA_MR_APPROVED' ORDER BY  ID DESC", nativeQuery = true)
	List<InwardInspectionReport> managerSummary( @Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QA_INWARD_INSPECTION_REPORT  WHERE ID =:id", nativeQuery = true)
	InwardInspectionReport getFormById(Long id);
	
	//PDE//
/*	@Query(value = "SELECT MATDOC AS grNo FROM TblSup WHERE Date = :grDate",nativeQuery = true)
	List<String> getDetailsByGrDate(@Param("grDate")String grDate);
	
	@Query(value = "SELECT DISTINCT Mat_Dec AS materialDescription\r\n"
			+ "FROM TblSup\r\n"
			+ "WHERE MATDOC = :grNo\r\n"
			+ "",nativeQuery = true)
	List<String> getDetailsByGrNo(@Param("grNo")String grNo);
	
	@Query(value = "SELECT \r\n"
			+ "    Material AS materialCode, \r\n"
			+ "    Batchno AS batchNo, \r\n"
			+ "    Weight AS lotQuantity , Suplier AS supplierName, PONO AS purchaseOrderNo, Invoice AS invoiceNumber\r\n"
			+ "FROM TblSup\r\n"
			+ "WHERE MATDOC = :grNo AND Mat_Dec = :materialDescription"
			+ "",nativeQuery = true)
	List<Object[]> getDetailsByGrNo(@Param("grNo")String grNo,@Param("materialDescription")String materialDescription);*/
	
	@Query(value = "SELECT DISTINCT Suplier AS supplier FROM [PDE].[dbo].[TblSup] WHERE Date = :grDate", nativeQuery = true)
	List<String> getSuppliersByGrDate(@Param("grDate") String grDate);

	@Query(value = "SELECT DISTINCT Invoice FROM [PDE].[dbo].[TblSup] WHERE Date = :grDate AND Suplier = :supplier", nativeQuery = true)
	List<String> getInvoicesByDateAndSupplier(@Param("grDate") String grDate, @Param("supplier") String supplier);
	
	@Query(value = "SELECT DISTINCT Mat_Dec AS materialDescription FROM [PDE].[dbo].[TblSup] WHERE Date = :grDate AND Suplier = :supplier AND Invoice = :invoice", nativeQuery = true)
	List<String> getMaterialDescriptionsByDateSupplierAndInvoice(@Param("grDate") String grDate, @Param("supplier") String supplier, @Param("invoice") String invoice);

	@Query(value = "SELECT Material AS materialCode, Batchno AS batchNo, Weight AS lotQuantity, Suplier AS supplierName, PONO AS purchaseOrderNo, Invoice AS invoiceNumber, MATDOC AS grNo, Noofbales AS nOfRoll FROM [PDE].[dbo].[TblSup] WHERE Date = :grDate AND Suplier = :supplier AND Invoice = :invoice AND Mat_Dec = :materialDescription", nativeQuery = true)
	 List<Object[]> getDetailsByDateSupplierInvoiceAndMatDesc(@Param("grDate") String grDate, @Param("supplier") String supplier, @Param("invoice") String invoice, @Param("materialDescription") String materialDescription);

	//Form number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = :formatNo ORDER BY ID DESC ;", nativeQuery = true)
	 InwardInspectionReport fetchLastGeneratedNo(@Param("formatNo") String formatNo);

	
	

}
