package com.focusr.Precot.mssql.database.repository.productDevelopment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;


@Repository
public interface ProductDevelopmentSheetRepoF001 extends  JpaRepository<ProductDevelopmentSheetF001, Long> {

	@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 WHERE ID=:id", nativeQuery = true)
	ProductDevelopmentSheetF001 fetchProductDevelopmentById(@Param("id") Long id);

		@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 WHERE ID=:id", nativeQuery = true)
		ProductDevelopmentSheetF001 fetchReceptionChecklistById(@Param("id") Long id);

		
		@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 WHERE PDS_NO = :pdsNo ", nativeQuery = true)
		List<ProductDevelopmentSheetF001> findByProductDevelopment(@Param("pdsNo") String pdsNo);

		@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 WHERE PDS_NO = :pdsNo AND DEVELOPMENTSUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
		List<ProductDevelopmentSheetF001> findByProductDevelopmentPrint(@Param("pdsNo") String pdsNo);

		@Query(value = "SELECT * FROM pde.precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
	               "WHERE DEVELOPMENTSUPERVISOR_STATUS IN ('SUPERVISOR_SAVED', 'SUPERVISOR_APPROVED') " +
	               "AND (" +
	               "BLEACHING_STATUS IS NULL OR BLEACHING_STATUS <> 'BLEACHING_APPROVED' " +
	               "OR QC_STATUS IS NULL OR QC_STATUS <> 'QC_APPROVED' " +
	               "OR QA_STATUS IS NULL OR QA_STATUS <> 'QA_APPROVED' " +
	               "OR SPUNLACE_STATUS IS NULL OR SPUNLACE_STATUS <> 'SPUNLANCE_APPROVED' " +
	               "OR PAD_PUNCHING_STATUS IS NULL OR PAD_PUNCHING_STATUS <> 'PADPUNCHING_APPROVED' " +
	               "OR DRY_GOODS_STATUS IS NULL OR DRY_GOODS_STATUS <> 'DRYGOODS_APPROVED' " +
	               "OR PPC__STATUS IS NULL OR PPC__STATUS <> 'PPC_APPROVED')" +
	               "ORDER BY ID DESC", 
	       nativeQuery = true)
	List<ProductDevelopmentSheetF001> findProductDevelopmentForSupervisor();

		
//		@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 WHERE QA_STATUS != 'QA_APPROVED' " +
//	               "AND (BLEACHING_STATUS != 'BLEACHING_APPROVED' OR SPUNLACE_STATUS != 'SPUNLACE_APPROVED' " +
//	               "OR PAD_PUNCHING_STATUS != 'PADPUNCHING_APPROVED' OR DRY_GOODS_STATUS != 'DRYGOODS_APPROVED' " +
//	               "OR PPC__STATUS != 'PPC_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<ProductDevelopmentSheetF001> ProductDevelopmentforHod();
		
		@Query(value = "SELECT * FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
	               "WHERE DEVELOPMENTSUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' " +
	               "OR (QA_STATUS != 'QA_APPROVED' OR BLEACHING_STATUS != 'BLEACHING_APPROVED' " +
	               "OR SPUNLACE_STATUS != 'SPUNLACE_APPROVED' OR PAD_PUNCHING_STATUS != 'PADPUNCHING_APPROVED' " +
	               "OR DRY_GOODS_STATUS != 'DRYGOODS_APPROVED' OR PPC__STATUS != 'PPC_APPROVED') " +
	               "ORDER BY ID DESC", nativeQuery = true)
	List<ProductDevelopmentSheetF001> ProductDevelopmentforHod();
		
//		@Query(value = "SELECT * FROM pde.precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
//	               "WHERE DEVELOPMENTSUPERVISOR_STATUS IN ('SUPERVISOR_APPROVED') " +
//	               "AND (" +
//	               "BLEACHING_STATUS IS NULL OR BLEACHING_STATUS <> 'BLEACHING_APPROVED' " +
//	               "OR QC_STATUS IS NULL OR QC_STATUS <> 'QC_APPROVED' " +
//	               "OR QA_STATUS IS NULL OR QA_STATUS <> 'QA_APPROVED' " +
//	               "OR SPUNLACE_STATUS IS NULL OR SPUNLACE_STATUS <> 'SPUNLANCE_APPROVED' " +
//	               "OR PAD_PUNCHING_STATUS IS NULL OR PAD_PUNCHING_STATUS <> 'PADPUNCHING_APPROVED' " +
//	               "OR DRY_GOODS_STATUS IS NULL OR DRY_GOODS_STATUS <> 'DRYGOODS_APPROVED' " +
//	               "OR PPC__STATUS IS NULL OR PPC__STATUS <> 'PPC_APPROVED' " +
//	               "ORDER BY ID DESC" +
//	               ")", 
//	       nativeQuery = true)
//	List<ProductDevelopmentSheetF001> findProductDevelopmentForQAandQC();
		
		@Query(value = "SELECT * FROM pde.precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
	               "WHERE DEVELOPMENTSUPERVISOR_STATUS IN ('SUPERVISOR_APPROVED') " +
	               "AND (" +
	               "BLEACHING_STATUS IS NULL OR BLEACHING_STATUS <> 'BLEACHING_APPROVED' " +
	               "OR QC_STATUS IS NULL OR QC_STATUS <> 'QC_APPROVED' " +
	               "OR QA_STATUS IS NULL OR QA_STATUS <> 'QA_APPROVED' " +
	               "OR SPUNLACE_STATUS IS NULL OR SPUNLACE_STATUS <> 'SPUNLANCE_APPROVED' " +
	               "OR PAD_PUNCHING_STATUS IS NULL OR PAD_PUNCHING_STATUS <> 'PADPUNCHING_APPROVED' " +
	               "OR DRY_GOODS_STATUS IS NULL OR DRY_GOODS_STATUS <> 'DRYGOODS_APPROVED' " +
	               "OR PPC__STATUS IS NULL OR PPC__STATUS <> 'PPC_APPROVED'" +
	               ") " +
	               "ORDER BY ID DESC", 
	       nativeQuery = true)
	List<ProductDevelopmentSheetF001> findProductDevelopmentForQAandQC();



		
//		@Query(value = "SELECT * FROM pde.precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
//	               "WHERE QA_STATUS IN ('QA_APPROVED') " +
//	               "AND (" +
//	               "BLEACHING_STATUS IS NULL OR BLEACHING_STATUS <> 'BLEACHING_APPROVED' " +
//	               "OR QC_STATUS IS NULL OR QC_STATUS <> 'QC_APPROVED' " +
//	               "OR QA_STATUS IS NULL OR QA_STATUS <> 'QA_APPROVED' " +
//	               "OR SPUNLACE_STATUS IS NULL OR SPUNLACE_STATUS <> 'SPUNLANCE_APPROVED' " +
//	               "OR PAD_PUNCHING_STATUS IS NULL OR PAD_PUNCHING_STATUS <> 'PADPUNCHING_APPROVED' " +
//	               "OR DRY_GOODS_STATUS IS NULL OR DRY_GOODS_STATUS <> 'DRYGOODS_APPROVED' " +
//	               "OR PPC__STATUS IS NULL OR PPC__STATUS <> 'PPC_APPROVED' " +
//	               "ORDER BY ID DESC" +
//	               ")", 
//	       nativeQuery = true)
//	List<ProductDevelopmentSheetF001> findProductDevelopmentForHod();
		
		
		@Query(value = "SELECT * FROM pde.precot.PRODUCT_DEVELOPMENT_SHEET_F001 " +
	               "WHERE QA_STATUS IN ('QA_APPROVED') " +
	               "AND (" +
	               "BLEACHING_STATUS IS NULL OR BLEACHING_STATUS <> 'BLEACHING_APPROVED' " +
	               "OR QC_STATUS IS NULL OR QC_STATUS <> 'QC_APPROVED' " +
	               "OR QA_STATUS IS NULL OR QA_STATUS <> 'QA_APPROVED' " +
	               "OR SPUNLACE_STATUS IS NULL OR SPUNLACE_STATUS <> 'SPUNLACE_APPROVED' " +
	               "OR PAD_PUNCHING_STATUS IS NULL OR PAD_PUNCHING_STATUS <> 'PADPUNCHING_APPROVED' " +
	               "OR DRY_GOODS_STATUS IS NULL OR DRY_GOODS_STATUS <> 'DRYGOODS_APPROVED' " +
	               "OR PPC__STATUS IS NULL OR PPC__STATUS <> 'PPC_APPROVED'" +
	               ") " + 
	               "ORDER BY ID DESC", 
	       nativeQuery = true)
	List<ProductDevelopmentSheetF001> findProductDevelopmentForHod();



		@Query(value = "SELECT TOP 1 ngp.PDS_NO FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 ngp ORDER BY ngp.PDS_NO DESC", nativeQuery = true)
		String findpdsnoGeneration();

		
		@Query(value ="SELECT PDS_NO FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001 ", nativeQuery = true)
	    List<String> findAllPdsNo();
		
		
		@Query(value = "SELECT TOP 1 NOMENCLATURE FROM precot.PRODUCT_DEVELOPMENT_SHEET_F001  ORDER BY ID DESC", nativeQuery = true)
		String findlastnomenclature();
		
//		@Query(value = "SELECT TOP 1 note FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 ORDER BY ID DESC", nativeQuery = true)
//		String findLastNote();


}
