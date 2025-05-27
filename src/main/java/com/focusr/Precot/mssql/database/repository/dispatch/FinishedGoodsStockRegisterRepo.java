package com.focusr.Precot.mssql.database.repository.dispatch;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.dispatch.FinishedGoodsStockRegisterF001;

@Repository
public interface FinishedGoodsStockRegisterRepo extends JpaRepository<FinishedGoodsStockRegisterF001, Long> {

	@Query(value = "SELECT * FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 WHERE ID=:id", nativeQuery = true)
	FinishedGoodsStockRegisterF001 fetchFinishedGoodsById(@Param("id") Long id);

	@Query(value = "SELECT DISTINCT MAT_DESC from tblcusinfo ;", nativeQuery = true)
	List<String> getProductName();
	
	
	// VJ NEW SEPARATE API 
	
	@Query(value = "SELECT DISTINCT ProdDesc from tblProduct ;", nativeQuery = true)
	List<String> getProductName2();
	
	@Query(value = "SELECT DISTINCT CUST_NAME from tblcusinfo", nativeQuery = true)
	List<String> getCustomer2();
	
	@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo ", nativeQuery = true)
	List<String> getmaterial2();
	
	// VJ COMPLETED

	@Query(value = "SELECT DISTINCT CUST_NAME from tblcusinfo WHERE MAT_DESC = :customer", nativeQuery = true)
	List<String> getCustomer(@Param("customer") String customer);

	@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo WHERE MAT_DESC = :material", nativeQuery = true)
	List<String> getmaterial(@Param("material") String material);

	@Query(value = "SELECT * FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 WHERE DISPATCH_SUPERVISOR_STATUS='SUPERVISOR_SAVED'  ORDER BY ID DESC", nativeQuery = true)
	List<FinishedGoodsStockRegisterF001> getFinishedGoodservice();

//	@Query(value = "SELECT * FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 WHERE " +
//            "(:date IS NULL OR DATE = :date) " +
//            "AND (:shift IS NULL OR SHIFT = :shift) " +
//            "AND (:productName IS NULL OR PRODUCT = :productName) " +
//            "AND (:customerName IS NULL OR CUSTOMER = :customerName) " +
//            "AND DISPATCH_SUPERVISORom)
//	List<FinishedGoodsStockRegisterF001> getStockByParams(
//	        @Param("fromDate") String fromDate,
//	        @Param("toDate") String toDate,
//	        @Param("year") Integer year,
//	        @Param("month") Integer month,
//	        @Param("productCode") String productCode,
//	        @Param("productName") String productName,
//	        @Param("customerName") String customerName);

	@Query(value = "SELECT * FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 WHERE "
			+ "(:fromDate IS NULL OR :fromDate ='' OR :toDate IS NULL OR :toDate='' OR DATE BETWEEN :fromDate AND :toDate) "
			+ "AND (:year IS NULL AND :month IS NULL OR YEAR(DATE) = :year OR (YEAR(DATE) = :year AND MONTH(DATE) = :month)) "
			+ "AND (:productCode IS NULL OR :productCode ='' OR PRODUCT = :productCode) "
			+ "AND (:productName IS NULL OR :productName ='' OR PRODUCT_NAME = :productName) "
			+ "AND (:customerName IS NULL OR :customerName ='' OR CUSTOMER = :customerName) "
			+ "AND DISPATCH_SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
	List<FinishedGoodsStockRegisterF001> getStockByParams(@Param("fromDate") String fromDate,
			@Param("toDate") String toDate, @Param("year") Integer year, @Param("month") Integer month,
			@Param("productCode") String productCode, @Param("productName") String productName,
			@Param("customerName") String customerName);

	@Query(value = "SELECT TOP 1 CLOSING_STOCK_NO_OF_CARTONS " +
            "FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001 " +
            "WHERE PRODUCT = :product AND PRODUCT_NAME = :productName " +
            "AND CUSTOMER = :customer AND DISPATCH_SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' " +
            "ORDER BY ID DESC",
    nativeQuery = true)
List<Integer> findClosingStock(@Param("product") String product,
                            @Param("productName") String productName,
                            @Param("customer") String customer);

	@Query(value = "SELECT DISTINCT RECEIVED_BY_PRODUCTION FROM precot.DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001", nativeQuery = true)
	List<String> fetchBleachingIdNumbers();
	
	
	
		// SIGNOFF - CR	
	
	@Query(value = "SELECT DISTINCT ProdDesc from tblProduct p INNER JOIN tblcusinfo t ON t.MATERIAL = p.Product WHERE (:material IS NULL OR t.MATERIAL=:material) AND (:customer IS NULL OR t.CUST_NAME=:customer)", nativeQuery = true)
	List<String> getDefaultProduct(@Param("customer") String customer, @Param("material") String material);
	
	@Query(value = "SELECT DISTINCT c.CUST_NAME from tblcusinfo c INNER JOIN tblProduct p ON p.Product = c.Material WHERE p.ProdDesc=:productName", nativeQuery = true)
	List<String> getDefaultCustomerByProduct(@Param("productName") String productName);
	
	@Query(value = "SELECT DISTINCT c.MATERIAL from tblcusinfo c INNER JOIN tblProduct p ON p.Product = c.Material WHERE p.ProdDesc=:productName", nativeQuery = true)
	List<String> getDefaultmaterialByProduct(@Param("productName") String productName);
	
	@Query(value = "SELECT DISTINCT c.CUST_NAME from tblcusinfo c INNER JOIN tblProduct p ON p.Product = c.Material WHERE c.MATERIAL=:material", nativeQuery = true)
	List<String> getDefaultCustomerByMaterial(@Param("material") String material);
	
	@Query(value = "SELECT DISTINCT c.MATERIAL from tblcusinfo c INNER JOIN tblProduct p ON p.Product = c.Material WHERE c.CUST_NAME=:customer", nativeQuery = true)
	List<String> getDefaultmaterialByCustomer(@Param("customer") String customer);

	
	
	
	@Query(value = "SELECT DISTINCT MAT_DESC AS product,CUST_NAME AS customer,MATERIAL AS material FROM tblcusinfo WHERE (:productName IS NULL OR MAT_DESC = :productName) AND (:customer IS NULL OR CUST_NAME = :customer) AND (:material IS NULL OR MATERIAL = :material)", nativeQuery = true)
		List<Map<String, Object>> getFilteredData(
		    @Param("productName") String productName,
		    @Param("customer") String customer,
		    @Param("material") String material);
	
	
	// CR - 19-02-2025
	
	// PRODUCT NAME  - MATERIAL DESCRIPTION
	
		@Query(value = "SELECT DISTINCT CUST_NAME from tblcusinfo WHERE MAT_DESC = :productName", nativeQuery = true)
		List<String> getCustomerDetailsByProductName(@Param("productName") String productName);
		
		@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo WHERE MAT_DESC = :productName", nativeQuery = true)
		List<String> getMaterialDetailsByProductName(@Param("productName") String productName);
		
		// PROCUCT CODE - MATERIAL
		
		@Query(value = "SELECT DISTINCT MAT_DESC from tblcusinfo WHERE MATERIAL = :material", nativeQuery = true)
		List<String> getProductNameByMaterial(@Param("material") String material);
		
		@Query(value = "SELECT DISTINCT CUST_NAME from tblcusinfo WHERE MATERIAL = :material", nativeQuery = true)
		List<String> getCustomerNameDetailsByMaterial(@Param("material") String material);
		
		// CUSTOMER - CUS_NAME
		
		@Query(value = "SELECT DISTINCT MAT_DESC from tblcusinfo WHERE CUST_NAME = :customer", nativeQuery = true)
		List<String> getProductNameByCustomer(@Param("customer") String customer);
		
		@Query(value = "SELECT DISTINCT MATERIAL from tblcusinfo WHERE CUST_NAME = :customer", nativeQuery = true)
		List<String> getMaterialByCustomer(@Param("customer") String customer);


}
