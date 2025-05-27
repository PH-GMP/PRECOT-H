package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaAbCottonF26;

@Repository
public interface CoaAbCottonF26Repo extends JpaRepository<CoaAbCottonF26, Long> {

	// CHEMICAL NAME

	@Query(value = "SELECT DISTINCT Chemical from [PDE].[dbo].[tblchemical]", nativeQuery = true)
	List<String> getChemicalName();

	@Query(value = "SELECT DISTINCT CUST_NAME from tblcusinfo ;", nativeQuery = true)
	List<String> getCustomerName();

	@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo WHERE CUST_NAME = :customer", nativeQuery = true)
	List<String> getProductName(@Param("customer") String customer);

	@Query(value = "SELECT * FROM precot.COA_AB_COTTON_F26 WHERE ID =:id ", nativeQuery = true)
	CoaAbCottonF26 findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.COA_AB_COTTON_F26 WHERE PRODUCT=:product AND CUSTOMER =:customer", nativeQuery = true)
	List<CoaAbCottonF26> GetAbCottonF26(@Param("product") String product, @Param("customer") String customer);

//	@Query(value = "SELECT BaleNo FROM [PDE].[dbo].[TblBalePack] WHERE isExport = 'Y' AND MONTH(PackDt) = MONTH(GETDATE()) AND YEAR(PackDt) = YEAR(GETDATE())", nativeQuery = true)
//	List<String> getBaleNo();

	@Query(value = "SELECT BaleNo FROM TblBalePack WHERE isExport = 'Y' AND MONTH(PackDt) = MONTH(GETDATE()) AND YEAR(PackDt) = YEAR(GETDATE())", nativeQuery = true)
	List<String> getBaleNo();

	// PACKDT

//	@Query(value = "SELECT PackDt FROM [PDE].[dbo].[TblBalePack] WHERE BaleNo =:baleNo", nativeQuery = true)
//	List<Date> getPacDt(@Param("baleNo") String baleNo);

	@Query(value = "SELECT PackDt FROM TblBalePack WHERE BaleNo =:baleNo", nativeQuery = true)
	List<Date> getPacDt(@Param("baleNo") String baleNo);

	// PRINT

	@Query(value = "SELECT * FROM precot.COA_AB_COTTON_F26 WHERE PRODUCT=:product AND CUSTOMER =:customer AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<CoaAbCottonF26> PrintApiF26(@Param("product") String product, @Param("customer") String customer);

	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.COA_AB_COTTON_F26 WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaAbCottonF26> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.COA_AB_COTTON_F26 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<CoaAbCottonF26> exeManagerSummary();

	// MEDLINE

	@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo WHERE CUST_NAME IN ('MEDLINE CANADA, CORP.','MEDLINE HEALTHCARE INDUSTRIES PVT L','MEDLINE INDUSTRIES, LP')", nativeQuery = true)
	List<String> getProductNameMedline(@Param("customer") String customer);

	// AMC

	@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct", nativeQuery = true)
	List<String> getProductDescription();

}
