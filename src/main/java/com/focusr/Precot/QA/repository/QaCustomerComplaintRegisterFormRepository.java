package com.focusr.Precot.QA.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;

@Repository
public interface QaCustomerComplaintRegisterFormRepository
		extends JpaRepository<QaCustomerComplaintRegisterForm, Long> {

	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE COMPLAINT_ID = :complaint_id ", nativeQuery = true)
	QaCustomerComplaintRegisterForm findFormById(@Param("complaint_id") long complaint_id);

	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE CCF_NO =:ccf_no", nativeQuery = true)
	QaCustomerComplaintRegisterForm findByparam(@Param("ccf_no") String ccf_no);

	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)  AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<QaCustomerComplaintRegisterForm> printApi(@Param("month") String month, @Param("year") String year,
			@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY COMPLAINT_ID DESC", nativeQuery = true)
	List<QaCustomerComplaintRegisterForm> qaMrSummary();

//	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE QA_MR_STATUS = 'QA_MR_SUBMITTED' AND DEPARTMENT =:department ORDER BY COMPLAINT_ID DESC", nativeQuery = true)
//	List<QaCustomerComplaintRegisterForm> hodSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE QA_MR_STATUS = 'QA_MR_SUBMITTED' AND DEPARTMENT IN (:departments) ORDER BY COMPLAINT_ID DESC", nativeQuery = true)
	List<QaCustomerComplaintRegisterForm> hodSummary(@Param("departments") List<String> departments);

	
	@Query(value = "SELECT COMPLAINT_RECEIVED_DATE as Date_of_Complaint, CCF_NO as Complaint_No, CUSTOMER_NAME as Customer_name, CUSTOMER_COMPLAINT_REF_NO as Customer_Reference_Number,"
			+ "PRODUCT_NAME as Product_Name, BATCH_NO as Fg_No, STRENGTH_OF_PRODUCT as Strength_Of_Product,PACKING as Packing, GRAMMAGE as Grammage,CHEMICAL as Chemical, LESSER_COUNT as Lesser_Count ,"
			+ " CONTAMINATION as Contamination, LESS_QTY as Less_Qty, OTHERS as Others, COMPLAINT_SAMPLE_RECEIVED as Details_Of_Complaint_Sample, SAMPLE_RECEIVED_ON as Sample_Received_On, COMPLAINT_REPLIED_ON as Complaint_Replied_On , STATUS as Status"
			+ " FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM  WHERE MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<Map<String, Object>> getForCustomerComplaintRegister(@Param("month") String month, @Param("year") String year);

	// Trend chart month based
	@Query(value = "SELECT MONTH, SUM(CAST(COUNT_OF_NATURE_OF_COMPLAINTS AS INT)) AS total_complaints "
			+ "FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM " + "WHERE FINANCIAL_YEAR = :financialYear AND QA_MR_STATUS = 'QA_MR_SUBMITTED'"
			+ "GROUP BY MONTH", nativeQuery = true)
	List<Object[]> getComplaintCountsByMonth(@Param("financialYear") String financialYear);

	// Trend chart - count of complaints
	@Query("SELECT " + "SUM(CASE WHEN q.strength_of_product = 'YES' THEN 1 ELSE 0 END) AS strengthOfProductCount, "
			+ "SUM(CASE WHEN q.packing = 'YES' THEN 1 ELSE 0 END) AS packingCount, "
			+ "SUM(CASE WHEN q.grammage = 'YES' THEN 1 ELSE 0 END) AS grammageCount, "
			+ "SUM(CASE WHEN q.chemical = 'YES' THEN 1 ELSE 0 END) AS chemicalCount, "
			+ "SUM(CASE WHEN q.lesser_count = 'YES' THEN 1 ELSE 0 END) AS lesserCount, "
			+ "SUM(CASE WHEN q.contamination = 'YES' THEN 1 ELSE 0 END) AS contaminationCount, "
			+ "SUM(CASE WHEN q.less_qty = 'YES' THEN 1 ELSE 0 END) AS lessQtyCount, "
			+ "SUM(CASE WHEN q.others <> 'N/A' THEN 1 ELSE 0 END) AS othersCount "
			+ "FROM QaCustomerComplaintRegisterForm q " + "WHERE q.financial_year = :financialYear AND QA_MR_STATUS = 'QA_MR_SUBMITTED'")
	List<Object[]> getComplaintCounts(@Param("financialYear") String financialYear);

	// PRINT for Customer Complaint Register Financial year based
	@Query(value = "SELECT COMPLAINT_RECEIVED_DATE as Date_of_Complaint, CCF_NO as Complaint_No, CUSTOMER_NAME as Customer_name, CUSTOMER_COMPLAINT_REF_NO as Customer_Reference_Number,"
			+ "	PRODUCT_NAME as Product_Name, BATCH_NO as Fg_No, STRENGTH_OF_PRODUCT as Strength_Of_Product,PACKING as Packing, GRAMMAGE as Grammage,CHEMICAL as Chemical, LESSER_COUNT as Lesser_Count ,"
			+ "	 CONTAMINATION as Contamination, LESS_QTY as Less_Qty, OTHERS as Others, COMPLAINT_SAMPLE_RECEIVED as Details_Of_Complaint_Sample, SAMPLE_RECEIVED_ON as Sample_Received_On, COMPLAINT_REPLIED_ON as Complaint_Replied_On , STATUS as Status "
			+ "	 FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM WHERE FINANCIAL_YEAR=:financial_year AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<Map<String, Object>> printApiRegister(@Param("financial_year") String financial_year);

	
	// CCF lov
	@Query(value = "SELECT CCF_NO FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM", nativeQuery = true)
	List<String> ccfLov();
	//Number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM ORDER BY COMPLAINT_ID DESC", nativeQuery = true)
	 QaCustomerComplaintRegisterForm fetchLastGeneratedNo();

}
