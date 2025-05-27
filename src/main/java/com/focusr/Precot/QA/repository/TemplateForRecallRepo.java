package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.TemplateForRecall;

@Repository
public interface TemplateForRecallRepo extends JpaRepository<TemplateForRecall, Long> {

	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE ID =:id ", nativeQuery = true)
	TemplateForRecall findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE DATE=:date", nativeQuery = true)
	List<TemplateForRecall> GetTemplateRecall(@Param("date") String date);

	// PRINT
	
//	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE MONTH=:month AND YEAR =:year AND MANAGER_STATUS = 'MANAGER_APPROVED' ", nativeQuery = true)
//	List<TemplateForRecall> templatePrint(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE "
            + "(:month IS NULL OR :month = '' OR MONTH = :month) "
            + "AND (:year IS NULL OR :year = '' OR YEAR = :year) "
            + "AND MANAGER_STATUS = 'MANAGER_APPROVED'", nativeQuery = true)
   List<TemplateForRecall> templatePrint(@Param("month") String month, @Param("year") String year);


	// CHEMIST SUMMARY

	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<TemplateForRecall> qaInsSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<TemplateForRecall> managerSummary();
	
	// PRODUCT DESCRIPTION
	 
		@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct WHERE Cat = 'Pads'", nativeQuery = true)
		List<String> getPadpunching();
	 
		@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct WHERE Cat IN ('Pleats','Balls','Wool Roll')", nativeQuery = true)
		List<String> getDryGoods();
	 
		@Query(value = "SELECT DISTINCT ProdDesc FROM tblProduct WHERE Cat = 'Buds'", nativeQuery = true)
		List<String> getCottonBuds();
		
		// MACHINE
		
		@Query(value = "SELECT DISTINCT MCN FROM tblMCDet WHERE MCat = 'Pads'", nativeQuery = true)
		List<String> getMcnPadpunching();
	 
		@Query(value = "SELECT DISTINCT MCN FROM tblMCDet WHERE MCat IN ('Pleats','Balls','Wool Roll')", nativeQuery = true)
		List<String> getMcnDryGoods();
	 
		@Query(value = "SELECT DISTINCT MCN FROM tblMCDet WHERE MCat = 'Bud'", nativeQuery = true)
		List<String> getMcnCottonBuds();
		
		// EQUIPMENT ID
		
		@Query(value = "SELECT DISTINCT Eqid from tblEqid", nativeQuery = true)
		List<String> getEquipmentID();
	 
	 

}
